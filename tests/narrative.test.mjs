import test from 'node:test'
import assert from 'node:assert/strict'
import { laSillaVaciaCampaign as campaign } from '../src/content/campaigns/la-silla-vacia.ts'
import { applyStoryChoice, calculateSurvivalNetwork, canRedirectToExit, completeStorySession, createInitialStorySave, evaluateCondition, getAvailableStoryChoices, getStoryScene, updateHypothesis, validateStoryCampaign } from '../src/features/story/engine.ts'

test('cada cierre de sesión exige elegir una hipótesis y deja las notas opcionales', () => {
  const save = createInitialStorySave(campaign)
  save.currentSessionId = 'S01'
  save.currentSceneId = 'between_s01'
  save.phase = 'between_sessions'

  assert.throws(() => completeStorySession(campaign, save, 'S02'), /elegir una hipótesis/i)
  const reviewed = updateHypothesis(save, 'testing_control')
  const next = completeStorySession(campaign, reviewed, 'S02')

  assert.equal(reviewed.flags['hypothesis_selected:S01'], true)
  assert.deepEqual(reviewed.notebookNotes, [])
  assert.equal(next.currentSessionId, 'S02')
})

test('cerrar S1 desde cualquiera de sus aperturas avanza a S2 sin reiniciar', () => {
  for (const openingChoiceId of ['s01_open_pace', 's01_open_change', 's01_open_framework']) {
    let save = createInitialStorySave(campaign)
    save.currentSessionId = 'S01'
    save.currentSceneId = 's01_open'

    const take = (choiceId) => {
      const scene = getStoryScene(campaign, save.currentSceneId)
      const choice = scene.choices.find((item) => item.id === choiceId)
      assert.ok(choice, `${choiceId} debe estar disponible en ${scene.id}`)
      save = applyStoryChoice(campaign, scene, choice, save)
    }

    take(openingChoiceId)
    take(getStoryScene(campaign, save.currentSceneId).choices[0].id)
    assert.equal(save.currentSceneId, 's01_contradiction')
    take('s01_contradiction_question')
    take('s01_close_explain')
    assert.equal(save.currentSceneId, 'between_s01')
    assert.equal(save.phase, 'between_sessions')

    save = updateHypothesis(save, 'testing_control')
    take('s01_supervision')
    assert.equal(save.currentSessionId, 'S02')
    assert.equal(save.currentSceneId, 's02_open')
    assert.equal(save.phase, 'session')
    assert.ok(save.completedSessionIds.includes('S01'))
  }
})

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
    if (sceneId === 's18_route_resolver') queue.push('s18_exit_entry', 's18_crisis_entry', 's18_violence_entry', 's18_exposure_entry', 's18_administered_entry')
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
  assert.ok(campaign.scenes.s12_open.lines.some((line) => /mandó los mensajes y filtró/i.test(line.text)))
})

test('S12 separa lo que sabe Tomás de lo que sabe Julián', () => {
  const save = createInitialStorySave(campaign)
  save.currentSessionId = 'S12'
  save.currentSceneId = 's12_open'
  const scene = getStoryScene(campaign, 's12_open')
  const after = applyStoryChoice(campaign, scene, scene.choices[0], save)
  assert.ok(after.knowledgeByActor.tomas.includes('nico_is_anonymous_author'))
  assert.equal(after.knowledgeByActor.julian.includes('nico_is_anonymous_author'), false)
})

test('S2 siempre comunica la pelea y S10 siempre abre la USB', () => {
  for (const option of campaign.scenes.s02_limits.choices) {
    const effects = JSON.stringify(option.effects)
    assert.match(effects, /s02_fight_disclosed/)
    assert.match(effects, /s02_parents_know_about_fight/)
  }
  for (const option of campaign.scenes.s10_open.choices) {
    assert.match(JSON.stringify(option.effects), /usb_opened/)
    const reply = campaign.scenes[option.nextSceneId]
    assert.ok(reply.choices.every((choice) => choice.nextSceneId === 's10_file_hub'))
  }
})

