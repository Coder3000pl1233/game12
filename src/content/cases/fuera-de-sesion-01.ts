import type { CaseDefinition } from '../../features/narrative/types'
import { ENDING_SCENE_ID } from '../../features/narrative/engine'

// Verdad de autor: Mauro se ocultó por deudas antes de que empiece la historia.
// Tomás planea encontrarlo para exigirle una explicación; una agresión solo ocurre
// en la ruta donde sale del consultorio con el riesgo alto y llega al encuentro.
export const outsideSessionCase: CaseDefinition = {
  id: 'fuera-de-sesion-01',
  title: 'Fuera de sesión',
  startSceneId: 's1_open',
  initialStats: { trust: 2, anxiety: 2, hostility: 1, risk: 1 },
  statLimits: { min: 0, max: 6 },
  clues: {
    clock: { id: 'clock', title: 'El reloj detenido', text: 'Tomás mira varias veces el reloj de pared. Está detenido a las 2:17. Dice que no se había dado cuenta.', sourceType: 'observation' },
    resentment: { id: 'resentment', title: '“Que pague”', text: 'Tomás dice que su antiguo compañero, Mauro, “tendría que pagar por lo que hizo”. No explica qué significa pagar.', sourceType: 'statement' },
    lock: { id: 'lock', title: 'Marcas en la cerradura', text: 'Tomás muestra una foto de la cerradura de su departamento. Hay dos rayas nuevas junto al cilindro; la imagen no permite saber cuándo aparecieron.', sourceType: 'observation' },
    memory: { id: 'memory', title: 'El viaje que no recuerda', text: 'Una tarjeta de transporte registra un viaje de madrugada que Tomás no recuerda haber hecho. El registro no demuestra quién usó la tarjeta.', sourceType: 'externalEvidence' },
    draft: { id: 'draft', title: 'Borrador sin enviar', text: 'En un mensaje guardado, Tomás escribió: “Esta noche termina”. No hay destinatario y la frase admite más de una lectura.', sourceType: 'externalEvidence' },
    hallway: { id: 'hallway', title: 'La luz del pasillo', text: 'Una vecina confirma que la luz del pasillo se enciende a veces de madrugada. No vio quién entró ni a qué departamento.', sourceType: 'externalEvidence' },
    family: { id: 'family', title: 'Una llamada sin respuesta', text: 'La hermana de Mauro dice que él dejó de responder a la familia antes de desaparecer. No sabe dónde está ni cuándo fue la última vez que alguien lo vio.', sourceType: 'externalEvidence' },
    plan: { id: 'plan', title: 'Un lugar y una hora', text: 'Tomás confirma que pensaba encontrarse esa noche con Mauro en el estacionamiento del antiguo trabajo.', sourceType: 'statement' },
    'call-log': { id: 'call-log', title: 'Registro de la llamada', text: 'Quedó asentado que pediste asistencia antes de que Tomás saliera del consultorio.', sourceType: 'externalEvidence' },
  },
  scenes: {
    s1_open: {
      id: 's1_open', kind: 'dialogue', session: 1, speaker: 'Tomás', label: 'Primera sesión', portraitState: 'neutral',
      text: 'No sé si esto va a sonar ridículo. Hace semanas siento que alguien entra a mi departamento cuando estoy dormido. No falta nada. Solo encuentro cosas apenas movidas. Después pienso que capaz me lo inventé.',
      choices: [
        { id: 'listen_first', text: '“Contame qué fue lo primero que notaste.”', effects: [{ type: 'changeStat', stat: 'trust', amount: 1 }], nextSceneId: 's1_thread' },
        { id: 'ask_proof', text: '“¿Qué evidencia concreta encontraste?”', effects: [{ type: 'changeStat', stat: 'anxiety', amount: 1 }, { type: 'addClue', clueId: 'clock' }], nextSceneId: 's1_thread' },
        { id: 'challenge_memory', text: '“¿Y si los cambios los hacés vos y después no los recordás?”', effects: [{ type: 'changeStat', stat: 'trust', amount: -1 }, { type: 'changeStat', stat: 'hostility', amount: 1 }], nextSceneId: 's1_thread' },
      ],
    },
    s1_thread: {
      id: 's1_thread', kind: 'dialogue', session: 1, speaker: 'Tomás', portraitState: 'uneasy',
      text: 'Hay otra cosa. El mes pasado me echaron del taller. Mauro, mi encargado, dijo que yo había perdido una herramienta. Después de todo lo que hice por ese lugar… a veces pienso que tendría que pagar.',
      choices: [
        { id: 'explore_mauro', text: '“¿Qué significa para vos que Mauro pague?”', effects: [{ type: 'addClue', clueId: 'resentment' }], nextSceneId: 's1_close' },
        { id: 'return_home', text: '“Volvamos a lo que pasa en tu casa.”', effects: [{ type: 'changeStat', stat: 'trust', amount: 1 }, { type: 'addClue', clueId: 'lock' }], nextSceneId: 's1_close' },
        { id: 'hold_silence', text: 'Esperar en silencio.', effects: [{ type: 'changeStat', stat: 'trust', amount: 1 }, { type: 'addClue', clueId: 'resentment' }], nextSceneId: 's1_close' },
      ],
    },
    s1_close: {
      id: 's1_close', kind: 'dialogue', session: 1, speaker: 'Tomás', label: 'Cierre de sesión', portraitState: 'defensive',
      text: 'Tomás se pone de pie antes de que termine la hora. En la puerta, mira el pasillo vacío y pregunta si las paredes del consultorio son gruesas.',
      choices: [
        { id: 'ask_walls', text: '“¿Qué te preocupa que alguien pueda escuchar?”', effects: [{ type: 'changeStat', stat: 'trust', amount: 1 }], nextSceneId: 'between_1' },
        { id: 'end_session', text: 'Cerrar la sesión y despedirlo.', nextSceneId: 'between_1' },
      ],
    },
    between_1: {
      id: 'between_1', kind: 'interlude', label: 'Esa noche',
      text: 'A las 23:17 llega un mensaje desde un número desconocido: “No le crea todo. Pregúntele por el jueves”. No hay firma. A la mañana siguiente, Tomás confirma por mensaje que asistirá a la segunda sesión.',
      choices: [
        { id: 'document_message', text: 'Guardar el mensaje en el expediente y esperar la sesión.', effects: [{ type: 'setFlag', flag: 'messageDocumented', value: true }], nextSceneId: 's2_open' },
        { id: 'contact_tomas', text: 'Escribirle a Tomás para confirmar que está bien.', effects: [{ type: 'changeStat', stat: 'trust', amount: 1 }, { type: 'changeStat', stat: 'anxiety', amount: 1 }, { type: 'setFlag', flag: 'checkIn', value: true }], nextSceneId: 's2_open' },
        { id: 'ignore_message', text: 'No responder ni registrar el mensaje.', effects: [{ type: 'changeStat', stat: 'risk', amount: 1 }], nextSceneId: 's2_open' },
      ],
    },
    s2_open: {
      id: 's2_open', kind: 'dialogue', session: 2, speaker: 'Tomás', label: 'Segunda sesión', portraitState: 'uneasy',
      text: 'Tomás llega con una foto en el teléfono. “La cerradura estaba así cuando volví. O cuando creo que volví. El jueves hay un hueco; me desperté vestido y no me acuerdo del viaje.”',
      clueIds: ['lock'],
      choices: [
        { id: 'ask_thursday', text: '“¿Qué recordás de ese jueves, aunque parezca mínimo?”', effects: [{ type: 'addClue', clueId: 'memory' }, { type: 'changeStat', stat: 'anxiety', amount: 1 }], nextSceneId: 's2_explore' },
        { id: 'ground_present', text: '“Antes de seguir, ubiquémonos en acá y ahora.”', effects: [{ type: 'changeStat', stat: 'trust', amount: 1 }], nextSceneId: 's2_explore' },
        { id: 'ask_safety', text: '“¿Pensaste en lastimarte o lastimar a alguien?”', effects: [{ type: 'changeStat', stat: 'risk', amount: -1 }, { type: 'setFlag', flag: 'askedSafety', value: true }], nextSceneId: 's2_explore' },
      ],
    },
    s2_explore: {
      id: 's2_explore', kind: 'dialogue', session: 2, speaker: 'Tomás', portraitState: 'vulnerable',
      text: '“Mauro dice que me vio cerca del taller el jueves. Yo no sé. Encontré un borrador en el teléfono: ‘Esta noche termina’. No recuerdo haberlo escrito.” Se queda mirando la pantalla apagada.',
      choices: [
        { id: 'ask_draft', text: '“¿Qué imaginabas que iba a terminar?”', effects: [{ type: 'addClue', clueId: 'draft' }, { type: 'changeStat', stat: 'trust', amount: 1 }], nextSceneId: 's2_close' },
        { id: 'name_ambiguity', text: '“La frase preocupa, pero todavía no sabemos qué quiere decir.”', effects: [{ type: 'addClue', clueId: 'draft' }, { type: 'changeStat', stat: 'anxiety', amount: -1 }], nextSceneId: 's2_close' },
        { id: 'accuse_now', text: '“Parece que estás preparando algo contra Mauro.”', effects: [{ type: 'setFlag', flag: 'accusedEarly', value: true }, { type: 'changeStat', stat: 'hostility', amount: 2 }], nextSceneId: 's2_close' },
      ],
    },
    s2_close: {
      id: 's2_close', kind: 'dialogue', session: 2, speaker: 'Tomás', label: 'Cierre de sesión', portraitState: 'uneasy',
      text: 'Antes de irse, Tomás pregunta si todo lo que dice podría terminar en manos de la policía. No espera una respuesta larga. “Mauro desapareció de las redes. Capaz se fue de viaje.”',
      choices: [
        { id: 'explain_limits', text: 'Explicar con calma los límites de la confidencialidad y explorar qué teme.', effects: [{ type: 'changeStat', stat: 'trust', amount: 1 }], nextSceneId: 'between_2' },
        { id: 'promise_secret', text: '“Nada de lo que digas va a salir de acá.”', effects: [{ type: 'changeStat', stat: 'trust', amount: 1 }, { type: 'changeStat', stat: 'risk', amount: 1 }, { type: 'setFlag', flag: 'promisedSecret', value: true }], nextSceneId: 'between_2' },
        { id: 'end_without_answer', text: 'Decirle que el tiempo terminó.', effects: [{ type: 'changeStat', stat: 'hostility', amount: 1 }], nextSceneId: 'between_2' },
      ],
    },
    between_2: {
      id: 'between_2', kind: 'interlude', label: 'Al día siguiente',
      text: 'Un portal local informa que Mauro no volvió a su casa. Su hermana hizo la denuncia. Una vecina dijo haber oído un auto en el pasillo del edificio de Tomás, pero no pudo identificar a nadie.',
      clueIds: ['hallway'],
      choices: [
        { id: 'consult_supervisor', text: 'Consultar a una supervisora y documentar la preocupación.', effects: [{ type: 'setFlag', flag: 'supervisorConsulted', value: true }, { type: 'changeStat', stat: 'risk', amount: -1 }], nextSceneId: 's3_open' },
        { id: 'call_family', text: 'Contactar a la hermana de Mauro para verificar la noticia.', effects: [{ type: 'setFlag', flag: 'familyContacted', value: true }, { type: 'addClue', clueId: 'family' }], nextSceneId: 's3_open' },
        { id: 'keep_confidentiality', text: 'No contactar a terceros; preparar preguntas directas para Tomás.', effects: [{ type: 'changeStat', stat: 'risk', amount: 1 }], nextSceneId: 's3_open' },
      ],
    },
    s3_open: {
      id: 's3_open', kind: 'dialogue', session: 3, speaker: 'Tomás', label: 'Tercera sesión', portraitState: 'defensive',
      text: 'Tomás llega tarde. Tiene barro seco en el borde del pantalón. “Me dijeron que Mauro no aparece. Anoche dormí de corrido. Por primera vez en semanas.”',
      choices: [
        { id: 'ask_whereabouts', text: '“¿Pensabas reunirte con Mauro esta noche?”', effects: [{ type: 'addClue', clueId: 'plan' }, { type: 'changeStat', stat: 'anxiety', amount: 1 }], nextSceneId: 's3_phone' },
        { id: 'ask_feeling', text: '“¿Cómo te cae la noticia de que Mauro no aparece?”', effects: [{ type: 'changeStat', stat: 'trust', amount: 1 }], nextSceneId: 's3_phone' },
        { id: 'show_message', text: 'Mostrarle el mensaje anónimo y preguntarle por el jueves.', conditions: [{ type: 'flagIs', flag: 'messageDocumented', value: true }, { type: 'statAtLeast', stat: 'trust', value: 3 }], effects: [{ type: 'changeStat', stat: 'hostility', amount: 1 }, { type: 'addClue', clueId: 'plan' }], nextSceneId: 's3_phone' },
      ],
    },
    s3_phone: {
      id: 's3_phone', kind: 'dialogue', session: 3, speaker: 'Tomás', portraitState: 'defensive',
      text: 'El teléfono vibra sobre la mesa. En la pantalla aparece un borrador: “Estacionamiento, 00:30”. Tomás lo tapa con la mano. “No es lo que parece. Mauro me debe una explicación.”',
      choices: [
        { id: 'ask_plan', text: '“¿Vas a encontrarte con Mauro esta noche?”', effects: [{ type: 'addClue', clueId: 'plan' }, { type: 'changeStat', stat: 'risk', amount: 1 }], nextSceneId: 's3_decision' },
        { id: 'stay_curios', text: '“¿Qué necesitás que Mauro entienda?”', effects: [{ type: 'changeStat', stat: 'trust', amount: 1 }, { type: 'addClue', clueId: 'resentment' }], nextSceneId: 's3_decision' },
        { id: 'accuse_now_final', text: '“Creo que vas a hacerle daño.”', conditions: [{ type: 'statAtLeast', stat: 'hostility', value: 3 }], effects: [{ type: 'setFlag', flag: 'pressuredTomas', value: true }, { type: 'changeStat', stat: 'hostility', amount: 2 }], nextSceneId: 's3_decision' },
      ],
    },
    s3_decision: {
      id: 's3_decision', kind: 'decision', session: 3, speaker: 'Tomás', label: '00:24', portraitState: 'uneasy',
      text: 'Tomás guarda el teléfono. “Tengo que irme.” Afuera, un ascensor se detiene en el piso. No sabés si el encuentro es real, si Mauro está en peligro o si estás viendo una amenaza donde hay otra cosa.',
      choices: [
        { id: 'call_emergency', text: 'Pedir asistencia de emergencia y explicitar la información concreta que tenés.', effects: [{ type: 'setFlag', flag: 'emergencyCalled', value: true }, { type: 'setFlag', flag: 'outcomePrevented', value: true }, { type: 'addClue', clueId: 'call-log' }, { type: 'changeStat', stat: 'risk', amount: -2 }], nextSceneId: ENDING_SCENE_ID, recordInCaseFile: true },
        { id: 'stay_supervised', text: 'Pedirle que se quede mientras consultás a tu supervisora.', conditions: [{ type: 'statAtLeast', stat: 'trust', value: 3 }], effects: [{ type: 'setFlag', flag: 'withSupervisor', value: true }, { type: 'setFlag', flag: 'outcomePrevented', value: true }, { type: 'changeStat', stat: 'trust', amount: 1 }, { type: 'changeStat', stat: 'risk', amount: -1 }], nextSceneId: ENDING_SCENE_ID, recordInCaseFile: true },
        { id: 'let_him_go', text: 'Dejar que se vaya; acordar hablar al día siguiente.', effects: [{ type: 'setFlag', flag: 'letGo', value: true }, { type: 'changeStat', stat: 'risk', amount: 2 }], nextSceneId: ENDING_SCENE_ID, recordInCaseFile: true },
        { id: 'accuse_formally', text: 'Presentar una denuncia formal basada en tu interpretación y acusarlo.', effects: [{ type: 'setFlag', flag: 'falseAccusation', value: true }, { type: 'changeStat', stat: 'hostility', amount: 2 }, { type: 'changeStat', stat: 'risk', amount: 1 }], nextSceneId: ENDING_SCENE_ID, recordInCaseFile: true },
      ],
    },
  },
  endings: [
    { id: 'false_accusation', title: 'El nombre equivocado', text: 'La acusación precipitada llega a la familia de Mauro antes de que aparezca evidencia. Mauro es encontrado con vida, escondido por una deuda que no tenía relación con Tomás. Tomás no vuelve al consultorio. En el expediente, tus sospechas ocupan más espacio que los hechos.', conditions: [{ type: 'flagIs', flag: 'falseAccusation', value: true }], keyClueIds: ['resentment', 'plan'] },
    { id: 'prevented', title: 'La llamada', text: 'La intervención interrumpe el encuentro antes de que escale. Mauro está asustado, pero a salvo. La cerradura, el borrador y la hora del mensaje dibujaban un riesgo posible, no una certeza. Tomás no es reducido a una etiqueta: queda una historia más compleja que todavía necesita ser escuchada.', conditions: [{ type: 'flagIs', flag: 'outcomePrevented', value: true }], keyClueIds: ['plan', 'draft', 'call-log'] },
    { id: 'late_truth', title: 'Después de medianoche', text: 'Cuando llega la noticia, ya es tarde para impedir el encuentro. Mauro, que se ocultaba por deudas, sobrevive a la agresión y reconoce a Tomás. Tus notas ayudan a reconstruir la secuencia; también muestran el momento en que decidiste dejarlo ir.', conditions: [{ type: 'flagIs', flag: 'letGo', value: true }, { type: 'statAtLeast', stat: 'risk', value: 4 }], keyClueIds: ['plan', 'draft', 'hallway'] },
    { id: 'ambiguous', title: 'Lo que no se resolvió', text: 'No ocurre un ataque esa noche. Mauro sigue sin aparecer y Tomás deja de responder. La foto de la cerradura, el viaje que no recuerda y el mensaje anónimo permiten varias lecturas. Evitaste precipitar una conclusión; también te quedaste sin saber cuál era la verdadera.', keyClueIds: ['lock', 'memory', 'hallway'] },
  ],
}
