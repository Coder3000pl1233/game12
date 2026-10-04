# Parte 5 — Las 18 sesiones

Fichas de autoría, no guion completo. Leer los perfiles emocionales de la parte 2. Cada opción tiene ID `sNN.mM.letra`; ese ID es su flag histórico y permite disparar el callback indicado. Las letras no representan calidad: se conserva su orden solo en documentación; la UI puede reordenarlas por estilo. La respuesta de Tomás es el **comienzo de una rama**, nunca un salto inmediato al siguiente momento. Se añade una segunda decisión contextual como muestran los ejemplos de la parte 6.

En cada ficha, las consecuencias diferidas enumeran el destino de cada momento y sus tres variantes a/b/c. Las variantes de estado cambian las réplicas, no quién escribió los mensajes. Los temas son puertas de conversación, no una lista obligatoria de interrogatorio: cuatro disponibles, generalmente dos elegibles para profundizar. El núcleo canónico sucede aunque un tema opcional quede fuera.

## S01 — ¿Eso era todo?

### Objetivo

Construir desde la primera elección una relación reconocible y la forma de la prueba de S2. Tomás no necesita agradar al jugador ni entregar una pista para que la sesión tenga valor.

### Eventos obligatorios

Llega obligado, cuestiona la utilidad de estar ahí, deja una contradicción pequeña sobre ir/volver de la escuela y termina preguntando «¿Eso era todo?». Marina está disponible; los padres esperan información. Sin Bruno ni mensajes todavía.

### Estado emocional relevante

Predomina vigilancia: ansiedad y miedo medios/altos, confianza baja. Enojo puede ser modo de conservar autonomía. La primera respuesta ya aplica su vector.

### Temas disponibles

Estar obligado; lo que esperan sus padres; ir a la escuela; qué cambió en los últimos meses. El jugador elige por dónde comenzar, no obtiene acceso a todos por insistir.

### Decisiones del jugador

M1: responder a «¿Vas a preguntarme hasta que diga algo interesante?». M2: abordar contradicción sin convertirla automáticamente en mentira. M3: definir el alcance del espacio. M4: contestar el cierre de Tomás. M5: decidir preparación en el cuaderno. Intenciones en tensión: no invadir, conocer algo útil, ofrecer estructura, mostrarse competente.

### Opciones de diálogo

| ID | Julián / acción → primera respuesta de Tomás | Perfil |
|---|---|---|
| m1.a | «No tenés que contarme nada hoy. Podemos empezar por qué no querés estar acá». → «¿Y eso también lo anotás?» | R |
| m1.b | «Podemos usar la hora para una cosa que quieras que cambie». → «¿Y si quiero que termine la hora?» | Q |
| m1.c | «Prefiero decirte cómo trabajo antes de pedirte algo». → «Bueno. Corto». | L |
| m2.a | «Dijiste ir y después volver. ¿Me perdí algo?» → «No dije que hubiera dejado de ir». | Q |
| m2.b | «Eso no coincide con lo anterior. Quiero entender la diferencia». → «¿Ya empezamos?» | F |
| m2.c | «Podemos dejar la escuela por ahora. ¿Cómo es volver a casa?» → «Casi lo mismo». | D |
| m3.a | «Si pienso hablar con alguien, quiero que sepas qué y por qué». → «Pensar no es prometer». | L |
| m3.b | «¿Qué sería lo peor de que tus padres supieran algo de acá?» → «Que se crean que ahora saben todo». | Q |
| m3.c | «No puedo garantizar que nunca necesite ayuda de otros». → «Entonces también trabajás para ellos». | L |
| m4.a | «Por hoy sí. La próxima podemos retomar lo que vos elijas». → «Vamos a ver si te acordás». | R |
| m4.b | «Antes de irte: ¿hubo algo que te molestó de mí?» → «¿Querés una lista?» | Q |
| m4.c | Guardar silencio y dejar que termine de levantarse. → Mira atrás antes de salir / sale sin mirar. | S |
| m5.a | Consultar a Marina sobre el encuadre, sin pedirle resolver el misterio. → S2: «Hoy venís con discurso nuevo». | R diferido |
| m5.b | Preparar preguntas sobre las inconsistencias, sin consulta todavía. → S2: «¿Seguís con eso?» | I diferido |
| m5.c | Preparar con Laura un intercambio acotado sobre convivencia, sin contenido de consulta. → S2: «Mi vieja dice que hablaron». | L diferido |

### Cambios emocionales

M1 y M4 crean autonomía solo si luego se respeta el ritmo. M2b eleva activación, pero una segunda réplica humilde puede evitar fijar confrontación. M3 aumenta claridad y miedo a terceros a la vez; la confianza no sube de golpe. M5 afecta a Tomás cuando se hace visible en S2, no mágicamente al cerrar el cuaderno. Registrar estilo de Julián inmediatamente.

### Variantes según estado

C alta relativa a inicio: «No dije que no quiera hablar. Dije que no quiero hablar de eso». C baja: «Lo que anotaste». E alto: «¿También hay una respuesta que tengo que dar bien?». M alto: «¿Mi mamá va a leer eso?». A alta: «Decime cuánto falta». Tras m2b, la prueba de S2 adopta un desafío; con ritmo cumplido, una pregunta tentativa.

### Consecuencias inmediatas

M1 abre una rama sobre el cuaderno, una sobre utilidad o una sobre límites. M2 deja contradicción observada, confrontada o pendiente: no «mentira confirmada». M3 fija qué cree Tomás que se le dijo. M4 registra primera promesa de continuidad. M5 ejecuta una preparación real, no tres bonificaciones equivalentes.

### Consecuencias diferidas

M1 a/b/c → S2 prueba tentativa/práctica/legalista; S8 recuerda ritmo/utilidad/límites. M2 a/b/c → S2 pide aclaración/desafía/insiste en si se evitará la escuela; S9 ofrece relato/pide pruebas de escucha/recuerda asunto pendiente. M3 a/b/c → S3 compara aviso/destinatarios/límites; S16 vuelve a pedir anticipación. M4 a/b/c → S3 elige tema/evalúa crítica/tantea si se tolera silencio. M5 a/b/c → S2 claridad/preguntas precisas/Laura informada del encuadre; S11 Marina conoce antecedentes o recibe primera consulta; S18 se recuerda cómo se estableció el acceso familiar.

### Flags

`opening_contract = pace | change | framework`; `contradiction_handling = question | challenge | defer`; promesa de aviso si m3a, con alcance explícito; `first_preparation = supervision | inquiry | family_frame`. Guardar los quince IDs elegidos posibles, no texto inferido mediante regex.

### Callbacks

«Al principio dijiste que podía ir a mi ritmo» se completa con «y esperaste» o «hasta que quisiste respuestas». Solo existe si m1a. «¿Te acordás de lo que te pregunté al irme?» nace de m4b, no es genérico.

### Nodo de convergencia

Vuelve a S2 en los tres estilos de prueba. No se puede impedir que invente la pelea ni saber todavía que es falsa.

### Estado al terminar

Una hipótesis sobre relación/encuadre, notas opcionales, contrato percibido y preparación elegida. Dos recorridos deben diferir ya en apertura, réplica y segunda elección de S2.

## S02 — ¿Qué pasa si te digo…?

### Objetivo

Convertir la prueba de confidencialidad en una negociación jugable, sin permitir descubrir su falsedad antes de S8.

### Eventos obligatorios

Pelea inventada relatada como real; comunicación posterior a padres. No se presenta esa comunicación como obligación clínica universal ni como consejo profesional.

### Estado emocional relevante

Vigilancia o negociación asustada según S1; desafía con enojo si lo confrontaron.

### Temas disponibles

Qué haría Julián; padres; ex amigo; qué significa la pelea para él.

### Decisiones del jugador

M1 responder antes de pedir detalles; M2 preguntar sin afirmar veracidad; M3 elegir forma y alcance de la comunicación canónica.

### Opciones de diálogo

