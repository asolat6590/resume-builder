# Конструктор резюме и портфолио

Веб-приложение на **React + Vite + Tailwind**: форма с данными резюме, генерация описания (ИИ или шаблон), три шаблона оформления, экспорт в PDF, адаптивный интерфейс.

## Требования

- Node.js 20+
- npm

## Установка

```bash
npm install --legacy-peer-deps
```

Скопируйте `.env.example` в `.env` и укажите ключ **Google Gemini**:

```bash
copy .env.example .env
```

Ключ можно получить в [Google AI Studio](https://aistudio.google.com/apikey).

| Переменная | Описание |
|------------|----------|
| `GEMINI_API_KEY` | API-ключ Gemini (или `GOOGLE_API_KEY`) |
| `AI_PROVIDER` | `gemini` (по умолчанию) или `openai` |
| `AI_MODEL` | Модель Gemini (по умолчанию `gemini-2.0-flash`) |
| `PORT` | Порт API (по умолчанию `3001`) |

Для OpenAI-совместимого API задайте `AI_PROVIDER=openai` и `OPENAI_API_KEY` / `AI_API_KEY`.

Без ключа сервер автоматически формирует описание по шаблону.

## Запуск

Разработка (клиент + API):

```bash
npm run dev
```

Откройте адрес, который покажет Vite (обычно `http://localhost:5173`). Запросы `/api/*` проксируются на Express.

Сборка фронтенда:

```bash
npm run build
```

Продакшен (раздача `dist` и API с одного процесса):

```bash
set NODE_ENV=production
npm run build
npm start
```

## Деплой на Vercel

1. Репозиторий: [github.com/asolat6590/resume-builder](https://github.com/asolat6590/resume-builder)
2. Импортируйте проект в [Vercel](https://vercel.com) из GitHub.
3. В **Environment Variables** добавьте те же переменные, что в `.env` (`GEMINI_API_KEY`, `AI_MODEL`, при необходимости `AI_PROVIDER`).
4. API на Vercel: `POST /api/generate-summary` (файл [`api/generate-summary.js`](api/generate-summary.js)).

Локально через CLI: `npx vercel --prod` (нужен вход в аккаунт Vercel).

## Возможности

- Поля: фото, имя, должность, дата рождения, контакты, опыт, навыки, образование, языки
- **Сгенерировать описание** — `POST /api/generate-summary` (язык summary совпадает с языком UI)
- Шаблоны: Классика, Современный, Портфолио
- **Скачать PDF** — снимок блока предпросмотра (формат A4, белый фон независимо от темы)
- Черновик сохраняется в `localStorage`
- **Тема:** светлая / тёмная (переключатель в шапке, сохранение в `localStorage`, учёт `prefers-color-scheme`)
- **Язык интерфейса:** русский / English (`src/locales/`, переключатель в шапке)

## Ограничения

- Большие фото в base64 могут заполнить лимит `localStorage` (~5 МБ в браузере)
- PDF строится через растровый снимок страницы; очень длинные резюме разбиваются на несколько листов
- Ключ ИИ хранится только на сервере, не в браузере

## Структура

- `src/` — React-приложение
- `server/` — Express API для генерации текста
