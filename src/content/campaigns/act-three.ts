import type { StoryScene, StorySession } from '../../features/story/types'

const back = (sceneId: string, label = 'Volver a la conversación.') => ({ id: `return_${sceneId}`, text: label, nextSceneId: sceneId })

export const actThreeSessions: Record<string, StorySession> = {
  S11: { id: 'S11', number: 11, act: 3, title: 'El único que me entiende', entrySceneId: 's11_open', sceneIds: ['s11_open', 's11_bond', 's11_nico', 's11_close', 'between_s11'] },
  S12: { id: 'S12', number: 12, act: 3, title: 'Justicia', entrySceneId: 's12_open', sceneIds: ['s12_open', 's12_confession', 's12_close', 'between_s12'] },
  S13: { id: 'S13', number: 13, act: 3, title: 'Hacer justicia', entrySceneId: 's13_open', sceneIds: ['s13_open', 's13_material', 's13_close', 'between_s13'] },
  S14: { id: 'S14', number: 14, act: 3, title: 'No quiero destruirme para contarla', entrySceneId: 's14_open', sceneIds: ['s14_open', 's14_evidence', 's14_santiago', 's14_choice', 's14_close', 'between_s14'] },
  S15: { id: 'S15', number: 15, act: 3, title: 'Entonces voy a hacer algo yo', entrySceneId: 's15_open', sceneIds: ['s15_open', 's15_close', 'between_s15'] },
  S16: { id: 'S16', number: 16, act: 3, title: 'Desaparecer / hacerlos pagar', entrySceneId: 's16_open', sceneIds: ['s16_open', 's16_support', 's16_promise', 's16_breach', 's16_close', 'between_s16'] },
}