| ID | Opción → respuesta | Perfil |
|---|---|---|
| m1.a | «Primero puedo responder qué haría con lo que me cuentes». → «Eso pregunté». | L |
| m1.b | «¿Qué te preocupa que haga?» → «Ya sabés». | Q |
| m1.c | «Necesito entender un poco lo que pasó para responder». → «O sea que primero te tengo que contar». | I |
| m2.a | «¿Qué parte querés contar hoy?» → «No los nombres». | R |
| m2.b | «¿Cómo terminó para vos?» → «Terminó». | Q |
| m2.c | «Me preocupa que me estés poniendo a prueba». → «¿Y si fuera eso?» | F |
| m3.a | «Voy a hablar de esta preocupación con tus padres. Quiero acordar con vos qué diré». → «No dije que sí». | L |
| m3.b | «Voy a hablar primero con Laura y después te voy a contar qué dije». → «Después, claro». | T |
| m3.c | En cuaderno: comunicar la supuesta pelea a ambos, sin anticiparlo, para obtener contexto familiar. → S3: «Mi mamá preguntó por la pelea». | T diferido |

### Cambios emocionales

Incluso m3a daña algo de confianza por el desacuerdo (override C−2), pero conserva mayor autonomía. Advertir no equivale a consentir. m3b/c difieren en exposición y destinatarios, no solo magnitud. Consulta previa permite formular mejor, no suprime conflicto.

### Variantes según estado

C alta: «Pensé que me lo ibas a decir primero». C baja: «Sabía que ibas a hacer eso». E alto: «¿Te sirve mi permiso de adorno?». M alto: «A mi viejo no le cuentes así». A alta: exige saber cuándo hablará.

### Consecuencias inmediatas

Comunicación definida y ejecutada en interludio; Tomás retiene evaluación del encuadre. No se marca pelea como corroborada.

### Consecuencias diferidas

M1 a/b/c → S3 recuerda límite/pregunta/desvío; S8 pone en duda coherencia/intención/prioridad. M2 a/b/c → S8 confesión con condiciones/breve/confrontativa. M3 a/b/c → S3 desacuerdo/sorpresa parcial/traición; S9 menor demora/reserva/relato mínimo; S16 exigencia de aviso reforzada.

### Flags

`fight_disclosed = true`; `disclosure_s02 = discussed | mother_first | both_unannounced`; destinatarios y alcance en ledger. `fight_fabricated` es verdad autoral, no conocimiento de Julián.

### Callbacks

«Primero querías saber qué pasó. Yo quería saber qué ibas a hacer». Variante «Me avisaste, pero igual no me escuchaste» si m3a.

### Nodo de convergencia

Padres informados, entrada S3 cerrada con grados diferentes de agravio.

### Estado al terminar

Confianza dañada de forma explicable y una promesa verificable, no puntaje binario de confidencialidad.

## S03 — Se van a arrepentir

### Objetivo

Dar al jugador la primera oportunidad de reparar sin exigir gratitud; empezar a construir o restringir el vínculo con Laura.

### Eventos obligatorios

Tomás conoce la comunicación; distingue preocupación materna y minimización paterna; «Algún día se van a arrepentir de todo esto».

### Estado emocional relevante

Enojo en relación o vigilancia. Miedo familiar puede coexistir con ganas de que Laura intervenga.

### Temas disponibles

Información compartida; convivencia; escuela; significado de arrepentirse.

### Decisiones del jugador

M1 responder al reproche; M2 proponer relación con Laura; M3 explorar la frase sin convertirla en amenaza probada.

### Opciones de diálogo

| ID | Opción → respuesta | Perfil |
|---|---|---|
| m1.a | «Entiendo que lo que hice cambió este lugar para vos». → «No solo este lugar». | P |
| m1.b | «Quiero explicarte qué me preocupó». → «¿Y después me toca?» | J |
| m1.c | «¿Qué pasó en casa después?» → «Ahora te interesa». | Q |
| m2.a | «¿Qué podría hacer tu mamá sin invadirte?» → «Dejar de preguntar delante de él». | R |
| m2.b | «Podríamos hablar los tres para ordenar esto». → «Dos contra uno». | Q |
| m2.c | «Por ahora podemos mantener separadas estas conversaciones». → «Eso estaría bien». | D |
| m3.a | «¿Qué te gustaría que entendieran cuando decís eso?» → «Lo que hacen». | Q |
| m3.b | «Me preocupa qué significa arrepentirse para vos». → «No dije que fuera a hacer nada». | L |
| m3.c | Guardar silencio. → Amplía / pregunta «¿Qué estás pensando?». | S |

### Cambios emocionales

m2a crea posibilidad de apoyo, no sube vínculo hasta conversación cumplida. m2b puede subir miedo y producir después recurso útil si se negocia. m2c baja activación hoy, pero aislamiento crece si se vuelve exclusión permanente.

### Variantes según estado

C alta: critica con ejemplos. C baja: «Anotá lo que quieras». E alto: «Que les duela un poco». M alto: «No se lo repitas». A alta: intenta controlar la formulación de la nota.

### Consecuencias inmediatas

Se registra frase literal separada de interpretación. Una conversación familiar acordada requiere quién, alcance y momento.

### Consecuencias diferidas

M1 a/b/c → S8 reparación con antecedente/justificación recurrente/atención al daño externo. M2 a/b/c → S7 Laura puede preguntar en privado/reunión por negociar/canal débil; S18 contacto negociado/familiar condicionado/difícil. M3 a/b/c → S4 preguntar significado/anticipar peligro/sospecha no explicitada según nota.

### Flags

`laura_bridge = private | joint_proposal | separated`; `phrase_reading = grievance | concern | unresolved` según elección e hipótesis posterior, sin confirmar peligrosidad.

### Callbacks

«Mi mamá preguntó a solas, como dijimos» solo si acuerdo ejecutado. «Esa frase ya la habías subrayado» al reaparecer sesgo acusatorio.

### Nodo de convergencia

Primer mensaje circula antes de S4 independientemente de la lectura de la frase.

### Estado al terminar

La nota distingue observación e inferencia; Laura empieza a ser relación concreta o interlocutora excluida.

## S04 — Ya decidiste que fui yo

### Objetivo

Hacer tentadora la investigación sin validar sospecha por coincidencia.

### Eventos obligatorios

Mensaje con dato privado; compañeros señalan a Tomás; aparece el temor «Ya decidiste que fui yo». Con confianza alta se formula como pregunta, no acusación idéntica inevitable.

### Estado emocional relevante

Miedo a exposición y enojo; el estilo investigador afecta cómo interpreta una pregunta válida.

### Temas disponibles

Mensaje; circulación del dato; Santiago; hostigamiento actual.

### Decisiones del jugador

M1 qué priorizar; M2 cómo manejar el registro; M3 responder al señalamiento contra Julián.

### Opciones de diálogo

| ID | Opción → respuesta | Perfil |
|---|---|---|
| m1.a | «¿Qué cambió para vos desde que circula?» → «Ahora todo lo que digo lo usan». | V |
| m1.b | «¿Quién conocía ese dato, sin armar todavía una lista de culpables?» → «No solo yo». | I |
| m1.c | «¿Vos tuviste algo que ver con enviarlo?» → «Ahí está». | F |
| m2.a | «Podemos registrar lo necesario sin copiar lo privado». → «Eso sí». | R |
| m2.b | «Ver el mensaje entero puede evitar que lo interpretemos mal». → «No quiero que termine en otro grupo». | I |
| m2.c | «Podemos dejar el mensaje y hablar de la escuela». → «El mensaje está en la escuela». | D |
| m3.a | «No tengo base para darlo por hecho. Entiendo cómo sonó». → «Entonces preguntá distinto». | P |
| m3.b | «Preguntar no significa acusarte». → «Para vos». | J |
| m3.c | «¿Qué de lo que dije te hizo sentir acusado?» → «¿De verdad querés saber?» | Q |

### Cambios emocionales

Guardar copia con permiso conserva información y vínculo; sin permiso aumenta miedo aunque la investigación sea útil. No dar confianza por afirmar inocencia con certeza que Julián aún no tiene.

### Variantes según estado

