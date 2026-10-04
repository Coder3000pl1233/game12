# Partes 1–4 — Sistemas

## Parte 1 — Diagnóstico del diseño actual

### Qué funciona

Los specs originales ya separan verdad institucional de destino personal, ordenan las revelaciones y evitan un diagnóstico sorpresa. El motor separa contenido y UI, admite condiciones, efectos, temas, decisiones registradas y consecuencias diferidas. El cuaderno y el historial ofrecen una base adecuada para memoria narrativa. La presentación actual de una intervención por vez sirve para una novela visual.

### Qué limita la agencia: evidencia del proyecto

| Lugar | Situación actual | Cambio propuesto |
|---|---|---|
| `src/features/story/types.ts` | Doce estadísticas; no existen ansiedad ni miedo. Tres rutas. | Cuatro emociones explícitas, secundarias separadas y cinco trayectorias para seis resultados. |
| `engine.ts`, `calculateRoutePressure` / `resolveActFourEnding` | Sumas ponderadas eligen una ruta; entrar a `s18_route_resolver` lleva directamente a un ending. | Elegibilidad mediante historia + emociones + relaciones; S18 y clímax jugables. |
| Campañas `la-silla-vacia.ts`, `act-two.ts`, `act-three.ts` | Preguntas, interpretaciones y decisiones importantes de Julián aparecen dentro de `lines`. | Convertirlas en elecciones y segundas réplicas diferentes antes de converger. |
| `act-four.ts` | Últimas conversaciones principalmente narradas, incluida respuesta fija a la llamada. | Decisiones aun cuando ya no cambia el resultado general. |
| Hipótesis de `la-silla-vacia.ts` | Tres hipótesis globales sobre mensajes, incluso antes de conocerlos. | Catálogo por conocimiento/sesión; hipótesis sobre vínculo desde S1. |
| `updateHypothesis` | Reactiva registros anteriores y reemplaza su fecha. | Historial append-only: creer, revisar, retirar y reafirmar son eventos distintos. |
| `App.tsx`, `chooseHypothesisAndContinue` | Guarda y llama directamente a `completeStorySession`. Puede omitir opciones del interludio. | Resolver decisiones pendientes dentro del cuaderno antes del guardado atómico que cierra y avanza. |
| `ChoiceButton` / `EmotionalPanel` | Anticipa impacto potencial en confianza; muestra barras derivadas de otras estadísticas. | Retirar anticipación de ganancias/pérdidas y barras emocionales secundarias. |

No se necesita reescribir el motor desde cero. Se amplía su modelo de transición y se reautoriza el contenido. Los specs `03_CANON_TIMELINE`, `06_SESSION_SPEC_01_18`, `07_ENDINGS` y `08_CONTENT_AND_DIALOGUE_RULES` siguen siendo base canónica, con los cambios de agencia detallados al final de este paquete.

## Parte 2 — Sistema emocional

### Cuatro emociones, no cuatro barras de salud

Escala interna 0–100. Inicio provisional: ansiedad 55, enojo 45, miedo 50, confianza 30. Baja ≤34, media 35–64, alta ≥65. Se evalúan al entrar a cada momento, no entre cada letra. Una banda cambia al cruzar el límite por cinco puntos para evitar oscilación visual. Estos valores son convenciones de ficción ajustables.

Cada elección importante declara un vector completo `[ansiedad, enojo, miedo, confianza]`, incluidos ceros explícitos. No es necesario que las cuatro cambien siempre. Continuar texto, abrir menú o inspeccionar otra vez un archivo no produce puntos. Los sucesos externos también afectan: Julián no controla toda la vida de Tomás.

| Emoción | Aumenta con | Disminuye con | Puede significar / diálogo | Lenguaje visual y sonoro |
|---|---|---|---|---|
| Ansiedad | Incertidumbre, cambios abruptos, espera sin acuerdo, presión de terceros | Anticipación concreta de próximos pasos, pausa acordada, elección acotada | «¿Y después qué pasa?»; preguntas repetidas, correcciones rápidas | Dedos inquietos, mirada alternante, ritmo entrecortado. Capa ambiental inestable suave, nunca alarma de riesgo. |
| Enojo | Injusticia, acusación, pasividad sostenida, promesas rotas | Responsabilidad reconocida, límites propios efectivos, distancia del conflicto | Puede permitir decir «Eso estuvo mal» sin pedir perdón. No equivale a hostilidad operativa. | Mandíbula/tensión de hombros, mirada sostenida, frases más cortas; leve peso grave, sin música de villano. |
| Miedo | Exposición, amenaza, pérdida de relación/control, pensamientos propios | Saber quién recibirá información y para qué, apoyo creíble, poder decir hasta dónde | «Te lo cuento, pero primero decime qué vas a hacer». Alto con confianza puede abrir ayuda. | Manos recogidas, mirada a puerta, voz que baja al nombrar a alguien, pausa antes de revelar. Sin código rojo. |
| Confianza | Coherencia, límites comprensibles, preguntas pertinentes, reparación sostenida | Baja con sorpresas, apropiación del relato, acusación, promesas incumplidas | «Eso no se lo dije a nadie» no significa estar mejor; también permite discutir con Julián | Cuerpo menos orientado a salir, contradicción directa en vez de complacencia. Único medidor general, sin delta por respuesta. |

