import { INITIAL_STATS } from '../../features/story/engine.ts'
import type { StoryCampaign, StoryScene } from '../../features/story/types'
import { actTwoScenes, actTwoSessions } from './act-two.ts'
import { actThreeScenes, actThreeSessions } from './act-three.ts'
import { actFourScenes, actFourSessions } from './act-four.ts'

const backTo = (sceneId: string) => ({ id: `return_${sceneId}`, text: 'Volver a la conversación.', nextSceneId: sceneId })

const scenes: Record<string, StoryScene> = {
  prologue_entry: {
    id: 'prologue_entry', sessionId: 'PROLOGUE', kind: 'dialogue', label: 'Antes de la primera sesión',
    lines: [
      { speaker: 'Narración', tone: 'thought', text: 'El expediente llega con pocas páginas y demasiadas voces. Antes de conocer a Tomás, Julián tiene una supervisora disponible: la Lic. Marina Salas. La primera entrevista es con sus padres.' },
      { speaker: 'Laura', text: 'No sé qué hacer para que me cuente algo. A veces le pregunto cómo estuvo y me dice “normal” sin levantar la vista.' },
      { speaker: 'Marcelo', text: 'Está en una edad difícil. Si dejamos de hacer un tema de cada cosa, capaz se le pasa.' },
      { speaker: 'Julián', tone: 'thought', text: 'Laura parece asustada. Marcelo intenta cerrar la conversación antes de que se vuelva demasiado grande.' },
    ],
    choices: [
      { id: 'prologue_listen', text: 'Proponer que la primera sesión empiece por lo que Tomás quiera contar.', effects: [{ type: 'changeStat', stat: 'trust', amount: 4 }, { type: 'changeStat', stat: 'autonomy', amount: 3 }, { type: 'setFlag', flag: 'prologue_prioritized_listening', value: true }], nextSceneId: 'prologue_close' },
      { id: 'prologue_changes', text: 'Preguntar qué cambios concretos notaron en los últimos meses.', effects: [{ type: 'changeStat', stat: 'investigation_bias', amount: 4 }, { type: 'addObservation', entry: { id: 'prologue_family_changes', title: 'Cambios que preocupan a la familia', text: 'Laura nota que Tomás se encierra más; Marcelo cree que puede ser una etapa. Son perspectivas distintas, no una explicación.', sessionId: 'PROLOGUE' } }], nextSceneId: 'prologue_close' },
      { id: 'prologue_school', text: 'Preguntar primero qué está pasando en la escuela.', effects: [{ type: 'changeStat', stat: 'investigation_bias', amount: 7 }, { type: 'setFlag', flag: 'prologue_school_first', value: true }], nextSceneId: 'prologue_close' },
    ],
  },
  prologue_close: {
    id: 'prologue_close', sessionId: 'PROLOGUE', kind: 'dialogue', label: 'La primera cita',
    lines: [
      { speaker: 'Laura', text: 'No quiero que sienta que lo trajimos para que lo arreglen.' },
      { speaker: 'Marcelo', text: 'Yo solo quiero que vuelva a ir a la escuela sin que cada mañana sea una discusión.' },
      { speaker: 'Julián', tone: 'thought', text: 'La sala de espera queda en silencio. Marina le dejó dicho que puede llamarla después de la entrevista si necesita ordenar lo ocurrido.' },
    ],
    choices: [{ id: 'begin_s01', text: 'Abrir la puerta y recibir a Tomás.', nextSceneId: 's01_open' }],
  },
  s01_open: {
    id: 's01_open', sessionId: 'S01', kind: 'dialogue', label: '“¿Eso era todo?”', portraitState: 'defensive',
    lines: [
      { speaker: 'Narración', tone: 'thought', text: 'Tomás entra después de que Laura lo llama dos veces. Se sienta en el borde de la silla, todavía con la campera puesta.' },
      { speaker: 'Tomás', text: 'Vine porque me dijeron que tenía que venir. No sé qué se supone que haga acá.' },
      { speaker: 'Tomás', text: '¿Vas a preguntarme cosas hasta que diga algo interesante? Así por lo menos aprovechamos la hora.' },
    ],
    topics: [
      { id: 's01_topic_therapy', label: 'Qué piensa de estar en terapia', requiredTrust: 0, sceneId: 's01_therapy' },
      { id: 's01_topic_parents', label: 'La relación con sus padres', requiredTrust: 20, sceneId: 's01_parents' },
      { id: 's01_topic_school', label: 'La escuela', requiredTrust: 25, sceneId: 's01_school' },
      { id: 's01_topic_months', label: 'Los últimos meses', requiredTrust: 25, sceneId: 's01_months' },
    ],
    choices: [
      { id: 's01_open_pace', text: '“No tenés que contarme nada hoy. Podemos empezar por qué no querés estar acá.”', intention: 'validate', effects: [{ type: 'changeStat', stat: 'autonomy', amount: 3 }, { type: 'setFlag', flag: 's01_opening_pace', value: true }], nextSceneId: 's01_pace_reply' },
      { id: 's01_open_change', text: '“Podemos usar la hora para una cosa que quieras que cambie.”', intention: 'question', effects: [{ type: 'changeStat', stat: 'trust', amount: 1 }, { type: 'setFlag', flag: 's01_opening_change', value: true }], nextSceneId: 's01_change_reply' },
      { id: 's01_open_framework', text: '“Prefiero explicarte cómo trabajo antes de pedirte algo.”', intention: 'limit', effects: [{ type: 'setFlag', flag: 's01_framework_first', value: true }], nextSceneId: 's01_framework_reply' },
      { id: 's01_end', text: 'Cerrar la sesión sin forzar otro tema.', intention: 'avoid', nextSceneId: 's01_close' },
    ],
  },
  s01_pace_reply: {
    id: 's01_pace_reply', sessionId: 'S01', kind: 'dialogue', portraitState: 'defensive',
    lines: [{ speaker: 'Tomás', text: '¿Y eso también lo anotás? Porque suena a que igual encontraste una pregunta.' }],
    choices: [{ id: 's01_pace_notebook', text: 'Explicar qué anotás y ofrecerle corregir una impresión.', intention: 'limit', effects: [{ type: 'changeStat', stat: 'trust', amount: 2 }], nextSceneId: 's01_contradiction' }, { id: 's01_pace_reason', text: 'Preguntar qué le preocupa que quede escrito.', intention: 'question', effects: [{ type: 'changeStat', stat: 'fear', amount: -1 }], nextSceneId: 's01_contradiction' }],
  },
  s01_change_reply: {
    id: 's01_change_reply', sessionId: 'S01', kind: 'dialogue', portraitState: 'uneasy',
    lines: [{ speaker: 'Tomás', text: '¿Y si quiero que termine la hora? Eso sería un cambio concreto.' }],
    choices: [{ id: 's01_change_accept', text: 'Aceptar la respuesta y preguntar cómo sabrá que la hora no fue perdida.', intention: 'validate', effects: [{ type: 'changeStat', stat: 'autonomy', amount: 2 }], nextSceneId: 's01_contradiction' }, { id: 's01_change_structure', text: 'Ofrecer diez minutos de conversación y luego revisar si continúa.', intention: 'limit', effects: [{ type: 'setFlag', flag: 's01_time_boundary', value: true }], nextSceneId: 's01_contradiction' }],
  },
  s01_framework_reply: {
    id: 's01_framework_reply', sessionId: 'S01', kind: 'dialogue', portraitState: 'defensive',
    lines: [{ speaker: 'Tomás', text: 'Bueno. Corto. Y decime quién puede leer lo que escribís.' }],
    choices: [{ id: 's01_framework_clear', text: 'Explicar alcance, límites y destinatarios con ejemplos breves.', intention: 'limit', effects: [{ type: 'changeStat', stat: 'autonomy', amount: 2 }, { type: 'setFlag', flag: 's01_notice_promise', value: true }], nextSceneId: 's01_contradiction' }, { id: 's01_framework_worry', text: 'Preguntar qué sería lo peor de que sus padres supieran algo.', intention: 'question', effects: [{ type: 'changeStat', stat: 'fear', amount: 2 }], nextSceneId: 's01_contradiction' }],
  },
  s01_contradiction: {
    id: 's01_contradiction', sessionId: 'S01', kind: 'dialogue', portraitState: 'uneasy',
    lines: [{ speaker: 'Tomás', text: 'Igual no importa. Mañana vuelvo y va a ser lo mismo.' }, { speaker: 'Julián', text: 'Antes dijiste que seguías yendo. Ahora hablás de volver.' }, { speaker: 'Tomás', text: 'No dije que hubiera dejado de ir.' }],
    choices: [{ id: 's01_contradiction_question', text: 'Preguntar si te perdiste algo, sin llamarlo contradicción.', intention: 'question', effects: [{ type: 'setFlag', flag: 's01_contradiction_questioned', value: true }], nextSceneId: 's01_close' }, { id: 's01_contradiction_challenge', text: 'Señalar que las dos frases no coinciden.', intention: 'confront', effects: [{ type: 'changeStat', stat: 'trust', amount: -3 }, { type: 'setFlag', flag: 's01_contradiction_challenged', value: true }], nextSceneId: 's01_close' }, { id: 's01_contradiction_defer', text: 'Dejar la escuela por ahora y preguntarle cómo es volver a casa.', intention: 'redirect', effects: [{ type: 'changeStat', stat: 'autonomy', amount: 2 }, { type: 'setFlag', flag: 's01_contradiction_deferred', value: true }], nextSceneId: 's01_close' }],
  },
  s01_therapy: {
    id: 's01_therapy', sessionId: 'S01', kind: 'dialogue', portraitState: 'defensive',
    lines: [
      { speaker: 'Julián', text: '¿Qué te dijeron que iba a pasar cuando llegaras?' },
      { speaker: 'Tomás', text: 'Que ibas a escuchar. Después mi mamá preguntó si me había gustado. Como si fuera una película.' },
      { speaker: 'Julián', text: 'No tenés que decidir hoy si te sirve. Podemos empezar por lo que te parezca menos ajeno.' },
      { speaker: 'Tomás', text: 'Buenísimo. ¿Hay un catálogo?' },
    ],
    choices: [backTo('s01_open')],
  },
  s01_parents: {
    id: 's01_parents', sessionId: 'S01', kind: 'dialogue', portraitState: 'uneasy',
    lines: [
      { speaker: 'Julián', text: '¿Qué suele pasar cuando intentan hablar en casa?' },
      { speaker: 'Tomás', text: 'Mi mamá pregunta hasta que contesto cualquier cosa. Mi viejo dice que no hay que darle tantas vueltas.' },
      { speaker: 'Tomás', text: 'Los dos creen que encontraron la manera de ayudar. Por separado, más o menos.' },
    ],
    choices: [backTo('s01_open')],
  },
  s01_school: {
    id: 's01_school', sessionId: 'S01', kind: 'dialogue', portraitState: 'defensive',
    lines: [
      { speaker: 'Julián', text: '¿Cómo viene siendo ir a la escuela?' },
      { speaker: 'Tomás', text: 'Voy. La pregunta es cuánto falta para volver.' },
      { speaker: 'Julián', text: '¿Volver de dónde?' },
      { speaker: 'Tomás', text: 'No dije que hubiera dejado de ir.' },
    ],
    choices: [backTo('s01_open')],
  },
  s01_months: {
    id: 's01_months', sessionId: 'S01', kind: 'dialogue', portraitState: 'uneasy',
    lines: [
      { speaker: 'Julián', text: '¿Hubo algo distinto en estos últimos meses?' },
      { speaker: 'Tomás', text: 'Todos preguntan eso como si hubiera una fecha marcada. No sé. Me cansé de algunas cosas.' },
      { speaker: 'Julián', text: '¿De cuáles?' },
      { speaker: 'Tomás', text: 'De que me pregunten cuáles.' },
    ],
    choices: [backTo('s01_open')],
  },
  s01_close: {
    id: 's01_close', sessionId: 'S01', kind: 'dialogue', label: 'Cierre de sesión', portraitState: 'defensive',
    lines: [
      { speaker: 'Narración', tone: 'thought', text: 'Tomás se pone de pie antes de que Julián dé por terminada la hora.' },
      { speaker: 'Tomás', text: '¿Eso era todo?' },
    ],
    choices: [
      { id: 's01_close_explain', text: 'Decirle que la próxima vez puede elegir por dónde empezar.', intention: 'validate', effects: [{ type: 'changeStat', stat: 'autonomy', amount: 4 }, { type: 'changeStat', stat: 'trust', amount: 3 }], nextSceneId: 'between_s01' },
      { id: 's01_close_feedback', text: 'Preguntarle si hubo algo de Julián que le molestó.', intention: 'question', effects: [{ type: 'setFlag', flag: 's01_invited_feedback', value: true }], nextSceneId: 'between_s01' },
      { id: 's01_close_silence', text: 'Guardar silencio y dejar que termine de levantarse.', intention: 'silence', nextSceneId: 'between_s01' },
    ],
  },
  between_s01: {
    id: 'between_s01', sessionId: 'S01', kind: 'interlude', label: 'Entre sesiones',
    lines: [{ speaker: 'Narración', tone: 'thought', text: 'En el pasillo, Laura pregunta si Tomás habló. Marcelo mira el reloj. Julián tiene unos días antes de la próxima sesión y la opción de consultar a Marina.' }],
    choices: [
      { id: 's01_supervision', text: 'Anotar la impresión y reservar la consulta con Marina.', intention: 'validate', effects: [{ type: 'changeStat', stat: 'external_support', amount: 4 }, { type: 'setFlag', flag: 'supervision_available_confirmed', value: true }], nextSceneId: 's02_open' },
      { id: 's01_prepare', text: 'Preparar preguntas sobre terapia, escuela y confidencialidad.', intention: 'deepen', nextSceneId: 's02_open' },
      { id: 's01_family_frame', text: 'Acordar con Laura hablar del encuadre sin contar el contenido de la sesión.', intention: 'limit', effects: [{ type: 'changeStat', stat: 'maternal_bond', amount: 2 }, { type: 'setFlag', flag: 's01_family_frame', value: true }], nextSceneId: 's02_open' },
    ],
  },
  s02_open: {
    id: 's02_open', sessionId: 'S02', kind: 'dialogue', label: '“¿Qué pasa si te digo…?”', portraitState: 'uneasy',
    lines: [
      { speaker: 'Tomás', text: 'La vez pasada dijiste que podía ir a mi ritmo. Quiero ver si era verdad.', conditions: [{ type: 'flagIs', flag: 's01_opening_pace', value: true }] },
      { speaker: 'Tomás', text: 'Dijiste que podíamos usar la hora para cambiar algo. Primero quiero saber qué cambiarías vos.', conditions: [{ type: 'flagIs', flag: 's01_opening_change', value: true }] },
      { speaker: 'Tomás', text: 'Me explicaste cómo trabajás. Ahora quiero una respuesta que no suene a folleto.', conditions: [{ type: 'flagIs', flag: 's01_framework_first', value: true }] },
      { speaker: 'Tomás', text: 'Si te digo que ayer me agarré a trompadas con uno de la escuela, ¿qué hacés?' },
      { speaker: 'Julián', text: '¿Querés contarme qué pasó?' },
      { speaker: 'Tomás', text: 'Todavía no. Primero quiero saber qué harías.' },
      { speaker: 'Narración', tone: 'thought', text: 'No da nombres ni describe la pelea. La pregunta parece importarle más que el hecho que propone.' },
    ],
    choices: [
      { id: 's02_explore_test', text: 'Preguntar qué teme que pase si responde con honestidad.', intention: 'question', effects: [{ type: 'changeStat', stat: 'trust', amount: 4 }, { type: 'setFlag', flag: 's02_test_explored', value: true }], nextSceneId: 's02_test_reply' },
      { id: 's02_react_alarm', text: 'Decirle que necesitás saber si alguien está en peligro ahora.', intention: 'confront', effects: [{ type: 'changeStat', stat: 'hostility', amount: 3 }, { type: 'changeStat', stat: 'investigation_bias', amount: 3 }], nextSceneId: 's02_alarm_reply' },
      { id: 's02_neutral', text: 'Responder primero qué harías con lo que cuente.', intention: 'limit', effects: [{ type: 'changeStat', stat: 'autonomy', amount: 2 }], nextSceneId: 's02_answer_reply' },
    ],
  },
  s02_test_reply: {
    id: 's02_test_reply', sessionId: 'S02', kind: 'dialogue', portraitState: 'uneasy',
    lines: [{ speaker: 'Tomás', text: 'Que hagas lo de siempre: primero preguntan todo y después explican qué van a hacer.' }],
    choices: [{ id: 's02_test_answer_first', text: 'Responder el límite antes de pedir detalles.', intention: 'limit', effects: [{ type: 'changeStat', stat: 'trust', amount: 3 }], nextSceneId: 's02_limits' }, { id: 's02_test_ask_worst', text: 'Preguntar qué sería lo peor que podría ocurrir después de contarlo.', intention: 'deepen', effects: [{ type: 'changeStat', stat: 'fear', amount: 2 }], nextSceneId: 's02_limits' }],
  },
  s02_alarm_reply: {
    id: 's02_alarm_reply', sessionId: 'S02', kind: 'dialogue', portraitState: 'defensive',
    lines: [{ speaker: 'Tomás', text: 'O sea que primero te tengo que contar y recién después me decís qué vas a hacer.' }],
    choices: [{ id: 's02_alarm_repair', text: 'Reconocer que invertiste su pregunta y explicar el encuadre.', intention: 'apologize', effects: [{ type: 'changeStat', stat: 'trust', amount: 2 }], nextSceneId: 's02_limits' }, { id: 's02_alarm_insist', text: 'Insistir en conocer primero la gravedad de la pelea.', intention: 'confront', effects: [{ type: 'changeStat', stat: 'trust', amount: -4 }, { type: 'changeStat', stat: 'anger', amount: 3 }], nextSceneId: 's02_limits' }],
  },
  s02_answer_reply: {
    id: 's02_answer_reply', sessionId: 'S02', kind: 'dialogue', portraitState: 'uneasy',
    lines: [{ speaker: 'Tomás', text: 'Eso pregunté. Quiero saber quién se entera antes de darte un nombre.' }],
    choices: [{ id: 's02_answer_scope', text: 'Explicar destinatarios y alcance sin prometer secreto absoluto.', intention: 'limit', effects: [{ type: 'changeStat', stat: 'autonomy', amount: 3 }], nextSceneId: 's02_limits' }, { id: 's02_answer_invite', text: 'Preguntar qué parte quiere contar sin usar nombres.', intention: 'question', effects: [{ type: 'changeStat', stat: 'trust', amount: 2 }], nextSceneId: 's02_limits' }],
  },
  s02_limits: {
    id: 's02_limits', sessionId: 'S02', kind: 'dialogue', portraitState: 'uneasy',
    lines: [
      { speaker: 'Julián', text: 'Puedo explicarte qué cosas son privadas y cuáles podrían requerir que busque ayuda. No quiero prometerte algo que no pueda cumplir.' },
      { speaker: 'Tomás', text: '¿O sea que hay cosas que después les contás a mis viejos?' },
      { speaker: 'Julián', text: 'Si hubiera una preocupación importante por tu seguridad, no debería manejarla a solas. Y tendría que hablarlo con vos con la mayor claridad posible.' },
      { speaker: 'Tomás', text: 'Eso no responde del todo.' },
    ],
    choices: [
      { id: 's02_disclose_negotiated', text: 'Avisarle que hablarás con sus padres y acordar qué preocupación comunicar.', intention: 'limit', effects: [{ type: 'setFlag', flag: 's02_fight_disclosed', value: true }, { type: 'schedule', id: 's02_disclosure_impact', dueSession: 3, effects: [{ type: 'changeStat', stat: 'trust', amount: -3 }, { type: 'changeStat', stat: 'autonomy', amount: -2 }, { type: 'setFlag', flag: 's02_parents_know_about_fight', value: true }] }], nextSceneId: 's02_close', importantDecision: true },
      { id: 's02_disclose_mother_first', text: 'Explicar que hablarás primero con Laura y después le contarás exactamente qué dijiste.', intention: 'justify', effects: [{ type: 'setFlag', flag: 's02_fight_disclosed', value: true }, { type: 'schedule', id: 's02_disclosure_impact', dueSession: 3, effects: [{ type: 'changeStat', stat: 'trust', amount: -6 }, { type: 'changeStat', stat: 'autonomy', amount: -4 }, { type: 'setFlag', flag: 's02_parents_know_about_fight', value: true }] }], nextSceneId: 's02_close', importantDecision: true },
      { id: 's02_disclose_after_supervision', text: 'Consultar a Marina, anticipar ese paso y luego comunicar la preocupación a los padres.', intention: 'limit', effects: [{ type: 'changeStat', stat: 'external_support', amount: 5 }, { type: 'setFlag', flag: 's02_supervision_before_disclosure', value: true }, { type: 'setFlag', flag: 's02_fight_disclosed', value: true }, { type: 'schedule', id: 's02_disclosure_impact', dueSession: 3, effects: [{ type: 'changeStat', stat: 'trust', amount: -4 }, { type: 'changeStat', stat: 'autonomy', amount: -2 }, { type: 'setFlag', flag: 's02_parents_know_about_fight', value: true }] }], nextSceneId: 's02_close', importantDecision: true },
    ],
  },
  s02_close: {
    id: 's02_close', sessionId: 'S02', kind: 'dialogue', label: 'Cierre de sesión', portraitState: 'defensive',
    lines: [
      { speaker: 'Tomás', text: 'No te dije quién fue.' },
      { speaker: 'Tomás', text: 'Da igual. Ya está.' },
      { speaker: 'Narración', tone: 'thought', text: 'No aclara qué ocurrió ni por qué no quiere seguir hablando.' },
    ],
    choices: [{ id: 's02_end', text: 'Dejar la pregunta abierta y terminar la sesión.', nextSceneId: 'between_s02' }],
  },
  between_s02: {
    id: 'between_s02', sessionId: 'S02', kind: 'interlude', label: 'Entre sesiones',
    lines: [
      { speaker: 'Narración', tone: 'thought', text: 'El expediente queda abierto sobre el escritorio. Una parte de Julián quiere resolver qué ocurrió; otra recuerda que Tomás preguntó primero qué iba a hacer un adulto con sus palabras.' },
      { speaker: 'Narración', tone: 'thought', text: 'La decisión sobre qué compartir tendrá un efecto en la próxima sesión.', conditions: [{ type: 'flagIs', flag: 's02_fight_disclosed', value: true }] },
    ],
    choices: [{ id: 's02_next', text: 'Preparar la próxima sesión.', nextSceneId: 's03_open' }],
  },
  s03_open: {
    id: 's03_open', sessionId: 'S03', kind: 'dialogue', label: '“Se van a arrepentir”', portraitState: 'defensive',
    lines: [
      { speaker: 'Narración', tone: 'thought', text: 'Tomás llega a horario, pero deja la mochila sobre las rodillas. Durante unos segundos mira la ventana en vez de a Julián.' },
      { speaker: 'Tomás', text: 'Mi mamá preguntó por la pelea.' , conditions: [{ type: 'flagIs', flag: 's02_parents_know_about_fight', value: true }] },
      { speaker: 'Tomás', text: 'No sabía que esto era una reunión de padres con una silla extra.' , conditions: [{ type: 'flagIs', flag: 's02_parents_know_about_fight', value: true }] },
      { speaker: 'Tomás', text: 'En casa no pararon de preguntarme qué hice en la escuela. No sé qué les dijeron ni por qué están todos con eso.' , conditions: [{ type: 'flagIs', flag: 's02_parents_know_about_fight', value: false }] },
      { speaker: 'Tomás', text: '¿Podemos no hablar de eso?' },
    ],
    topics: [
      { id: 's03_topic_trust', label: 'Qué entiende por confidencialidad', requiredTrust: 0, sceneId: 's03_trust' },
      { id: 's03_topic_school', label: 'Lo que pasa en la escuela', requiredTrust: 20, sceneId: 's03_school' },
      { id: 's03_topic_parents', label: 'Las preguntas en casa', requiredTrust: 25, sceneId: 's03_parents' },
    ],
    choices: [{ id: 's03_acknowledge_damage', text: 'Reconocer que compartir la preocupación cambió este espacio para él.', intention: 'apologize', effects: [{ type: 'changeStat', stat: 'trust', amount: 4 }], nextSceneId: 's03_damage_reply' }, { id: 's03_explain_reason', text: 'Explicar por qué decidiste hablar con sus padres.', intention: 'justify', effects: [{ type: 'changeStat', stat: 'trust', amount: -3 }], nextSceneId: 's03_reason_reply' }, { id: 's03_follow_home', text: 'Preguntar qué ocurrió en casa después de la conversación.', intention: 'question', effects: [{ type: 'changeStat', stat: 'autonomy', amount: 1 }], nextSceneId: 's03_home_reply' }],
  },
  s03_damage_reply: {
    id: 's03_damage_reply', sessionId: 'S03', kind: 'dialogue', portraitState: 'vulnerable',
    lines: [{ speaker: 'Tomás', text: 'No cambió solo esto. Ahora mi mamá escucha cada respuesta como si hubiera algo escondido.' }],
    choices: [{ id: 's03_damage_ask_need', text: 'Preguntar qué podría hacer Laura sin invadirlo.', intention: 'question', effects: [{ type: 'setFlag', flag: 's03_laura_private_bridge', value: true }], nextSceneId: 's03_phrase' }, { id: 's03_damage_hold', text: 'No pedirle que acepte la disculpa y escuchar el impacto.', intention: 'silence', effects: [{ type: 'changeStat', stat: 'trust', amount: 3 }], nextSceneId: 's03_phrase' }],
  },
  s03_reason_reply: {
    id: 's03_reason_reply', sessionId: 'S03', kind: 'dialogue', portraitState: 'defensive',
    lines: [{ speaker: 'Tomás', text: '¿Y después me toca hablar a mí o la explicación ya ocupa toda la sesión?' }],
    choices: [{ id: 's03_reason_stop', text: 'Detener la explicación y preguntarle qué necesita que entiendas.', intention: 'apologize', effects: [{ type: 'changeStat', stat: 'trust', amount: 2 }], nextSceneId: 's03_phrase' }, { id: 's03_reason_complete', text: 'Completar la justificación antes de escuchar su respuesta.', intention: 'justify', effects: [{ type: 'changeStat', stat: 'anger', amount: 3 }, { type: 'changeStat', stat: 'trust', amount: -3 }], nextSceneId: 's03_phrase' }],
  },
  s03_home_reply: {
    id: 's03_home_reply', sessionId: 'S03', kind: 'dialogue', portraitState: 'uneasy',
    lines: [{ speaker: 'Tomás', text: 'Mi mamá preguntó delante de mi viejo. Él dijo que una pelea no era para tanto. Después discutieron entre ellos.' }],
    choices: [{ id: 's03_home_mother', text: 'Preguntar si hablar a solas con Laura sería diferente.', intention: 'question', effects: [{ type: 'setFlag', flag: 's03_laura_private_bridge', value: true }, { type: 'changeStat', stat: 'maternal_bond', amount: 3 }], nextSceneId: 's03_phrase' }, { id: 's03_home_separate', text: 'Proponer mantener separadas por ahora las conversaciones familiares.', intention: 'limit', effects: [{ type: 'changeStat', stat: 'isolation', amount: 2 }, { type: 'changeStat', stat: 'fear', amount: -2 }], nextSceneId: 's03_phrase' }],
  },
  s03_trust: {
    id: 's03_trust', sessionId: 'S03', kind: 'dialogue', portraitState: 'defensive',
    lines: [
      { speaker: 'Julián', text: 'La vez pasada preguntaste qué iba a hacer con lo que me contaras. ¿Qué te quedó de mi respuesta?' },
      { speaker: 'Tomás', text: 'Que depende. Los adultos dicen “depende” cuando no quieren contestar todavía.' },
      { speaker: 'Julián', text: 'Entiendo por qué puede sonar así. Si tengo que hablar con alguien, quiero explicarte qué y por qué antes, cuando sea posible.' },
    ],
    choices: [backTo('s03_open')],
  },
  s03_school: {
    id: 's03_school', sessionId: 'S03', kind: 'dialogue', portraitState: 'defensive',
    lines: [
      { speaker: 'Julián', text: 'No hace falta que me cuentes una escena. ¿Qué es lo que más te cuesta de estar ahí?' },
      { speaker: 'Tomás', text: 'Entrar. Después salir. No sé cuál de las dos cosas es peor.' },
      { speaker: 'Tomás', text: 'No lo anotes como si fuera una pista.' },
    ],
    choices: [backTo('s03_open')],
  },
  s03_parents: {
    id: 's03_parents', sessionId: 'S03', kind: 'dialogue', portraitState: 'uneasy',
    lines: [
      { speaker: 'Julián', text: '¿Qué te gustaría que tus padres entendieran sin tener que repetirlo muchas veces?' },
      { speaker: 'Tomás', text: 'Que preguntar distinto no siempre es escuchar distinto.' },
      { speaker: 'Tomás', text: 'Mi mamá se preocupa. Mi viejo quiere que todo se termine rápido. No sé qué se supone que haga con eso.' },
    ],
    choices: [backTo('s03_open')],
  },
  s03_phrase: {
    id: 's03_phrase', sessionId: 'S03', kind: 'decision', label: 'Una frase antes de irse', portraitState: 'defensive',
    lines: [
      { speaker: 'Tomás', text: 'Algún día se van a arrepentir de todo esto.' },
      { speaker: 'Narración', tone: 'thought', text: 'La frase no aclara a quién se refiere ni qué imagina que ocurrirá. Julián puede registrarla como enojo, como amenaza o dejar escrito que todavía no conoce su significado.' },
    ],
    choices: [
      { id: 's03_note_anger', text: 'Registrarla como expresión de enojo, sin cerrar su sentido.', effects: [{ type: 'addObservation', entry: { id: 's03_phrase_anger', title: 'Frase de enojo', text: 'Tomás dijo que algún día “se van a arrepentir”. El tono fue de enojo; el referente y el significado siguen sin estar claros.', sessionId: 'S03' } }], nextSceneId: 'between_s03' },
      { id: 's03_note_threat', text: 'Registrar la preocupación como posible amenaza y anotar qué información falta.', effects: [{ type: 'addObservation', entry: { id: 's03_phrase_concern', title: 'Frase preocupante, significado incierto', text: 'La frase puede sonar amenazante, pero no identifica una acción, una persona ni un plan. Hace falta comprender el contexto antes de concluir.', sessionId: 'S03' } }, { type: 'changeStat', stat: 'investigation_bias', amount: 2 }], nextSceneId: 'between_s03' },
      { id: 's03_note_uncertain', text: 'Escribir la frase literalmente y dejar la interpretación abierta.', effects: [{ type: 'addObservation', entry: { id: 's03_phrase_open', title: '“Algún día se van a arrepentir”', text: 'Frase textual de Tomás al cierre. No se registra una interpretación definitiva.', sessionId: 'S03' } }], nextSceneId: 'between_s03' },
    ],
  },
  between_s03: {
    id: 'between_s03', sessionId: 'S03', kind: 'interlude', label: 'Entre sesiones',
    lines: [{ speaker: 'Narración', tone: 'thought', text: 'En el cuaderno queda una frase y varias lecturas posibles. Todavía no hay evidencia que permita convertir una interpretación en un hecho.' }],
    choices: [{ id: 's03_next', text: 'Abrir la siguiente sesión.', nextSceneId: 's04_open' }],
  },
  s04_open: {
    id: 's04_open', sessionId: 'S04', kind: 'dialogue', label: '“Ya decidiste que fui yo”', portraitState: 'uneasy',
    lines: [
      { speaker: 'Tomás', text: 'Hay un mensaje dando vueltas. Tiene un dato que yo había contado en un lugar privado.' },
      { speaker: 'Julián', text: '¿Qué pensaste cuando lo viste?' },
      { speaker: 'Tomás', text: 'Que alguien quiere que parezca que fui yo. O que quiere que todos piensen eso.' },
      { speaker: 'Narración', tone: 'thought', text: 'En la escuela, algunos compañeros lo señalan como autor. El mensaje no lleva firma y por sí solo no demuestra quién lo envió.' },
    ],
    topics: [
      { id: 's04_topic_message', label: 'Qué decía el mensaje', requiredTrust: 0, sceneId: 's04_message' },
      { id: 's04_topic_santiago', label: 'Santiago, su ex amigo', requiredTrust: 35, sceneId: 's04_santiago', effects: [{ type: 'addPerson', entry: { id: 'person_santiago', title: 'Santiago Acosta', text: 'Ex amigo de Tomás. La relación cambió; Tomás describe burlas frente a otros. Aún no hay vínculo confirmado con el mensaje.', category: 'school', sessionId: 'S04' } }] },
      { id: 's04_topic_school', label: 'Lo que hacen sus compañeros', requiredTrust: 20, sceneId: 's04_bullying', effects: [{ type: 'addObservation', entry: { id: 's04_bullying_forms', title: 'Hostigamiento presencial y digital', text: 'Tomás describe burlas frente a compañeros y exclusión/reenvío de capturas en un grupo. No identifica al autor del mensaje anónimo.', sessionId: 'S04' } }] },
      { id: 's04_topic_privacy', label: 'Quién pudo conocer ese dato', requiredTrust: 35, sceneId: 's04_private_detail' },
    ],
    choices: [
      { id: 's04_listen_first', text: 'Preguntar qué necesita de Julián antes de revisar el mensaje.', intention: 'question', effects: [{ type: 'changeStat', stat: 'trust', amount: 4 }, { type: 'changeStat', stat: 'perceived_support', amount: 3 }], nextSceneId: 's04_listen_reply' },
      { id: 's04_suspect', text: 'Preguntar si él mismo pudo haber enviado el mensaje.', intention: 'confront', effects: [{ type: 'changeStat', stat: 'trust', amount: -7 }, { type: 'changeStat', stat: 'investigation_bias', amount: 8 }, { type: 'changeStat', stat: 'isolation', amount: 3 }, { type: 'setFlag', flag: 's04_accused_tomas', value: true }], nextSceneId: 's04_suspect_reply', importantDecision: true },
      { id: 's04_document', text: 'Anotar qué se sabe y qué no permite concluir el mensaje.', intention: 'limit', effects: [{ type: 'changeStat', stat: 'investigation_bias', amount: 3 }, { type: 'addClue', entry: { id: 's04_anonymous_message', title: 'Primer mensaje anónimo', text: 'El mensaje incluye un dato privado y provoca que compañeros señalen a Tomás. No está firmado y no prueba quién lo envió.', category: 'messages', sessionId: 'S04', confirmed: true } }], nextSceneId: 's04_document_reply' },
      { id: 's04_follow_school_pressure', text: 'Explorar cómo el mensaje amplificó el hostigamiento sin buscar todavía al autor.', intention: 'deepen', conditions: [{ type: 'hypothesisActive', hypothesisId: 'school_pressure' }], effects: [{ type: 'changeStat', stat: 'perceived_support', amount: 4 }], nextSceneId: 's04_listen_reply' },
      { id: 's04_hold_unknown_sender', text: 'Decir explícitamente que todavía no alcanza la información para atribuir el mensaje.', intention: 'limit', conditions: [{ type: 'hypothesisActive', hypothesisId: 'unknown_sender' }], effects: [{ type: 'changeStat', stat: 'trust', amount: 3 }, { type: 'setFlag', flag: 's04_attribution_deferred', value: true }], nextSceneId: 's04_document_reply' },
    ],
  },
  s04_listen_reply: {
    id: 's04_listen_reply', sessionId: 'S04', kind: 'dialogue', portraitState: 'vulnerable',
    lines: [{ speaker: 'Tomás', text: 'Necesito que no me mires como si yo tuviera que demostrar que no fui.' }],
    choices: [{ id: 's04_listen_impact', text: 'Preguntar qué cambió para él desde que empezó a circular.', intention: 'deepen', effects: [{ type: 'changeStat', stat: 'perceived_support', amount: 3 }], nextSceneId: 's04_close' }, { id: 's04_listen_permission', text: 'Preguntar qué parte del mensaje permite registrar.', intention: 'limit', effects: [{ type: 'changeStat', stat: 'autonomy', amount: 3 }], nextSceneId: 's04_close' }],
  },
  s04_suspect_reply: {
    id: 's04_suspect_reply', sessionId: 'S04', kind: 'dialogue', portraitState: 'defensive',
    lines: [{ speaker: 'Tomás', text: 'Ahí está. Ya decidiste que fui yo; solo querés ver si lo admito.' }],
    choices: [{ id: 's04_suspect_repair', text: 'Decir que no hay base para concluirlo y reconocer cómo sonó.', intention: 'apologize', effects: [{ type: 'changeStat', stat: 'trust', amount: 4 }], nextSceneId: 's04_close' }, { id: 's04_suspect_justify', text: 'Responder que preguntar no equivale a acusar.', intention: 'justify', effects: [{ type: 'changeStat', stat: 'trust', amount: -4 }, { type: 'changeStat', stat: 'anger', amount: 3 }], nextSceneId: 's04_close' }],
  },
  s04_document_reply: {
    id: 's04_document_reply', sessionId: 'S04', kind: 'dialogue', portraitState: 'uneasy',
    lines: [{ speaker: 'Tomás', text: 'Anotá también que no quiero una copia completa dando vueltas. Ya hay demasiada gente leyendo cosas mías.' }],
    choices: [{ id: 's04_document_minimal', text: 'Registrar solo lo necesario y dejar afuera el dato privado.', intention: 'limit', effects: [{ type: 'setFlag', flag: 's04_minimal_record', value: true }, { type: 'changeStat', stat: 'trust', amount: 3 }], nextSceneId: 's04_close' }, { id: 's04_document_full', text: 'Pedir ver el mensaje completo para evitar interpretarlo mal.', intention: 'deepen', effects: [{ type: 'changeStat', stat: 'fear', amount: 3 }, { type: 'changeStat', stat: 'investigation_bias', amount: 3 }], nextSceneId: 's04_close' }],
  },
  s04_message: {
    id: 's04_message', sessionId: 'S04', kind: 'dialogue', portraitState: 'uneasy',
    lines: [
      { speaker: 'Julián', text: '¿Qué parte del mensaje te parece importante que entienda?' },
      { speaker: 'Tomás', text: 'Que no puso nada que pueda comprobarse. Puso justo lo suficiente para que los demás completen lo que falta.' },
      { speaker: 'Julián', text: '¿Lo guardaste?' },
      { speaker: 'Tomás', text: 'No sé si quiero que todos lo tengan.' },
    ],
    choices: [backTo('s04_open')],
  },
  s04_santiago: {
    id: 's04_santiago', sessionId: 'S04', kind: 'dialogue', portraitState: 'defensive',
    lines: [
      { speaker: 'Julián', text: '¿Qué cambió con Santiago?' },
      { speaker: 'Tomás', text: 'Antes sabía cuándo dejar de molestar. Ahora sabe dónde hacerlo para que los demás se rían.' },
      { speaker: 'Tomás', text: 'No significa que él haya escrito el mensaje.' },
    ],
    choices: [backTo('s04_open')],
  },
  s04_bullying: {
    id: 's04_bullying', sessionId: 'S04', kind: 'dialogue', portraitState: 'uneasy',
    lines: [
      { speaker: 'Julián', text: '¿Qué pasa cuando te señalan?' },
      { speaker: 'Tomás', text: 'En persona se ríen. En el grupo dejan de contestarme y después mandan capturas de lo que dije.' },
      { speaker: 'Julián', text: '¿Querés que pensemos juntos qué hacer con eso, o preferís que primero lo entienda mejor?' },
      { speaker: 'Tomás', text: 'Quiero que no decidas por mí mientras lo entendés.' },
    ],
    choices: [backTo('s04_open')],
  },
  s04_private_detail: {
    id: 's04_private_detail', sessionId: 'S04', kind: 'dialogue', portraitState: 'uneasy',
    lines: [
      { speaker: 'Julián', text: '¿Tenés alguna idea de quién pudo haber escuchado ese dato?' },
      { speaker: 'Tomás', text: 'Podría ser cualquiera. No quiero hacer una lista de sospechosos.' },
      { speaker: 'Tomás', text: 'Aunque seguro eso es lo primero que anotarías.' },
    ],
    choices: [backTo('s04_open')],
  },
  s04_close: {
    id: 's04_close', sessionId: 'S04', kind: 'dialogue', label: 'Cierre de sesión', portraitState: 'defensive',
    lines: [
      { speaker: 'Tomás', text: 'Sos igual que todos. Ya decidiste que fui yo.' },
      { speaker: 'Narración', tone: 'thought', text: 'Tomás no espera una respuesta y sale del consultorio. La acusación de sus compañeros y la sospecha de Julián quedan superpuestas, aunque no sean lo mismo.' },
    ],
    choices: [{ id: 's04_end', text: 'Dejar constancia de lo ocurrido y terminar la sesión.', nextSceneId: 'between_s04' }],
  },
  between_s04: {
    id: 'between_s04', sessionId: 'S04', kind: 'interlude', label: 'Cierre del Acto I',
    lines: [
      { speaker: 'Narración', tone: 'thought', text: 'El primer mensaje no resuelve quién lo envió. La distancia entre Tomás y Julián sí cambió: una sospecha puede sentirse como otra acusación, incluso cuando se formula como pregunta.' },
      { speaker: 'Narración', tone: 'thought', text: 'Hechos confirmados, contradicciones abiertas e hipótesis quedan separados en el cuaderno. Las variables internas no se muestran.' },
    ],
    choices: [],
  },
}
export const laSillaVaciaCampaign: StoryCampaign = {
  id: 'la-silla-vacia',
  title: 'La Silla Vacía',
  startSessionId: 'PROLOGUE',
  initialStats: { ...INITIAL_STATS },
  statLimits: { min: 0, max: 100 },
  hypotheses: {
    testing_control: { id: 'testing_control', text: 'Tomás está probando cuánto control conserva en este espacio.', biasTags: ['relationship', 'autonomy'], availableFromSession: 1 },
    forced_attendance: { id: 'forced_attendance', text: 'La obligación de venir domina la conversación por ahora.', biasTags: ['relationship'], availableFromSession: 1, availableUntilSession: 3 },
    insufficient_context: { id: 'insufficient_context', text: 'Todavía no alcanza la información para interpretar lo que ocurre.', biasTags: [], availableFromSession: 1 },
    early_message_author: { id: 'early_message_author', text: 'Tomás podría estar detrás del mensaje.', biasTags: ['suspect_tomas'], availableFromSession: 4, availableUntilSession: 11 },
    school_pressure: { id: 'school_pressure', text: 'El mensaje puede estar relacionado con el hostigamiento en la escuela.', biasTags: ['school_context'], availableFromSession: 4 },
    old_case_link: { id: 'old_case_link', text: 'Los mensajes parecen conectados con el caso antiguo de Bruno.', biasTags: ['investigation'], availableFromSession: 6 },
    nico_involvement: { id: 'nico_involvement', text: 'Nico conoce más del caso y de los mensajes de lo que reconoce.', biasTags: ['nico'], availableFromSession: 11 },
    support_before_case: { id: 'support_before_case', text: 'Comprender el caso no debería reemplazar el apoyo que Tomás necesita.', biasTags: ['relationship', 'support'], availableFromSession: 8 },
    unknown_sender: { id: 'unknown_sender', text: 'Todavía no hay información suficiente para inferir quién envió los mensajes.', biasTags: [], availableFromSession: 4, availableUntilSession: 11 },
  },
  sessions: {
    PROLOGUE: { id: 'PROLOGUE', number: 0, act: 0, title: 'Antes de la primera sesión', entrySceneId: 'prologue_entry', sceneIds: ['prologue_entry', 'prologue_close'] },
    S01: { id: 'S01', number: 1, act: 1, title: '¿Eso era todo?', entrySceneId: 's01_open', sceneIds: ['s01_open', 's01_pace_reply', 's01_change_reply', 's01_framework_reply', 's01_contradiction', 's01_therapy', 's01_parents', 's01_school', 's01_months', 's01_close', 'between_s01'] },
    S02: { id: 'S02', number: 2, act: 1, title: '¿Qué pasa si te digo…?', entrySceneId: 's02_open', sceneIds: ['s02_open', 's02_test_reply', 's02_alarm_reply', 's02_answer_reply', 's02_limits', 's02_close', 'between_s02'] },
    S03: { id: 'S03', number: 3, act: 1, title: 'Se van a arrepentir', entrySceneId: 's03_open', sceneIds: ['s03_open', 's03_damage_reply', 's03_reason_reply', 's03_home_reply', 's03_trust', 's03_school', 's03_parents', 's03_phrase', 'between_s03'] },
    S04: { id: 'S04', number: 4, act: 1, title: 'Ya decidiste que fui yo', entrySceneId: 's04_open', sceneIds: ['s04_open', 's04_message', 's04_santiago', 's04_bullying', 's04_private_detail', 's04_listen_reply', 's04_suspect_reply', 's04_document_reply', 's04_close', 'between_s04'] },
    ...actTwoSessions,
    ...actThreeSessions,
    ...actFourSessions,
  },
  scenes: { ...scenes, ...actTwoScenes, ...actThreeScenes, ...actFourScenes },
}