export const actThreeScenes: Record<string, StoryScene> = {
  s11_open: {
    id: 's11_open', sessionId: 'S11', kind: 'dialogue', label: '“El único que me entiende”', portraitState: 'uneasy',
    lines: [
      { speaker: 'Narración', tone: 'thought', text: 'Después de la filtración, un compañero nuevo empezó a buscar a Tomás en los recreos. La publicación siguiente no trae una amenaza explícita; sí detalles que parecen venir de alguien cercano.' },
      { speaker: 'Tomás', text: 'Nico no me mira como si ya hubiera decidido qué hice. Es el único que parece entenderme.' },
      { speaker: 'Julián', text: '¿Qué te pasa cuando estás con él?' },
      { speaker: 'Tomás', text: 'Por un rato no tengo que explicar por qué estoy enojado.' },
    ],
    topics: [
      { id: 's11_topic_bond', label: 'Qué encuentra Tomás en Nico', sceneId: 's11_bond' },
      { id: 's11_topic_nico', label: 'Qué sabe Julián de Nico', sceneId: 's11_nico' },
    ],
    choices: [
      { id: 's11_listen_nico', text: 'Explorar qué significa para Tomás sentirse comprendido.', effects: [{ type: 'changeStat', stat: 'perceived_support', amount: 5 }, { type: 'changeStat', stat: 'trust', amount: 3 }, { type: 'addClue', entry: { id: 's11_nico_familiarity', title: 'Nico conoce detalles de Bruno', text: 'Tomás dice que Nico usa una frase privada asociada con Bruno. Sugiere una cercanía previa, pero no confirma que sea el autor de los mensajes.', category: 'school-history', sessionId: 'S11' } }], nextSceneId: 's11_close' },
      { id: 's11_investigate_nico', text: 'Preguntar por Nico y sus vínculos con Bruno antes de escuchar más.', effects: [{ type: 'changeStat', stat: 'trust', amount: -8 }, { type: 'changeStat', stat: 'investigation_bias', amount: 10 }, { type: 'changeStat', stat: 'perceived_support', amount: -4 }, { type: 'addClue', entry: { id: 's11_nico_familiarity', title: 'Nico conoce detalles de Bruno', text: 'Tomás dice que Nico usa una frase privada asociada con Bruno. Sugiere una cercanía previa, pero no confirma que sea el autor de los mensajes.', category: 'school-history', sessionId: 'S11' } }], nextSceneId: 's11_close', importantDecision: true },
    ],
  },
  s11_bond: {
    id: 's11_bond', sessionId: 'S11', kind: 'dialogue', portraitState: 'vulnerable',
    lines: [
      { speaker: 'Julián', text: '¿Qué sentís que Nico entiende sin que tengas que explicárselo?' },
      { speaker: 'Tomás', text: 'Que cansarse de que te señalen no te vuelve culpable de todo.' },
      { speaker: 'Tomás', text: 'Cuando cuenta cosas de Bruno, usa una frase que no sabía que alguien más recordaba.' },
    ],
    choices: [back('s11_open')],
  },
  s11_nico: {
    id: 's11_nico', sessionId: 'S11', kind: 'dialogue', portraitState: 'uneasy',
    lines: [
      { speaker: 'Julián', text: '¿Qué sabés de su historia con Bruno?' },
      { speaker: 'Tomás', text: 'No sé. A veces habla como si lo hubiera conocido mucho. No le pregunté.' },
      { speaker: 'Narración', tone: 'thought', text: 'La familiaridad de Nico es una pista incompleta, no una confirmación de quién escribió las filtraciones.' },
    ],
    choices: [back('s11_open')],
  },
  s11_close: {
    id: 's11_close', sessionId: 'S11', kind: 'dialogue', label: 'Cierre de sesión', portraitState: 'uneasy',
    lines: [{ speaker: 'Tomás', text: 'No quiero que lo conviertas en otro sospechoso antes de que yo sepa qué pienso de él.' }],
    choices: [{ id: 's11_end', text: 'Dejar abierta la conversación sobre Nico.', nextSceneId: 'between_s11' }],
  },
  between_s11: {
    id: 'between_s11', sessionId: 'S11', kind: 'interlude', label: 'Entre sesiones',
    lines: [{ speaker: 'Narración', tone: 'thought', text: 'La siguiente publicación incluye fragmentos de mensajes que sólo alguien con acceso al material de Bruno podría conocer. Tomás decide observar a Nico sin contárselo todavía a Julián.' }],
    choices: [{ id: 's11_next', text: 'Volver a recibir a Tomás.', nextSceneId: 's12_open' }],
  },
  s12_open: {
    id: 's12_open', sessionId: 'S12', kind: 'dialogue', label: '“Justicia”', portraitState: 'defensive',
    lines: [
      { speaker: 'Tomás', text: 'Lo encaré. No fue como pensaba.' },
      { speaker: 'Julián', text: '¿Querés contarme qué pasó?' },
      { speaker: 'Tomás', text: 'Me mostró parte de los mensajes y los correos. Dijo que era cercano a Bruno y que se habían dejado de hablar.' },
    ],
    choices: [{ id: 's12_invite_account', text: 'Dejar que Tomás cuente con sus palabras, sin pedirle que entregue los archivos.', effects: [{ type: 'changeStat', stat: 'trust', amount: 3 }, { type: 'changeStat', stat: 'autonomy', amount: 3 }], nextSceneId: 's12_confession' }, { id: 's12_demand_material', text: 'Pedirle los archivos y una cronología completa antes de seguir.', effects: [{ type: 'changeStat', stat: 'trust', amount: -7 }, { type: 'changeStat', stat: 'investigation_bias', amount: 8 }], nextSceneId: 's12_confession', importantDecision: true }],
  },
  s12_confession: {
    id: 's12_confession', sessionId: 'S12', kind: 'dialogue', portraitState: 'uneasy',
    lines: [
      { speaker: 'Tomás', text: 'Nico dijo que él mandó los mensajes y filtró las cosas. Está enojado con Bruno por haberse alejado y se siente culpable por no haberlo escuchado.' },
      { speaker: 'Tomás', text: 'Cree que yo y Santi también tenemos que pagar por haber dudado.' },
      { speaker: 'Julián', text: '¿Qué querés hacer con lo que te mostró?' },
      { speaker: 'Tomás', text: 'Nada todavía. No te lo había contado porque pensé que ibas a hacer algo sin preguntarme.' },
    ],
    choices: [{ id: 's12_respect_pace', text: 'Reconocer el temor y preguntarle qué necesita antes de decidir.', effects: [{ type: 'changeStat', stat: 'trust', amount: 5 }, { type: 'changeStat', stat: 'perceived_support', amount: 5 }, { type: 'addPerson', entry: { id: 'person_nico', title: 'Nicolás “Nico” Vega', text: 'Tomás informa que Nico confesó ser autor de mensajes y filtraciones y que conserva copias parciales. La información llega por el relato de Tomás.', category: 'school', sessionId: 'S12' } }, { type: 'setFlag', flag: 's12_nico_revealed', value: true }], nextSceneId: 's12_close' }, { id: 's12_take_control', text: 'Decirle que hay que denunciarlo y pedir los archivos de inmediato.', effects: [{ type: 'changeStat', stat: 'trust', amount: -10 }, { type: 'changeStat', stat: 'autonomy', amount: -6 }, { type: 'setFlag', flag: 's12_nico_revealed', value: true }], nextSceneId: 's12_close', importantDecision: true }],
  },
  s12_close: {
    id: 's12_close', sessionId: 'S12', kind: 'dialogue', label: 'Cierre de sesión', portraitState: 'defensive',
    lines: [{ speaker: 'Tomás', text: 'Todavía no sé si quiero que Nico deje de hablarme o que deje de publicar.' }],
    choices: [{ id: 's12_end', text: 'Cerrar sin convertir la revelación en una decisión inmediata.', nextSceneId: 'between_s12' }],
  },
  between_s12: {
    id: 'between_s12', sessionId: 'S12', kind: 'interlude', label: 'Entre sesiones',
    lines: [{ speaker: 'Narración', tone: 'thought', text: 'Tomás vuelve a ver a Nico. Le sigue la conversación sin confiarle a Julián su plan: teme que el terapeuta vuelva a decidir por él.' }],
    choices: [{ id: 's12_next', text: 'Continuar.', nextSceneId: 's13_open' }],
  },
  s13_open: {
    id: 's13_open', sessionId: 'S13', kind: 'dialogue', label: '“Hacer justicia”', portraitState: 'uneasy',
    lines: [
      { speaker: 'Narración', tone: 'thought', text: 'Tomás regresa con más fragmentos de la historia, pero no cuenta cómo los consiguió.' },
      { speaker: 'Tomás', text: 'Nico cree que si nadie hizo nada, entonces todos somos parte de lo mismo.' },
      { speaker: 'Julián', text: '¿Y vos qué pensás?' },
      { speaker: 'Tomás', text: 'Le dije que lo entendía. Quería que me mostrara todo.' },
    ],
    choices: [{ id: 's13_check_cost', text: 'Preguntar qué le costó fingir estar de acuerdo con Nico.', effects: [{ type: 'changeStat', stat: 'perceived_support', amount: 4 }, { type: 'changeStat', stat: 'guilt', amount: 2 }], nextSceneId: 's13_material' }, { id: 's13_focus_evidence', text: 'Preguntar qué evidencia consiguió y dónde está.', effects: [{ type: 'changeStat', stat: 'trust', amount: -5 }, { type: 'changeStat', stat: 'investigation_bias', amount: 6 }], nextSceneId: 's13_material' }],
  },
  s13_material: {
    id: 's13_material', sessionId: 'S13', kind: 'dialogue', portraitState: 'defensive',
    lines: [
      { speaker: 'Tomás', text: 'Me mostró los archivos enteros. Le hice creer que pensaba igual para que me los diera.' },
      { speaker: 'Julián', text: '¿Los guardaste?' },
      { speaker: 'Tomás', text: 'No te los voy a dar ahora. Si te cuento, capaz decidís por mí otra vez.' },
      { speaker: 'Narración', tone: 'thought', text: 'Tomás no entrega el material. La evidencia existe, pero su decisión de ocultarla es también una medida de cuánto confía en Julián.' },
    ],
    choices: [{ id: 's13_respect_boundary', text: 'Respetar el límite y acordar que pueden volver a hablarlo cuando él quiera.', effects: [{ type: 'changeStat', stat: 'trust', amount: 4 }, { type: 'changeStat', stat: 'autonomy', amount: 4 }], nextSceneId: 's13_close' }, { id: 's13_insist_files', text: 'Insistir en que no puede conservar material relevante sin compartirlo.', effects: [{ type: 'changeStat', stat: 'trust', amount: -8 }, { type: 'changeStat', stat: 'autonomy', amount: -5 }], nextSceneId: 's13_close', importantDecision: true }],
  },
  s13_close: {
    id: 's13_close', sessionId: 'S13', kind: 'dialogue', label: 'Cierre de sesión',
    lines: [{ speaker: 'Tomás', text: 'No quiero ser como Nico. Pero tampoco quiero volver a quedarme sin saber qué pasó.' }],
    choices: [{ id: 's13_end', text: 'Dejar la pregunta abierta.', nextSceneId: 'between_s13' }],
  },
  between_s13: {
    id: 'between_s13', sessionId: 'S13', kind: 'interlude', label: 'Entre sesiones',
    lines: [{ speaker: 'Narración', tone: 'thought', text: 'Santiago busca a Tomás fuera de la escuela y le dice que deje de remover el pasado. No aclara qué hará si Tomás continúa.' }],
    choices: [{ id: 's13_next', text: 'Recibir a Tomás.', nextSceneId: 's14_open' }],
  },
  s14_open: {
    id: 's14_open', sessionId: 'S14', kind: 'dialogue', label: '“No quiero destruirme para contarla”', portraitState: 'vulnerable',
    lines: [
      { speaker: 'Tomás', text: 'Santi me dijo que no siguiera. No sé si fue una amenaza. Me dio miedo igual.' },
      { speaker: 'Tomás', text: 'Traje los archivos de Nico. No quiero que esto dependa de que yo lo cuente todo perfecto.' },
      { speaker: 'Julián', text: 'Quiero entender qué querés que pase ahora.' },
    ],
    topics: [{ id: 's14_topic_evidence', label: 'Qué muestran los archivos', sceneId: 's14_evidence', effects: [{ type: 'addClue', entry: { id: 's14_records_conflict', title: 'Documentos contradictorios', text: 'Copias parciales de mensajes y registros escolares no coinciden en fechas ni versiones. Requieren revisión independiente.', category: 'institutional', sessionId: 'S14', confirmed: true } }] }, { id: 's14_topic_santiago', label: 'La advertencia de Santiago', sceneId: 's14_santiago' }],
    choices: [{ id: 's14_ask_wishes', text: 'Preguntarle qué quiere hacer y qué no quiere cargar él solo.', effects: [{ type: 'changeStat', stat: 'trust', amount: 10 }, { type: 'changeStat', stat: 'autonomy', amount: 14 }, { type: 'changeStat', stat: 'perceived_support', amount: 8 }, { type: 'setFlag', flag: 's14_julian_asked_tomas', value: true }], nextSceneId: 's14_choice' }, { id: 's14_report_now', text: 'Decidir que los archivos deben salir de la sesión y reportarse hoy.', effects: [{ type: 'changeStat', stat: 'trust', amount: -10 }, { type: 'changeStat', stat: 'autonomy', amount: -8 }, { type: 'changeStat', stat: 'external_support', amount: 12 }], nextSceneId: 's14_choice', importantDecision: true }],
  },
  s14_evidence: {
    id: 's14_evidence', sessionId: 'S14', kind: 'dialogue', portraitState: 'uneasy',
    lines: [
      { speaker: 'Tomás', text: 'Hay copias de mails, cambios en los registros y versiones que no pueden ser ciertas al mismo tiempo.' },
      { speaker: 'Tomás', text: 'Camila había intentado hablar de Lagos. Los correos muestran que él la apuró y que después Verónica cambió el resumen. Hay un antecedente anterior que tampoco aparece en la versión final.' },
      { speaker: 'Julián', text: 'Esto necesita una revisión independiente. No tenemos que resolverlo acá ni convertirte en el investigador.' },
      { speaker: 'Narración', tone: 'thought', text: 'Las copias sostienen contradicciones y una intervención institucional, pero no una explicación única de la muerte de Bruno.' },
    ],
    choices: [back('s14_open')],
  },
  s14_santiago: {
    id: 's14_santiago', sessionId: 'S14', kind: 'dialogue', portraitState: 'defensive',
    lines: [{ speaker: 'Tomás', text: 'No dijo exactamente qué iba a hacer. Me dijo que si hablaba, iba a arruinarle la vida a todos.' }, { speaker: 'Tomás', text: 'No sé si quiere asustarme o si también tiene miedo.' }],
    choices: [back('s14_open')],
  },
  s14_choice: {
    id: 's14_choice', sessionId: 'S14', kind: 'dialogue', portraitState: 'vulnerable',
    lines: [
      { speaker: 'Tomás', text: 'Quiero que se sepa la verdad, pero no quiero ser yo el que tenga que destruirse para contarla.' },
      { speaker: 'Julián', text: 'No deberías tener que cargar solo con eso.' },
    ],
    choices: [{ id: 's14_hold_line', text: 'Acordar que cualquier paso se conversa con Tomás y se comparte la responsabilidad.', effects: [{ type: 'changeStat', stat: 'autonomy', amount: 3 }, { type: 'changeStat', stat: 'perceived_support', amount: 3 }], nextSceneId: 's14_close' }, { id: 's14_take_case', text: 'Decirle que los adultos se ocuparán y que no necesita pensar más en el tema.', effects: [{ type: 'changeStat', stat: 'autonomy', amount: -4 }, { type: 'changeStat', stat: 'perceived_support', amount: -2 }], nextSceneId: 's14_close' }],
  },
  s14_close: {
    id: 's14_close', sessionId: 'S14', kind: 'dialogue', label: 'Cierre de sesión',
    lines: [{ speaker: 'Tomás', text: 'No quiero que esto sea lo único que hablamos de mí.' }],
    choices: [{ id: 's14_end', text: 'Cerrar la sesión.', nextSceneId: 'between_s14' }],
  },
  between_s14: {
    id: 'between_s14', sessionId: 'S14', kind: 'interlude', label: 'Entre sesiones',
    lines: [{ speaker: 'Narración', tone: 'thought', text: 'La escuela responde que está revisando el asunto. En un comunicado breve lo llama “un conflicto entre estudiantes” y pide que se eviten conclusiones apresuradas.' }],
    choices: [{ id: 's14_next', text: 'Continuar.', nextSceneId: 's15_open' }],
  },
  s15_open: {
    id: 's15_open', sessionId: 'S15', kind: 'dialogue', label: '“Entonces voy a hacer algo yo”', portraitState: 'defensive',
    lines: [
      { speaker: 'Tomás', text: 'La escuela dijo que no puede confirmar nada. Después Santi publicó que yo inventé todo para tapar que fui yo el de los mensajes.' },
      { speaker: 'Tomás', text: 'Me cansé de que siempre puedan hacer eso y que nadie diga nada.' },
      { speaker: 'Julián', text: '¿Qué te gustaría que yo entendiera de lo que acabás de decir?' },
    ],
    choices: [
      { id: 's15_listen_anger', text: 'Preguntar qué hay debajo de la bronca y qué necesita para pasar el día.', effects: [{ type: 'changeStat', stat: 'isolation', amount: 12 }, { type: 'changeStat', stat: 'hopelessness', amount: 12 }, { type: 'changeStat', stat: 'hostility', amount: 10 }, { type: 'changeStat', stat: 'perceived_injustice', amount: 12 }, { type: 'changeStat', stat: 'perceived_support', amount: 5 }, { type: 'setFlag', flag: 's15_school_minimized', value: true }], nextSceneId: 's15_close' },
      { id: 's15_collect_evidence', text: 'Preguntar quién publicó qué y empezar a ordenar las pruebas.', effects: [{ type: 'changeStat', stat: 'isolation', amount: 12 }, { type: 'changeStat', stat: 'hopelessness', amount: 12 }, { type: 'changeStat', stat: 'hostility', amount: 10 }, { type: 'changeStat', stat: 'perceived_injustice', amount: 12 }, { type: 'changeStat', stat: 'trust', amount: -5 }, { type: 'changeStat', stat: 'investigation_bias', amount: 8 }, { type: 'setFlag', flag: 's15_school_minimized', value: true }], nextSceneId: 's15_close', importantDecision: true },
    ],
  },
  s15_close: {
    id: 's15_close', sessionId: 'S15', kind: 'dialogue', label: 'Cierre de sesión', portraitState: 'defensive',
    lines: [{ speaker: 'Tomás', text: 'Entonces voy a hacer algo yo.' }, { speaker: 'Julián', tone: 'thought', text: 'Tomás no explica qué significa. Julián tampoco completa la frase por él.' }],
    choices: [{ id: 's15_end', text: 'No convertir una frase ambigua en una conclusión y seguir escuchando.', nextSceneId: 'between_s15' }],
  },
  between_s15: {
    id: 'between_s15', sessionId: 'S15', kind: 'interlude', label: 'Entre sesiones',
    lines: [{ speaker: 'Narración', tone: 'thought', text: 'Marcelo confirma que Tomás tendrá que volver a la escuela. Dice que quizá sea mejor dejar de hablar del tema para que no crezca.' }],
    choices: [{ id: 's15_next', text: 'Abrir la próxima sesión.', nextSceneId: 's16_open' }],
  },
  s16_open: {
    id: 's16_open', sessionId: 'S16', kind: 'dialogue', label: '“Desaparecer / hacerlos pagar”', portraitState: 'vulnerable',
    lines: [
      { speaker: 'Tomás', text: 'A veces pienso en hacerme daño. Otras veces fantaseo con que los que hicieron esto sientan algo de lo que siento yo.' },
      { speaker: 'Tomás', text: 'Me asusta que se me cruce. No quiero que lo conviertas en una etiqueta.' },
      { speaker: 'Julián', text: 'Gracias por decírmelo. No voy a asumir que esos pensamientos te definen, y tampoco quiero dejarte solo con ellos.' },
    ],
    choices: [{ id: 's16_talk_support', text: 'Explicar por qué hace falta sumar apoyo, ofrecer opciones y acordar juntos a quién involucrar.', effects: [{ type: 'changeStat', stat: 'perceived_support', amount: 12 }, { type: 'changeStat', stat: 'autonomy', amount: 6 }, { type: 'changeStat', stat: 'external_support', amount: 15 }, { type: 'changeStat', stat: 'trust', amount: 4 }, { type: 'setFlag', flag: 's16_transparent_support', value: true }], nextSceneId: 's16_support', importantDecision: true }, { id: 's16_promise', text: 'Prometerle que por ahora no vas a involucrar a nadie.', effects: [{ type: 'changeStat', stat: 'trust', amount: 8 }, { type: 'changeStat', stat: 'autonomy', amount: 3 }, { type: 'changeStat', stat: 'external_support', amount: -12 }, { type: 'changeStat', stat: 'hopelessness', amount: 4 }, { type: 'setFlag', flag: 'therapist_unkeepable_promise', value: true }], nextSceneId: 's16_promise', importantDecision: true }, { id: 's16_act_without_explaining', text: 'Contactar a terceros sin explicarle antes qué vas a hacer.', effects: [{ type: 'changeStat', stat: 'trust', amount: -18 }, { type: 'changeStat', stat: 'autonomy', amount: -15 }, { type: 'changeStat', stat: 'external_support', amount: 15 }, { type: 'changeStat', stat: 'isolation', amount: 6 }], nextSceneId: 's16_breach', importantDecision: true }],
  },
  s16_support: {
    id: 's16_support', sessionId: 'S16', kind: 'dialogue', portraitState: 'uneasy',
    lines: [{ speaker: 'Tomás', text: 'No quiero que todos sepan todo.' }, { speaker: 'Julián', text: 'No hace falta compartir todo. Podemos hablar de la mínima ayuda que te sirva y de qué vamos a decir antes de hacerlo.' }, { speaker: 'Tomás', text: 'No sé si estoy listo. Por ahora quiero volver a la escuela y que no armes otra reunión sin mí.' }],
    choices: [{ id: 's16_support_close', text: 'Acordar revisar pronto cómo está y qué apoyo acepta, sin prometer secreto absoluto.', effects: [{ type: 'setFlag', flag: 's16_support_plan', value: true }], nextSceneId: 's16_close' }],
  },
  s16_promise: {
    id: 's16_promise', sessionId: 'S16', kind: 'dialogue', portraitState: 'vulnerable',
    lines: [{ speaker: 'Julián', text: 'Por ahora no voy a involucrar a nadie.' }, { speaker: 'Tomás', text: 'Eso quería escuchar. Igual tengo que volver.' }, { speaker: 'Narración', tone: 'thought', text: 'La promesa alivia el momento, pero Julián sabe que quizá no pueda sostenerla.' }],
    choices: [{ id: 's16_promise_close', text: 'Cerrar sin convertir la promesa en un acuerdo de seguridad.', nextSceneId: 's16_close' }],
  },
  s16_breach: {
    id: 's16_breach', sessionId: 'S16', kind: 'dialogue', portraitState: 'defensive',
    lines: [{ speaker: 'Tomás', text: '¿Ya hablaste con alguien?' }, { speaker: 'Julián', text: 'Sí. Tendría que habértelo explicado antes.' }, { speaker: 'Tomás', text: 'Siempre terminás decidiendo vos.' }],
    choices: [{ id: 's16_breach_close', text: 'Reconocer el daño sin pedirle que lo tranquilice.', nextSceneId: 's16_close' }],
  },
  s16_close: {
    id: 's16_close', sessionId: 'S16', kind: 'dialogue', label: 'Cierre de sesión', portraitState: 'uneasy',
    lines: [
      { speaker: 'Narración', tone: 'thought', text: 'El regreso a la escuela queda confirmado. Marcelo vuelve a decir que dejar de hablar del asunto puede ayudar.' },
      { speaker: 'Tomás', text: 'No quiero volver. Pero parece que ya está decidido.' },
    ],
    choices: [{ id: 's16_end', text: 'Cerrar la sesión y registrar que el regreso no fue una elección de Tomás.', effects: [{ type: 'changeStat', stat: 'school_return_pressure', amount: 25 }, { type: 'changeStat', stat: 'hopelessness', amount: 8 }, { type: 'changeStat', stat: 'hostility', amount: 5 }, { type: 'changeStat', stat: 'perceived_support', amount: -5 }, { type: 'changeStat', stat: 'perceived_injustice', amount: 6 }], nextSceneId: 'between_s16' }],
  },
  between_s16: {
    id: 'between_s16', sessionId: 'S16', kind: 'interlude', label: 'Cierre del Acto III',
    lines: [{ speaker: 'Narración', tone: 'thought', text: 'La historia del caso tiene piezas nuevas. La relación entre Julián y Tomás, en cambio, ya no puede repararse sólo encontrando otra prueba.' }, { speaker: 'Narración', tone: 'thought', text: 'La próxima sesión empieza con una decisión inmediata: qué significa volver y quién puede cargar con lo que pasó.' }],
    choices: [{ id: 's16_next', text: 'Recibir a Tomás.', nextSceneId: 's17_open' }],
  },
}
