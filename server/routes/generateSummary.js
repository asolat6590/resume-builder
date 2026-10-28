import { generateSummaryFallback } from '../lib/fallbackSummary.js'

function buildSystemPrompt(locale) {
  const lang = locale === 'en' ? 'English' : 'Russian'
  return `You are a resume writing assistant. Reply with valid JSON only, no markdown.
Format: {"summary":"...","strengths":["...","..."]}
summary — 3–4 sentences in ${lang}, professional tone.
strengths — 3–5 short bullet points highlighting strengths.
Use ONLY facts from the user data. Do not invent companies, dates, or skills.`
}

function buildUserPrompt(payload) {
  return JSON.stringify(
    {
      position: payload.position,
      experience: payload.experience,
      skills: payload.skills,
      education: payload.education,
      languages: payload.languages,
    },
    null,
    2,
  )
}

function parseAiJson(content) {
  const parsed = JSON.parse(content)
  if (!parsed.summary || !Array.isArray(parsed.strengths)) {
    throw new Error('Invalid AI JSON shape')
  }
  return {
    summary: String(parsed.summary),
    strengths: parsed.strengths.map(String).slice(0, 5),
    source: 'ai',
  }
}

async function callGemini(payload, locale) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
  if (!apiKey) return null

  const model = process.env.AI_MODEL || 'gemini-2.0-flash'
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: buildSystemPrompt(locale) }],
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: buildUserPrompt(payload) }],
        },
      ],
      generationConfig: {
        temperature: 0.6,
        responseMimeType: 'application/json',
      },
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Gemini API ${res.status}: ${text.slice(0, 200)}`)
  }

  const data = await res.json()
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!content) throw new Error('Empty Gemini response')

  return parseAiJson(content)
}

async function callOpenAICompatible(payload, locale) {
  const apiKey = process.env.OPENAI_API_KEY || process.env.AI_API_KEY
  if (!apiKey) return null

  const baseUrl = (process.env.AI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '')
  const model = process.env.AI_MODEL || 'gpt-4o-mini'

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.6,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: buildSystemPrompt(locale) },
        { role: 'user', content: buildUserPrompt(payload) },
      ],
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`AI API ${res.status}: ${text.slice(0, 200)}`)
  }

  const data = await res.json()
  const content = data.choices?.[0]?.message?.content
  if (!content) throw new Error('Empty AI response')

  return parseAiJson(content)
}

async function callAI(payload, locale) {
  const provider = (process.env.AI_PROVIDER || 'gemini').toLowerCase()

  if (provider === 'openai') {
    return callOpenAICompatible(payload, locale)
  }

  const geminiResult = await callGemini(payload, locale)
  if (geminiResult) return geminiResult

  if (provider === 'gemini') {
    return null
  }

  return callOpenAICompatible(payload, locale)
}

export async function generateSummaryHandler(req, res) {
  try {
    const { position, experience, skills, education, languages, locale } = req.body ?? {}
    const uiLocale = locale === 'en' ? 'en' : 'ru'

    if (!position?.trim()) {
      return res.status(400).json({ error: 'Укажите желаемую должность' })
    }

    const payload = {
      position,
      experience: Array.isArray(experience) ? experience : [],
      skills: Array.isArray(skills) ? skills : [],
      education: Array.isArray(education) ? education : [],
      languages: Array.isArray(languages) ? languages : [],
    }

    let result = null
    try {
      result = await callAI(payload, uiLocale)
    } catch (err) {
      console.warn('AI call failed, using fallback:', err.message)
    }

    if (!result) {
      result = generateSummaryFallback(payload)
    }

    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Не удалось сгенерировать описание' })
  }
}
