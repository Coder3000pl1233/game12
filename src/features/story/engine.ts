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
  HypothesisDefinition,
  TopicDefinition,
} from './types'

export const INITIAL_STATS: StatBlock = {
  trust: 35,
  anxiety: 55,
  anger: 45,
  fear: 50,
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
    schemaVersion: 2,
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
    playerStyleEvents: [],
    promises: [],
    disclosures: [],
    supportLinks: {},
    knowledgeByActor: { julian: [], tomas: [] },
    consumedConsequences: [],
    dialogueCursor: 0,
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

export function getAvailableHypotheses(campaign: StoryCampaign, save: StorySave): HypothesisDefinition[] {
  const sessionNumber = campaign.sessions[save.currentSessionId]?.number ?? 0
  return Object.values(campaign.hypotheses).filter((item) => sessionNumber >= (item.availableFromSession ?? 0) && sessionNumber <= (item.availableUntilSession ?? Number.POSITIVE_INFINITY))
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
      case 'addKnowledge': {
        const known = save.knowledgeByActor[effect.actor] ?? []
        if (!known.includes(effect.factId)) save.knowledgeByActor[effect.actor] = [...known, effect.factId]
        break
      }
      case 'schedule': {
        const queued: DeferredConsequence = { id: effect.id, dueSession: effect.dueSession, effects: effect.effects }
        if (!save.deferredConsequences.some((item) => item.id === effect.id)) save.deferredConsequences.push(queued)
        break
      }
    }
  }
}

function inferIntention(choice: StoryChoice): NonNullable<StoryChoice['intention']> | undefined {
  if (choice.intention) return choice.intention
  const text = choice.text.toLowerCase()
  if (/guardar silencio|no responder|esperar en silencio/.test(text)) return 'silence'
  if (/disculp|reconocer el daño|admitir el error/.test(text)) return 'apologize'
  if (/justificar|explicar por qué/.test(text)) return 'justify'
  if (/límite|no puedo prometer|acordar qué|explicar.*confidencial/.test(text)) return 'limit'
  if (/validar|acompañar|dar espacio|escuchar|reconocer/.test(text)) return 'validate'
  if (/confrontar|contradic|no coincide|insistir|exigir/.test(text)) return 'confront'
  if (/preguntar|entender|explorar|qué pasó|qué necesita/.test(text)) return 'question'
  if (/cambiar de tema|dejar.*tema|evitar/.test(text)) return 'avoid'
  if (choice.importantDecision) return 'deepen'
  return undefined
}

function applyChoiceMeaning(campaign: StoryCampaign, save: StorySave, choice: StoryChoice, sessionId: string): void {
  const intention = inferIntention(choice)
  if (!intention) return
  const vectors: Record<NonNullable<StoryChoice['intention']>, Partial<Record<'anxiety' | 'anger' | 'fear' | 'trust', number>>> = {
    question: { anxiety: 1, fear: 1, trust: 1 },
    deepen: { anxiety: 2, fear: 1 },
    confront: { anxiety: 4, anger: 4, fear: 3, trust: -3 },
    validate: { anxiety: -2, fear: -2, trust: 3 },
    redirect: { anxiety: 1, trust: -1 },
    limit: { anxiety: 1, anger: 1, fear: -2, trust: 1 },
    apologize: { anxiety: -2, anger: -3, fear: -2, trust: 4 },
    justify: { anger: 2, trust: -2 },
    silence: save.stats.trust >= 55 ? { anxiety: -2, fear: -1, trust: 2 } : { anxiety: 3, anger: 1, fear: 2, trust: -2 },
    avoid: { anxiety: -1, anger: 1, trust: -1 },
  }
  for (const [stat, amount] of Object.entries(vectors[intention])) {
    save.stats[stat as 'anxiety' | 'anger' | 'fear' | 'trust'] = clamp(save.stats[stat as 'anxiety' | 'anger' | 'fear' | 'trust'] + (amount ?? 0), campaign)
  }
  save.playerStyleEvents.push({ choiceId: choice.id, sessionId, intention, at: now() })

  const sets = (flag: string) => { save.flags[flag] = true }
  if (/supervision/.test(choice.id)) { sets('supervision_used'); save.supportLinks.marina = 'active' }
  if (/take_control|act_without|report_now|insist_return/.test(choice.id)) sets('autonomy_overridden')
  if (/focus_evidence|collect_evidence|demand_material|report_now/.test(choice.id)) sets('investigation_over_person')
  if (/hold_line|respect_boundary|ask_wishes|transparent_support|talk_support/.test(choice.id)) sets('autonomy_respected')
  if (/promise/.test(choice.id)) save.promises.push({ id: choice.id, madeAtSession: sessionId, status: 'pending', scope: choice.text })
  if (choice.id === 's14_report_now') save.disclosures.push({ id: choice.id, sessionId, recipient: 'institución', scope: 'complete', discussedWithTomas: false })
}

