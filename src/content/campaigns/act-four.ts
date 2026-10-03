import type { StoryScene, StorySession } from '../../features/story/types'

export const actFourSessions: Record<string, StorySession> = {
  S17: { id: 'S17', number: 17, act: 4, title: 'Volver', entrySceneId: 's17_open', sceneIds: ['s17_open', 's17_school_alternative', 's17_case_responsibility', 's17_close', 'between_s17'] },
  S18: { id: 'S18', number: 18, act: 4, title: 'Lo que queda', entrySceneId: 's18_route_resolver', sceneIds: ['s18_route_resolver', 'ending_exit', 'ending_suicide_survival', 'ending_suicide_death', 'ending_school_violence'] },
}

const institutionalResolution = [
  { speaker: 'Narración', tone: 'thought' as const, text: 'Meses después, la investigación externa confirma que el relato de Camila fue manipulado, que Lagos tuvo conductas inapropiadas documentadas y que hubo cambios deliberados en registros escolares. Verónica participó en la decisión de proteger a la institución.' },
  { speaker: 'Narración', tone: 'thought' as const, text: 'Camila declara mediante terceros. Nico entrega copias y enfrenta consecuencias por las filtraciones y amenazas. Santiago admite parte de lo que vio, pero no todo. El caso institucional avanza sin depender del destino de Tomás.' },
]

