import type { StoryScene, StorySession } from '../../features/story/types'

const back = (sceneId: string, label = 'Volver a la conversación.') => ({ id: `return_${sceneId}`, text: label, nextSceneId: sceneId })

export const actTwoSessions: Record<string, StorySession> = {
  S05: { id: 'S05', number: 5, act: 2, title: 'Algo viejo', entrySceneId: 's05_open', sceneIds: ['s05_open', 's05_message', 's05_santiago', 's05_secret', 's05_author', 's05_support_reply', 's05_pressure', 's05_close', 'between_s05'] },
  S06: { id: 'S06', number: 6, act: 2, title: 'Ya pasó una vez', entrySceneId: 's06_open', sceneIds: ['s06_open', 's06_bruno', 's06_request', 's06_listen_reply', 's06_investigate_reply', 's06_pause_reply', 's06_close', 'between_s06'] },
  S07: { id: 'S07', number: 7, act: 2, title: 'Otra vez', entrySceneId: 's07_open', sceneIds: ['s07_open', 's07_parents', 's07_agreed_reply', 's07_mother_reply', 's07_support', 's07_close', 'between_s07'] },
  S08: { id: 'S08', number: 8, act: 2, title: 'La prueba', entrySceneId: 's08_open', sceneIds: ['s08_open', 's08_full_reveal', 's08_partial', 's08_close', 'between_s08'] },
  S09: { id: 'S09', number: 9, act: 2, title: 'Controlaron la situación', entrySceneId: 's09_open', sceneIds: ['s09_open', 's09_camila', 's09_lagos', 's09_santiago', 's09_bruno', 's09_impact_reply', 's09_timeline_reply', 's09_scope_reply', 's09_close', 'between_s09'] },
  S10: { id: 'S10', number: 10, act: 2, title: 'La memoria', entrySceneId: 's10_open', sceneIds: ['s10_open', 's10_support_reply', 's10_investigate_reply', 's10_pause_reply', 's10_file_hub', 's10_usb_messages', 's10_usb_email', 's10_usb_note', 's10_usb_image', 's10_close', 'between_s10'] },
}

