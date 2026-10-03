import type {
  DeferredConsequence,
  RouteId,
  RoutePressure,
  StatBlock,
  StoryCampaign,
  StoryChoice,
  StoryCondition,
  StoryEffect,
  StorySave,
  StoryScene,
  StorySession,
  TopicDefinition,
} from './types'

export const INITIAL_STATS: StatBlock = {
  trust: 35,
  isolation: 35,
  hopelessness: 20,
  hostility: 20,
  perceived_support: 35,
  autonomy: 40,
  maternal_bond: 55,
  external_support: 20,
  investigation_bias: 20,
  guilt: 50,
  perceived_injustice: 45,
  school_return_pressure: 0,
}

const now = () => new Date().toISOString()

export function createInitialStorySave(campaign: StoryCampaign): StorySave {
  const session = campaign.sessions[campaign.startSessionId]
  if (!session) throw new Error(`No existe la sesión inicial "${campaign.startSessionId}".`)
  return {
    schemaVersion: 1,
    campaignId: campaign.id,
    phase: 'session',
    currentSessionId: session.id,
    currentSceneId: session.entrySceneId,
    stats: { ...campaign.initialStats },
    flags: {},
    exploredTopics: [],
    discoveredClues: [],
    contradictions: [],
    observations: [],
    people: [],
    notebookNotes: [],
    hypotheses: [],
    decisions: [],
    deferredConsequences: [],
    completedSessionIds: [],
    updatedAt: now(),
  }
}

export function getStoryScene(campaign: StoryCampaign, id: string): StoryScene {
  const scene = campaign.scenes[id]
  if (!scene) throw new Error(`No existe la escena "${id}".`)
  return scene
}

export function evaluateCondition(condition: StoryCondition, save: StorySave): boolean {
  switch (condition.type) {
    case 'statAtLeast': return save.stats[condition.stat] >= condition.value
    case 'statAtMost': return save.stats[condition.stat] <= condition.value
    case 'flagIs': return (save.flags[condition.flag] ?? false) === condition.value
    case 'clueKnown': return save.discoveredClues.some((entry) => entry.id === condition.clueId)
    case 'decisionMade': return save.decisions.some((decision) => decision.choiceId === condition.choiceId)
    case 'topicExplored': return save.exploredTopics.includes(condition.topicId)
    case 'hypothesisActive': return save.hypotheses.some((item) => item.hypothesisId === condition.hypothesisId && item.status === 'active')
    case 'routeIs': return (save.routePressure ?? calculateRoutePressure(save)).provisional === condition.route
    case 'redirectAvailable': return canRedirectToExit(save)
    case 'survivalNetworkAtLeast': return calculateSurvivalNetwork(save) >= condition.value
    case 'all': return condition.conditions.every((item) => evaluateCondition(item, save))
    case 'any': return condition.conditions.some((item) => evaluateCondition(item, save))
    case 'not': return !evaluateCondition(condition.condition, save)
  }
}

export function getAvailableTopics(campaign: StoryCampaign, scene: StoryScene, save: StorySave, session: StorySession): TopicDefinition[] {
  const slots = session.topicSlots ?? topicSlotsForTrust(save.stats.trust)
  const used = session.sceneIds.flatMap((sceneId) => campaign.scenes[sceneId]?.topics ?? [])
    .filter((topic) => topic.consumesTopicSlot !== false && save.exploredTopics.includes(topic.id)).length
  return (scene.topics ?? []).filter((topic) => {
    if (save.exploredTopics.includes(topic.id)) return false
    if (save.stats.trust < (topic.requiredTrust ?? 0)) return false
    if (!(topic.conditions ?? []).every((condition) => evaluateCondition(condition, save))) return false
    return topic.consumesTopicSlot === false || used < slots
  })
}

export function topicSlotsForTrust(trust: number): number {
  if (trust < 25) return 1
  if (trust < 50) return 2
  return 3
}

export function getAvailableStoryChoices(scene: StoryScene, save: StorySave): StoryChoice[] {
  return (scene.choices ?? []).filter((choice) => (choice.conditions ?? []).every((condition) => evaluateCondition(condition, save)))
}

function clamp(value: number, campaign: StoryCampaign): number {
  return Math.max(campaign.statLimits.min, Math.min(campaign.statLimits.max, value))
}

function addUnique<T extends { id: string }>(items: T[], entry: T): void {
  if (!items.some((item) => item.id === entry.id)) items.push(entry)
}

function applyEffects(campaign: StoryCampaign, save: StorySave, effects: StoryEffect[]): void {
  for (const effect of effects) {
    switch (effect.type) {
      case 'changeStat':
        save.stats[effect.stat] = clamp(save.stats[effect.stat] + effect.amount, campaign)
        break
      case 'setFlag': save.flags[effect.flag] = effect.value; break
      case 'addClue': addUnique(save.discoveredClues, effect.entry); break
      case 'addContradiction': addUnique(save.contradictions, effect.entry); break
      case 'addObservation': addUnique(save.observations, effect.entry); break
      case 'addPerson': addUnique(save.people, effect.entry); break
      case 'schedule': {
        const queued: DeferredConsequence = { id: effect.id, dueSession: effect.dueSession, effects: effect.effects }
        if (!save.deferredConsequences.some((item) => item.id === effect.id)) save.deferredConsequences.push(queued)
        break
      }
    }
  }
}