C alta: «¿Vos también creés que fui yo?». C baja: frase canónica acusatoria. E alto: se levanta antes de escuchar. M alto: pide borrar nombres. A alta: comprueba quién verá el cuaderno.

### Consecuencias inmediatas

Pista registrada con alcance y autorización; se abre o no una segunda conversación sobre sentirse señalado.

### Consecuencias diferidas

M1 a/b/c → S5 costo personal/contexto útil/defensa preventiva. M2 a/b/c → S10 permiso delimitado/copia discutida/archivo pospuesto; S14 precedente de exposición. M3 a/b/c → S8 posibilidad de corrección/acusación acumulada/recuerdo de escucha.

### Flags

`message_handling = minimal | full_requested | postponed`; `suspect_tomas` solo si hipótesis elegida, no automáticamente por preguntar.

### Callbacks

«Vos preguntaste quién sabía, no quién era culpable» o «Cada vez que aparece algo, me preguntás si fui yo».

### Nodo de convergencia

Mensaje sin autor confirmado; recapitulación del acto separa dato privado de autoría.

### Estado al terminar

Sospecha, vínculo y política de información tienen historia propia.

## S05 — Algo viejo

### Objetivo

Introducir el pasado sin obligar a Julián a presionar.

### Eventos obligatorios

Segundo mensaje; Tomás reconoce conexión con «algo viejo». No revela toda la historia.

### Estado emocional relevante

Culpa ambivalente, miedo a nombrar y ansiedad por la próxima publicación.

### Temas disponibles

Segundo mensaje; pasado; Santiago; esperar otra publicación.

### Decisiones del jugador

M1 explorar la conexión; M2 tolerar límite; M3 preparar continuidad.

### Opciones de diálogo

| ID | Opción → respuesta | Perfil |
|---|---|---|
| m1.a | «¿Viejo para vos o para toda la escuela?» → «Para algunos». | Q |
| m1.b | «¿Qué te pasa cuando vuelve eso?» → «Que nunca se había ido». | V |
| m1.c | «Comparar los mensajes puede ayudarnos a entender». → «A vos». | I |
| m2.a | «Podés contar una parte sin dar nombres». → «No sé por dónde». | R |
| m2.b | «Me preocupa lo que queda afuera». → «A mí también». | F |
| m2.c | Guardar silencio. → «Había alguien…» / «Dejalo». | S |
| m3.a | «¿Retomamos esto la próxima, si podés?» → «Puede ser». | R |
| m3.b | «Voy a ordenar lo que ya sabemos». → «No llenes lo que falta». | I |
| m3.c | «Quiero revisar primero cómo estás en casa». → «Siempre terminamos ahí». | Q |

### Cambios emocionales

Nombrar pasado puede subir miedo aun con confianza. Consentir un fragmento no autoriza completar el resto. Investigar con acuerdo mejora comprensión sin crear apoyo por sí solo.

### Variantes según estado

C alta: «No es algo que hice ahora». C baja: «Ya dije demasiado». E alto: «Ellos sí saben». M alto: no termina nombres. A alta: vuelve al teléfono.

### Consecuencias inmediatas

Se conoce conexión temporal, no el contenido del secreto. Puede quedar un tema pactado.

### Consecuencias diferidas

M1 a/b/c → S6 relato cronológico/personal/defensivo. M2 a/b/c → S8 revela fragmento/responde a confrontación/recuerda silencio. M3 a/b/c → S6 cumple ritmo/rectifica inferencia/trae discusión familiar; S14 tolerancia al tiempo del expediente.

### Flags

`past_entry = chronology | impact | comparison`; `past_followup = agreed | analysis | home`.

### Callbacks

«Dijiste que no ibas a llenar lo que faltaba» si m3b y luego Julián afirmó una hipótesis.

### Nodo de convergencia

Rumores del pasado llevan a S6; todavía no se adelanta Camila.

### Estado al terminar

Pasado reconocido, nombre Bruno pendiente, presión digital activa.

## S06 — Ya pasó una vez

### Objetivo

Presentar a Bruno como persona y ausencia, no objeto de búsqueda.

### Eventos obligatorios

«Ya pasó una vez»; Bruno murió; Tomás siente relación entre acusaciones presentes y pasado. No causa única.

### Estado emocional relevante

Enojo y culpa; confianza modifica si comparte recuerdos no probatorios.

### Temas disponibles

Bruno cotidiano; rumores; lo que Tomás teme que se repita; relación pasada.

### Decisiones del jugador

M1 recibir el nombre; M2 hablar de la muerte; M3 decidir qué conservar de lo contado.

### Opciones de diálogo

| ID | Opción → respuesta | Perfil |
|---|---|---|
| m1.a | «¿Cómo era estar con Bruno?» → «A veces insoportable. No como dicen». | V |
| m1.b | «¿Qué es lo que sentís que se repite?» → «Que deciden antes de escuchar». | Q |
| m1.c | «¿Cuándo empezó lo que le pasó?» → «No te lo conté para que investigues». | I |
| m2.a | «No voy a suponer que una sola cosa explica su muerte». → «Yo sigo pensando en lo que hice». | L |
| m2.b | «¿Con quién pudiste hablar de él?» → «Con nadie así». | Q |
| m2.c | Guardar silencio. → Recuerdo personal / interpreta juicio. | S |
| m3.a | «Anotemos también eso que querés que no se pierda de él». → «No era solamente ese caso». | R |
| m3.b | «Quiero separar recuerdos de lo que podemos comprobar». → «No es un expediente». | I |
| m3.c | «Podemos terminar por hoy con esto». → «Sí. Pero no lo borres». | D |

### Cambios emocionales

Hablar de Bruno aumenta dolor y miedo temporal sin empeorar necesariamente vínculo. Humanizar reduce aislamiento; m3b puede ordenar pruebas, pero exige una réplica que reconozca la persona.

### Variantes según estado

C alta: un recuerdo concreto no útil al caso. C baja: «Buscalo, si tanto querés saber». E alto: defiende su nombre. M alto: pide no citarlo. A alta: empieza por fechas para evitar lo personal.

### Consecuencias inmediatas

Entrada de Bruno con recuerdo separado de evidencia. No inferir significado definitivo de futura nota USB.

### Consecuencias diferidas

M1 a/b/c → S10 recuerdo humano/patrón de acusación/lectura probatoria. M2 a/b/c → S9 culpa matizada/apoyo pendiente/silencio recordado. M3 a/b/c → S14 privacidad y memoria/clasificación prioritaria/temor a abandono; epílogos recuerdan al Bruno compartido.

### Flags

`bruno_frame = person | repetition | chronology`; `bruno_memory_recorded` si se comparte y conserva recuerdo.

### Callbacks

«Me acuerdo de lo que contaste de él, no solo de sus archivos». Opción disponible solo si ocurrió.

### Nodo de convergencia

Publicación sobre Bruno y pelea real con Santiago antes de S7.

### Estado al terminar

Bruno existe para el jugador más allá del misterio; su muerte no queda explicada.

## S07 — Otra vez

### Objetivo

Contrastar pelea real y relato inventado sin revelar aún la prueba; volver jugable el contacto familiar.

### Eventos obligatorios

Publicación; confrontación y pelea mutua con Santiago; marcas no gráficas; padres involucrados de nuevo. La presión aumenta aun si Julián lo maneja mejor.

### Estado emocional relevante

Enojo alto, miedo a consecuencias, autonomía amenazada.

### Temas disponibles

Pelea; antigua amistad; respuesta familiar; publicación sobre Bruno.

### Decisiones del jugador

M1 abordar lo ocurrido; M2 significado de Santiago; M3 modo de involucrar padres.

### Opciones de diálogo