export const actFourScenes: Record<string, StoryScene> = {
  s17_open: {
    id: 's17_open', sessionId: 'S17', kind: 'dialogue', label: '“Volver”', portraitState: 'defensive',
    lines: [
      { speaker: 'Narración', tone: 'thought', text: 'Tomás llega con la mochila todavía puesta. Marcelo lo espera afuera y dice que no puede escapar de cada problema. Tomás no quiere volver a la escuela.' },
      { speaker: 'Tomás', text: 'No quiero volver. Pero si no voy, van a decir que tenían razón.' },
      { speaker: 'Julián', text: 'Podemos pensar alternativas sin decidir hoy qué tenés que hacer.' },
      { speaker: 'Tomás', text: 'Ya da igual. Todos terminan cansándose de mí.', conditions: [{ type: 'routeIs', route: 'suicidal_crisis' }] },
      { speaker: 'Tomás', text: 'Pregunté quiénes van a estar mañana y a qué hora esperan que vuelva.', conditions: [{ type: 'routeIs', route: 'school_violence' }] },
    ],
    topics: [
      { id: 's17_no_school', label: '¿Volver a esa escuela es inevitable?', sceneId: 's17_school_alternative', effects: [{ type: 'setFlag', flag: 's17_no_school_is_inevitable', value: true }, { type: 'changeStat', stat: 'school_return_pressure', amount: -5 }, { type: 'changeStat', stat: 'autonomy', amount: 3 }] },
      { id: 's17_case_not_his', label: '¿A quién le corresponde seguir con el caso?', sceneId: 's17_case_responsibility', effects: [{ type: 'setFlag', flag: 's17_case_is_not_tomas_responsibility', value: true }, { type: 'changeStat', stat: 'perceived_support', amount: 3 }, { type: 'changeStat', stat: 'guilt', amount: -3 }] },
    ],
    choices: [{ id: 's17_listen_first', text: 'Preguntar qué es lo que más le preocupa de mañana.', effects: [{ type: 'changeStat', stat: 'perceived_support', amount: 3 }], nextSceneId: 's17_close' }, { id: 's17_insist_return', text: 'Decirle que volver puede mostrar que no tiene nada que ocultar.', effects: [{ type: 'changeStat', stat: 'school_return_pressure', amount: 8 }, { type: 'changeStat', stat: 'trust', amount: -5 }, { type: 'changeStat', stat: 'hostility', amount: 4 }], nextSceneId: 's17_close', importantDecision: true }],
  },
  s17_school_alternative: {
    id: 's17_school_alternative', sessionId: 'S17', kind: 'dialogue', portraitState: 'uneasy',
    lines: [{ speaker: 'Julián', text: 'No volver a esta escuela no significa que tengas que desaparecer de tu vida. Podemos averiguar qué opciones existen.' }, { speaker: 'Tomás', text: 'No sé si mamá podría hacerlo. Pero quiero saber que hay otra posibilidad.' }],
    choices: [{ id: 's17_school_return', text: 'Volver a conversar con Tomás.', nextSceneId: 's17_open' }],
  },
  s17_case_responsibility: {
    id: 's17_case_responsibility', sessionId: 'S17', kind: 'dialogue', portraitState: 'vulnerable',
    lines: [{ speaker: 'Julián', text: 'Lo que pasó en la escuela no es algo que tengas que resolver solo para que los adultos hagan su parte.' }, { speaker: 'Tomás', text: 'Quiero que se sepa. Pero no quiero ser el que tenga que romperse para que me crean.' }, { speaker: 'Julián', text: 'Podemos buscar una manera de que otros continúen, y vos decidir cuánto querés saber.' }],
    choices: [{ id: 's17_case_return', text: 'Volver a conversar con Tomás.', nextSceneId: 's17_open' }],
  },
  s17_close: {
    id: 's17_close', sessionId: 'S17', kind: 'dialogue', label: 'Antes de volver', portraitState: 'uneasy',
    lines: [
      { speaker: 'Tomás', text: 'No sé qué va a pasar mañana.' },
      { speaker: 'Julián', text: 'No hace falta que tengamos una respuesta para todo antes de cerrar hoy.' },
      { speaker: 'Tomás', text: '¿No eras vos el que decía que tenía que enfrentar las cosas?', conditions: [{ type: 'routeIs', route: 'school_violence' }] },
      { speaker: 'Julián', text: '¿Estás pensando en lastimarte o en lastimar a alguien?', conditions: [{ type: 'routeIs', route: 'school_violence' }] },
      { speaker: 'Tomás', text: 'No.', conditions: [{ type: 'routeIs', route: 'school_violence' }] },
      { speaker: 'Narración', tone: 'thought', text: 'La bronca de Tomás desaparece. “Ya sé lo que tengo que hacer”, dice, sin explicar a qué se refiere.', conditions: [{ type: 'routeIs', route: 'school_violence' }] },
      { speaker: 'Narración', tone: 'thought', text: 'Tomás está inusualmente tranquilo y se despide con una amabilidad que no parece propia del momento.', conditions: [{ type: 'routeIs', route: 'suicidal_crisis' }] },
      { speaker: 'Tomás', tone: 'message', text: 'Gracias por la charla del otro día. Creo que estoy un poco mejor.', conditions: [{ type: 'routeIs', route: 'suicidal_crisis' }] },
      { speaker: 'Narración', tone: 'thought', text: 'Las alternativas están sobre la mesa, pero no borran lo acumulado. La decisión siguiente no convierte una sesión en una garantía.' },
    ],
    choices: [{ id: 's17_end', text: 'Cerrar la sesión y dejar que el estado acumulado marque lo que viene.', nextSceneId: 'between_s17' }],
  },
  between_s17: {
    id: 'between_s17', sessionId: 'S17', kind: 'interlude', label: 'Entre sesiones',
    lines: [
      { speaker: 'Narración', tone: 'thought', text: 'Julián y la familia intentan comunicarse. La próxima respuesta de Tomás no depende de que alguien encuentre la frase perfecta.' },
      { speaker: 'Narración', tone: 'thought', text: 'El mensaje llega después de una despedida inusualmente amable. Horas más tarde, Tomás deja de responder.', conditions: [{ type: 'routeIs', route: 'suicidal_crisis' }] },
      { speaker: 'Narración', tone: 'thought', text: 'La vuelta a la escuela se acerca. Tomás habló poco del tema antes de irse.', conditions: [{ type: 'routeIs', route: 'school_violence' }] },
      { speaker: 'Narración', tone: 'thought', text: 'Laura pregunta por opciones para que Tomás no vuelva a esa escuela; todavía no sabe qué va a elegir.', conditions: [{ type: 'routeIs', route: 'exit' }] },
    ],
    choices: [{ id: 's17_next', text: 'Continuar.', nextSceneId: 's18_route_resolver' }],
  },
  s18_route_resolver: {
    id: 's18_route_resolver', sessionId: 'S18', kind: 'decision', label: 'Lo que queda',
    lines: [{ speaker: 'Narración', tone: 'thought', text: 'La historia entra en su último tramo.' }],
    choices: [{ id: 's18_resolve', text: 'Continuar.', nextSceneId: 'ending_exit' }],
  },
  ending_exit: {
    id: 'ending_exit', sessionId: 'S18', kind: 'ending', label: 'Salir sin desaparecer',
    lines: [
      { speaker: 'Laura', text: 'Podemos averiguar cómo cambiarte de escuela. No tenés que decidir todo hoy.' },
      { speaker: 'Tomás', text: 'Quiero entregar lo que tengo. Pero prefiero no enterarme de cada cosa, salvo que sea necesario.' },
      { speaker: 'Narración', tone: 'thought', text: 'La investigación continúa por fuera de Tomás. Santiago lo busca una vez.' },
      { speaker: 'Santiago', text: 'Hay cosas que no te voy a perdonar. Pero tampoco quiero seguir odiándote.' },
      { speaker: 'Tomás', text: 'No sé qué hacer con eso. Gracias por decirlo.' },
      { speaker: 'Julián', text: '¿Cómo fue para vos venir acá?' },
      { speaker: 'Tomás', text: 'Al final no fue tan inútil.' },
      { speaker: 'Narración', tone: 'thought', text: 'Tomás continúa con otra terapeuta. Entra a una escuela nueva como un estudiante más. No todo queda resuelto, pero el caso ya no depende de que él lo cargue.' },
      ...institutionalResolution,
    ],
  },
  ending_suicide_survival: {
    id: 'ending_suicide_survival', sessionId: 'S18', kind: 'ending', label: 'Después de la crisis',
    lines: [
      { speaker: 'Narración', tone: 'thought', text: 'En los días anteriores, Tomás había empezado a ordenar asuntos pendientes y a desprenderse de algunas cosas. La calma no alcanza para saber cómo está.' },
      { speaker: 'Narración', tone: 'thought', text: 'Tomás deja de responder a Julián y a Marcelo. Laura sigue buscándolo y conserva el hilo de contacto; Julián deja de intentar ocupar el centro de la búsqueda y ayuda a sostener a la familia.' },
      { speaker: 'Laura', text: 'No tenés que contestarme todo. Sólo quiero que sepas que sigo acá.' },
      { speaker: 'Narración', tone: 'thought', text: 'Tomás responde a su madre. La red de personas que habían logrado sostenerse alcanza para que lo encuentren y reciba ayuda. No hay una frase única que explique el desenlace.' },
      { speaker: 'Narración', tone: 'thought', text: 'Semanas después, Tomás continúa con otro profesional y cambia de escuela. En una última sesión, él y Julián acuerdan que el vínculo terapéutico también puede terminar con cuidado.' },
      ...institutionalResolution,
    ],
  },
  ending_suicide_death: {
    id: 'ending_suicide_death', sessionId: 'S18', kind: 'ending', label: 'La silla vacía',
    lines: [
      { speaker: 'Narración', tone: 'thought', text: 'Tomás deja de responder. Laura y Marcelo siguen intentando comunicarse. La espera se alarga; nadie encuentra una manera de hacer que conteste.' },
      { speaker: 'Narración', tone: 'thought', text: 'El consultorio queda vacío. Tiempo después, Julián se sienta frente a la silla y repasa las veces que confundió entender el caso con sostener a la persona.' },
      { speaker: 'Laura', text: 'A veces pienso en lo que podría haber visto. No sé si alguna respuesta habría cambiado esto.' },
      { speaker: 'Marcelo', text: 'Yo decía que se le iba a pasar. No sé qué hacer con eso ahora.' },
      { speaker: 'Narración', tone: 'thought', text: 'La muerte de Tomás no se explica por una sola decisión, una sola persona ni un diagnóstico. La historia no muestra el acto ni un método.' },
      ...institutionalResolution,
    ],
  },
  ending_school_violence: {
    id: 'ending_school_violence', sessionId: 'S18', kind: 'ending', label: 'La llamada',
    lines: [
      { speaker: 'Narración', tone: 'thought', text: 'A la mañana siguiente, Laura encuentra una nota y el cuaderno de Tomás. Él ya está en la escuela. No se muestran preparativos ni detalles de lo ocurrido.' },
      { speaker: 'Narración', tone: 'thought', text: 'La emergencia deja personas heridas, algunas vinculadas al hostigamiento y otras que no lo estaban. El incidente se narra desde sus consecuencias, no desde su ejecución.' },
      { speaker: 'Tomás', tone: 'message', text: 'Cuando necesitaba que hicieras algo, no hiciste nada; cuando no quería que hicieras nada, te metiste en todo.' },
      { speaker: 'Julián', text: 'Tenés razón en muchas cosas que decís sobre mí, pero esto no tiene que terminar así.' },
      { speaker: 'Tomás', text: 'Ya es tarde.' },
      { speaker: 'Narración', tone: 'thought', text: 'La llamada se corta. Durante la intervención externa, Tomás muere. La historia no describe tácticas ni convierte su sufrimiento en una explicación de la violencia.' },
      { speaker: 'Narración', tone: 'thought', text: 'Las personas heridas y sus familias quedan con consecuencias irreversibles. Julián vuelve al consultorio y encuentra la silla vacía.' },
      ...institutionalResolution,
    ],
  },
}