export const actTwoScenes: Record<string, StoryScene> = {
  s05_open: {
    id: 's05_open', sessionId: 'S05', kind: 'dialogue', label: '“Algo viejo”', portraitState: 'uneasy',
    lines: [
      { speaker: 'Narración', tone: 'thought', text: 'El segundo mensaje anónimo no nombra a Tomás. Hace una referencia a algo que ocurrió años atrás y que, según él, nadie en la escuela debería recordar.' },
      { speaker: 'Tomás', text: 'Ahora dicen que el mensaje tiene que ver con algo viejo.' },
      { speaker: 'Julián', text: '¿Qué sentís cuando lo leés?' },
      { speaker: 'Tomás', text: 'Que alguien sabe dónde tocar. No sé si quiere que hable o que me calle.' },
    ],
    topics: [
      { id: 's05_topic_message', label: 'La referencia del segundo mensaje', requiredTrust: 0, sceneId: 's05_message', effects: [{ type: 'addClue', entry: { id: 's05_second_message', title: 'Referencia a “algo viejo”', text: 'El segundo mensaje conecta el hostigamiento actual con un hecho del pasado. No identifica al remitente ni explica qué ocurrió.', category: 'messages', sessionId: 'S05', confirmed: true } }] },
      { id: 's05_topic_santiago', label: 'Qué sabe Santiago', requiredTrust: 25, sceneId: 's05_santiago' },
      { id: 's05_topic_secret', label: 'Qué quiere decir con “algo viejo”', requiredTrust: 35, sceneId: 's05_secret' },
      { id: 's05_topic_author', label: 'Quién pudo escribirlo', requiredTrust: 30, sceneId: 's05_author' },
    ],
    choices: [
      { id: 's05_follow_tomas', text: 'Preguntar qué necesita de Julián mientras circula el mensaje.', intention: 'question', effects: [{ type: 'changeStat', stat: 'perceived_support', amount: 4 }, { type: 'changeStat', stat: 'autonomy', amount: 3 }], nextSceneId: 's05_support_reply' },
      { id: 's05_press_for_details', text: 'Pedirle que explique exactamente a qué hecho del pasado se refiere.', conditions: [{ type: 'statAtLeast', stat: 'investigation_bias', value: 25 }], effects: [{ type: 'changeStat', stat: 'trust', amount: -5 }, { type: 'changeStat', stat: 'investigation_bias', amount: 6 }, { type: 'setFlag', flag: 's05_julian_pressed', value: true }], nextSceneId: 's05_pressure', importantDecision: true },
      { id: 's05_name_hypothesis', text: 'Preguntar si cree que Santiago está detrás del mensaje.', conditions: [{ type: 'hypothesisActive', hypothesisId: 'early_message_author' }], effects: [{ type: 'changeStat', stat: 'investigation_bias', amount: 4 }, { type: 'setFlag', flag: 's05_suspected_santiago', value: true }], nextSceneId: 's05_pressure', importantDecision: true },
    ],
  },
  s05_support_reply: {
    id: 's05_support_reply', sessionId: 'S05', kind: 'dialogue', portraitState: 'vulnerable',
    lines: [{ speaker: 'Tomás', text: 'Necesito que no conviertas cada cosa que digo en una pista. Si vuelve a aparecer, quiero poder venir y hablar de lo que me hace.' }],
    choices: [{ id: 's05_agree_pace', text: 'Acordar que retomarán el impacto antes que la identidad del autor.', intention: 'validate', effects: [{ type: 'setFlag', flag: 's05_pace_agreed', value: true }, { type: 'changeStat', stat: 'trust', amount: 3 }], nextSceneId: 's05_close' }, { id: 's05_ask_exception', text: 'Preguntar qué situación justificaría cambiar ese acuerdo.', intention: 'limit', effects: [{ type: 'changeStat', stat: 'autonomy', amount: 2 }], nextSceneId: 's05_close' }],
  },
  s05_message: {
    id: 's05_message', sessionId: 'S05', kind: 'dialogue', portraitState: 'uneasy',
    lines: [
      { speaker: 'Julián', text: '¿Qué parte del mensaje te hizo pensar que era sobre el pasado?' },
      { speaker: 'Tomás', text: 'No dice nombres. Usa una frase que yo ya había escuchado antes.' },
      { speaker: 'Tomás', text: 'No voy a repetirla para que la anotes como si fuera una contraseña.' },
    ],
    choices: [back('s05_open')],
  },
  s05_santiago: {
    id: 's05_santiago', sessionId: 'S05', kind: 'dialogue', portraitState: 'defensive',
    lines: [
      { speaker: 'Julián', text: '¿Santiago también recibió algo?' },
      { speaker: 'Tomás', text: 'No sé. No hablamos de mensajes.' },
      { speaker: 'Tomás', text: 'Éramos amigos. No significa que todavía me cuente cosas.' },
    ],
    choices: [back('s05_open')],
  },
  s05_secret: {
    id: 's05_secret', sessionId: 'S05', kind: 'dialogue', portraitState: 'uneasy',
    lines: [
      { speaker: 'Julián', text: 'No hace falta que me cuentes el hecho si todavía no querés. ¿Qué te pasa al pensar que volvió?' },
      { speaker: 'Tomás', text: 'Que capaz nunca se fue. La gente dejó de nombrarlo, que no es lo mismo.' },
    ],
    choices: [back('s05_open')],
  },
  s05_author: {
    id: 's05_author', sessionId: 'S05', kind: 'dialogue', portraitState: 'defensive',
    lines: [
      { speaker: 'Julián', text: '¿Tenés alguna hipótesis sobre quién lo envió?' },
      { speaker: 'Tomás', text: 'Tengo sospechas. No es lo mismo que saber.' },
      { speaker: 'Julián', text: '¿Querés contarme qué las sostiene?' },
      { speaker: 'Tomás', text: 'No si vas a convertir cada nombre en una pregunta.' },
    ],
    choices: [back('s05_open')],
  },
  s05_pressure: {
    id: 's05_pressure', sessionId: 'S05', kind: 'dialogue', portraitState: 'defensive',
    lines: [
      { speaker: 'Tomás', text: 'No te lo conté para que armaras una lista.' },
      { speaker: 'Tomás', text: 'Si te doy un nombre, ¿vas a escucharme o vas a empezar por ese nombre?' },
    ],
    choices: [
      { id: 's05_acknowledge_pressure', text: 'Reconocer que te apuraste y devolverle la decisión de qué contar.', effects: [{ type: 'changeStat', stat: 'trust', amount: 4 }, { type: 'changeStat', stat: 'autonomy', amount: 3 }], nextSceneId: 's05_close' },
      { id: 's05_double_down', text: 'Insistir en que identificar al remitente es lo más importante.', effects: [{ type: 'changeStat', stat: 'trust', amount: -5 }, { type: 'changeStat', stat: 'investigation_bias', amount: 5 }], nextSceneId: 's05_close' },
    ],
  },
  s05_close: {
    id: 's05_close', sessionId: 'S05', kind: 'dialogue', label: 'Cierre de sesión', portraitState: 'uneasy',
    lines: [{ speaker: 'Tomás', text: 'No sé si esto es nuevo. Capaz es algo viejo que encontró una manera de volver.' }],
    choices: [{ id: 's05_end', text: 'Terminar la sesión y dejar la interpretación abierta.', nextSceneId: 'between_s05' }],
  },
  between_s05: {
    id: 'between_s05', sessionId: 'S05', kind: 'interlude', label: 'Entre sesiones',
    lines: [{ speaker: 'Narración', tone: 'thought', text: 'El remitente sigue sin identificarse. En sus notas, Julián puede distinguir la referencia al pasado de cualquier hipótesis sobre quién la escribió.' }],
    choices: [{ id: 's05_next', text: 'Preparar la próxima sesión.', nextSceneId: 's06_open' }],
  },
  s06_open: {
    id: 's06_open', sessionId: 'S06', kind: 'dialogue', label: '“Ya pasó una vez”', portraitState: 'defensive',
    lines: [
      { speaker: 'Narración', tone: 'thought', text: 'Tomás llega furioso. En la escuela volvieron a circular rumores vinculados con el mensaje y con un estudiante que murió años atrás.' },
      { speaker: 'Tomás', text: 'Ya pasó una vez.' },
      { speaker: 'Julián', text: '¿Qué pasó?' },
      { speaker: 'Tomás', text: 'No sé por qué lo dije. No quiero que hagas nada con eso todavía.' },
    ],
    topics: [
      { id: 's06_topic_name', label: 'El nombre de Bruno', requiredTrust: 0, sceneId: 's06_bruno', effects: [{ type: 'addPerson', entry: { id: 'person_bruno', title: 'Bruno Salvatierra', text: 'Estudiante fallecido, mencionado por Tomás al conectar el rumor actual con el pasado. Su historia todavía no está completa.', category: 'school', sessionId: 'S06' } }] },
      { id: 's06_topic_rumors', label: 'Los rumores en la escuela', requiredTrust: 20, sceneId: 's06_request' },
    ],
    choices: [
      { id: 's06_listen_first', text: 'Preguntar qué necesita ahora, antes de saber más.', intention: 'question', effects: [{ type: 'changeStat', stat: 'perceived_support', amount: 5 }, { type: 'changeStat', stat: 'trust', amount: 3 }], nextSceneId: 's06_listen_reply' },
      { id: 's06_investigate', text: 'Preguntar quién era Bruno, cuándo murió y quién más lo conocía.', intention: 'confront', effects: [{ type: 'changeStat', stat: 'trust', amount: -6 }, { type: 'changeStat', stat: 'investigation_bias', amount: 10 }, { type: 'changeStat', stat: 'perceived_support', amount: -4 }, { type: 'setFlag', flag: 's06_julian_investigated', value: true }], nextSceneId: 's06_investigate_reply', importantDecision: true },
      { id: 's06_pause', text: 'Hacer una pausa y dejar que Tomás decida si continúa.', intention: 'silence', effects: [{ type: 'changeStat', stat: 'autonomy', amount: 4 }], nextSceneId: 's06_pause_reply' },
    ],
  },
  s06_listen_reply: {
    id: 's06_listen_reply', sessionId: 'S06', kind: 'dialogue', portraitState: 'vulnerable',
    lines: [{ speaker: 'Tomás', text: 'Necesito decir su nombre sin que de pronto la sesión sea sobre cómo murió.' }],
    choices: [{ id: 's06_remember_person', text: 'Preguntar cómo era Bruno en un día común.', intention: 'deepen', effects: [{ type: 'changeStat', stat: 'guilt', amount: -2 }], nextSceneId: 's06_close' }, { id: 's06_ask_repetition', text: 'Preguntar qué parte de la historia siente que se repite ahora.', intention: 'question', nextSceneId: 's06_close' }],
  },
  s06_investigate_reply: {
    id: 's06_investigate_reply', sessionId: 'S06', kind: 'dialogue', portraitState: 'defensive',
    lines: [{ speaker: 'Tomás', text: 'No te lo conté para que investigues. Ni siquiera preguntaste cómo era conmigo.' }],
    choices: [{ id: 's06_repair_person', text: 'Reconocer el apuro y preguntarle quién era Bruno para él.', intention: 'apologize', effects: [{ type: 'changeStat', stat: 'trust', amount: 3 }], nextSceneId: 's06_close' }, { id: 's06_defend_context', text: 'Explicar que la cronología puede evitar conclusiones equivocadas.', intention: 'justify', effects: [{ type: 'changeStat', stat: 'investigation_bias', amount: 4 }, { type: 'changeStat', stat: 'trust', amount: -3 }], nextSceneId: 's06_close' }],
  },
  s06_pause_reply: {
    id: 's06_pause_reply', sessionId: 'S06', kind: 'dialogue', portraitState: 'uneasy',
    lines: [{ speaker: 'Narración', tone: 'thought', text: 'Tomás mira la ventana. El silencio dura lo suficiente como para dejar de parecer una técnica.' }, { speaker: 'Tomás', text: 'Bruno era mi amigo. A veces. Eso es todo lo que puedo decir hoy.' }],
    choices: [{ id: 's06_accept_fragment', text: 'Aceptar el fragmento sin pedir una definición más limpia.', intention: 'validate', effects: [{ type: 'changeStat', stat: 'trust', amount: 3 }], nextSceneId: 's06_close' }, { id: 's06_offer_return', text: 'Proponer volver a ese recuerdo solo si Tomás lo elige.', intention: 'limit', effects: [{ type: 'changeStat', stat: 'autonomy', amount: 3 }], nextSceneId: 's06_close' }],
  },
  s06_bruno: {
    id: 's06_bruno', sessionId: 'S06', kind: 'dialogue', portraitState: 'uneasy',
    lines: [
      { speaker: 'Julián', text: '¿Quién era Bruno para vos?' },
      { speaker: 'Tomás', text: 'Un pibe de la escuela. Ya no está.' },
      { speaker: 'Julián', text: '¿Querés hablar de él o preferís que lo dejemos ahí por hoy?' },
      { speaker: 'Tomás', text: 'No sé. Cuando digo su nombre, todos quieren saber el resto.' },
    ],
    choices: [back('s06_open')],
  },
  s06_request: {
    id: 's06_request', sessionId: 'S06', kind: 'dialogue', portraitState: 'defensive',
    lines: [
      { speaker: 'Julián', text: '¿Qué rumor llegó esta vez?' },
      { speaker: 'Tomás', text: 'Que Bruno hizo algo que no hizo. Cada persona lo cuenta distinto y al final parece que todos estuvieron ahí.' },
      { speaker: 'Tomás', text: 'No te lo conté para que investigues.' },
    ],
    choices: [back('s06_open')],
  },
  s06_close: {
    id: 's06_close', sessionId: 'S06', kind: 'dialogue', label: 'Cierre de sesión', portraitState: 'defensive',
    lines: [
      { speaker: 'Tomás', text: 'No te lo conté para que investigues.' },
      { speaker: 'Narración', tone: 'thought', text: 'El nombre de Bruno queda en el expediente. Julián nota que ya está pensando en quién preguntar antes de saber qué necesitaba Tomás al decirlo.' },
    ],
    choices: [{ id: 's06_end', text: 'Reconocer que la conversación queda abierta.', nextSceneId: 'between_s06' }],
  },
  between_s06: {
    id: 'between_s06', sessionId: 'S06', kind: 'interlude', label: 'Antes de la próxima sesión',
    lines: [
      { speaker: 'Narración', tone: 'thought', text: 'Una publicación anónima sobre Bruno empieza a circular entre estudiantes. La versión repite una acusación grave, pero no ofrece una fuente verificable.' },
      { speaker: 'Narración', tone: 'thought', text: 'Días después, Santiago y Tomás se confrontan en la escuela. La pelea es mutua; no hay una versión única de cómo empezó y ninguno quiere hablar de eso por mensaje.' },
    ],
    choices: [{ id: 's06_next', text: 'Recibir a Tomás en la próxima sesión.', nextSceneId: 's07_open' }],
  },
  s07_open: {
    id: 's07_open', sessionId: 'S07', kind: 'dialogue', label: '“Otra vez”', portraitState: 'vulnerable',
    lines: [
      { speaker: 'Narración', tone: 'thought', text: 'Tomás llega con marcas visibles después de la pelea con Santiago. No intenta explicar quién empezó. Su teléfono muestra que la publicación sobre Bruno volvió a compartirse.' },
      { speaker: 'Tomás', text: 'Ahora dicen que yo empecé todo. Si contesto, lo suben. Si no contesto, también.' },
      { speaker: 'Julián', text: '¿Qué te gustaría que ocurriera con esto hoy?' },
      { speaker: 'Tomás', text: 'No sé. Pero no quiero que mis viejos reciban una versión antes que yo.' },
    ],
    choices: [
      { id: 's07_tell_parents_without_tomas', text: 'Contactar a Laura y Marcelo sin acordar antes qué compartir con Tomás.', effects: [{ type: 'changeStat', stat: 'trust', amount: -8 }, { type: 'changeStat', stat: 'autonomy', amount: -10 }, { type: 'changeStat', stat: 'isolation', amount: 6 }, { type: 'setFlag', flag: 's07_parents_informed_without_tomas', value: true }], nextSceneId: 's07_parents', importantDecision: true },
      { id: 's07_agree_parent_contact', text: 'Hablar con Tomás sobre qué información concreta compartir con sus padres.', intention: 'limit', effects: [{ type: 'changeStat', stat: 'autonomy', amount: 4 }, { type: 'changeStat', stat: 'perceived_support', amount: 3 }, { type: 'setFlag', flag: 's07_parents_informed_with_tomas', value: true }], nextSceneId: 's07_agreed_reply', importantDecision: true },
      { id: 's07_request_mother_support', text: 'Acordar con Tomás pedirle a Laura una conversación breve sobre cómo acompañarlo.', intention: 'question', effects: [{ type: 'changeStat', stat: 'autonomy', amount: 3 }, { type: 'changeStat', stat: 'perceived_support', amount: 2 }, { type: 'setFlag', flag: 's07_mother_support_requested', value: true }], nextSceneId: 's07_mother_reply' },
    ],
  },
  s07_agreed_reply: {
    id: 's07_agreed_reply', sessionId: 'S07', kind: 'dialogue', portraitState: 'uneasy',
    lines: [{ speaker: 'Tomás', text: 'Podés decir que hubo una pelea y que no quiero volver mañana. No les cuentes lo de Bruno como si explicara todo.' }],
    choices: [{ id: 's07_agree_repeat', text: 'Repetir el alcance acordado antes de llamar.', intention: 'limit', effects: [{ type: 'setFlag', flag: 's07_scope_confirmed', value: true }], nextSceneId: 's07_support' }, { id: 's07_agree_exception', text: 'Preguntar cómo quiere enterarse si el alcance necesita cambiar.', intention: 'question', effects: [{ type: 'changeStat', stat: 'trust', amount: 3 }], nextSceneId: 's07_support' }],
  },
  s07_mother_reply: {
    id: 's07_mother_reply', sessionId: 'S07', kind: 'dialogue', portraitState: 'vulnerable',
    lines: [{ speaker: 'Tomás', text: 'Con mi mamá sola capaz puedo hablar. Pero no quiero que me pregunte delante de mi viejo.' }],
    choices: [{ id: 's07_mother_private', text: 'Acordar una conversación breve y privada con Laura.', intention: 'limit', effects: [{ type: 'changeStat', stat: 'maternal_bond', amount: 4 }, { type: 'setFlag', flag: 's07_private_mother_talk', value: true }], nextSceneId: 's07_support' }, { id: 's07_mother_words', text: 'Preguntar qué frase podría ayudar a Laura a no interrogarlo.', intention: 'deepen', effects: [{ type: 'changeStat', stat: 'autonomy', amount: 2 }], nextSceneId: 's07_support' }],
  },
  s07_parents: {
    id: 's07_parents', sessionId: 'S07', kind: 'dialogue', portraitState: 'defensive',
    lines: [
      { speaker: 'Tomás', text: 'Ya les contaste.' },
      { speaker: 'Julián', text: 'Sí. Tendría que haberte explicado antes qué iba a compartir.' },
      { speaker: 'Tomás', text: 'Mi mamá va a querer saber cada detalle. Mi papá va a decir que no le dé importancia. Y yo voy a estar en el medio.' },
    ],
    choices: [
      { id: 's07_acknowledge_cost', text: 'Reconocer el costo para él y preguntarle cómo quiere participar ahora.', effects: [{ type: 'changeStat', stat: 'trust', amount: 3 }, { type: 'changeStat', stat: 'autonomy', amount: 3 }], nextSceneId: 's07_close' },
      { id: 's07_justify_parents', text: 'Decirle que sus padres necesitan saberlo porque están preocupados.', effects: [{ type: 'changeStat', stat: 'trust', amount: -4 }, { type: 'changeStat', stat: 'autonomy', amount: -3 }], nextSceneId: 's07_close' },
    ],
  },
  s07_support: {
    id: 's07_support', sessionId: 'S07', kind: 'dialogue', portraitState: 'uneasy',
    lines: [
      { speaker: 'Julián', text: 'Antes de hablar con Laura, acordamos juntos qué información mínima le sirve para acompañarte.' , conditions: [{ type: 'flagIs', flag: 's07_parents_informed_with_tomas', value: true }] },
      { speaker: 'Julián', text: 'Le pido a Laura una conversación breve, como acordamos, sin convertirla en una reunión sobre vos.' , conditions: [{ type: 'flagIs', flag: 's07_mother_support_requested', value: true }] },
      { speaker: 'Laura', text: 'Puedo estar cerca sin pedirte que me cuentes todo ahora.' , conditions: [{ type: 'any', conditions: [{ type: 'flagIs', flag: 's07_parents_informed_with_tomas', value: true }, { type: 'flagIs', flag: 's07_mother_support_requested', value: true }] }] },
      { speaker: 'Tomás', text: 'No quiero que decidan por mí qué tengo que hacer mañana.' },
      { speaker: 'Julián', text: 'Entonces esa decisión la hablamos con vos presente.' },
    ],
    choices: [{ id: 's07_support_close', text: 'Agradecerle a Tomás que marcara ese límite y cerrar la conversación con sus padres.', intention: 'validate', nextSceneId: 's07_close' }, { id: 's07_support_check', text: 'Pedirle que corrija el acuerdo si algo no representa lo que quiere.', intention: 'question', effects: [{ type: 'changeStat', stat: 'autonomy', amount: 2 }], nextSceneId: 's07_close' }],
  },
  s07_close: {
    id: 's07_close', sessionId: 'S07', kind: 'dialogue', label: 'Cierre de sesión', portraitState: 'defensive',
    lines: [
      { speaker: 'Tomás', text: 'Cada vez que pasa algo, terminan hablando todos menos yo.' },
      { speaker: 'Narración', tone: 'thought', text: 'La pelea, los rumores y la reacción familiar quedan juntos en el expediente, pero no explican por sí solos qué ocurrió años atrás.' },
    ],
    choices: [{ id: 's07_end', text: 'Terminar la sesión.', nextSceneId: 'between_s07' }],
  },
  between_s07: {
    id: 'between_s07', sessionId: 'S07', kind: 'interlude', label: 'Entre sesiones',
    lines: [{ speaker: 'Narración', tone: 'thought', text: 'La nueva publicación agranda el rumor, pero no confirma quién la originó. Julián sabe que la próxima conversación puede reparar o profundizar la ruptura.' }],
    choices: [{ id: 's07_next', text: 'Recibir a Tomás.', nextSceneId: 's08_open' }],
  },
  s08_open: {
    id: 's08_open', sessionId: 'S08', kind: 'dialogue', label: '“La prueba”', portraitState: 'defensive',
    lines: [
      { speaker: 'Tomás', text: 'Cada vez que apareció algo, me preguntaste si había sido yo.', conditions: [{ type: 'flagIs', flag: 's04_accused_tomas', value: true }] },
      { speaker: 'Tomás', text: 'La otra vez anotaste solo lo que acordamos. Por eso te lo voy a decir una vez.', conditions: [{ type: 'flagIs', flag: 's04_minimal_record', value: true }] },
      { speaker: 'Tomás', text: 'Dijiste que todavía no sabíamos quién lo había mandado. Acordate de eso.', conditions: [{ type: 'flagIs', flag: 's04_attribution_deferred', value: true }] },
      { speaker: 'Tomás', text: '¿Para qué querés que te cuente algo si después se lo decís a todos?' },
      { speaker: 'Tomás', text: 'La vez de la pelea no había pasado. Te lo dije para ver qué hacías.' },
      { speaker: 'Narración', tone: 'thought', text: 'La frase de S02 cambia de sentido. Julián no puede deshacer lo que hizo ni pedirle a Tomás que confíe de inmediato.' },
    ],
    choices: [
      { id: 's08_apologize', text: '“Lo manejé mal. No tendría que haber hablado por vos sin explicarte qué iba a hacer.”', effects: [{ type: 'changeStat', stat: 'trust', amount: 18 }, { type: 'changeStat', stat: 'autonomy', amount: 6 }, { type: 'changeStat', stat: 'perceived_support', amount: 6 }, { type: 'changeStat', stat: 'investigation_bias', amount: -4 }, { type: 'setFlag', flag: 's08_julian_apologized', value: true }], nextSceneId: 's08_full_reveal', importantDecision: true },
      { id: 's08_justify', text: '“Me preocupé y pensé que tus padres debían saberlo.”', effects: [{ type: 'changeStat', stat: 'trust', amount: -10 }, { type: 'changeStat', stat: 'autonomy', amount: -4 }, { type: 'setFlag', flag: 's08_julian_justified', value: true }], nextSceneId: 's08_partial', importantDecision: true },
      { id: 's08_defensive', text: '“No podías esperar que supiera que estabas probándome.”', effects: [{ type: 'changeStat', stat: 'trust', amount: -16 }, { type: 'changeStat', stat: 'autonomy', amount: -8 }, { type: 'changeStat', stat: 'perceived_support', amount: -6 }, { type: 'setFlag', flag: 's08_julian_defended', value: true }], nextSceneId: 's08_partial', importantDecision: true },
    ],
  },
  s08_full_reveal: {
    id: 's08_full_reveal', sessionId: 'S08', kind: 'dialogue', portraitState: 'vulnerable',
    lines: [
      { speaker: 'Tomás', text: 'Bruno no había hecho lo que decían. Camila nunca dijo eso de él.' },
      { speaker: 'Julián', text: '¿Qué dijo ella?' },
      { speaker: 'Tomás', text: 'No sé todo. Sé que habló de Lagos y después los demás empezaron a contar otra cosa.' },
      { speaker: 'Tomás', text: 'Santiago también estaba ahí. No fui el único que lo vio.' },
      { speaker: 'Tomás', text: 'No te estoy pidiendo que arregles el caso.' },
    ],
    choices: [{ id: 's08_heard', text: 'Agradecerle que haya decidido contarlo y preguntarle qué necesita ahora.', intention: 'validate', effects: [{ type: 'addClue', entry: { id: 's08_false_accusation', title: 'La acusación no coincide', text: 'Tomás dice que Bruno fue señalado por algo que Camila no acusó en esos términos. El relato de ella todavía no se conoce directamente.', category: 'school-history', sessionId: 'S08', confirmed: true } }, { type: 'addPerson', entry: { id: 'person_camila', title: 'Camila Torres', text: 'Ex estudiante que, según Tomás, habló sobre Lagos. Tomás afirma que la acusación difundida en nombre de ella no coincide con lo que dijo.', category: 'school-history', sessionId: 'S08' } }], nextSceneId: 's08_close' }, { id: 's08_define_use', text: 'Preguntar qué permite hacer con esa información y qué debe quedar en la sesión.', intention: 'limit', effects: [{ type: 'changeStat', stat: 'autonomy', amount: 4 }, { type: 'setFlag', flag: 's08_information_scope', value: true }], nextSceneId: 's08_close' }],
  },
  s08_partial: {
    id: 's08_partial', sessionId: 'S08', kind: 'dialogue', portraitState: 'defensive',
    lines: [
      { speaker: 'Tomás', text: 'No quiero explicarte el resto ahora. Me escuchaste solo para decirme por qué vos tenías razón.', conditions: [{ type: 'flagIs', flag: 's08_julian_justified', value: true }] },
      { speaker: 'Tomás', text: 'No quiero explicarte el resto ahora. Si la prueba te molestó más que lo que yo temía, no entendiste nada.', conditions: [{ type: 'flagIs', flag: 's08_julian_defended', value: true }] },
      { speaker: 'Narración', tone: 'thought', text: 'Tomás no confirma los detalles del caso antiguo en esta sesión. La ruptura no vuelve falsa su historia; limita lo que está dispuesto a confiarle a Julián.' },
    ],
    choices: [{ id: 's08_partial_respect', text: 'Respetar el límite y dejar claro que no necesita seguir hoy.', intention: 'validate', effects: [{ type: 'changeStat', stat: 'autonomy', amount: 2 }], nextSceneId: 's08_close' }, { id: 's08_partial_repair', text: 'Reconocer que tu respuesta volvió a centrar la conversación en vos.', intention: 'apologize', effects: [{ type: 'changeStat', stat: 'trust', amount: 3 }], nextSceneId: 's08_close' }],
  },
  s08_close: {
    id: 's08_close', sessionId: 'S08', kind: 'dialogue', label: 'Cierre de sesión', portraitState: 'uneasy',
    lines: [{ speaker: 'Tomás', text: 'No sé si tendría que habértelo contado.' }, { speaker: 'Julián', text: 'No tenés que resolverlo hoy.' }],
    choices: [{ id: 's08_end', text: 'Cerrar la sesión sin pedir más detalles.', nextSceneId: 'between_s08' }],
  },
  between_s08: {
    id: 'between_s08', sessionId: 'S08', kind: 'interlude', label: 'Entre sesiones',
    lines: [
      { speaker: 'Narración', tone: 'thought', text: 'La primera pelea queda reinterpretada como una prueba de confianza. Resolver ese dato no recompone automáticamente la relación.' },
      { speaker: 'Narración', tone: 'thought', text: 'La evidencia reunida todavía no explica toda la historia de Bruno ni lo ocurrido con Camila.' },
    ],
    choices: [{ id: 's08_next', text: 'Continuar con la próxima sesión.', nextSceneId: 's09_open' }],
  },
  s09_open: {
    id: 's09_open', sessionId: 'S09', kind: 'dialogue', label: '“Controlaron la situación”', portraitState: 'uneasy',
    lines: [
      { speaker: 'Tomás', text: 'Santiago estaba conmigo. Los dos escuchamos a Lagos y a Verónica decir que habían “controlado la situación”.' },
      { speaker: 'Tomás', text: 'Lagos apuró a Camila y cambió cómo sonaba lo que ella quería contar. Ella se fue de la escuela después, por decisión propia.' },
      { speaker: 'Julián', text: '¿Qué entendieron en ese momento?' },
      { speaker: 'Tomás', text: 'Que Bruno decía la verdad. Decía que tenía pruebas, pidió ayuda y nosotros dudamos.' },
      { speaker: 'Narración', tone: 'thought', text: 'La información permite reconstruir contradicciones, pero no establece una causa única para la muerte de Bruno.' },
    ],
    topics: [
      { id: 's09_topic_santiago', label: 'Santiago como testigo', requiredTrust: 0, sceneId: 's09_santiago', effects: [{ type: 'addPerson', entry: { id: 'person_santiago_witness', title: 'Santiago Acosta, testigo', text: 'Tomás confirma que Santiago también escuchó a Lagos y Verónica hablar de haber “controlado la situación”.', category: 'school-history', sessionId: 'S09' } }] },
      { id: 's09_topic_camila', label: 'Qué pasó con el relato de Camila', requiredTrust: 25, sceneId: 's09_camila', effects: [{ type: 'addContradiction', entry: { id: 's09_camila_account', title: 'Relato de Camila vs. rumor escolar', text: 'Tomás afirma que Camila nunca acusó a Bruno en los términos que circularon. La versión directa de Camila aún no está disponible.', category: 'school-history', sessionId: 'S09' } }] },
      { id: 's09_topic_lagos', label: 'Lagos y Verónica', requiredTrust: 35, sceneId: 's09_lagos', effects: [{ type: 'addClue', entry: { id: 's09_controlled_situation', title: '“Controlaron la situación”', text: 'Tomás y Santiago escucharon a Lagos y Verónica referirse a haber “controlado la situación”. El contexto completo no está reconstruido.', category: 'school-history', sessionId: 'S09', confirmed: true } }] },
      { id: 's09_topic_bruno', label: 'Lo que Bruno pidió', requiredTrust: 35, sceneId: 's09_bruno', effects: [{ type: 'addObservation', entry: { id: 's09_bruno_asked_help', title: 'Bruno pidió ayuda', text: 'Tomás recuerda que Bruno decía tener pruebas y pidió ayuda. Tomás y Santiago dudaron entonces; no se establece una causa única para su muerte.', category: 'school-history', sessionId: 'S09' } }] },
    ],
    choices: [
      { id: 's09_listen_impact', text: 'Preguntar qué significa para Tomás recordar que dudaron.', intention: 'deepen', effects: [{ type: 'changeStat', stat: 'perceived_support', amount: 5 }, { type: 'changeStat', stat: 'guilt', amount: -3 }], nextSceneId: 's09_impact_reply' },
      { id: 's09_build_timeline', text: 'Ordenar fechas, personas y documentos antes de preguntarle cómo está.', intention: 'confront', effects: [{ type: 'changeStat', stat: 'trust', amount: -4 }, { type: 'changeStat', stat: 'investigation_bias', amount: 8 }, { type: 'changeStat', stat: 'perceived_support', amount: -3 }], nextSceneId: 's09_timeline_reply' },
      { id: 's09_define_scope', text: 'Preguntar qué parte quiere comprender y qué parte no quiere cargar.', intention: 'limit', effects: [{ type: 'changeStat', stat: 'autonomy', amount: 4 }], nextSceneId: 's09_scope_reply' },
    ],
  },
  s09_impact_reply: {
    id: 's09_impact_reply', sessionId: 'S09', kind: 'dialogue', portraitState: 'vulnerable',
    lines: [{ speaker: 'Tomás', text: 'Significa que cuando él pidió ayuda yo elegí creer que un adulto ya sabía más. Es más fácil decir eso que admitir que no quise meterme.' }],
    choices: [{ id: 's09_separate_guilt', text: 'Distinguir responsabilidad, culpa y lo que Tomás podía saber entonces.', intention: 'validate', effects: [{ type: 'changeStat', stat: 'guilt', amount: -4 }], nextSceneId: 's09_close' }, { id: 's09_remember_bruno', text: 'Preguntar qué recuerda de Bruno fuera del conflicto.', intention: 'deepen', nextSceneId: 's09_close' }],
  },
  s09_timeline_reply: {
    id: 's09_timeline_reply', sessionId: 'S09', kind: 'dialogue', portraitState: 'defensive',
    lines: [{ speaker: 'Tomás', text: 'Te puedo dar fechas. Lo que no sé es si después vas a recordar que yo estaba ahí y no soy un documento.' }],
    choices: [{ id: 's09_timeline_repair', text: 'Detener la cronología y preguntarle cómo está ahora.', intention: 'apologize', effects: [{ type: 'changeStat', stat: 'trust', amount: 3 }], nextSceneId: 's09_close' }, { id: 's09_timeline_continue', text: 'Terminar primero el orden de los hechos para no perder información.', intention: 'justify', effects: [{ type: 'changeStat', stat: 'investigation_bias', amount: 4 }, { type: 'changeStat', stat: 'isolation', amount: 2 }], nextSceneId: 's09_close' }],
  },
  s09_scope_reply: {
    id: 's09_scope_reply', sessionId: 'S09', kind: 'dialogue', portraitState: 'uneasy',
    lines: [{ speaker: 'Tomás', text: 'Quiero entender por qué cambiaron la historia. No quiero ser el que tenga que demostrar solo todo lo demás.' }],
    choices: [{ id: 's09_scope_record', text: 'Registrar ese límite y acordar qué no se investigará desde la sesión.', intention: 'limit', effects: [{ type: 'setFlag', flag: 's09_scope_agreed', value: true }, { type: 'changeStat', stat: 'trust', amount: 3 }], nextSceneId: 's09_close' }, { id: 's09_scope_support', text: 'Preguntar quién podría compartir esa carga sin exponerlo.', intention: 'question', effects: [{ type: 'changeStat', stat: 'external_support', amount: 3 }], nextSceneId: 's09_close' }],
  },
  s09_camila: {
    id: 's09_camila', sessionId: 'S09', kind: 'dialogue', portraitState: 'uneasy',
    lines: [
      { speaker: 'Julián', text: '¿Qué sabés de lo que Camila dijo realmente?' },
      { speaker: 'Tomás', text: 'Que intentó hablar de Lagos. Después la historia empezó a circular con palabras que ella no había usado.' },
      { speaker: 'Tomás', text: 'No voy a hablar por ella ni a repetir el rumor como si fuera su voz.' },
    ],
    choices: [back('s09_open')],
  },
  s09_lagos: {
    id: 's09_lagos', sessionId: 'S09', kind: 'dialogue', portraitState: 'defensive',
    lines: [
      { speaker: 'Tomás', text: 'Lagos hablaba como si ya supiera qué iba a decir Camila.' },
      { speaker: 'Tomás', text: 'Después Verónica dijo que lo habían controlado. No sé qué hicieron con los papeles.' },
      { speaker: 'Julián', text: 'No voy a completar los espacios con una suposición.' },
    ],
    choices: [back('s09_open')],
  },
  s09_santiago: {
    id: 's09_santiago', sessionId: 'S09', kind: 'dialogue', portraitState: 'uneasy',
    lines: [
      { speaker: 'Julián', text: '¿Santiago escuchó lo mismo que vos?' },
      { speaker: 'Tomás', text: 'Sí. No sé qué diría ahora. No somos los mismos amigos de antes.' },
      { speaker: 'Tomás', text: 'Y que lo confirme no significa que me perdone ni que yo lo perdone.' },
    ],
    choices: [back('s09_open')],
  },
  s09_bruno: {
    id: 's09_bruno', sessionId: 'S09', kind: 'dialogue', portraitState: 'vulnerable',
    lines: [
      { speaker: 'Tomás', text: 'Bruno me pidió que lo escuchara. Yo pensé que los adultos ya lo estaban haciendo.' },
      { speaker: 'Julián', text: '¿Qué te gustaría que supiera de él, además de lo que pasó?' },
      { speaker: 'Tomás', text: 'Que era gracioso cuando quería. Y que odiaba que todos hablaran de él como si fuera una noticia.' },
      { speaker: 'Narración', tone: 'thought', text: 'La conversación deja lugar para que Bruno exista más allá del caso, sin convertir su muerte en una explicación simple.' },
    ],
    choices: [back('s09_open')],
  },
  s09_close: {
    id: 's09_close', sessionId: 'S09', kind: 'dialogue', label: 'Cierre de sesión', portraitState: 'uneasy',
    lines: [
      { speaker: 'Tomás', text: 'No quiero que todo lo que te cuente termine convertido en una lista de pruebas.' },
      { speaker: 'Julián', text: 'Lo entiendo.' },
    ],
    choices: [{ id: 's09_end', text: 'Dejar los documentos para otro momento y cerrar la sesión.', nextSceneId: 'between_s09' }],
  },
  between_s09: {
    id: 'between_s09', sessionId: 'S09', kind: 'interlude', label: 'Entre sesiones',
    lines: [{ speaker: 'Narración', tone: 'thought', text: 'Los relatos conectan a Camila, Lagos, Verónica, Bruno, Tomás y Santiago, pero faltan piezas. Tomás menciona por primera vez que conserva algo que Bruno le dejó.' }],
    choices: [{ id: 's09_next', text: 'Preguntar por lo que Bruno le dejó.', nextSceneId: 's10_open' }],
  },
  s10_open: {
    id: 's10_open', sessionId: 'S10', kind: 'dialogue', label: '“La memoria”', portraitState: 'vulnerable',
    lines: [
      { speaker: 'Tomás', text: 'Hay algo que Bruno me dio antes. Nunca lo abrí.' },
      { speaker: 'Narración', tone: 'thought', text: 'Tomás deja una memoria USB sobre la mesa, sin conectarla. No parece seguro de querer mirar lo que contiene.' },
      { speaker: 'Tomás', text: 'No sé si quiero saber qué hay. Una parte de mí cree que tendría que haber hecho algo antes.' },
    ],
    choices: [
      { id: 's10_support_before_opening', text: 'Reconocer la culpa y preguntarle si quiere abrirla juntos o dejarla para otro día.', intention: 'validate', effects: [{ type: 'changeStat', stat: 'trust', amount: 10 }, { type: 'changeStat', stat: 'perceived_support', amount: 10 }, { type: 'changeStat', stat: 'guilt', amount: -12 }, { type: 'setFlag', flag: 's10_supported_before_usb', value: true }, { type: 'setFlag', flag: 'usb_opened', value: true }], nextSceneId: 's10_support_reply' },
      { id: 's10_investigate_usb', text: 'Pedirle que la conecte para revisar qué evidencia guardó Bruno.', intention: 'confront', effects: [{ type: 'changeStat', stat: 'trust', amount: -7 }, { type: 'changeStat', stat: 'investigation_bias', amount: 10 }, { type: 'changeStat', stat: 'guilt', amount: 4 }, { type: 'setFlag', flag: 'usb_opened', value: true }, { type: 'setFlag', flag: 's10_evidence_first', value: true }], nextSceneId: 's10_investigate_reply', importantDecision: true },
      { id: 's10_pause_before_usb', text: 'Proponer una pausa y dejar que Tomás elija cuándo conectarla dentro de la sesión.', intention: 'silence', effects: [{ type: 'changeStat', stat: 'autonomy', amount: 5 }, { type: 'changeStat', stat: 'perceived_support', amount: 3 }, { type: 'setFlag', flag: 'usb_opened', value: true }, { type: 'setFlag', flag: 's10_pause_respected', value: true }], nextSceneId: 's10_pause_reply' },
    ],
  },
  s10_support_reply: {
    id: 's10_support_reply', sessionId: 'S10', kind: 'dialogue', portraitState: 'vulnerable',
    lines: [{ speaker: 'Tomás', text: 'Quiero abrirla. Pero si encuentro algo no significa que esté listo para entregárselo a alguien.' }],
    choices: [{ id: 's10_support_scope', text: 'Acordar que mirar no autoriza todavía a compartir.', intention: 'limit', effects: [{ type: 'setFlag', flag: 's10_usb_scope_agreed', value: true }], nextSceneId: 's10_file_hub' }, { id: 's10_support_feeling', text: 'Preguntar qué necesita si aparece algo difícil de leer.', intention: 'question', effects: [{ type: 'changeStat', stat: 'perceived_support', amount: 3 }], nextSceneId: 's10_file_hub' }],
  },
  s10_investigate_reply: {
    id: 's10_investigate_reply', sessionId: 'S10', kind: 'dialogue', portraitState: 'defensive',
    lines: [{ speaker: 'Tomás', text: 'Ni siquiera preguntaste si quería verla. Ya estás hablando de evidencia.' }],
    choices: [{ id: 's10_investigate_repair', text: 'Reconocer el apuro y pedir permiso antes de conectarla.', intention: 'apologize', effects: [{ type: 'changeStat', stat: 'trust', amount: 3 }], nextSceneId: 's10_file_hub' }, { id: 's10_investigate_continue', text: 'Sostener que el contenido puede aclarar el caso antiguo.', intention: 'justify', effects: [{ type: 'changeStat', stat: 'investigation_bias', amount: 4 }, { type: 'changeStat', stat: 'trust', amount: -3 }], nextSceneId: 's10_file_hub' }],
  },
  s10_pause_reply: {
    id: 's10_pause_reply', sessionId: 'S10', kind: 'dialogue', portraitState: 'uneasy',
    lines: [{ speaker: 'Narración', tone: 'thought', text: 'Tomás sostiene la memoria cerrada en la mano. Después de un rato, la deja junto a la computadora.' }, { speaker: 'Tomás', text: 'La abrimos. Un archivo primero. Si digo que paremos, paramos.' }],
    choices: [{ id: 's10_pause_confirm', text: 'Confirmar que puede detener la revisión sin justificarse.', intention: 'limit', effects: [{ type: 'changeStat', stat: 'autonomy', amount: 3 }], nextSceneId: 's10_file_hub' }, { id: 's10_pause_choose', text: 'Dejar que Tomás elija qué archivo abrir primero.', intention: 'silence', effects: [{ type: 'changeStat', stat: 'trust', amount: 2 }], nextSceneId: 's10_file_hub' }],
  },
  s10_file_hub: {
    id: 's10_file_hub', sessionId: 'S10', kind: 'decision', label: 'USB · Archivos disponibles', portraitState: 'uneasy',
    lines: [
      { speaker: 'Narración', tone: 'thought', text: 'Con el permiso de Tomás, Julián abre la memoria. Hay mensajes, correos, una nota y una captura. Ningún archivo explica por sí solo todo lo que pasó.' },
      { speaker: 'Tomás', text: 'Podemos mirar uno. Si se vuelve demasiado, paramos.' },
    ],
    topics: [
      { id: 's10_file_messages', label: 'Mensajes entre Bruno y un contacto', kind: 'document', consumesTopicSlot: false, sceneId: 's10_usb_messages', effects: [{ type: 'addClue', entry: { id: 's10_bruno_messages', title: 'Mensajes personales de Bruno', text: 'Los mensajes muestran humor seco, gustos y una amistad que atravesaba tensiones. No aportan una explicación total de su muerte.', category: 'usb/messages', sessionId: 'S10', confirmed: true } }] },
      { id: 's10_file_email', label: 'Un correo guardado como borrador', kind: 'document', consumesTopicSlot: false, sceneId: 's10_usb_email', effects: [{ type: 'addClue', entry: { id: 's10_bruno_email', title: 'Correo sin enviar', text: 'Bruno menciona que hay versiones que no coinciden y que quiere hablar con alguien. El correo no identifica una solución ni quién modificó los registros.', category: 'usb/email', sessionId: 'S10', confirmed: true } }] },
      { id: 's10_file_note', label: 'Una nota personal', kind: 'document', consumesTopicSlot: false, sceneId: 's10_usb_note', effects: [{ type: 'addClue', entry: { id: 's10_bruno_note', title: 'Nota: “Todos estábamos ahí”', text: 'La frase aparece sin un referente claro. No permite saber a quién incluye ni a qué momento se refiere.', category: 'usb/notes', sessionId: 'S10', confirmed: true } }] },
      { id: 's10_file_capture', label: 'Una captura de una conversación', kind: 'document', consumesTopicSlot: false, sceneId: 's10_usb_image', effects: [{ type: 'addClue', entry: { id: 's10_bruno_capture', title: 'Captura incompleta', text: 'La captura muestra una conversación cortada y varias respuestas ausentes. Confirma que existía una discusión, no su contexto completo.', category: 'usb/captures', sessionId: 'S10', confirmed: true } }] },
    ],
    choices: [{ id: 's10_done_files', text: 'Cerrar los archivos y preguntarle a Tomás cómo quedó.', nextSceneId: 's10_close' }],
  },
  s10_usb_messages: {
    id: 's10_usb_messages', sessionId: 'S10', kind: 'dialogue', label: 'USB · Mensajes',
    lines: [
      { speaker: 'Documento', tone: 'document', text: 'Bruno: “Si vuelvo a escuchar ese disco voy a demandar a alguien por daños emocionales.”' },
      { speaker: 'Documento', tone: 'document', text: 'Respuesta: “No podés demandar a una canción.” Bruno: “Mirá cómo puedo.”' },
      { speaker: 'Narración', tone: 'thought', text: 'Entre bromas hay mensajes afectuosos y otros tensos. No es posible saber por esos fragmentos cómo terminó la relación.' },
    ],
    choices: [back('s10_file_hub', 'Volver a la lista de archivos.')],
  },
  s10_usb_email: {
    id: 's10_usb_email', sessionId: 'S10', kind: 'dialogue', label: 'USB · Correo',
    lines: [
      { speaker: 'Documento', tone: 'document', text: 'Borrador: “Las fechas no coinciden. No quiero que esto se convierta en otra versión que nadie pueda corregir. ¿Podemos hablar?”' },
      { speaker: 'Narración', tone: 'thought', text: 'No hay destinatario visible ni respuesta. El borrador solo confirma que Bruno veía contradicciones y quería hablar.' },
    ],
    choices: [back('s10_file_hub', 'Volver a la lista de archivos.')],
  },
  s10_usb_note: {
    id: 's10_usb_note', sessionId: 'S10', kind: 'dialogue', label: 'USB · Nota',
    lines: [
      { speaker: 'Documento', tone: 'document', text: '“Todos estábamos ahí.”' },
      { speaker: 'Tomás', text: 'No sé si habla de mí. No sé si habla de ese día.' },
      { speaker: 'Narración', tone: 'thought', text: 'La frase es ambigua y permanece así. No señala a una persona ni completa una escena.' },
    ],
    choices: [back('s10_file_hub', 'Volver a la lista de archivos.')],
  },
  s10_usb_image: {
    id: 's10_usb_image', sessionId: 'S10', kind: 'dialogue', label: 'USB · Captura',
    lines: [
      { speaker: 'Documento', tone: 'document', text: 'La imagen contiene una fecha, dos nombres parcialmente cubiertos y una respuesta que comienza: “No fue eso lo que ella dijo”. El resto no está en la captura.' },
      { speaker: 'Tomás', text: 'Cada vez que la miro parece que falta justo la parte que necesito.' },
    ],
    choices: [back('s10_file_hub', 'Volver a la lista de archivos.')],
  },
  s10_close: {
    id: 's10_close', sessionId: 'S10', kind: 'dialogue', label: 'Cierre de sesión', portraitState: 'uneasy',
    lines: [
      { speaker: 'Julián', text: '¿Qué te pasa después de mirar esos fragmentos?' },
      { speaker: 'Tomás', text: 'Pensé que tendría respuestas. Ahora estoy enojado con quienes dejaron que todo quedara así.' },
      { speaker: 'Tomás', text: 'Y también sigo pensando que tendría que haberlo ayudado.' },
    ],
    choices: [
      { id: 's10_validate_both', text: 'Reconocer que puede sentir culpa y bronca a la vez, sin pedirle que elija una.', effects: [{ type: 'changeStat', stat: 'perceived_support', amount: 4 }, { type: 'changeStat', stat: 'guilt', amount: -3 }], nextSceneId: 'between_s10' },
      { id: 's10_keep_investigating', text: 'Preguntar quién dejó que los registros se contradijeran.', effects: [{ type: 'changeStat', stat: 'trust', amount: -4 }, { type: 'changeStat', stat: 'investigation_bias', amount: 5 }], nextSceneId: 'between_s10' },
      { id: 's10_silence', text: 'Quedarte en silencio con él un momento.', effects: [{ type: 'changeStat', stat: 'trust', amount: 3 }, { type: 'changeStat', stat: 'perceived_support', amount: 3 }], nextSceneId: 'between_s10' },
    ],
  },
  between_s10: {
    id: 'between_s10', sessionId: 'S10', kind: 'interlude', label: 'Cierre del Acto II',
    lines: [
      { speaker: 'Narración', tone: 'thought', text: 'Esa noche circula una nueva filtración: un recorte borroso con frases parecidas a las de la memoria USB. No muestra el archivo completo ni quién lo publicó.' },
      { speaker: 'Narración', tone: 'thought', text: 'La evidencia creció. La culpa de Tomás no se resolvió con abrir la memoria, y el remitente sigue sin confirmarse.' },
    ],
    choices: [],
  },
}