export function applyStoryChoice(campaign: StoryCampaign, scene: StoryScene, choice: StoryChoice, current: StorySave): StorySave {
  if (!getAvailableStoryChoices(scene, current).some((item) => item.id === choice.id)) {
    throw new Error(`La opción "${choice.id}" no está disponible.`)
  }
  if (!campaign.scenes[choice.nextSceneId]) throw new Error(`La escena siguiente "${choice.nextSceneId}" no existe.`)
  const currentSession = campaign.sessions[current.currentSessionId]
  const destinationSession = campaign.sessions[campaign.scenes[choice.nextSceneId].sessionId]
  if (current.phase === 'between_sessions' && currentSession?.number > 0 && destinationSession?.number > currentSession.number && !current.flags[`hypothesis_selected:${currentSession.id}`]) {
    throw new Error('Tenés que elegir una hipótesis en el cuaderno antes de continuar.')
  }
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
    playerStyleEvents: [...current.playerStyleEvents],
    promises: [...current.promises],
    disclosures: [...current.disclosures],
    supportLinks: { ...current.supportLinks },
    knowledgeByActor: Object.fromEntries(Object.entries(current.knowledgeByActor).map(([actor, facts]) => [actor, [...facts]])),
    consumedConsequences: [...current.consumedConsequences],
    dialogueCursor: 0,
    currentSceneId: choice.nextSceneId,
    updatedAt: now(),
  }
  applyEffects(campaign, next, choice.effects ?? [])
  applyChoiceMeaning(campaign, next, choice, scene.sessionId)
  const nextScene = campaign.scenes[next.currentSceneId]
  if (nextScene) {
    next.currentSessionId = nextScene.sessionId
    next.phase = nextScene.kind === 'ending' ? 'ending' : nextScene.kind === 'interlude' ? 'between_sessions' : 'session'
    if (nextScene.kind === 'ending') next.outcomeLocked = outcomeForScene(nextScene.id)
    const previousSession = campaign.sessions[current.currentSessionId]
    const destinationSession = campaign.sessions[nextScene.sessionId]
    if (previousSession && destinationSession && destinationSession.number > previousSession.number) {
      if (!next.completedSessionIds.includes(previousSession.id)) next.completedSessionIds.push(previousSession.id)
      const pending = next.deferredConsequences
      next.deferredConsequences = []
      for (const consequence of pending) {
        if (consequence.dueSession <= destinationSession.number) {
          applyEffects(campaign, next, consequence.effects)
          if (!next.consumedConsequences.includes(consequence.id)) next.consumedConsequences.push(consequence.id)
        }
        else next.deferredConsequences.push(consequence)
      }
    }
    if (destinationSession && destinationSession.number >= 16) next.routePressure = calculateRoutePressure(next)
    if (next.currentSceneId === 's18_route_resolver') {
      if (!next.completedSessionIds.includes('S17')) next.completedSessionIds.push('S17')
      next.currentSessionId = 'S18'
      next.currentSceneId = resolveActFourEnding(next)
      next.outcomeLocked = routeForEntryScene(next.currentSceneId)
      next.phase = 'session'
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
    knowledgeByActor: Object.fromEntries(Object.entries(save.knowledgeByActor).map(([actor, facts]) => [actor, [...facts]])),
    currentSceneId: topic.sceneId,
    updatedAt: now(),
  }
  applyEffects(campaign, next, topic.effects ?? [])
  return next
}