test('las sesiones rediseñadas producen réplica y segunda decisión contextual', () => {
  for (const sceneId of ['s02_open', 's04_open', 's05_open', 's06_open', 's09_open', 's11_open', 's12_open', 's13_open', 's15_open']) {
    const opening = campaign.scenes[sceneId]
    assert.ok(opening.choices.length >= 3, `${sceneId} debe ofrecer al menos tres enfoques`)
    for (const choice of opening.choices) {
      if (choice.conditions?.length) continue
      const reply = campaign.scenes[choice.nextSceneId]
      assert.ok(reply, `${choice.id} debe tener una réplica propia`)
      assert.equal(reply.sessionId, opening.sessionId)
      assert.ok(reply.lines.some((line) => line.speaker === 'Tomás'), `${reply.id} debe incluir la reacción de Tomás`)
      assert.ok(reply.choices.length >= 2, `${reply.id} debe ofrecer una segunda decisión`)
    }
  }

  const addedBranches = {
    s01_open: ['s01_open_pace', 's01_open_change', 's01_open_framework'],
    s03_open: ['s03_acknowledge_damage', 's03_explain_reason', 's03_follow_home'],
    s07_open: ['s07_tell_parents_without_tomas', 's07_agree_parent_contact', 's07_request_mother_support'],
    s08_open: ['s08_apologize', 's08_justify', 's08_defensive'],
    s10_open: ['s10_support_before_opening', 's10_investigate_usb', 's10_pause_before_usb'],
    s14_open: ['s14_ask_wishes', 's14_report_now', 's14_define_scope'],
    s17_open: ['s17_meaning_return', 's17_restore_voice', 's17_insist_return'],
  }
  for (const [sceneId, choiceIds] of Object.entries(addedBranches)) {
    const opening = campaign.scenes[sceneId]
    for (const choiceId of choiceIds) {
      const choice = opening.choices.find((candidate) => candidate.id === choiceId)
      assert.ok(choice, `${sceneId} debe incluir ${choiceId}`)
      const reply = campaign.scenes[choice.nextSceneId]
      assert.ok(reply.lines.some((line) => line.speaker === 'Tomás'))
      assert.ok(reply.choices.length >= 2, `${reply.id} debe ofrecer una segunda decisión`)
    }
  }
})

test('las hipótesis cambian preguntas disponibles sin cambiar los hechos canónicos', () => {
  const save = createInitialStorySave(campaign)
  save.currentSessionId = 'S04'
  save.currentSceneId = 's04_open'
  const opening = getStoryScene(campaign, 's04_open')

  assert.equal(getAvailableStoryChoices(opening, save).some((choice) => choice.id === 's04_follow_school_pressure'), false)
  save.hypotheses = [{ hypothesisId: 'school_pressure', status: 'active', selectedAt: new Date().toISOString() }]
  assert.equal(getAvailableStoryChoices(opening, save).some((choice) => choice.id === 's04_follow_school_pressure'), true)
  assert.ok(opening.lines.some((line) => /mensaje no lleva firma/i.test(line.text)))
})

test('las decisiones anteriores reaparecen como memoria explícita de Tomás', () => {
  const save = createInitialStorySave(campaign)
  save.flags.s01_notice_promise = true
  save.flags.s08_julian_apologized = true
  const visible = campaign.scenes.s16_open.lines.filter((line) => !line.conditions || line.conditions.every((condition) => evaluateCondition(condition, save)))
  const text = visible.map((line) => line.text).join(' ')
  assert.match(text, /me explicarías qué y por qué/i)
  assert.match(text, /reconociste que habías hablado por mí/i)
})

