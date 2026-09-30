import type { CaseDefinition, Choice, Condition, Ending, SaveGame, Scene } from './types'

export const ENDING_SCENE_ID = '$ending'

export function createInitialSave(game: CaseDefinition): SaveGame {
  const save: SaveGame = {
    schemaVersion: 1,
    caseId: game.id,
    sceneId: game.startSceneId,
    sessionNumber: 1,
    hidden: { ...game.initialStats },
    flags: {},
    discoveredClues: [],
    decisions: [],
    notes: [],
    updatedAt: new Date().toISOString(),
  }
  const start = game.scenes[game.startSceneId]
  if (start?.clueIds) save.discoveredClues.push(...start.clueIds)
  return save
}

export function getScene(game: CaseDefinition, sceneId: string): Scene {
  const scene = game.scenes[sceneId]
  if (!scene) throw new Error(`No existe la escena “${sceneId}”.`)
  return scene
}

function matches(save: SaveGame, condition: Condition): boolean {
  switch (condition.type) {
    case 'statAtLeast': return save.hidden[condition.stat] >= condition.value
    case 'statAtMost': return save.hidden[condition.stat] <= condition.value
    case 'hasClue': return save.discoveredClues.includes(condition.clueId)
    case 'hasDecision': return save.decisions.some((decision) => decision.choiceId === condition.choiceId)
    case 'flagIs': return (save.flags[condition.flag] ?? false) === condition.value
  }
}

export function getAvailableChoices(scene: Scene, save: SaveGame): Choice[] {
  const choices = scene.choices ?? []
  const available = choices.filter((choice) => (choice.conditions ?? []).every((condition) => matches(save, condition)))
  if (choices.length && !available.length) return [choices.find((choice) => !choice.conditions?.length) ?? choices[0]]
  return available
}

export function applyChoice(game: CaseDefinition, scene: Scene, choice: Choice, current: SaveGame): SaveGame {
  if (!getAvailableChoices(scene, current).some((available) => available.id === choice.id)) {
    throw new Error(`La opción “${choice.id}” no está disponible.`)
  }
  const save: SaveGame = {
    ...current,
    hidden: { ...current.hidden },
    flags: { ...current.flags },
    discoveredClues: [...current.discoveredClues],
    decisions: [...current.decisions, { choiceId: choice.id, sceneId: scene.id, timestamp: new Date().toISOString() }],
    notes: [...current.notes],
    sceneId: choice.nextSceneId,
    updatedAt: new Date().toISOString(),
  }
  for (const effect of choice.effects ?? []) {
    if (effect.type === 'changeStat') {
      save.hidden[effect.stat] = Math.max(game.statLimits.min, Math.min(game.statLimits.max, save.hidden[effect.stat] + effect.amount))
    } else if (effect.type === 'addClue' && !save.discoveredClues.includes(effect.clueId)) {
      save.discoveredClues.push(effect.clueId)
    } else if (effect.type === 'setFlag') {
      save.flags[effect.flag] = effect.value
    }
  }
  const nextScene = game.scenes[save.sceneId]
  if (nextScene?.clueIds) {
    for (const clueId of nextScene.clueIds) if (!save.discoveredClues.includes(clueId)) save.discoveredClues.push(clueId)
  }
  save.sessionNumber = nextScene?.session ?? save.sessionNumber
  return save
}

export function resolveEnding(game: CaseDefinition, save: SaveGame): Ending {
  const ending = game.endings.find((candidate) => (candidate.conditions ?? []).every((condition) => matches(save, condition)))
  if (!ending) throw new Error('El caso no tiene un desenlace de respaldo válido.')
  return ending
}

export function validateCase(game: CaseDefinition): string[] {
  const errors: string[] = []
  const choiceIds = new Set<string>()
  const clueIds = new Set(Object.keys(game.clues))
  if (!game.scenes[game.startSceneId]) errors.push(`No existe la escena inicial “${game.startSceneId}”.`)
  for (const [key, clue] of Object.entries(game.clues)) if (key !== clue.id) errors.push(`La clave de pista “${key}” no coincide con su ID “${clue.id}”.`)
  for (const [key, scene] of Object.entries(game.scenes)) {
    if (key !== scene.id) errors.push(`La clave de escena “${key}” no coincide con su ID “${scene.id}”.`)
    const destinations = [...(scene.choices ?? []).map((choice) => choice.nextSceneId), ...(scene.nextSceneId ? [scene.nextSceneId] : [])]
    if (!destinations.length) errors.push(`La escena “${scene.id}” no tiene salida.`)
    for (const destination of destinations) {
      if (destination !== ENDING_SCENE_ID && !game.scenes[destination]) errors.push(`La escena “${scene.id}” apunta a “${destination}”, que no existe.`)
    }
    for (const clueId of scene.clueIds ?? []) if (!game.clues[clueId]) errors.push(`La escena “${scene.id}” refiere la pista “${clueId}”, que no existe.`)
    for (const choice of scene.choices ?? []) {
      if (choiceIds.has(choice.id)) errors.push(`El ID de opción “${choice.id}” está repetido.`)
      choiceIds.add(choice.id)
      for (const effect of choice.effects ?? []) if (effect.type === 'addClue' && !game.clues[effect.clueId]) errors.push(`La opción “${choice.id}” otorga la pista “${effect.clueId}”, que no existe.`)
      for (const condition of choice.conditions ?? []) {
        if (condition.type === 'hasClue' && !clueIds.has(condition.clueId)) errors.push(`La opción “${choice.id}” requiere la pista “${condition.clueId}”, que no existe.`)
      }
    }
  }
  for (const scene of Object.values(game.scenes)) {
    for (const choice of scene.choices ?? []) {
      for (const condition of choice.conditions ?? []) {
        if (condition.type === 'hasDecision' && !choiceIds.has(condition.choiceId)) errors.push(`La opción “${choice.id}” requiere la opción “${condition.choiceId}”, que no existe.`)
      }
    }
  }
  if (!game.endings.length || !game.endings.some((ending) => !ending.conditions?.length)) errors.push('Debe existir un desenlace de respaldo sin condiciones.')
  for (const ending of game.endings) {
    for (const clueId of ending.keyClueIds) if (!game.clues[clueId]) errors.push(`El final “${ending.id}” refiere la pista “${clueId}”, que no existe.`)
    for (const condition of ending.conditions ?? []) {
      if (condition.type === 'hasClue' && !clueIds.has(condition.clueId)) errors.push(`El final “${ending.id}” requiere la pista “${condition.clueId}”, que no existe.`)
      if (condition.type === 'hasDecision' && !choiceIds.has(condition.choiceId)) errors.push(`El final “${ending.id}” requiere la opción “${condition.choiceId}”, que no existe.`)
    }
  }
  return errors
}