export function completeStorySession(campaign: StoryCampaign, save: StorySave, nextSessionId?: string): StorySave {
  const completed = campaign.sessions[save.currentSessionId]
  if (!completed) throw new Error(`No existe la sesión actual "${save.currentSessionId}".`)
  if (completed.number > 0 && save.phase === 'between_sessions' && !save.flags[`hypothesis_selected:${completed.id}`]) {
    throw new Error('Tenés que elegir una hipótesis en el cuaderno antes de continuar.')
  }
  const next: StorySave = { ...save, stats: { ...save.stats }, flags: { ...save.flags }, deferredConsequences: [], completedSessionIds: [...save.completedSessionIds], knowledgeByActor: Object.fromEntries(Object.entries(save.knowledgeByActor).map(([actor, facts]) => [actor, [...facts]])), consumedConsequences: [...save.consumedConsequences], updatedAt: now() }
  if (!next.completedSessionIds.includes(completed.id)) next.completedSessionIds.push(completed.id)

  const sessionNumber = completed.number
  const pending = [...save.deferredConsequences]
  for (const consequence of pending) {
    if (consequence.dueSession <= sessionNumber + 1) {
      next.deferredConsequences = next.deferredConsequences.filter((item) => item.id !== consequence.id)
      applyEffects(campaign, next, consequence.effects)
      if (!next.consumedConsequences.includes(consequence.id)) next.consumedConsequences.push(consequence.id)
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
    if (next.currentSceneId === 's18_route_resolver') {
      next.currentSceneId = resolveActFourEnding(next)
      next.outcomeLocked = routeForEntryScene(next.currentSceneId)
      next.phase = 'session'
    }
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
  history.push({ hypothesisId, status: 'active', selectedAt: timestamp })
  return { ...save, flags: { ...save.flags, [`hypothesis_selected:${save.currentSessionId}`]: true }, hypotheses: history, updatedAt: timestamp }
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
  const suicidal_crisis = 0.18 * s.hopelessness + 0.15 * s.isolation + 0.12 * s.guilt + 0.12 * s.school_return_pressure + 0.12 * (100 - s.perceived_support) + 0.11 * s.fear + 0.1 * s.anxiety + 0.1 * (100 - s.maternal_bond)
  const school_violence = 0.18 * s.anger + 0.14 * s.isolation + 0.14 * s.school_return_pressure + 0.12 * s.perceived_injustice + 0.14 * (100 - s.autonomy) + 0.1 * (100 - s.perceived_support) + 0.08 * (100 - s.fear)
  const exposureEvents = save.decisions.filter(({ choiceId }) => /message|usb|focus_evidence|collect_evidence|report_now|public/.test(choiceId)).length
  const controlEvents = save.decisions.filter(({ choiceId }) => /take_control|act_without|report_now|insist_return|take_case|demand_material/.test(choiceId)).length
  const exposure = 0.2 * s.investigation_bias + 0.18 * s.fear + 0.16 * s.anxiety + 0.16 * (100 - s.autonomy) + Math.min(30, exposureEvents * 5)
  const administered = 0.18 * (100 - s.autonomy) + 0.14 * s.anxiety + 0.12 * s.fear + 0.13 * s.external_support + 0.13 * s.trust + Math.min(30, controlEvents * 6)
  const scores: Record<RouteId, number> = { exit, suicidal_crisis, school_violence, exposure, administered }
  const eligible: Array<[RouteId, number]> = [
    ['exit', exit],
    ...(save.stats.hopelessness >= 58 && save.stats.isolation >= 55 ? [['suicidal_crisis', suicidal_crisis] as [RouteId, number]] : []),
    ...(save.stats.anger >= 60 && save.stats.school_return_pressure >= 55 && controlEvents >= 2 ? [['school_violence', school_violence] as [RouteId, number]] : []),
    ...(exposureEvents >= 4 && save.stats.investigation_bias >= 48 ? [['exposure', exposure] as [RouteId, number]] : []),
    ...(controlEvents >= 3 && save.stats.external_support >= 35 && save.stats.autonomy <= 42 ? [['administered', administered] as [RouteId, number]] : []),
  ]
  const ranked = eligible.sort((a, b) => b[1] - a[1])
  const provisional = ranked[0] && (!ranked[1] || ranked[0][1] - ranked[1][1] >= 5) ? ranked[0][0] : ranked[0]?.[0]
  return { ...scores, provisional }
}

export function canRedirectToExit(save: StorySave): boolean {
  const pressure = calculateRoutePressure(save)
  return save.stats.trust >= 50 && save.stats.perceived_support >= 48 && save.stats.autonomy >= 45 &&
    pressure.exit >= Math.max(pressure.suicidal_crisis, pressure.school_violence, pressure.exposure, pressure.administered) - 12 &&
    save.flags.s17_no_school_is_inevitable === true && save.flags.s17_case_is_not_tomas_responsibility === true
}

export function calculateSurvivalNetwork(save: StorySave): number {
  const s = save.stats
  return 0.45 * s.maternal_bond + 0.2 * s.perceived_support + 0.15 * s.autonomy + 0.1 * s.external_support + 0.1 * s.trust
}

export function resolveActFourEnding(save: StorySave): string {
  if (canRedirectToExit(save)) return 's18_exit_entry'
  const pressure = calculateRoutePressure(save)
  const dominant = pressure.provisional ?? 'exit'
  if (dominant === 'exit') return 's18_exit_entry'
  if (dominant === 'suicidal_crisis') return 's18_crisis_entry'
  if (dominant === 'school_violence') return 's18_violence_entry'
  if (dominant === 'exposure') return 's18_exposure_entry'
  return 's18_administered_entry'
}

function routeForEntryScene(sceneId: string): RouteId {
  if (sceneId.includes('crisis')) return 'suicidal_crisis'
  if (sceneId.includes('violence')) return 'school_violence'
  if (sceneId.includes('exposure')) return 'exposure'
  if (sceneId.includes('administered')) return 'administered'
  return 'exit'
}

function outcomeForScene(sceneId: string): StorySave['outcomeLocked'] {
  if (sceneId === 'ending_suicide_survival') return 'suicide_survival'
  if (sceneId === 'ending_suicide_death') return 'suicide_death'
  return routeForEntryScene(sceneId)
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