Las animaciones no diagnostican. Una misma postura admite varios sentidos; el diálogo y el contexto deben poder contradecir una primera lectura. El jugador puede desactivar movimiento, música o respiración ambiental sin perder información: equivalentes textuales breves («Tarda en responder»), no nombres de estados. No introducir golpes de sonido ni cuenta regresiva.

### Ocho modos de expresión acotados

| Modo | Combinación orientativa | Conducta / oportunidad |
|---|---|---|
| Vigilante | Ansiedad y miedo altos, confianza baja | Responde a la intención de la pregunta; explica límites antes de insistir. |
| Desbordado con vínculo | Ansiedad alta y confianza alta | Habla atropellado, pide anticipación; puede revelar deterioro temprano. |
| Enojado en relación | Enojo y confianza altos | Discute sin abandonar: posibilidad de límites, no castigo por bronca. |
| Confrontativo aislado | Enojo alto, confianza baja, miedo bajo + aislamiento | Rechaza interlocución; no implica violencia ni habilita por sí solo esa ruta. |
| Negociador asustado | Miedo y confianza altos | Formula condiciones para hablar, acepta ayuda si conserva participación. |
| Replegado | Enojo, miedo y confianza bajos + desesperanza/aislamiento sostenidos | Respuestas conformes vacías; la calma no prueba recuperación. |
| Culpable ambivalente | Miedo medio/alto + culpa alta, confianza media | Alterna defensa de Bruno y autocondena. Puede tolerar incertidumbre. |
| Disponible | Activación media/baja, confianza media/alta + autonomía | Explora sin exigir reparación total; no inmunidad ante nuevas crisis. |

Selección: primero un modo específico de escena (por ejemplo, culpa en S10); después el más persistente de los elegibles; empate por mayor diferencia respecto de su umbral y finalmente orden fijo de la tabla. Mantenerlo durante el intercambio. Aplicar como máximo **un modo, un callback y un modificador relacional**; jamás escribir 8×8 variantes. Si ninguno aplica, voz reservada neutral de Tomás.

### Secundarias necesarias

| Estado oculto | Para qué existe | Relación con las cuatro emociones |
|---|---|---|
| `autonomy` | Participación efectiva, no permiso ilimitado | Amortigua miedo/ansiedad ante terceros; dañarla sube enojo y erosiona confianza. |
| `maternal_bond` | Relación funcional con Laura, distinta de Julián | Hace posible pedir/responder ayuda aunque no confíe en Julián. |
| `isolation` | Disponibilidad real de interlocutores | Da persistencia al repliegue o a confrontación; no se borra validando una frase. |
| `hopelessness` | Expectativa de que nada cambie | Diferencia alivio de resignación cuando baja la activación. |
| `guilt` | Autorreproche sobre Bruno | Amplifica miedo; enojo articulado puede reducirla sin bajar todo el enojo. |
| `perceived_support` | Sentirse acompañado | Puede divergir de recursos objetivos y de confianza alta en un único terapeuta. |
| `support_links` | Laura, Marina, continuidad profesional y alternativa escolar, cada una ofrecida/acordada/activa | Recursos reales; no se suman automáticamente al invocar sus nombres. |
| `santi_bond` | Posibilidad de límite/dialogar, no perdón | Cambia miedo/enojo al confrontarlo y escena de despedida. |
| `school_return_pressure` | Presión externa persistente | Dispara ansiedad/miedo/enojo de forma diferente según estado y apoyos. |

`investigation_bias` pasa al modelo de Julián. `hostility` se reemplaza por enojo, sin convertirlos retroactivamente en equivalentes clínicos. `perceived_injustice` se expresa como hechos recordados y etiquetas de contexto; no duplicar enojo. `external_support` se descompone en enlaces comprobables. El registro de divulgaciones, promesas, amenazas y permisos es factual, no otras cinco barras.

### Vectores de autoría para las fichas de sesiones

Abreviaturas A/E/M/C. Magnitudes leves 2, medias 5, fuertes 8; las tablas siguientes son valores iniciales, no balance final. Una sola opción nunca cambia más de 8 puntos por emoción. Los cambios de confianza se muestran agrupados al converger.