export function applyStoryChoice(campaign: StoryCampaign, scene: StoryScene, choice: StoryChoice, current: StorySave): StorySave {
  if (!getAvailableStoryChoices(scene, current).some((item) => item.id === choice.id)) {
    throw new Error(`La opción "${choice.id}" no está disponible.`)
  }
  if (!campaign.scenes[choice.nextSceneId]) throw new Error(`La escena siguiente "${choice.nextSceneId}" no existe.`)
  const next: StorySave = {
    ...current,
    stats: { ...current.stats },
    flags: { ...current.flags },
    exploredTopics: [...current.exploredTopics],
    discoveredClues: [...current.discoveredClues],
    contradictions: [...current.contradictions],
    observations: [...current.observations],
    people: [...current.people],
    notebookNotes: [...current.notebookNotes],
    hypotheses: [...current.hypotheses],
    decisions: [...current.decisions, { choiceId: choice.id, sceneId: scene.id, sessionId: scene.sessionId, at: now() }],
    deferredConsequences: [...current.deferredConsequences],
    completedSessionIds: [...current.completedSessionIds],
    currentSceneId: choice.nextSceneId,
    updatedAt: now(),
  }
  applyEffects(campaign, next, choice.effects ?? [])
  const nextScene = campaign.scenes[next.currentSceneId]
  if (nextScene) {
    next.currentSessionId = nextScene.sessionId
    next.phase = nextScene.kind === 'ending' ? 'ending' : nextScene.kind === 'interlude' ? 'between_sessions' : 'session'
    const previousSession = campaign.sessions[current.currentSessionId]
    const destinationSession = campaign.sessions[nextScene.sessionId]
    if (previousSession && destinationSession && destinationSession.number > previousSession.number) {
      if (!next.completedSessionIds.includes(previousSession.id)) next.completedSessionIds.push(previousSession.id)
      const pending = next.deferredConsequences
      next.deferredConsequences = []
      for (const consequence of pending) {
        if (consequence.dueSession <= destinationSession.number) applyEffects(campaign, next, consequence.effects)
        else next.deferredConsequences.push(consequence)
      }
    }
    if (destinationSession && destinationSession.number >= 16) next.routePressure = calculateRoutePressure(next)
    if (next.currentSceneId === 's18_route_resolver') {
      if (!next.completedSessionIds.includes('S17')) next.completedSessionIds.push('S17')
      next.currentSessionId = 'S18'
      next.currentSceneId = resolveActFourEnding(next)
      next.phase = 'ending'
    }
  }
  return next
}

export function exploreTopic(campaign: StoryCampaign, scene: StoryScene, save: StorySave, topic: TopicDefinition): StorySave {
  if (save.exploredTopics.includes(topic.id)) return save
  const session = campaign.sessions[save.currentSessionId]
  if (!session || !getAvailableTopics(campaign, scene, save, session).some((item) => item.id === topic.id)) {
    throw new Error(`El tema "${topic.id}" no está disponible en esta sesión.`)
  }
  const next: StorySave = {
    ...save,
    stats: { ...save.stats },
    flags: { ...save.flags },
    exploredTopics: [...save.exploredTopics, topic.id],
    discoveredClues: [...save.discoveredClues],
    contradictions: [...save.contradictions],
    observations: [...save.observations],
    people: [...save.people],
    deferredConsequences: [...save.deferredConsequences],
    currentSceneId: topic.sceneId,
    updatedAt: now(),
  }
  applyEffects(campaign, next, topic.effects ?? [])
  return next
}

export function completeStorySession(campaign: StoryCampaign, save: StorySave, nextSessionId?: string): StorySave {
  const completed = campaign.sessions[save.currentSessionId]
  if (!completed) throw new Error(`No existe la sesión actual "${save.currentSessionId}".`)
  const next: StorySave = { ...save, stats: { ...save.stats }, flags: { ...save.flags }, deferredConsequences: [], completedSessionIds: [...save.completedSessionIds], updatedAt: now() }
  if (!next.completedSessionIds.includes(completed.id)) next.completedSessionIds.push(completed.id)

  const sessionNumber = completed.number
  const pending = [...save.deferredConsequences]
  for (const consequence of pending) {
    if (consequence.dueSession <= sessionNumber + 1) {
      next.deferredConsequences = next.deferredConsequences.filter((item) => item.id !== consequence.id)
      applyEffects(campaign, next, consequence.effects)
    }
  }
  for (const consequence of pending) {
    if (consequence.dueSession > sessionNumber + 1 && !next.deferredConsequences.some((item) => item.id === consequence.id)) {
      next.deferredConsequences.push(consequence)
    }
  }

  if (nextSessionId) {
    const nextSession = campaign.sessions[nextSessionId]
    if (!nextSession) throw new Error(`No existe la sesión siguiente "${nextSessionId}".`)
    next.currentSessionId = nextSession.id
    next.currentSceneId = nextSession.entrySceneId
    next.phase = 'session'
  } else {
    next.phase = 'between_sessions'
  }
  if (completed.number >= 16) next.routePressure = calculateRoutePressure(next)
  return next
}

