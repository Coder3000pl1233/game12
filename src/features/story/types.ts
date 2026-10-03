/** Dominio de La Silla Vacía. El contenido narrativo vive fuera de la UI. */
export const STAT_KEYS = [
  'trust',
  'isolation',
  'hopelessness',
  'hostility',
  'perceived_support',
  'autonomy',
  'maternal_bond',
  'external_support',
  'investigation_bias',
  'guilt',
  'perceived_injustice',
  'school_return_pressure',
] as const

export type StatKey = (typeof STAT_KEYS)[number]
export type HiddenStatKey = Exclude<StatKey, 'trust'>
export type StatBlock = Record<StatKey, number>
export type RouteId = 'exit' | 'suicidal_crisis' | 'school_violence'

export type StoryCondition =
  | { type: 'statAtLeast'; stat: StatKey; value: number }
  | { type: 'statAtMost'; stat: StatKey; value: number }
  | { type: 'flagIs'; flag: string; value: boolean }
  | { type: 'clueKnown'; clueId: string }
  | { type: 'decisionMade'; choiceId: string }
  | { type: 'topicExplored'; topicId: string }
  | { type: 'hypothesisActive'; hypothesisId: string }
  | { type: 'routeIs'; route: RouteId }
  | { type: 'redirectAvailable' }
  | { type: 'survivalNetworkAtLeast'; value: number }
  | { type: 'all'; conditions: StoryCondition[] }
  | { type: 'any'; conditions: StoryCondition[] }
  | { type: 'not'; condition: StoryCondition }

export type StoryEffect =
  | { type: 'changeStat'; stat: StatKey; amount: number }
  | { type: 'setFlag'; flag: string; value: boolean }
  | { type: 'addClue'; entry: NotebookEntry }
  | { type: 'addContradiction'; entry: NotebookEntry }
  | { type: 'addObservation'; entry: NotebookEntry }
  | { type: 'addPerson'; entry: NotebookEntry }
  | { type: 'schedule'; id: string; dueSession: number; effects: StoryEffect[] }

export type NotebookEntry = {
  id: string
  title: string
  text: string
  category?: string
  sessionId?: string
  confirmed?: boolean
}

export type TopicDefinition = {
  id: string
  label: string
  kind?: 'topic' | 'document'
  requiredTrust?: number
  consumesTopicSlot?: boolean
  sceneId: string
  conditions?: StoryCondition[]
  effects?: StoryEffect[]
}

export type StoryChoice = {
  id: string
  text: string
  conditions?: StoryCondition[]
  effects?: StoryEffect[]
  nextSceneId: string
  importantDecision?: boolean
}

export type StoryLine = {
  speaker?: string
  text: string
  tone?: 'dialogue' | 'thought' | 'document' | 'message'
  conditions?: StoryCondition[]
}

export type StoryScene = {
  id: string
  sessionId: string
  kind: 'dialogue' | 'interlude' | 'decision' | 'ending'
  label?: string
  portraitState?: 'neutral' | 'uneasy' | 'defensive' | 'vulnerable'
  lines: StoryLine[]
  choices?: StoryChoice[]
  topics?: TopicDefinition[]
  conditions?: StoryCondition[]
  endSession?: boolean
}

export type StorySession = {
  id: string
  number: number
  act: number
  title: string
  entrySceneId: string
  sceneIds: string[]
  topicSlots?: number
}

export type HypothesisDefinition = {
  id: string
  text: string
  biasTags: string[]
}

export type StoryCampaign = {
  id: string
  title: string
  startSessionId: string
  statLimits: { min: number; max: number }
  initialStats: StatBlock
  sessions: Record<string, StorySession>
  scenes: Record<string, StoryScene>
  hypotheses: Record<string, HypothesisDefinition>
}

export type HypothesisRecord = {
  hypothesisId: string
  status: 'active' | 'crossed_out'
  selectedAt: string
  crossedOutAt?: string
}

export type DeferredConsequence = {
  id: string
  dueSession: number
  effects: StoryEffect[]
}

export type RoutePressure = {
  exit: number
  suicidal_crisis: number
  school_violence: number
  provisional?: RouteId
}

export type StorySave = {
  schemaVersion: 1
  campaignId: string
  phase: 'session' | 'between_sessions' | 'ending'
  currentSessionId: string
  currentSceneId: string
  stats: StatBlock
  flags: Record<string, boolean>
  exploredTopics: string[]
  discoveredClues: NotebookEntry[]
  contradictions: NotebookEntry[]
  observations: NotebookEntry[]
  people: NotebookEntry[]
  notebookNotes: string[]
  hypotheses: HypothesisRecord[]
  decisions: Array<{ choiceId: string; sceneId: string; sessionId: string; at: string }>
  deferredConsequences: DeferredConsequence[]
  completedSessionIds: string[]
  routePressure?: RoutePressure
  updatedAt: string
}
