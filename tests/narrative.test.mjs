import test from 'node:test'
import assert from 'node:assert/strict'
import { laSillaVaciaCampaign as campaign } from '../src/content/campaigns/la-silla-vacia.ts'
import { applyStoryChoice, calculateSurvivalNetwork, canRedirectToExit, createInitialStorySave, getStoryScene, validateStoryCampaign } from '../src/features/story/engine.ts'

test('la campaña completa tiene 18 sesiones narrativas y referencias válidas', () => {
  assert.deepEqual(validateStoryCampaign(campaign), [])
  assert.equal(Object.values(campaign.sessions).filter((session) => session.number > 0).length, 18)
  assert.equal(campaign.sessions.S18.entrySceneId, 's18_route_resolver')
})

test('cada sesión y cada ramal narrativo está conectado desde el prólogo', () => {
  const reachable = new Set()
  const queue = [campaign.sessions[campaign.startSessionId].entrySceneId]
  while (queue.length) {
    const sceneId = queue.shift()
    if (reachable.has(sceneId)) continue
    reachable.add(sceneId)
    const scene = campaign.scenes[sceneId]
    for (const choice of scene.choices ?? []) queue.push(choice.nextSceneId)
    for (const topic of scene.topics ?? []) queue.push(topic.sceneId)
    if (scene.kind === 'interlude' && !(scene.choices ?? []).length) {
      const current = campaign.sessions[scene.sessionId]
      const following = Object.values(campaign.sessions).find((session) => session.number === current.number + 1)
      if (following) queue.push(following.entrySceneId)
    }
    if (sceneId === 's18_route_resolver') queue.push('ending_exit', 'ending_suicide_survival', 'ending_suicide_death', 'ending_school_violence')
  }
  assert.deepEqual(Object.keys(campaign.scenes).filter((id) => !reachable.has(id)), [])
})

test('la prueba de confidencialidad se revela recién en S08', () => {
  const earlyScenes = Object.values(campaign.scenes).filter((scene) => campaign.sessions[scene.sessionId].number < 8)
  assert.equal(earlyScenes.some((scene) => scene.lines.some((line) => /la pelea era falsa|la primera pelea era falsa/i.test(line.text))), false)
  assert.ok(campaign.scenes.s08_open.lines.some((line) => /la vez de la pelea no había pasado/i.test(line.text)))
})

test('la identidad de Nico no se confirma antes de S12', () => {
  const earlyScenes = Object.values(campaign.scenes).filter((scene) => campaign.sessions[scene.sessionId].number < 12)
  assert.equal(earlyScenes.some((scene) => scene.lines.some((line) => /Nico (?:mandó|envió) los mensajes|autor de mensajes y filtraciones/i.test(line.text))), false)
  assert.ok(campaign.scenes.s12_confession.lines.some((line) => /mandó los mensajes y filtró/i.test(line.text)))
})

function resolveFromS17(stats, flags = {}) {
  const save = createInitialStorySave(campaign)
  save.currentSessionId = 'S17'
  save.currentSceneId = 'between_s17'
  save.phase = 'between_sessions'
  save.stats = { ...save.stats, ...stats }
  save.flags = { ...save.flags, ...flags }
  const interlude = getStoryScene(campaign, 'between_s17')
  const nextChoice = interlude.choices[0]
  return applyStoryChoice(campaign, interlude, nextChoice, save)
}

test('las cuatro rutas y la subruta de supervivencia dependen del estado acumulado', () => {
  const exit = resolveFromS17({ trust: 80, autonomy: 85, perceived_support: 85, maternal_bond: 90, external_support: 85, isolation: 10 })
  assert.equal(exit.currentSceneId, 'ending_exit')

  const survivalStats = { trust: 30, autonomy: 50, perceived_support: 70, maternal_bond: 90, external_support: 10, isolation: 85, hopelessness: 90, guilt: 75, school_return_pressure: 100, hostility: 30, perceived_injustice: 50 }
  const survived = resolveFromS17(survivalStats)
  assert.equal(survived.currentSceneId, 'ending_suicide_survival')
  assert.ok(calculateSurvivalNetwork(survived) >= 58)

  const death = resolveFromS17({ trust: 15, autonomy: 15, perceived_support: 10, maternal_bond: 15, external_support: 5, isolation: 95, hopelessness: 100, guilt: 95, school_return_pressure: 100, hostility: 25, perceived_injustice: 50 })
  assert.equal(death.currentSceneId, 'ending_suicide_death')
  assert.ok(calculateSurvivalNetwork(death) < 58)

  const violence = resolveFromS17({ trust: 10, autonomy: 10, perceived_support: 10, maternal_bond: 40, external_support: 5, isolation: 95, hopelessness: 20, guilt: 35, school_return_pressure: 100, hostility: 100, perceived_injustice: 95 })
  assert.equal(violence.currentSceneId, 'ending_school_violence')
})

test('la redirección exige estado suficiente y explorar ambas alternativas en S17', () => {
  const save = createInitialStorySave(campaign)
  save.stats = { ...save.stats, trust: 65, autonomy: 65, perceived_support: 70 }
  save.flags.s17_no_school_is_inevitable = true
  save.flags.s17_case_is_not_tomas_responsibility = true
  assert.equal(canRedirectToExit(save), true)
  save.flags.s17_case_is_not_tomas_responsibility = false
  assert.equal(canRedirectToExit(save), false)
})

test('todos los desenlaces cierran la investigación sin detalles operativos', () => {
  for (const id of ['ending_exit', 'ending_suicide_survival', 'ending_suicide_death', 'ending_school_violence']) {
    const text = campaign.scenes[id].lines.map((line) => line.text).join(' ')
    assert.match(text, /investigación externa confirma/i)
    assert.match(text, /Camila declara mediante terceros/i)
  }
  const violence = campaign.scenes.ending_school_violence.lines.map((line) => line.text).join(' ')
  assert.doesNotMatch(violence, /tomó un arma|disparó|preparó el ataque/i)
  const suicideDeath = campaign.scenes.ending_suicide_death.lines.map((line) => line.text).join(' ')
  assert.match(suicideDeath, /no muestra el acto ni un método/i)
})