| Perfil | Vector A/E/M/C | Uso; condición contextual |
|---|---|---|
| `R` Ritmo compartido | −3/0/−2/+3 | Autonomía +2. Si fue promesa repetidamente rota: 0/+2/0/0 hasta que haya acción consistente. |
| `V` Validar significado | −2/0/−2/+3 | No baja enojo por reconocer una injusticia. Sin petición concreta, no crea apoyo. |
| `Q` Pregunta delimitada | +2/0/+1/+1 | Da información. En modo vigilante sin permiso: +4/+2/+3/−2. |
| `F` Confrontar | +4/+4/+3/−3 | Con confianza alta y permiso: +2/+1/+1/+1. Nunca pérdida automática por preguntar algo difícil. |
| `L` Límite explícito | +2/+2/−2/+1 | Autonomía +1 si se explica alcance; no equivale a decisión unilateral. |
| `P` Reparar | −2/−3/−2/+4 | Reconocimiento sin acto posterior no vuelve a dar bonificación; abre promesa verificable. |
| `J` Explicar intención | 0/+2/0/−1 | Si primero hubo reconocimiento: −1/0/−1/+1. No toda explicación es excusa. |
| `I` Priorizar evidencia | +3/+1/+2/−2 | Con permiso delimitado: +1/0/+1/+1. Sube tendencia investigadora, no activa final sola. |
| `T` Decidir por él | +4/+3/+4/−4 | Autonomía −4; puede activar recurso real y aliviar un problema externo. |
| `D` Diferir tema | −2/−1/−1/−1 | Si acuerdan cuándo retomarlo: perfil R. Si se repite sin retorno: desesperanza +2. |
| `S` Silencio elegido | según modo | Confianza alta: −2/0/−1/+2; vigilante: +3/+1/+2/−2; ansiedad alta: +4/0/+2/0; repliegue: 0/0/0/−1. Priorizar ansiedad alta cuando coincide con vigilancia. |

Cada perfil es base, no «respuesta buena». El contenido puede declarar un override justificado; no aplicar dos perfiles a una misma frase. Eventos externos no quedan sujetos al límite de una frase, pero requieren autoría explícita y no pueden elegir finales directamente. No implementar regeneración por tiempo ni farmeo repitiendo temas.

## Parte 3 — Modelo del jugador / Julián

Guardar eventos de conducta, no una clase irrevocable. Ejes: investigar/escuchar; dirigir/negociar; justificar/reconocer; gestionar terceros unilateralmente/con acuerdo; consultar/posponer supervisión. El estilo conversacional se obtiene de las últimas seis decisiones significativas. La memoria de promesas y exposiciones no caduca al cambiar de estilo.

La tendencia reciente modifica el **orden y la formulación**, no selecciona por el jugador. Una hipótesis acusatoria puede ofrecer «¿Qué sabías antes del mensaje?» antes que «¿Qué te pasó cuando te señalaron?». Ambas siguen accesibles; nunca esconder reparación tras un requisito moral. Como máximo una opción específica exige un recurso real: «Retomar lo trabajado con Marina» necesita una consulta anterior; siempre existe «Pedir supervisión ahora», con demora y sin el mismo beneficio retroactivo.

Registrar `decisionId`, intención, objetivo, destinatario, conocimiento disponible, consecuencias, promesa creada y estado anterior/posterior. La responsabilidad se verifica por acciones: disculparse + incumplir mantiene la discrepancia. Reafirmar una hipótesis no vuelve falsos los hechos. El cambio de rumbo cuesta coherencia y tiempo, no una prohibición artificial.

Automático: saludo, movimiento de silla, transición horaria, lectura literal de un mensaje conocido. Jugable: sospecha, pregunta significativa, confidencialidad, apoyo, evidencia, interpretación, disculpa, silencio con peso, frase final. Las acciones triviales no deben introducir decisiones por la puerta de atrás.

## Parte 4 — Arquitectura de bifurcaciones

### Unidad de autoría

`sesión → entrada contextual → momento 1 → réplica específica → segunda elección → convergencia local → momento 2… → cierre → cuaderno → sesión siguiente`.

Tres momentos obligatorios por sesión; cinco en S1. Cada uno ofrece 3–4 opciones. La parte 5 define la primera capa y su intención; la parte 6 desarrolla nueve ejemplos de segunda capa. Los restantes se guionan después con el mismo contrato: al menos dos intercambios antes de converger, tres si hay confrontación/promesa. Convergencia comparte el **evento**, no borra estado, hechos ni recuerdos.

Presupuesto orientativo: 18 cierres, 56 momentos principales, tres ramas breves por momento y una convergencia local. Unas 170 ramas cortas de contenido, **no 170 rutas**; dos a tres pantallas por rama. Reusar estructuras de réplica, nunca una misma frase indiferente al trato. Implementar primero S1→S3→S8 como corte vertical y medir coste real antes de guionizar todo.