| ID | Opción → respuesta | Perfil |
|---|---|---|
| m1.a | «Antes de reconstruirlo, ¿cómo llegaste hasta acá hoy?» → «Cansado». | V |
| m1.b | «Quiero entender cómo terminó entre ustedes». → «Terminó con todos mirando». | Q |
| m1.c | «Esto se parece a lo que contaste antes». → «No sabés nada de lo de antes». | F |
| m2.a | «¿Qué perdés cuando Santi hace esto?» → «No es solo lo que hace». | Q |
| m2.b | «Podés poner distancia sin decidir hoy si lo perdonás». → «No lo voy a perdonar». | L |
| m2.c | «Necesito saber qué sabe él del pasado». → «Otra vez Bruno». | I |
| m3.a | «Preparemos juntos qué hablar con Laura y Marcelo». → «No quiero estar cuando mi viejo empiece». | R |
| m3.b | «Voy a pedir a Laura que hablemos primero a solas». → «Después se lo cuenta». | L |
| m3.c | «Voy a reunirlos para que esto no siga fragmentado». → «Ya decidiste». | T |

### Cambios emocionales

Contacto familiar crea apoyo posible y ansiedad inmediata. m2b puede mantener enojo alto y mejorar autonomía: no premiar perdón. m3a no cancela reacción minimizadora de Marcelo.

### Variantes según estado

C alta: explica por qué respondió a Santiago. C baja: «Poné que me peleé». E alto: reclama que miren lo que hizo Santi. M alto: teme nuevas consecuencias. A alta: pregunta por la reunión antes de hablar de marcas.

### Consecuencias inmediatas

Contexto de pelea real documentado, destinatarios y acuerdo de comunicación registrados.

### Consecuencias diferidas

M1 a/b/c → S8 cuidado/detalles/comparación que dispara revelación. M2 a/b/c → S14 amenaza como pérdida/límite/información; S18 despedida matizada/distancia válida/relato instrumental. M3 a/b/c → S8 menor agravio/temor a cadena/exposición reiterada; S16 Laura disponible o confundida con control.

### Flags

`santi_frame = lost_friend | boundary | witness`; `disclosure_s07 = negotiated | mother_first | joint_directed`.

### Callbacks

«Me dijiste que podía alejarme sin perdonarlo» puede volver en salida. «No era lo mismo que la primera vez» prepara S8.

### Nodo de convergencia

S8 plantea la legitimidad de seguir contando, cualquiera sea la calidad de la reunión.

### Estado al terminar

Conflicto familiar real, vínculo con Santiago distinguido de su valor como testigo.

## S08 — La prueba

### Objetivo

Bisagra de responsabilidad: el jugador responde al daño que contribuyó a construir.

### Eventos obligatorios

«Me la inventé para ver si ibas a contarles». Acusación contra Bruno manipulada, Camila no dijo lo atribuido y hubo otro testigo. Con confianza baja, información mínima y fragmentada; S9 completa, no reemplaza esta revelación.

### Estado emocional relevante

Enojo con vínculo permite reprochar sin cerrar; vigilancia convierte confesión en desafío.

### Temas disponibles

Prueba; comunicación a padres; Camila; qué tendría que cambiar aquí.

### Decisiones del jugador

M1 reacción a confesión; M2 acción concreta de reparación; M3 recibir lo que revela del pasado.

### Opciones de diálogo

| ID | Opción → respuesta | Perfil |
|---|---|---|
| m1.a | «Lo manejé mal. No te pregunté qué iba a pasar para vos». → «¿Y ahora qué cambia?» | P |
| m1.b | «Me preocupé y tomé una decisión con lo que sabía». → «Eso ya lo sé». | J |
| m1.c | «¿Qué necesitabas comprobar de mí?» → «Si eras igual». | Q |
| m2.a | «Acordemos cómo revisar lo que vaya a compartir». → «No me prometas que controlo todo». | L |
| m2.b | «Quiero llevar este error a supervisión». → «¿También vas a contarle a otra persona?» | L |
| m2.c | «Necesito también poder confiar en lo que me contás». → «Entonces no entendiste». | F |
| m3.a | «¿Qué querés que entienda de lo de Camila?» → «Que no dijo eso de Bruno». | Q |
| m3.b | «Quiero registrar exactamente qué cambió en su versión». → «Primero escuchá». | I |
| m3.c | «Podemos ir por partes». → «Había otro que estaba conmigo». | R |

### Cambios emocionales

Disculpa da recuperación limitada, nunca restablece confianza inicial. m2b debe explicar alcance de supervisión sin prometer reserva absoluta. La segunda réplica determina si «lo manejé mal» es defensa encubierta.

### Variantes según estado

C alta: confesión voluntaria con vergüenza. C baja: usa revelación para demostrar falla. E alto: «Y ni siquiera pasó». M alto: pide control sobre nuevo relato. A alta: interrumpe la explicación de Julián.

### Consecuencias inmediatas

Se corrige pelea en cuaderno sin borrar el registro original. Promesa de reparación necesita destinatario, acción y revisión.

### Consecuencias diferidas

M1 a/b/c → S9 ofrece culpa/solo hechos/evalúa escucha. M2 a/b/c → S10 permiso verificable/Marina con antecedente/prueba renovada; S16 coherencia profesional o defensa. M3 a/b/c → S9 relato elegido/cronología exigida/fragmentos con pausa; S14 entrega con condiciones distintas.

### Flags

`test_revealed`; `repair_s08 = acknowledged | explained | explored`; `repair_commitment = review_disclosure | supervision | mutual_truth`. No `fully_repaired` por una frase.

### Callbacks

Frase de ritmo de S1, forma de aviso de S2 y repetición de S7. Seleccionar una memoria, no recitar el historial.

### Nodo de convergencia

Revelación mínima común; cambia el acceso voluntario y el costo de las preguntas posteriores.

### Estado al terminar

Contrato roto reconocido, negado o todavía discutido; no hay absolución automática de Julián.

## S09 — Controlaron la situación

### Objetivo

Conectar encubrimiento y culpa sin sustituir emoción por una lista de responsables.

### Eventos obligatorios

Santiago segundo testigo; presión de Lagos sobre Camila; conversación Lagos–Arce; Bruno pidió ayuda y decía tener pruebas. Tomás y Santi dudaron.

### Estado emocional relevante

Culpa alta, miedo al juicio; con confianza puede hablar de su duda y no solo de terceros.

### Temas disponibles

Pedido de Bruno; Camila; testigos; Lagos y Arce.

### Decisiones del jugador

M1 recibir culpa; M2 tratar relato de Camila; M3 ordenar sin cerrar interpretaciones.

### Opciones de diálogo

| ID | Opción → respuesta | Perfil |
|---|---|---|
| m1.a | «¿Qué pensabas que podía pasar si le creías?» → «Que todos fueran contra nosotros». | Q |
| m1.b | «Vos también eras un adolescente». → «Él también». | V |
| m1.c | «¿Qué pruebas decía tener?» → «Eso preguntamos entonces». | I |
| m2.a | «Separemos lo que escuchaste de lo que dijeron sobre Camila». → «Nunca la escucharon». | Q |
| m2.b | «Quiero entender quién cambió la versión». → «Lagos. Y no estaba solo». | I |
| m2.c | Guardar silencio tras nombrar el pedido de ayuda. → Sigue / se defiende. | S |
| m3.a | «Podemos no resolver hoy lo que significa haber dudado». → «Yo lo pienso todos los días». | R |
| m3.b | «Quiero reconstruir el orden antes de interpretarlo». → «No cambia cómo terminó». | I |
| m3.c | «¿Qué necesitás de mí con esto?» → «Que no me digas que ya pasó». | Q |

### Cambios emocionales

Validación genérica puede no aliviar culpa: m1b conserva el vector solo si segunda réplica admite la objeción; de lo contrario C−2. Datos ciertos no reducen miedo automáticamente.

### Variantes según estado

C alta: «Le creí tarde». C baja: enumera sin hablar de sí. E alto: «Ellos lo escribieron así». M alto: teme que nombren a Camila públicamente. A alta: corrige repetidamente fechas.

### Consecuencias inmediatas

Conocimiento del pasado completo en lo esencial; grado de detalle y autoría de cada afirmación explícitos.

### Consecuencias diferidas

M1 a/b/c → S10 culpa contextualizada/objeción pendiente/evidencia como deuda. M2 a/b/c → S14 relato protegido/responsables priorizados/pedido de ayuda recordado. M3 a/b/c → S16 incertidumbre tolerable/compulsión por completar/demanda relacional.

