import { createEmptyResume, type ResumeData } from '../types/resume'

import { STORAGE_KEYS } from '../config/storageKeys'

const STORAGE_KEY = STORAGE_KEYS.resumeDraft

export function loadResumeFromStorage(): ResumeData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return createEmptyResume()
    const parsed = JSON.parse(raw) as ResumeData
    return { ...createEmptyResume(), ...parsed }
  } catch {
    return createEmptyResume()
  }
}

export function saveResumeToStorage(data: ResumeData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    console.warn('Не удалось сохранить черновик (возможно, превышен лимит localStorage)')
  }
}
