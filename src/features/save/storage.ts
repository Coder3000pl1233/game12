import type { Preferences, SaveGame } from '../narrative/types'

const SAVE_KEY = 'fuera-de-sesion:save:v1'
const PREFERENCES_KEY = 'fuera-de-sesion:preferences:v1'
const validStats = ['trust', 'anxiety', 'hostility', 'risk'] as const

export function validateSave(data: unknown, caseId: string, sceneIds: string[], clueIds: string[]): SaveGame | null {
  if (!data || typeof data !== 'object') return null
  const value = data as Partial<SaveGame>
  if (value.schemaVersion !== 1 || value.caseId !== caseId || typeof value.sceneId !== 'string' || !sceneIds.includes(value.sceneId)) return null
  if (typeof value.sessionNumber !== 'number' || !Number.isFinite(value.sessionNumber)) return null
  if (!value.hidden || !validStats.every((stat) => typeof value.hidden?.[stat] === 'number' && Number.isFinite(value.hidden[stat]))) return null
  if (!value.flags || typeof value.flags !== 'object' || !Object.values(value.flags).every((flag) => typeof flag === 'boolean')) return null
  if (!Array.isArray(value.discoveredClues) || !value.discoveredClues.every((id) => clueIds.includes(id))) return null
  if (!Array.isArray(value.decisions) || !value.decisions.every((item) => item && typeof item.choiceId === 'string' && typeof item.sceneId === 'string' && sceneIds.includes(item.sceneId) && typeof item.timestamp === 'string')) return null
  if (!Array.isArray(value.notes) || !value.notes.every((note) => note && typeof note.id === 'string' && typeof note.text === 'string' && typeof note.updatedAt === 'string')) return null
  if (typeof value.updatedAt !== 'string') return null
  return value as SaveGame
}

export function loadSave(caseId: string, sceneIds: string[], clueIds: string[]): { save: SaveGame | null; invalid: boolean } {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return { save: null, invalid: false }
    const save = validateSave(JSON.parse(raw) as unknown, caseId, sceneIds, clueIds)
    return { save, invalid: !save }
  } catch {
    return { save: null, invalid: true }
  }
}

export function writeSave(save: SaveGame): boolean {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(save))
    return true
  } catch {
    return false
  }
}

export function deleteSave(): boolean {
  try { localStorage.removeItem(SAVE_KEY); return true } catch { return false }
}

export const defaultPreferences: Preferences = { textScale: 'normal', ambience: false, effects: false, ambientVolume: 24, effectsVolume: 38, reducedMotion: false }

export function loadPreferences(): Preferences {
  try {
    const value = JSON.parse(localStorage.getItem(PREFERENCES_KEY) ?? 'null') as Partial<Preferences> | null
    return {
      textScale: value?.textScale === 'large' ? 'large' : 'normal',
      ambience: value?.ambience === true,
      effects: value?.effects === true,
      ambientVolume: typeof value?.ambientVolume === 'number' ? Math.max(0, Math.min(100, value.ambientVolume)) : defaultPreferences.ambientVolume,
      effectsVolume: typeof value?.effectsVolume === 'number' ? Math.max(0, Math.min(100, value.effectsVolume)) : defaultPreferences.effectsVolume,
      reducedMotion: value?.reducedMotion === true || window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    }
  } catch { return { ...defaultPreferences } }
}

export function writePreferences(preferences: Preferences): void {
  try { localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences)) } catch { /* Las preferencias son opcionales. */ }
}