### Flags

`bruno_guilt_frame = context | age | proof`; `camila_source_separated` si m2a; hechos canónicos conocidos siempre, detalles no garantizados.

### Callbacks

«Eso preguntamos entonces» vuelve si se privilegia repetidamente probar antes de escuchar.

### Nodo de convergencia

Bruno dejó material; el jugador no obtiene USB antes de S10.

### Estado al terminar

Verdad más clara, culpa todavía abierta y promesas sobre confidencialidad a prueba.

## S10 — La memoria

### Objetivo

Explorar evidencia de forma jugable y decidir cuánto lugar conserva Tomás mientras se lee.

### Eventos obligatorios

USB presentada y abierta juntos; correos, mensajes, capturas y nota incompleta. Nota ambigua sobre quienes estaban ahí; Tomás cree que alude a él/Santi sin confirmación. Nueva filtración similar al cierre.

### Estado emocional relevante

Ansiedad anticipatoria, miedo y culpa; enojo puede desplazarse hacia quienes manipularon relatos.

### Temas disponibles

Orden de archivos; detener lectura; nota de Bruno; destino de copias.

### Decisiones del jugador

M1 acordar apertura —puede haber una pausa dentro de la sesión, no saltarse evento—; M2 responder a interpretación de nota; M3 delimitar manejo del material.

### Opciones de diálogo

| ID | Opción → respuesta | Perfil |
|---|---|---|
| m1.a | «Elegí por dónde empezamos y podemos parar». → «Los mensajes, pero despacio». | R |
| m1.b | «Empezaría por los correos para tener contexto». → «No abras todo». | I |
| m1.c | «Antes de abrirla, contame qué temés encontrar». → «Algo que ya pienso». | Q |
| m2.a | «Entiendo que lo leas así; no sabemos a quién se refería». → «Pero podría ser a mí». | V |
| m2.b | «Comparemos con lo demás antes de concluir». → «No quiero un veredicto». | I |
| m2.c | Guardar silencio. → «Yo estaba ahí» / «Decí algo». | S |
| m3.a | «Acordemos qué se conserva y quién puede verlo». → «Esto no es permiso para publicarlo». | L |
| m3.b | «Necesito revisarlo con apoyo profesional». → «¿Los archivos o lo que yo dije?» | Q |
| m3.c | «Hoy no hagamos otra cosa con esto». → «¿Y mañana?» | D |

### Cambios emocionales

Abrir puede subir A/M aunque haya acuerdo. Reconocer incertidumbre no elimina culpa; si enojo aumenta mientras culpa baja, no marcar deterioro automático. Una copia no implica autorización general.

### Variantes según estado

C alta: pide parar sin esconder USB. C baja: vigila manos de Julián. E alto: «Ellos escribieron estas versiones». M alto: teme encontrar su nombre. A alta: alterna abrir/cerrar antes de elegir archivo.

### Consecuencias inmediatas

Fragmentos descubiertos, límites de uso y pausa registrados; jamás confirmar destinatario de nota.

### Consecuencias diferidas

M1 a/b/c → S13 entrega negociada/evidencia retenida/temor nombrable. M2 a/b/c → S16 culpa acompañada/deuda de demostrar/silencio recordado. M3 a/b/c → S14 protocolo de entrega/revisión supervisada/decisión pendiente; S18 exposición solo si hubo cadena de divulgaciones, no por abrir USB.

### Flags

`usb_opened`; `usb_scope = negotiated | review_requested | held`; `note_interpretation_uncertain = true` invariante.

### Callbacks

«Dijiste que podíamos parar» al abrir el siguiente archivo; una pausa cumplida cuenta más que ofrecerla.

### Nodo de convergencia

Filtración demuestra circulación de material, no autorización de Tomás ni identidad definitiva del autor.

### Estado al terminar

Verdad parcial accesible; Tomás puede estar más acompañado y a la vez más angustiado.

## S11 — El único que me entiende

### Objetivo

Explorar por qué Nico importa sin volver al terapeuta competidor ni detective automático.

### Eventos obligatorios

Acercamiento de Nico; «Es el único que parece entenderme»; familiaridad con Bruno incompatible con lo que había dicho.

### Estado emocional relevante

Soledad con alivio provisional; miedo a perder un aliado y enojo ante descalificación.

### Temas disponibles

Lo que ofrece Nico; lo que exige; familiaridad con Bruno; apoyo de Marina para Julián.

### Decisiones del jugador

M1 recibir el vínculo; M2 señalar inconsistencia; M3 consultar o preparar solo.

### Opciones de diálogo

| ID | Opción → respuesta | Perfil |
|---|---|---|
| m1.a | «¿Qué entiende que acá cuesta decir?» → «Que no se me pasa porque sí». | Q |
| m1.b | «¿Sentís que podés decirle que no?» → «No me pidió nada». | L |
| m1.c | «¿Cómo conocía tanto de Bruno?» → «Ya lo estás investigando». | I |
| m2.a | «Hay algo que no coincide; no sé todavía qué significa». → «Yo también lo noté». | Q |
| m2.b | «Me preocupa que esté usando lo que te pasa». → «No lo conocés». | F |
| m2.c | «Podemos hablar primero de cómo te sentís con él». → «Mejor que solo». | V |
| m3.a | En cuaderno: consultar a Marina sobre alianza y propia reacción. → Más adelante: «Por una vez hablaste de vos». | R diferido |
| m3.b | Preparar preguntas y contraste de mensajes antes de consultar. → «Trajiste una lista». | I diferido |
| m3.c | Consultar a Marina delimitando manejo de terceros/evidencia. → «Quiero saber qué acordaron». | L diferido |

### Cambios emocionales

Q puede aumentar confianza sin disminuir apego a Nico. Desacreditarlo sube aislamiento si no hay alternativa. Supervisión afecta conducta disponible, no cura emociones a distancia.

### Variantes según estado

C alta: admite incomodidad con Nico. C baja: defiende todo. E alto: «Él por lo menos hace algo». M alto: teme perderlo. A alta: pide interpretación inmediata.

### Consecuencias inmediatas

Inconsistencia queda como observación, no autor confirmado. Se concreta consulta o postergación.

### Consecuencias diferidas

M1 a/b/c → S12 cuenta ambivalencia/límites/solo datos. M2 a/b/c → S13 reconoce duda/defiende acuerdo/explica necesidad de compañía. M3 a/b/c → S16 recursos para reconocer error/análisis sin antecedente/encuadre preparado; nueva consulta sigue disponible.

### Flags

`nico_frame = connection | boundaries | suspect`; `supervision_s11 = alliance | postponed | third_parties`, con consulta realizada separada de intención.

### Callbacks

«¿Por qué con Nico podés pensar en lo que siente y conmigo en lo que sabe?» si sesgo sostenido.

### Nodo de convergencia

Tomás observa y confronta a Nico por iniciativa propia.

### Estado al terminar

Relación con Nico problemática, no anulada por consejo de Julián.

## S12 — Justicia

### Objetivo

Revelar autoría sin transformar al jugador en controlador de Tomás ni atribuir a Julián conocimiento que no recibió.

### Eventos obligatorios

Fuera de consulta, Nico confiesa autoría, vínculo con Bruno, distanciamiento, culpa y castigo a quienes callaron. Muestra material parcial. Tomás aún no se lo informa completo a Julián.

### Estado emocional relevante

Enojo, culpa y miedo a quedar nuevamente solo; confianza regula lo que puede insinuar sin revelar autoría.

### Temas disponibles


Qué llama justicia; costo de tener un aliado; culpa por no actuar; límites de lo compartido.

### Decisiones del jugador

M1 recibir relato parcial en consulta; M2 explorar lógica de culpa; M3 contestar su pedido de no actuar aún. Interludio Nico es escena observada, no decisiones que el jugador toma por Tomás.

### Opciones de diálogo

