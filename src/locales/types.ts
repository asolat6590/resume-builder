export type UiLocale = 'ru' | 'en'

export type TranslationDict = {
  header: {
    title: string
    subtitle: string
  }
  tabs: {
    form: string
    preview: string
  }
  theme: {
    light: string
    dark: string
    toggle: string
  }
  language: {
    label: string
    ru: string
    en: string
  }
  actions: {
    generate: string
    generating: string
    downloadPdf: string
    exporting: string
  }
  preview: {
    title: string
    mobileHint: string
  }
  templates: {
    classic: string
    classicDesc: string
    modern: string
    modernDesc: string
    portfolio: string
    portfolioDesc: string
  }
  form: {
    personal: string
    contacts: string
    experience: string
    skills: string
    education: string
    languages: string
    generated: string
    photo: string
    fullName: string
    position: string
    birthDate: string
    email: string
    phone: string
    city: string
    telegram: string
    linkedin: string
    company: string
    role: string
    start: string
    end: string
    achievement: string
    addBullet: string
    addExperience: string
    placeN: string
    recordN: string
    skillPlaceholder: string
    addSkill: string
    school: string
    specialty: string
    gradYear: string
    addEducation: string
    languageName: string
    level: string
    addLanguage: string
    remove: string
    sourceAi: string
    sourceTemplate: string
    sourceLabel: string
  }
  placeholders: {
    fullName: string
    position: string
    languageName: string
  }
  languageLevels: {
    native: string
    c2: string
    c1: string
    b2: string
    b1: string
    a2: string
    a1: string
  }
  resumeSections: {
    about: string
    experience: string
    skills: string
    education: string
    languages: string
    profile: string
    workExperience: string
    contacts: string
  }
  resumePlaceholders: {
    fullName: string
    position: string
    yourName: string
    photo: string
  }
  resumeMeta: {
    birthDate: string
    present: string
    presentShort: string
  }
  alerts: {
    positionRequired: string
    nameRequiredPdf: string
    confirmPdfNoSummary: string
    pdfFailed: string
  }
}