function resolveFromS17(stats, flags = {}, decisionIds = []) {
  const save = createInitialStorySave(campaign)
  save.currentSessionId = 'S17'
  save.currentSceneId = 'between_s17'
  save.phase = 'between_sessions'
  save.stats = { ...save.stats, ...stats }
  save.flags = { ...save.flags, 'hypothesis_selected:S17': true, ...flags }
  save.decisions = decisionIds.map((choiceId, index) => ({ choiceId, sceneId: `fixture_${index}`, sessionId: `S${String(index + 1).padStart(2, '0')}`, at: new Date(2025, 0, index + 1).toISOString() }))
  const interlude = getStoryScene(campaign, 'between_s17')
  const nextChoice = interlude.choices[0]
  return applyStoryChoice(campaign, interlude, nextChoice, save)
}

test('las cinco trayectorias y los seis resultados dependen de estado, historia y recursos', () => {
  const exit = resolveFromS17({ trust: 80, autonomy: 85, perceived_support: 85, maternal_bond: 90, external_support: 85, isolation: 10 })
  assert.equal(exit.currentSceneId, 's18_exit_entry')

  const survivalStats = { trust: 30, autonomy: 50, perceived_support: 70, maternal_bond: 90, external_support: 10, isolation: 85, hopelessness: 90, guilt: 75, school_return_pressure: 100, hostility: 30, anger: 35, fear: 80, anxiety: 85, perceived_injustice: 50 }
  const survived = resolveFromS17(survivalStats)
  assert.equal(survived.currentSceneId, 's18_crisis_entry')
  assert.ok(calculateSurvivalNetwork(survived) >= 58)

  const death = resolveFromS17({ trust: 15, autonomy: 15, perceived_support: 10, maternal_bond: 15, external_support: 5, isolation: 95, hopelessness: 100, guilt: 95, school_return_pressure: 100, hostility: 25, anger: 25, fear: 85, anxiety: 85, perceived_injustice: 50 })
  assert.equal(death.currentSceneId, 's18_crisis_entry')
  assert.ok(calculateSurvivalNetwork(death) < 58)

  const violence = resolveFromS17({ trust: 10, autonomy: 10, perceived_support: 10, maternal_bond: 40, external_support: 5, isolation: 80, hopelessness: 20, guilt: 35, school_return_pressure: 100, hostility: 100, anger: 100, fear: 15, anxiety: 50, perceived_injustice: 95 }, {}, ['s12_take_control', 's16_act_without_explaining'])
  assert.equal(violence.currentSceneId, 's18_violence_entry')

  const exposure = resolveFromS17({ trust: 45, autonomy: 35, perceived_support: 45, external_support: 25, isolation: 35, hopelessness: 25, school_return_pressure: 40, investigation_bias: 90, fear: 85, anxiety: 80, anger: 45 }, {}, ['s04_message_copy', 's09_build_timeline', 's10_investigate_usb', 's14_report_now', 's15_collect_evidence'])
  assert.equal(exposure.currentSceneId, 's18_exposure_entry')

  const administered = resolveFromS17({ trust: 70, autonomy: 15, perceived_support: 55, external_support: 85, isolation: 45, hopelessness: 30, school_return_pressure: 45, investigation_bias: 15, fear: 75, anxiety: 75, anger: 25 }, {}, ['s12_take_control', 's14_take_case', 's16_act_without_explaining', 's17_centralize'])
  assert.equal(administered.currentSceneId, 's18_administered_entry')
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
  for (const id of ['ending_exit', 'ending_suicide_survival', 'ending_suicide_death', 'ending_school_violence', 'ending_exposure', 'ending_administered']) {
    const text = campaign.scenes[id].lines.map((line) => line.text).join(' ')
    assert.match(text, /investigación externa confirma/i)
    assert.match(text, /Camila declara mediante terceros/i)
  }
  const violence = campaign.scenes.ending_school_violence.lines.map((line) => line.text).join(' ')
  assert.doesNotMatch(violence, /tomó un arma|disparó|preparó el ataque/i)
  const suicideDeath = campaign.scenes.ending_suicide_death.lines.map((line) => line.text).join(' ')
  assert.match(suicideDeath, /no se muestran acto, método ni cuerpo/i)
})