export function updateHypothesis(save: StorySave, hypothesisId: string): StorySave {
  if (save.phase !== 'between_sessions') return save
  const timestamp = now()
  const history = save.hypotheses.map((item) => item.status === 'active'
    ? { ...item, status: 'crossed_out' as const, crossedOutAt: timestamp }
    : item)
  const existing = history.find((item) => item.hypothesisId === hypothesisId)
  if (existing) existing.status = 'active'
  else history.push({ hypothesisId, status: 'active', selectedAt: timestamp })
  return { ...save, hypotheses: history, updatedAt: timestamp }
}

export function addNotebookNote(save: StorySave, note: string): StorySave {
  if (save.phase !== 'between_sessions') return save
  const cleaned = note.trim()
  if (!cleaned) return save
  return { ...save, notebookNotes: [...save.notebookNotes, cleaned], updatedAt: now() }
}

export function calculateRoutePressure(save: StorySave): RoutePressure {
  const s = save.stats
  const exit = 0.2 * s.trust + 0.2 * s.autonomy + 0.2 * s.perceived_support + 0.15 * s.maternal_bond + 0.15 * s.external_support + 0.1 * (100 - s.isolation)
  const suicidal_crisis = 0.25 * s.hopelessness + 0.2 * s.isolation + 0.15 * s.guilt + 0.15 * s.school_return_pressure + 0.15 * (100 - s.perceived_support) + 0.1 * (100 - s.maternal_bond)
  const school_violence = 0.25 * s.hostility + 0.2 * s.isolation + 0.15 * s.school_return_pressure + 0.15 * s.perceived_injustice + 0.15 * (100 - s.autonomy) + 0.1 * (100 - s.perceived_support)
  const scores: Record<RouteId, number> = { exit, suicidal_crisis, school_violence }
  const ranked = (Object.entries(scores) as Array<[RouteId, number]>).sort((a, b) => b[1] - a[1])
  const provisional = ranked[0][1] - ranked[1][1] < 8 ? undefined : ranked[0][0]
  return { ...scores, provisional }
}

export function canRedirectToExit(save: StorySave): boolean {
  const pressure = calculateRoutePressure(save)
  return save.stats.trust >= 50 && save.stats.perceived_support >= 48 && save.stats.autonomy >= 45 &&
    pressure.exit >= Math.max(pressure.suicidal_crisis, pressure.school_violence) - 12 &&
    save.flags.s17_no_school_is_inevitable === true && save.flags.s17_case_is_not_tomas_responsibility === true
}

export function calculateSurvivalNetwork(save: StorySave): number {
  const s = save.stats
  return 0.45 * s.maternal_bond + 0.2 * s.perceived_support + 0.15 * s.autonomy + 0.1 * s.external_support + 0.1 * s.trust
}

function resolveActFourEnding(save: StorySave): string {
  if (canRedirectToExit(save)) return 'ending_exit'
  const pressure = calculateRoutePressure(save)
  const dominant = (Object.entries(pressure).filter(([key]) => key !== 'provisional') as Array<[RouteId, number]>)
    .sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'exit'
  if (dominant === 'exit') return 'ending_exit'
  if (dominant === 'suicidal_crisis') return calculateSurvivalNetwork(save) >= 58 ? 'ending_suicide_survival' : 'ending_suicide_death'
  return 'ending_school_violence'
}

export function validateStoryCampaign(campaign: StoryCampaign): string[] {
  const errors: string[] = []
  if (!campaign.sessions[campaign.startSessionId]) errors.push(`La sesión inicial "${campaign.startSessionId}" no existe.`)
  for (const session of Object.values(campaign.sessions)) {
    if (!campaign.scenes[session.entrySceneId]) errors.push(`La entrada de ${session.id} apunta a una escena inexistente.`)
    for (const sceneId of session.sceneIds) if (!campaign.scenes[sceneId]) errors.push(`${session.id} referencia la escena inexistente "${sceneId}".`)
  }
  for (const scene of Object.values(campaign.scenes)) {
    if (!campaign.sessions[scene.sessionId]) errors.push(`${scene.id} referencia la sesión inexistente "${scene.sessionId}".`)
    for (const choice of scene.choices ?? []) if (!campaign.scenes[choice.nextSceneId]) errors.push(`${choice.id} apunta a la escena inexistente "${choice.nextSceneId}".`)
    for (const topic of scene.topics ?? []) if (!campaign.scenes[topic.sceneId]) errors.push(`${topic.id} apunta a la escena inexistente "${topic.sceneId}".`)
  }
  return errors
}
