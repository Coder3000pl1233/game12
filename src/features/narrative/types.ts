export type HiddenStat = 'trust' | 'anxiety' | 'hostility' | 'risk'
export type ClueSource = 'observation' | 'statement' | 'externalEvidence'
export type PortraitState = 'neutral' | 'uneasy' | 'defensive' | 'vulnerable'

export type Clue = {
  id: string
  title: string
  text: string
  sourceType: ClueSource
}

export type Condition =
  | { type: 'statAtLeast'; stat: HiddenStat; value: number }
  | { type: 'statAtMost'; stat: HiddenStat; value: number }
  | { type: 'hasClue'; clueId: string }
  | { type: 'hasDecision'; choiceId: string }
  | { type: 'flagIs'; flag: string; value: boolean }

export type Effect =
  | { type: 'changeStat'; stat: HiddenStat; amount: number }
  | { type: 'addClue'; clueId: string }
  | { type: 'setFlag'; flag: string; value: boolean }

export type Choice = {
  id: string
  text: string
  conditions?: Condition[]
  effects?: Effect[]
  nextSceneId: string
  recordInCaseFile?: boolean
}

export type Scene = {
  id: string
  kind: 'dialogue' | 'interlude' | 'decision'
  session?: number
  speaker?: string
  label?: string
  portraitState?: PortraitState
  text: string
  clueIds?: string[]
  choices?: Choice[]
  nextSceneId?: string
}

export type Ending = {
  id: string
  title: string
  text: string
  conditions?: Condition[]
  keyClueIds: string[]
}

export type CaseDefinition = {
  id: string
  title: string
  startSceneId: string
  initialStats: Record<HiddenStat, number>
  statLimits: { min: number; max: number }
  clues: Record<string, Clue>
  scenes: Record<string, Scene>
  endings: Ending[]
}

export type SaveGame = {
  schemaVersion: number
  caseId: string
  sceneId: string
  sessionNumber: number
  hidden: Record<HiddenStat, number>
  flags: Record<string, boolean>
  discoveredClues: string[]
  decisions: Array<{ choiceId: string; sceneId: string; timestamp: string }>
  notes: Array<{ id: string; text: string; updatedAt: string }>
  updatedAt: string
}

export type Preferences = {
  textScale: 'normal' | 'large'
  ambience: boolean
  effects: boolean
  ambientVolume: number
  effectsVolume: number
  reducedMotion: boolean
}