### Datos y transacción narrativa

Añadir a los tipos existentes `EmotionBlock`, `playerStyleEvents`, `promiseLedger`, `disclosureLedger`, `supportLinks`, `knowledgeByActor`, `hypothesisHistory`, `consumedConsequences`, `dialogueCursor`, `routeContext`. `sceneId` más cursor permite guardar a mitad de réplica sin repetir efectos.

Toda opción usa ID estable `sNN.mM.a|b|c`; las segundas réplicas agregan `.r1.a`. Se conserva como evento inmutable. Los flags de las fichas son **estados derivados** de esos IDs y de acciones cumplidas; no se mantienen dos verdades independientes. Valores mutuamente excluyentes se guardan como enum, no tres booleanos simultáneos. Un «pidió supervisión» no equivale a «supervisión realizada».

Orden atómico: validar opción y versión → aplicar vector/efectos → registrar decisión → crear promesas y consecuencias → actualizar conocimiento → evaluar convergencia → guardar → mostrar siguiente intervención. Un doble clic o recarga no repite efectos. Temas no pueden saltar una pregunta pendiente.

Consecuencia: ID único, decisión origen, punto de activación (`S08.entry`), condición de estado, efecto/variante, fecha de expiración opcional y estado pendiente/consumida/cancelada con motivo. Si la condición ya no aplica se conserva memoria y se usa variante reparada; no desaparece silenciosamente. Distinguir recuerdo de un hecho y efecto aún pendiente.

### Cuaderno y continuidad solicitada

Se abre solo al cerrar cada sesión. Hipótesis principal obligatoria; notas opcionales. S1 ofrece «Está probando cuánto control conserva», «La obligación de venir domina la conversación», «Todavía no alcanza para interpretar». Nada de mensajes antes de S4. Desde S12 separar «Nico autor confirmado para Tomás/jugador» de «Julián aún no lo sabe». No transferir automáticamente información de una escena fuera de consulta al expediente de Julián.

Historial append-only con sesión, evidencia disponible, formulación y revisión. Volver a una hipótesis anterior crea nueva entrada vinculada; la vieja sigue tachada. Hipótesis principales de vínculo pueden mantenerse tras confirmar la autoría. El cuaderno no puntúa certeza como virtud: «información insuficiente» también puede ser evasión si nunca se revisa.

Las decisiones sustantivas del interludio —consulta a Marina, comunicación a padres— aparecen **antes** del botón final, dentro del cuaderno. Exigir resolverlas, no elegir una conducta particular. Después, «Guardar hipótesis y continuar» guarda hipótesis + nota opcional escrita + decisión de interludio, consume efectos una vez, cierra y comienza la próxima sesión automáticamente. Error de almacenamiento: no cerrar ni avanzar. S18 no abre una S19: avanza a su clímax o al epílogo correspondiente.

### Memoria, evidencia y finales

Una frase recordada requiere evento fuente real. Seleccionar a lo sumo un callback por momento: promesa incumplida pertinente > reparación cumplida > hipótesis pertinente > recuerdo temprano. Evitar repetirlo en dos escenas consecutivas. Distinguir hecho, testimonio, interpretación y sensación; ninguna hipótesis modifica Camila, Nico ni el pasado.

La parte 8 define puertas narrativas y resolución determinista. Las señales se preparan antes de S17; ningún valor aislado elige destino. Emociones informan **cómo** transita una trayectoria, y relaciones/acciones determinan recursos. Mantener auditoría interna de por qué se habilitó sin mostrársela como un informe clínico al jugador.

### Verificación antes de migrar

Pruebas obligatorias: dos S1 producen S2 y S8 distintos; S8 no repara sola; enojo alto puede terminar en salida; confianza alta puede coexistir con crisis; investigar con acuerdo no penaliza siempre; silencio cambia por estado; verdad institucional confirmada en seis resultados; seis alcanzables sin glitches; cero callejones sin opciones; saber de Nico no filtra conocimiento a Julián; recarga no repite efectos; guardar cuaderno no salta decisiones; notas no obligatorias; hipótesis conserva revisiones; seis clímax con al menos dos elecciones; ninguna respuesta muestra deltas ni ruta; retorno de S17 exige antecedentes.

Guardar como schemaVersion 2 cuando se implemente. No inventar ansiedad/miedo históricos a partir de hostilidad. Ofrecer continuar la versión antigua o empezar el rediseño; una migración opcional necesitaría mapear decisiones existentes y advertir que no reconstruye decisiones que jamás se jugaron. Los archivos de este paquete no alteran partidas actuales.