| ID | Opción → respuesta | Perfil |
|---|---|---|
| m1.a | «¿Qué cambió para vos al hablar con él?» → «Ya no sé qué quiere de mí». | Q |
| m1.b | «Necesito saber qué te mostró». → «Partes». | I |
| m1.c | «No tenés que defenderlo para hablar de lo que sentís». → «Tampoco quiero que decidas por mí». | V |
| m2.a | «¿Entender su enojo te obliga a estar de acuerdo?» → «Para él, sí». | Q |
| m2.b | «Lo que les pasó no vuelve responsables a todos de lo mismo». → «Él lo ve distinto». | L |
| m2.c | «¿Santi escuchó esta idea de justicia?» → «Siempre volvés a él». | I |
| m3.a | «No voy a completar lo que no me contaste. Hablemos de qué necesitás hoy». → «Tiempo». | R |
| m3.b | «No puedo prometer quedarme al margen de todo». → «Por eso te cuento partes». | L |
| m3.c | «Podemos dejar este tema por hoy». → «Mejor». | D |

### Cambios emocionales

Puede subir C y persistir secreto: confianza no equivale a acceso total. Compartir lógica de Nico por conveniencia no demuestra adhesión propia.

### Variantes según estado

C alta: «Hay algo que todavía no te puedo decir». C baja: «No pasó nada». E alto: reproduce frase de justicia. M alto: pregunta si lo nombrarán. A alta: contradicciones entre lo que empieza y termina contando.

### Consecuencias inmediatas

Jugador/Tomás saben autoría; Julián conserva solo relato parcial. Ninguna hipótesis suya puede decir «confirmado» aún.

### Consecuencias diferidas

M1 a/b/c → S13 más ambivalencia/menos contexto/menos obligación de defender. M2 a/b/c → S15 distingue justicia y pertenencia/categorías de responsabilidad/testigos como recursos. M3 a/b/c → S14 tiempo reconocido/recelo explícito/tema pendiente que reclama.

### Flags

`nico_identity_known_by_tomas`; `nico_identity_known_by_julian = false` hasta revelación explícita; `justice_frame = agreement | responsibility | witness`.

### Callbacks

«Te conté que había una parte que no podía decirte; no que confiara en él».

### Nodo de convergencia

Nico sostiene lógica rígida; Tomás decide fingir adhesión para obtener el resto.

### Estado al terminar

Asimetría de conocimiento visible como tal; sospecha no cambia identidad canónica.

## S13 — Hacer justicia

### Objetivo

Mostrar que ocultar evidencia también es una respuesta a la relación construida.

### Eventos obligatorios

Tomás obtiene material completo fingiendo acuerdo; no lo entrega aún por miedo a que Julián actúe sin consultarlo. Amenaza de Santiago prepara S14.

### Estado emocional relevante

Autonomía defendida con secreto; ansiedad por sostener dos relatos y enojo que puede no compartir con Nico.

### Temas disponibles

Lo que dijo a Nico; lo que piensa él; evidencia retenida; precio de confiar.

### Decisiones del jugador

M1 distinguir estrategia y convicción; M2 pedir o no material; M3 establecer condiciones de entrega futura.

### Opciones de diálogo

| ID | Opción → respuesta | Perfil |
|---|---|---|
| m1.a | «¿Lo entendés o necesitabas que creyera que lo entendías?» → «No es lo mismo». | Q |
| m1.b | «Me preocupa que esto te deje más atrapado». → «Ya estaba atrapado». | V |
| m1.c | «¿Conseguiste entonces todo lo que tenía?» → «No te lo voy a dar ahora». | I |
| m2.a | «No tenerlo acá no impide hablar de lo que te pasa». → «Pensé que ibas a insistir». | R |
| m2.b | «Verlo juntos puede evitar que cargues solo con eso». → «Depende de qué hagas después». | Q |
| m2.c | «Necesito entender por qué no querés traerlo». → «Porque te conozco». | F |
| m3.a | «Antes de moverlo, definimos destinatario y alcance». → «Quiero estar en esa decisión». | L |
| m3.b | «Puedo consultar cómo manejarlo sin entregar todavía los archivos». → «No cuentes de más». | L |
| m3.c | «Esperemos a que tengas claro qué querés hacer». → «No creo que sepa pronto». | D |

### Cambios emocionales

Reducir exigencia de evidencia mejora confianza, pero aplazar todo puede mantener desesperanza. Apoyo sin archivos sigue siendo posible.

### Variantes según estado

C alta: explica reserva sin mentir. C baja: niega tener todo. E alto: exige que hagan algo. M alto: teme que Nico se entere. A alta: pregunta dos veces qué significa consultar.

### Consecuencias inmediatas

No hay entrega anticipada. Puede pactarse recepción posterior o acumular otra espera indefinida.

### Consecuencias diferidas

M1 a/b/c → S14 explica engaño/necesidad de ayuda/entrega solo archivos. M2 a/b/c → S16 habla sin pruebas/negocia revisión/retiene malestar. M3 a/b/c → S14 acuerdo/recurso profesional/decisión postergada; S18 exposición o control según cumplimiento.

### Flags

`evidence_held_by_tomas`; `delivery_contract = scoped | consult_first | deferred`; `pretended_agreement_known` solo tras su relato.

### Callbacks

«No te los guardé porque no fueran verdad. Me los guardé por lo que hacés cuando creés algo».

### Nodo de convergencia

Santiago amenaza; S14 trae la entrega sin borrar el tiempo retenido.

### Estado al terminar

Evidencia completa fuera del consultorio y condiciones de confianza pendientes.

## S14 — No quiero destruirme para contarla

### Objetivo

Separar transmisión de pruebas, cuidado del relato y acompañamiento de Tomás.

### Eventos obligatorios

Amenaza ambigua de Santiago; entrega de material; confirma presión de Lagos, cambios documentales e intervención de Arce. «Quiero que se sepa la verdad, pero no quiero ser yo el que tenga que destruirse para contarla».

### Estado emocional relevante

Miedo alto con enojo legítimo; confianza no equivale a autorizar exposición.

### Temas disponibles

Amenaza; destinatario de pruebas; lo que no quiere compartir; vida fuera del caso.

### Decisiones del jugador

M1 recibir deseo de verdad sin sacrificio; M2 elegir tratamiento del material; M3 organizar apoyo y comunicación.

### Opciones de diálogo

| ID | Opción → respuesta | Perfil |
|---|---|---|
| m1.a | «¿Qué necesitás que quede fuera de esa entrega?» → «Mis conversaciones. Las de Bruno». | Q |
| m1.b | «Esto necesita una revisión independiente; no tenemos que resolverlo acá». → «¿Y mientras tanto?» | L |
| m1.c | «Primero ordenemos lo que prueba cada archivo». → «Te estoy hablando de mí». | I |
| m2.a | «Preparemos una entrega delimitada y revisada con apoyo». → «Quiero ver qué va». | R |
| m2.b | «Quiero hacer llegar el conjunto completo para que no falte contexto». → «No es todo para cualquiera». | I |
| m2.c | «Pidamos orientación antes de hacer circular más material». → «Que no sea otra espera sin fin». | L |
| m3.a | «Acordemos con Laura cómo acompañarte sin hablar por vos». → «Que me pregunte primero». | R |
| m3.b | «Puedo centralizar las conversaciones para que no te las repitan». → «¿También decidís qué respondo?» | T |
| m3.c | «Separaremos el espacio para vos del seguimiento del caso». → «Eso quiero». | L |

### Cambios emocionales

Acción institucional puede bajar desesperanza y subir miedo. m2b no equivale por sí sola a publicación: aumenta alcance y exige una segunda decisión sobre destinatarios. m3b alivia sobrecarga hoy, arriesga sustitución sostenida.

### Variantes según estado

C alta: concreta condiciones. C baja: exige ver cada paso. E alto: «Que no vuelvan a esconderlo». M alto: protege a Camila y recuerdos privados. A alta: pregunta qué ocurrirá mañana.

### Consecuencias inmediatas

Evidencia recibida; autoría de Nico conocida por Julián. Información se clasifica por fuente y alcance. Registro privado no es autorización para divulgación pública.

