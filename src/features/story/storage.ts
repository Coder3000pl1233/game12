import type { StorySave } from './types'

const SAVE_PREFIX = 'la-silla-vacia.save.v1.'

export function writeStorySave(save: StorySave): boolean {
  try {
    localStorage.setItem(`${SAVE_PREFIX}${save.campaignId}`, JSON.stringify(save))
    return true
  } catch {
    return false
  }
}

export function readStorySave(campaignId: string): StorySave | null {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(`${SAVE_PREFIX}${campaignId}`) ?? 'null')
    if (!isStorySave(value) || value.campaignId !== campaignId) return null
    return value
  } catch {
    return null
  }
}

export function deleteStorySave(campaignId: string): void {
  try { localStorage.removeItem(`${SAVE_PREFIX}${campaignId}`) } catch { /* Guardado local opcional. */ }
}

function isStorySave(value: unknown): value is StorySave {
  if (!value || typeof value !== 'object') return false
  const save = value as Partial<StorySave>
  return save.schemaVersion === 1 && typeof save.campaignId === 'string' &&
    typeof save.currentSessionId === 'string' && typeof save.currentSceneId === 'string' &&
    ['session', 'between_sessions', 'ending'].includes(save.phase ?? '') &&
    !!save.stats && typeof save.stats === 'object' && Array.isArray(save.decisions) &&
    Array.isArray(save.discoveredClues) && Array.isArray(save.hypotheses) &&
    Array.isArray(save.notebookNotes) &&
    !!save.flags && typeof save.flags === 'object'
}
