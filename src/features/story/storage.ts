import type { StorySave } from './types'

const SAVE_PREFIX = 'la-silla-vacia.save.v2.'
const LEGACY_PREFIX = 'la-silla-vacia.save.v1.'

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
    const current: unknown = JSON.parse(localStorage.getItem(`${SAVE_PREFIX}${campaignId}`) ?? 'null')
    if (isStorySave(current) && current.campaignId === campaignId) return current
    const legacy: unknown = JSON.parse(localStorage.getItem(`${LEGACY_PREFIX}${campaignId}`) ?? 'null')
    if (!isLegacySave(legacy) || legacy.campaignId !== campaignId) return null
    const migrated = migrateLegacySave(legacy)
    writeStorySave(migrated)
    return migrated
  } catch {
    return null
  }
}

export function deleteStorySave(campaignId: string): void {
  try { localStorage.removeItem(`${SAVE_PREFIX}${campaignId}`); localStorage.removeItem(`${LEGACY_PREFIX}${campaignId}`) } catch { /* Guardado local opcional. */ }
}

function isStorySave(value: unknown): value is StorySave {
  if (!value || typeof value !== 'object') return false
  const save = value as Partial<StorySave>
  return save.schemaVersion === 2 && typeof save.campaignId === 'string' &&
    typeof save.currentSessionId === 'string' && typeof save.currentSceneId === 'string' &&
    ['session', 'between_sessions', 'ending'].includes(save.phase ?? '') &&
    !!save.stats && typeof save.stats === 'object' && Array.isArray(save.decisions) &&
    Array.isArray(save.discoveredClues) && Array.isArray(save.hypotheses) &&
    Array.isArray(save.notebookNotes) &&
    !!save.flags && typeof save.flags === 'object' && Array.isArray(save.playerStyleEvents) &&
    Array.isArray(save.promises) && Array.isArray(save.disclosures) && !!save.supportLinks && !!save.knowledgeByActor
}

type LegacySave = Omit<StorySave, 'schemaVersion' | 'playerStyleEvents' | 'promises' | 'disclosures' | 'supportLinks' | 'knowledgeByActor' | 'consumedConsequences' | 'dialogueCursor'> & { schemaVersion: 1 }

function isLegacySave(value: unknown): value is LegacySave {
  if (!value || typeof value !== 'object') return false
  const save = value as Partial<LegacySave>
  return save.schemaVersion === 1 && typeof save.campaignId === 'string' && !!save.stats && Array.isArray(save.decisions)
}

function migrateLegacySave(save: LegacySave): StorySave {
  const legacyStats = save.stats as Partial<StorySave['stats']>
  return {
    ...save,
    schemaVersion: 2,
    stats: { ...save.stats, anxiety: legacyStats.anxiety ?? 55, anger: legacyStats.anger ?? save.stats.hostility ?? 45, fear: legacyStats.fear ?? 50 },
    playerStyleEvents: [],
    promises: [],
    disclosures: [],
    supportLinks: {},
    knowledgeByActor: { julian: [], tomas: [] },
    consumedConsequences: [],
    dialogueCursor: 0,
  }
}