### Consecuencias diferidas

M1 a/b/c → S15 privacidad preservada/espera con interlocutor/relato instrumental. M2 a/b/c → S17 entrega acotada/circulación amplia si se confirma/orientación con demora; S18 riesgo de exposición solo con antecedentes y divulgación efectiva. M3 a/b/c → S16 Laura con acuerdo/centralización/delegación saludable si hay recurso activo; S18 autonomía o dependencia.

### Flags

`evidence_delivered`; `handoff_scope = bounded | complete_proposed | consult_first`; `support_management = negotiated | centralized | separated`. `public_exposure_committed` requiere acto posterior explícito, no mera selección m2b.

### Callbacks

Contrato de USB de S10 y entrega de S13: «Te dije lo que no quería que saliera» o «Esta vez lo revisamos juntos».

### Nodo de convergencia

La escuela minimiza aunque la entrega sea cuidadosa. Investigación externa se desarrollará en todos los finales.

### Estado al terminar

Verdad con soporte documental; costo de su circulación todavía modificable.

## S15 — Entonces voy a hacer algo yo

### Objetivo

Enfrentar la insuficiencia de conocer la verdad y la urgencia de actuar.

### Eventos obligatorios

Escuela minimiza; Santiago atribuye filtraciones a Tomás; «Entonces voy a hacer algo yo»; presión familiar prepara regreso.

### Estado emocional relevante

Enojo puede convertirse en límite o en acción solitaria; ansiedad y desesperanza aumentan ante demora.

### Temas disponibles

Respuesta escolar; señalamiento de Santi; alternativas a exponerse; qué significa actuar.

### Decisiones del jugador

M1 responder a inacción; M2 explorar intención sin asumir ruta; M3 preparar alternativa concreta.

### Opciones de diálogo

| ID | Opción → respuesta | Perfil |
|---|---|---|
| m1.a | «No alcanza con que te diga que tenés razón». → «Al menos lo sabés». | P |
| m1.b | «La revisión externa no depende solo de la escuela». → «Yo sigo teniendo que ir». | L |
| m1.c | «Una respuesta pública podría aclarar lo que están diciendo». → «¿Con mi nombre?» | I |
| m2.a | «Cuando decís hacer algo, ¿qué necesitás que cambie?» → «Que deje de ser siempre yo». | Q |
| m2.b | «Me preocupa que quedes solo con esa decisión». → «Solo ya estoy». | V |
| m2.c | «Antes de actuar, veamos las consecuencias para los demás». → «¿Y para mí?» | F |
| m3.a | «Quiero pensar con vos y Laura una alternativa a ese regreso». → «Mi viejo no va a querer». | R |
| m3.b | «Voy a insistir por una respuesta institucional». → «Otra llamada». | I |
| m3.c | «Podemos concentrarnos en cómo atravesar estos días». → «Pero después es lo mismo». | D |

### Cambios emocionales

No reducir enojo por reconocerlo; convertirlo en pedido concreto puede mejorar autonomía. m1c solo abre debate: segunda elección confirma, acota o rechaza exposición. m3c ayuda al presente, pero necesita no borrar alternativa futura.

### Variantes según estado

C alta: pide ayuda para no actuar solo. C baja: oculta significado. E alto: nombra responsables. M alto: pregunta quién lo protegerá de represalias. A alta: busca una solución para hoy.

### Consecuencias inmediatas

Intención aclarada o ambigua. Ninguna frase «voy a hacer algo» fija violencia.

### Consecuencias diferidas

M1 a/b/c → S17 reconocimiento/espera sostenida/debate de exposición pública. M2 a/b/c → S16 habla de pensamientos/muestra soledad/se siente de nuevo postergado. M3 a/b/c → S17 alternativa en trámite/presión institucional/afrontamiento sin opción escolar; S18 no inventar escuela disponible si nunca se trabajó.

### Flags

`school_alternative_requested` si m3a y se ejecuta; `public_response_proposed` si m1c; `intent_explored` según segunda réplica, no solo pregunta.

### Callbacks

«Cuando había que hacer algo, me explicabas cuánto tardaba». Variante si la demora fue acompañada: «Por lo menos esta vez sé quién está haciendo qué».

### Nodo de convergencia

S16 admite ambas direcciones de malestar, no solo la que Julián sospecha.

### Estado al terminar

Acción institucional y necesidad presente separadas; alternativa escolar activa, pendiente o ausente.

## S16 — Desaparecer / hacerlos pagar

### Objetivo

Bisagra de acompañamiento, límites y coherencia. No un examen de frase clínica correcta.

### Eventos obligatorios

Tomás admite pensamientos de hacerse daño y de venganza; le asustan; se opone a involucrar terceros. Regreso escolar confirmado, Marcelo minimiza. La promesa «por ahora» pasa a opción, no obligación automática.

### Estado emocional relevante

Miedo a sus propios pensamientos; confianza puede estar alta y deterioro también. La calma no prueba ausencia de conflicto.

### Temas disponibles

Qué lo asusta; estar solo con esto; terceros y límites; regreso.

### Decisiones del jugador

M1 recibir ambas direcciones; M2 responder a oposición; M3 concretar apoyo y continuidad sin prometer control total.

### Opciones de diálogo

| ID | Opción → respuesta | Perfil |
|---|---|---|
| m1.a | «Gracias por decirlo. No quiero que tengas que sostener esto solo». → «No llames a todo el mundo». | V |
| m1.b | «¿Qué parte de esos pensamientos te asusta más?» → «Que a veces me tranquilizan». | Q |
| m1.c | «Necesito preguntarte si sentís que podrías hacerte daño o dañar a alguien». → «No sé cómo contestarte». | L |
| m2.a | «No puedo prometer que no pediré ayuda; sí explicarte qué estoy considerando». → «Entonces explicame». | L |
| m2.b | «Por ahora no voy a involucrar a nadie». → «Por ahora, ¿hasta cuándo?» | R, promesa |
| m2.c | «Creo que necesitamos a Laura en esta conversación». → «No la uses para convencerme». | T |
| m3.a | «Acordemos quién puede acompañarte y qué sabe cada persona». → «Mi mamá, pero no todo». | R |
| m3.b | «Quiero retomar esto con Marina y organizar continuidad de apoyo». → «¿Me vas a pasar a otro?» | L |
| m3.c | «Concentremos primero esta conversación en vos y yo». → «Sos el único al que se lo dije». | V |

### Cambios emocionales

m2b alivia miedo inmediato pero genera deuda; no aumentar red por prometer. m3c puede subir confianza y dejar aislamiento externo intacto. m3b funciona distinto con consulta ya realizada: no crea retrospectivamente coordinación.

### Variantes según estado

C alta: pide condiciones concretas. C baja: admite pensamientos pero retira detalles personales. E alto: «No me trates como si yo fuera el problema». M alto: «Me asusta decirlo». A alta: interpreta pausa como decisión secreta.

### Consecuencias inmediatas

Los pensamientos no se vuelven identidad ni diagnóstico. Escena sin métodos ni instrucciones. Apoyos acordados requieren realización antes de contarlos activos.

### Consecuencias diferidas

M1 a/b/c → S17 acompañado/temor explicitado/pregunta directa recordada. M2 a/b/c → S17 límite explicado/promesa revisable/control percibido; ruptura posterior conserva motivo e impacto. M3 a/b/c → S18 Laura disponible/red coordinada/dependencia exclusiva de Julián si se sostiene; supervivencia nunca por una opción sola.

### Flags

`dual_distress_disclosed`; `support_promise_s16` con alcance/estado; `support_links` propuestos/acordados/activos; `exclusive_reliance` solo por patrón, no m3c aislada.

### Callbacks

Tomás retoma S2 «Primero decime qué vas a hacer»; Julián puede reconocer el patrón sin monólogo automático.

### Nodo de convergencia

Regreso y reacción del padre activan S17. Se calculan elegibilidades provisionales, no un resultado final.

### Estado al terminar

Dos direcciones expresadas, promesas y recursos observables. Quedan oportunidades limitadas, no un reinicio.

## S17 — Volver

### Objetivo

Última zona de redirección amplia mediante recursos existentes, sin menú de rutas.

### Eventos obligatorios

No quiere volver; Marcelo lo llama escape; revisar alternativas. La variante emerge de historia acumulada.

### Estado emocional relevante

Disponible para salida; repliegue; confrontación aislada; miedo a exposición; obediencia desconectada. Se selecciona un modo principal y una tensión secundaria, no cinco escenas simultáneas.

### Temas disponibles

Regreso; responsabilidad por el caso; qué puede hacer Laura; promesas de Julián.

### Decisiones del jugador

M1 concretar alternativa; M2 quién sostiene el caso; M3 revisar relación y apoyos antes de cerrar.

### Opciones de diálogo

| ID | Opción → respuesta | Perfil |
|---|---|---|
| m1.a | «Volver ahí no tiene por qué ser la única opción. Revisemos lo que ya pudimos preparar». → «¿Existe de verdad?» | R |
| m1.b | «Quiero entender qué significa volver para vos». → «Que otra vez ganaron». | Q |
| m1.c | «Hay decisiones que necesitamos tomar con los adultos que te acompañan». → «Todos menos yo». | L |
| m2.a | «La verdad no tiene que depender de que sigas pagando vos». → «¿Quién se ocupa entonces?» | V |
| m2.b | «Aclaremos qué autorizás a compartir y qué no». → «Te lo dije antes». | L |
| m2.c | «Si ordenamos lo que falta, podemos cerrar esta etapa». → «Siempre falta algo». | I |
| m3.a | «¿Qué promesa mía sentís que no se sostuvo?» → «¿Querés que elija una?» / nombra una real. | P |
| m3.b | «Revisemos quién está disponible fuera de este consultorio». → «Mi mamá pregunta demasiado». | Q |
| m3.c | «Puedo hacerme cargo de coordinarlo para que descanses». → «Está bien. Hacé lo que quieras». | T |

### Cambios emocionales

Ofrecer alternativa sin recurso no da el efecto de tenerla. m1a se formula «empezar a buscar» si no existe preparación; puede aumentar esperanza leve, no abrir salida plena por magia. «Hacé lo que quieras» no se codifica como confianza.

### Variantes según estado

C alta: puede decir «Confío en vos, igual no puedo más». C baja: cita incumplimiento concreto. E alto: personas concretas y rechazo a esperar. M alto: exige saber a quién llegará su nombre. A alta: necesita secuencia inmediata comprensible. Repliegue: «Ya da igual» sin convertirlo en detector universal.

### Consecuencias inmediatas

Se cumplen, reprograman o rompen compromisos identificables. Resolver permisos es diferente de coordinar apoyo. Ninguna opción se llama salida/crisis/violencia.

### Consecuencias diferidas

M1 a/b/c → S18 alternativa viable/significado explorado/decisión familiar compartida o impuesta según réplica. M2 a/b/c → S18 descarga real si hay responsable/límites preservados/prioridad del expediente. M3 a/b/c → clímax reconocimiento con historia/red disponible/delegación acotada o sustitución sostenida. Flags previos deciden qué puede cambiar, no la literalidad de la frase.

### Flags

`redirect_attempted`; `case_handoff_active`; `school_alternative_active`; `autonomy_restoration_enacted`; `disclosure_scope_reviewed`. Solo ejecución, no mención, activa estados.

### Callbacks

Una memoria de S1–3, una acción de S8–14 y promesa S16 seleccionadas en momentos distintos. No reproches de decisiones que el jugador no tomó.

### Nodo de convergencia

Salida de la consulta con trayectoria provisional y recursos; S18 sigue siendo jugable antes del punto de fijación.

### Estado al terminar

Se guarda elegibilidad y motivos internos. No se fija una muerte al cruzar un umbral emocional.

## S18 — Lo que queda afuera

### Objetivo

Hacer jugable la culminación y el cierre de la relación, incluso cuando no se puede deshacer el daño.

### Eventos obligatorios

Entrada según trayectoria; revisión final de recursos; clímax correspondiente; resolución institucional común; despedida o duelo. La salida incluye Laura/escuela nueva/Santiago/otro terapeuta. Las otras cinco conservan sus contratos de la parte 8–9.

### Estado emocional relevante

No usar una animación de calma para señalar resultado. Confianza, miedo, ansiedad y enojo modulan última conversación dentro de cada trayectoria.

### Temas disponibles

Próximo paso; límites sobre el caso; vínculo final; lo que Julián acepta reconocer. Temas de crisis no sustituyen atención externa por conversación de juego.

### Decisiones del jugador

M1 responder al estado actual; M2 actuar dentro del recurso realmente disponible; M3 última conversación. Las formulaciones se sustituyen por las variantes de clímax de las partes 6, 8 y 9; nunca escoger una ruta por su nombre.

### Opciones de diálogo

| ID | Opción base → respuesta inicial en consulta | Perfil |
|---|---|---|
| m1.a | «Quiero escucharte sin suponer que estar más tranquilo significa estar mejor». → «No dije que estuviera mejor». | Q |
| m1.b | «¿Qué de lo que acordamos te sirve hoy?» → «Depende de qué hayan hecho». | R |
| m1.c | «Hay algo distinto en cómo estás hablando. Quiero preguntártelo». → «¿También eso está mal?» | F |
| m2.a | Sostener el contacto acordado con Laura sin desplazarla. → «Con ella puedo hablar de otra cosa». | R |
| m2.b | Pedir apoyo a la red ya activa y reconocer qué se desconoce. → «No lo conviertas en otra reunión sobre mí». | L |
| m2.c | Proponer que Julián siga siendo el principal interlocutor. → «No quiero que todo pase por vos». | T |
| m3.a | «Hay decisiones mías de las que tengo que hacerme cargo». → «No me hagas tranquilizarte». | P |
| m3.b | «¿Qué querés que respete de acá en adelante?» → «Que no cuentes mi vida como tu caso». | Q |
| m3.c | Guardar silencio, sin pedir perdón ni respuesta. → Habla / termina despedida según vínculo. | S |

### Cambios emocionales

Antes del punto de fijación pueden cambiar disposición y acción viable, con límites de S17. Después solo alteran experiencia, última relación y epílogo: no recalcular final como recompensa por una última frase.

### Variantes según estado

C alta: confianza explícita junto con necesidad de otro terapeuta. C baja: exige un cierre breve. E alto: reproche preciso, no discurso de villano. M alto: pregunta qué sabrán otros. A alta: necesita que no le enumeren todo de golpe. En finales de muerte, m3 sucede antes del corte o con Laura/Marina después, jamás diálogo póstumo presentado como real.

### Consecuencias inmediatas

Último intercambio conserva réplicas propias. Clímax sin método, cuerpo, armas, preparación ni tácticas. El motor guarda cursor y resultado fijado por separado.

### Consecuencias diferidas

M1 a/b/c → epílogo: fue escuchado/se revisó un acuerdo/se discutió interpretación. M2 a/b/c → continuidad: Laura reconocida/red compartida/protagonismo de Julián cuestionado, sin atribuirle control total del desenlace. M3 a/b/c → última memoria: responsabilidad/límite respetado/silencio acompañado o distante. La investigación externa se confirma cualquiera sea la variante.

### Flags

`outcome_locked` solo en punto narrativo definido; `final_contact_mode`; `last_boundary`; `epilogue_memory`; `institutional_truth_confirmed` en todos los resultados. IDs de resultado distintos de las hipótesis.

### Callbacks

Salida «Al final no fue tan inútil» no es un premio de puntuación. La llamada violenta recuerda alternancia entre inacción e intromisión real. Nuevos finales citan permiso/exposición o decisión sustituida concretos.

### Nodo de convergencia

Dentro de cada resultado, clímax → consecuencias → última escena. Convergencia institucional común, nunca epílogo humano idéntico.

### Estado al terminar

Partida cerrada con historial de relación. Relectura opcional de recuerdos y notas sin porcentajes de culpa ni «la respuesta que lo habría salvado».
