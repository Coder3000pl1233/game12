# Partes 8–11 — Resultados y continuidad canónica

## Parte 8 — Integración de los cuatro finales existentes

### Contrato de resolución: cinco trayectorias, seis resultados

Trayectorias internas: `exit`, `crisis`, `violence`, `exposure`, `administered`. Crisis se divide en supervivencia y muerte. Los identificadores no se muestran al jugador. No existe selección aleatoria ni probabilidad clínica calculada. Los umbrales emocionales son parámetros de dramaturgia, no predictores de personas reales.

Separar cuatro capas:

1. **Preparación histórica:** acciones de al menos dos etapas entre S1–4, S5–10 y S11–16. Una frase inicial o un error no basta.
2. **Estado combinado:** emociones actuales, tendencia de las últimas tres sesiones y secundarias pertinentes. Debe existir una combinación, no un valor aislado.
3. **Puerta factual:** acontecimientos ya ocurridos o recursos realmente disponibles. Mencionar un apoyo no equivale a tenerlo.
4. **Activación/compromiso:** S17 y primera mitad de S18 permiten confirmar, acotar o redirigir. El clímax empieza después del punto que fija el resultado general.

La historia de decisiones influye; no se comunica que el jugador tiene control total de la vida de Tomás. Sus decisiones propias, el daño previo y las acciones de otros personajes también existen. No añadir «porcentaje de responsabilidad» al final.

### Reglas de elegibilidad propuestas

Los patrones siguientes son funciones sobre el ledger, no flags que una sola respuesta activa. `sustained` significa observado en al menos dos de S14–16; `history` exige eventos de dos etapas anteriores. Toda elección de S17 queda registrada aunque no alcance para cambiar trayectoria.

| Trayectoria | Estado combinado | Historia requerida | Puerta factual / posibilidad de desvío |
|---|---|---|---|
| Salida | Puede conservar enojo o miedo; autonomía y apoyo permiten aceptar una alternativa. No exige estar «bien» ni confiar plenamente en Julián. | Alguna relación fuera del terapeuta conservada o reconstruida mediante acciones, no solo palabras. | Alternativa escolar real, entrega externa con responsable y participación de Tomás. |
| Crisis | Repliegue o culpa ambivalente + desesperanza/aislamiento sostenidos. Puede haber confianza alta y miedo alto que permitan pedir ayuda. | Deterioro previo, pérdidas de contacto o cierre de horizonte, no solo admisión S16. | S17 persiste sensación de carga y no se concreta una alternativa suficiente; S18 desconexión contextualizada. Apoyo puede redirigir antes del compromiso. |
| Violencia | Confrontación aislada + enojo sostenido + autonomía dañada y presión de regreso. Miedo bajo puede acompañar, no es requisito universal. | Agravios concretos, decisiones de actuar por cuenta propia y ruptura sostenida de interlocución en etapas diferentes. | S17 fijación en personas/regreso y rechazo sostenido de alternativas; S18 mentira contextualizada. Nunca se activa solo por ideas admitidas S16. |
| Exposición | Miedo a circular fuera de control + enojo por uso del relato; confianza baja o confianza alta explotada como permiso general. | Prioridad investigadora + al menos dos traspasos de alcance documentados en etapas distintas. | Divulgación identificable del relato personal no acordada; recepción/reproducción ya constatada. Resolver correctamente el caso no retira esa circulación. |
| Vida administrada | Ansiedad/miedo altos que luego pueden bajar + autonomía muy dañada; confianza concentrada en Julián o cumplimiento sin vínculo. | Sustitución repetida de decisiones y lazos transformados en intermediación en dos etapas. | Red real activa pero centralizada + decisiones familiares/profesionales hechas sin participación + retirada sostenida de voz de Tomás. |

No usar «confianza baja» como puerta universal para tragedia. Exposición puede nacer de confianza alta y aceptación inicial sin comprender alcance; la crisis también. Enojo alto aparece en salida. Una familia presente no equivale a control; pedir ayuda no equivale a vida administrada.

### Conflictos, cobertura y punto de fijación

Al cerrar S16 se calculan candidatos, no finales. En S17 se muestra una tensión principal y una secundaria. Prioridad visual: el problema que Tomás trae explícitamente hoy; después, la promesa pendiente más pertinente. No priorizar por gravedad para «anunciar» el resultado.

En `S18.commit` se reevalúan acciones realizadas, no intenciones. Para cada candidato se cuentan **familias de evidencia narrativa** distintas (historia, estado sostenido, puerta factual, señal actual), nunca número de clics. Un candidato sin puerta factual no puede ganar por acumular puntos.

Si coinciden crisis y violencia, elegir el motivo persistente expresado en más de una escena previa, no un menú final. En empate, la cronología de flags `withdrawal_persisted` y `targeted_grievance_persisted` determina cuál se consolidó primero; si el contenido produce igualdad de secuencia, es error de autoría a resolver en test, no sorteo. El candidato descartado sigue como matiz de diálogo, no desaparece del personaje.

Una crisis aguda o un incidente violento ya comprometidos tienen prioridad sobre exposición o administración: estas quedan como consecuencias secundarias, no un segundo final simultáneo. Sin ese compromiso, exposición consumada prevalece sobre vida administrada, que puede quedar en el epílogo. Antes de consumarse la exposición puede reducirse o retirarse la propuesta; esto no cancela otra trayectoria por arte de magia.

Sin puerta trágica cumplida, no inventar una. Entrar a `exit_bridge`: dos escenas breves dentro de S18 resuelven cambio escolar y traspaso del caso con Laura y una red que ya se haya presentado. No es un séptimo resultado ni una curación instantánea. Para cobertura, sembrar siempre antes de S17 que Laura averigua alternativas por iniciativa propia; las decisiones determinan si Tomás lo sabe, participa y puede aceptarlo. La oferta puede existir sin confianza alta en Julián. Si hay sustitución sostenida, esa misma oferta puede culminar en vida administrada en vez de salida. Ninguna rama termina en un callejón porque el jugador no exploró un tema opcional.

La tabla de fixtures más abajo es requisito previo de implementación para comprobar cobertura y prioridad. No pretender que parámetros provisionales ya fueron validados jugando.

### Resultado 1 — Salida del conflicto

**Combinaciones que lo favorecen.** Confianza utilizable, aunque no plena; autonomía conservada; miedo que puede expresarse; enojo con límites; apoyo percibido alineado con al menos dos recursos reales. No necesita perdonar ni dejar de sentir culpa.

**Flags importantes.** `school_alternative_active`, `case_handoff_active`, algún acuerdo de participación cumplido y límite sobre novedades. La relación con Laura importa por lo que hicieron juntos, no por haber elegido su nombre.

**Decisiones tempranas.** Ritmo S1, aviso S2, puente con Laura S3, distancia sin perdón S7 y reparación S8 sostenida en S10–14. No exige recorrido perfecto: puede llegar con crítica firme a Julián.

**Señales previas.** Tomás pregunta por una vida que no dependa del caso; acepta que otros sostengan investigación; pone límites sin abandonar contacto. Sigue enojado con injusticia.

**S17.** «Irme no significa que estaba mintiendo». El jugador decide si explorar derrota, reconocer costo o concretar alternativa. Solo recursos existentes permiten volver propuesta en acción.

**S18.** Laura ofrece cambio viable. Investigación externa empieza, se entrega evidencia, Tomás pide no vivir pendiente de cada novedad. No entra a un epílogo automático.

**Clímax jugable.** Dos momentos, tres opciones cada uno:

- D1, Tomás: «No quiero enterarme de cada cosa». Julián elige «Acordemos qué sí necesitás saber» [L] → delimita avisos; «Podemos dejar a otra persona a cargo del contacto» [R] → acuerda interlocutor; «¿Te preocupa lo que puedan decir si no seguís?» [Q] → habla del costo de retirarse. Ninguna lo obliga a seguir investigando.
- D2, tras conversación con Santiago: «Hay cosas que no te voy a perdonar. Pero tampoco quiero seguir odiándote». En última sesión Julián puede preguntar «¿Qué querés llevarte de este espacio?» [Q] → Tomás distingue útil/dañino; reconocer «Cambiar de terapeuta también puede ser parte de salir de acá» [L] → transferencia no castigo; guardar silencio [S] → despedida más seca o afectuosa según vínculo.

Julián no controla la conversación Tomás–Santiago: el jugador escucha su consecuencia y elige qué responde cuando Tomás la trae. No conceder reconciliación completa como premio.

**Epílogo.** Otro terapeuta, nueva escuela. «Al final no fue tan inútil» puede llegar con ironía cálida o distancia. Última imagen: Tomás entra como un alumno más, no héroe del encubrimiento.

### Resultado 2 — Crisis suicida: sobrevive

**Combinaciones que lo favorecen.** La trayectoria de crisis llegó a activarse pese a ayuda parcial. Miedo/ansiedad pueden ser altos o dar paso a calma ambivalente; persisten culpa y desesperanza. La red mantiene vínculos funcionales fuera de Julián.

**Flags importantes.** `crisis_committed`, `laura_contact_maintained`, `support_coordination_active`, `private_channel_respected`. Los dos primeros no deben crearse en el último mensaje: necesitan acciones previas.

**Decisiones tempranas.** S3 conversación privada con Laura, S7 involucramiento que no la convierte solo en vigilancia, S11 supervisión, S16 apoyos concretos. Algunas decisiones de Julián pudieron ser dañinas; no tiene que ser el vínculo que funcione al final.

**Señales previas.** Se siente carga, deja temas propios, habla de no complicar más a otros, calma nueva que contrasta con historia reciente. Estas señales son de este personaje, no checklist para diagnosticar a personas reales.

**S17.** No logra imaginar salida suficiente. Puede confiar en Julián y decir que no ve futuro; la escena no debe castigar haberlo contado. Quedan oportunidades de coordinación, no garantías.

**S18.** Desconexión gradual y pérdida de contacto. Laura conserva comunicación. El jugador actúa como Julián detrás del vínculo, no selecciona lo que debe decir Tomás ni reemplaza a la madre.

**Clímax jugable.** D1 Laura: «A mí me responde, pero siento que cada cosa lo aleja». Opciones: «Podés seguir siendo vos; no voy a ponerte un discurso» [R] → Laura usa su propia voz; «Quiero saber qué venían pudiendo hablar ustedes» [Q] → retoma un intercambio real; «Voy a coordinar con el apoyo disponible mientras vos seguís en contacto» [L] → Julián acepta no ser protagonista. Sin guion clínico operativo.

D2, última visita semanas después: Tomás «No quiero volver a empezar contando todo». Opciones: «Podemos acordar qué querés trasladar al otro profesional» [R] → conserva participación; «¿Qué parte preferís contar vos?» [Q] → delimita autoría; «Hay errores míos que no tenés que explicarle vos» [P] → Julián asume trabajo propio. Dos ramas de réplica antes de despedida.

La continuidad del contacto aporta información indirecta suficiente para encontrarlo y recibe ayuda. No se muestra acto ni método. La localización se narra como hecho, no como puzzle para el jugador.

**Epílogo.** Sobrevive y continúa con ayuda, otro terapeuta y cambio de escuela. No «curado por Laura». La madre no obtiene premio por haber respondido perfectamente; existe una red y un proceso.

### Resultado 3 — Crisis suicida: muere

**Combinaciones que lo favorecen.** Misma trayectoria de crisis, con aislamiento/desesperanza sostenidos y canales deteriorados. No requiere enojo ni confianza mínima determinada. No es «falta de amor materno».

**Flags importantes.** `crisis_committed`, pérdidas de contacto persistentes, promesas rotas no reparadas y coordinación que no llegó a hacerse efectiva. Evaluar ausencia de recursos junto con historia, no puntuar a Laura como madre.

**Decisiones tempranas.** Exclusión reiterada de terceros desde S3, centralización sin continuidad, espera del expediente como respuesta al malestar, S8 sin reparación y promesa S16 que no pudo sostenerse. Ninguna aislada causa este resultado.

**Señales previas.** Comparte las de supervivencia. No diseñar una pose o color que permita al jugador «saber que va a morir». En ambas Laura y Julián intentan ayudar.

**S17.** El horizonte se cierra y falta una alternativa vivida como propia. Puede haber intentos sinceros de reparar que no revierten todo.

**S18.** Laura recibe algunos mensajes, después ninguno. No mostrar cuerpo, acto, método ni fragmento que los sugiera.

**Clímax jugable.** D1 usa las mismas tres intenciones de acompañamiento a Laura que en supervivencia, con réplicas distintas según contacto. No esconder una respuesta ganadora. Una vez fijado el resultado, el motor no vuelve a calcularlo por esas frases.

D2, tras corte temporal, Laura: «Repaso todo y nunca termina». Opciones de Julián: «Yo también tengo decisiones que revisar; no voy a ponértelas encima» [P] → ella puede aceptar o rechazar hablar ahora; «¿Querés hablar de Tomás hoy o de lo que pasó después?» [Q] → recuerdo cotidiano o consecuencias; guardar silencio [S] → no exige consuelo a Laura. La conversación no fabrica una explicación total.

**Epílogo.** Se hace explícito que murió por suicidio sin describirlo. Laura, Marcelo y Julián viven consecuencias diferentes. Marcelo enfrenta su minimización sin convertirse en padre plenamente redimido. Investigación confirma verdad, que no compensa pérdida ni explica por sí sola la muerte.

**Distinción sistémica con supervivencia.** Antes del corte, exigir evaluar conjuntamente: vínculo mantenido con Laura a lo largo de varias etapas, canal respetado que siga siendo utilizable, coordinación real y disposición a recibir contacto expresada en escenas previas. Supervivencia necesita continuidad en más de una dimensión; muerte requiere crisis comprometida y fallo acumulado de continuidad/contacto, no un umbral de confianza. Los valores exactos se balancean con fixtures; prohibido traducirlos a probabilidad clínica o afirmar inevitabilidad retrospectiva.

### Resultado 4 — Violencia hacia otros

**Combinaciones que lo favorecen.** Enojo persistente + aislamiento + autonomía dañada + regreso vivido como imposición, con agravio dirigido y cierre de interlocución. No basta admitir fantasías ni nombrar responsables del encubrimiento.

**Flags importantes.** `targeted_grievance_persisted`, `school_return_forced`, `alternatives_rejected_over_time`, `violence_committed`. La última negación no activa sola el final.

**Decisiones tempranas.** Alternancia repetida entre investigar, demorar acciones de apoyo y decidir por él; S7 Santiago convertido solo en testigo; S14 verdad por encima del costo; S16–17 red sin participación. El entorno y acciones propias de Tomás siguen teniendo responsabilidad distinta.

**Señales previas.** Habla de personas concretas, fijación en regreso y cambio de tono; «Ya sé lo que tengo que hacer». No mostrar planificación ni detalles del regreso útiles para un ataque. Las preguntas se limitan a sentido emocional, no rutas, horarios o vulnerabilidades.

**S17.** Se exploran alternativas reales si quedan recursos. Cuando todavía puede redirigirse, la cooperación debe apoyarse en acciones anteriores. No responder «no vuelvas» como botón que salva.

**S18.** Julián puede formular pregunta directa sobre hacerse daño/dañar; en esta ruta Tomás miente. Si el jugador no elige la pregunta literal, una variante de réplica plantea seguridad explícitamente sin atribuirle una intervención no elegida: el momento exige escoger entre tres formulaciones de pregunta, no una opción de omitir toda conversación. Laura encuentra señales cuando él ya está en la escuela. Incidente grave, personas heridas incluidas no relacionadas con el hostigamiento.

**Clímax.** Llamada jugable de la parte 6, dos elecciones y réplicas, conservando como opción «Tenés razón en muchas cosas que decís sobre mí, pero esto no tiene que terminar así». «Ya es tarde». Corta; intervención externa; Tomás muere. No tácticas, armas, preparación ni glorificación de última llamada.

**Epílogo.** Daño a víctimas y familias tiene espacio propio; no reducirlo a culpa de Julián. Investigación sigue y confirma el encubrimiento. Consultorio/silla vacía como pérdida, no monumento a Tomás ni justificación del incidente.

### Fixtures mínimos de resolver (para implementación, no pruebas ya ejecutadas)

| Fixture | Historia y estado | Resultado esperado |
|---|---|---|
| Enfado con apoyo | E alto, Laura activa, autonomía, alternativa aceptada, sin compromisos trágicos | Salida. |
| Confía pero no alcanza | C alta, culpa/desesperanza sostenidas, crisis comprometida, contacto materno y coordinación sostenidos | Supervivencia. |
| Red perdida | Crisis comprometida, repliegue y canales deteriorados durante varias etapas | Muerte por suicidio, sin depender de última réplica. |
| Agravio cerrado | E alto + aislamiento + autonomía dañada, regreso forzado, patrón dirigido persistente, incidente comprometido | Violencia. |
| Confianza usada como permiso | C media/alta, prioridad investigadora, múltiples alcances transgredidos, intimidad ya circulando | Exposición. |
| Ayuda sin voz | Apoyos activos, centralización persistente, baja autonomía y cumplimiento desconectado | Vida administrada. |
| Solo enojo | E alto sin agravio dirigido ni puerta factual | Nunca violencia por ese valor. |
| Solo una mala frase | S1 confrontativa y resto con reparación cumplida | No tragedia bloqueada desde S1. |
| Exposición y control | Ambas puertas cumplidas, sin crisis/incidente comprometido | Exposición, control como matiz. |
| Empate peligroso | Crisis y violencia preparadas | Desempate por persistencia/orden de eventos registrado; test debe fijar secuencia, nunca azar. |
| Sin candidatos trágicos | Confianza baja, ningún compromiso trágico, Laura sembró alternativa | Puente de salida con otro terapeuta, no muerte por descarte. |
| Recarga de clímax | Mismo estado fijado, respuesta final diferente | Mismo resultado general, distinta última relación. |

## Parte 9 — Dos nuevos finales trágicos

### Resultado 5

#### Nombre provisional

**La verdad sin refugio** (`ending_exposure`).

#### Concepto

La verdad del encubrimiento se confirma, pero el proceso convierte a Tomás en un relato público del que no puede separarse. No fracasa la investigación: fracasa el límite entre probar lo ocurrido y apropiarse de su vida.

#### Qué lo diferencia de todos los demás

No hay muerte ni incidente violento. A diferencia de salida, cambiar de escuela no lo convierte en un alumno anónimo: su intimidad circula primero. A diferencia de vida administrada, puede decidir y discutir en casa, pero perdió el control de su representación pública.

#### Por qué es trágico

Consigue algo que necesitaba —que dejen de negar lo ocurrido— y pierde algo que intentaba proteger: la posibilidad de no explicar su dolor a desconocidos. La confirmación institucional no deshace copias, rumores ni lecturas simplificadas. El final no dice que denunciar sea un error: distingue entrega pertinente de exposición innecesaria y no acordada.

#### Personajes involucrados

Tomás, Julián, Laura, Santiago, Nico, Camila mediante su declaración, Lagos y Arce en investigación, Marina revisando decisiones profesionales. Nadie nuevo causa el daño. La circulación utiliza canales y conflicto ya existentes.

#### Combinación emocional que lo favorece

Ansiedad por que se niegue la verdad + enojo que reclama reconocimiento + miedo a exposición. Confianza alta inicial puede hacer que entregue material bajo un límite que Julián después amplía. La caída final de confianza es consecuencia, no requisito retrospectivo artificial.

#### Variables secundarias

Sesgo investigador sostenido, autonomía reducida en manejo de archivos, culpa convertida en deber de demostrar, apoyo que privilegia resultado público sobre vida cotidiana. Vínculo con Laura puede mantenerse: no todas las tragedias requieren que todos los lazos fracasen.

#### Flags

Historia de dos o más ampliaciones de alcance en etapas diferentes; `personal_testimony_used_as_proof`; `scope_objection_recorded`; `identifiable_material_circulating`; `public_exposure_committed`. No activar por recoger evidencia o consultar a Marina. El consentimiento delimitado no se convierte en autorización total.

#### Decisiones desde S1 que empiezan a construirlo

Preparar inconsistencias antes que encuadre; tratar contradicción como dato a resolver; en S2 valorar obtener versiones externas sin anticipar impacto. Ninguna cierra la ruta: son semillas de estilo que pueden corregirse. En S4 copiar sin resolver alcance, S9 priorizar prueba ante culpa, S10 confundir USB con autorización, S14 ampliar entrega y S15 sostener réplica pública completan cadena.

#### Primeras pistas

S1 «¿Eso también lo anotás?»; S4 «No quiero que todos lo tengan»; S6 «No era solamente ese caso». Deben aparecer también en rutas reparables: no son anuncios inevitables del final.

#### Evolución

Tomás entrega partes para ser entendido. Julián privilegia tener el conjunto; después cree que un relato personal hará imposible seguir negando. Se distinguen archivos pertinentes y conversaciones íntimas antes de cada decisión. Al elegir ampliar, el jugador ve la objeción y puede acotar. La cadena dañina ocurre si sostiene la ampliación, no porque un botón ambiguo lo engañe.

No hace falta inventar una filtración nueva misteriosa: la respuesta pública promovida en S15 incorpora elementos personales reconocibles y se reproduce en los mismos espacios del conflicto. Se muestra recepción real antes de cerrar la puerta, no una narración sorpresa en el epílogo.

#### S17

Tomás pregunta qué parte de su vida llegó afuera. Si solo hay propuesta, todavía puede retirarse; si hubo envío pero aún no circulación, se puede limitar alcance con costos narrativos. Si ya circula, Julián puede corregir, asumir responsabilidad y proteger lo restante; no prometer borrar lo difundido. Otra trayectoria todavía puede dominar si ocurre una crisis, según prioridad definida.

#### S18

Se conoce un recorte del relato privado fuera de consulta. Tomás comprende que discutir su autoría anónima dejó paso a que otros discutan su culpa por Bruno. La falsedad sobre autoría se aclara, pero no restaura privacidad. Se confirma investigación contra Lagos/Arce sin detalles legales inventados.

#### Clímax

Tomás trae una reproducción del texto y pregunta: «¿En qué momento esto dejó de ser mío?». No usa el juego para enseñarnos cómo filtrar ni amplificar material; solo se muestra consecuencia y atribución de decisión.

#### Decisiones del jugador durante el clímax

D1, respuesta al límite roto:

- «Usé tu relato para que no pudieran negarlo. No tenía derecho a confundir esas dos cosas» [P]. Tomás: «Yo también quería que me creyeran. No esto».
- «Quiero distinguir qué compartí yo y qué se reprodujo después» [Q]. Tomás: «No lo conviertas en otra investigación antes de contestarme». Puede asumir o seguir defendiéndose en réplica.
- «¿Qué querés que deje de hacer ahora?» [R]. Tomás: «Hablar por mí».

D2, reparación posible sin restitución mágica:

- Reconocer su actuación y corregir el alcance de su comunicación sin repetir intimidad [P]. Tomás acepta corrección, no confianza recuperada.
- Acordar que el seguimiento del caso y cualquier comunicación pasen a otra persona con límites definidos [L]. Tomás exige revisar qué se traslada.
- No emitir otra respuesta pública mientras se escucha qué quiere Tomás [R]. Él puede pedir solo cortar contacto con Julián; silencio público no borra el daño ni evita revisión profesional.

Las tres opciones pueden ser pertinentes en contextos distintos. Lo irreversible no significa que cualquier reparación dé igual: cambia exposición restante, última relación y quién conserva acceso.

#### Consecuencia

Tomás rompe el vínculo terapéutico con Julián y continúa apoyo con otro profesional. Cambiar de escuela puede ser posible, pero su historia pública lo precede. No se presenta rechazo universal de nuevos compañeros: basta con que deba negociar nuevamente cuándo contar su propia historia.

#### Epílogo

Investigación confirma manipulación y documentos alterados. Camila conserva voz mediante declaración, no es usada como castigo secundario ni nueva víctima inventada. Nico entrega pruebas y enfrenta consecuencias. Julián revisa su conducta con Marina y la instancia institucional pertinente, sin sentencias legales específicas. Laura puede seguir cercana, pero no puede prometerle anonimato.

#### Última escena

En otro ámbito escolar alguien reconoce el nombre de Tomás antes de conocerlo. Él decide no responder a la pregunta sobre el caso y busca un lugar donde sentarse. La escena deja una mínima agencia presente dentro de una pérdida real; no eterna condena a ser conocido.

#### Última frase si corresponde

«Ahora todos saben mi historia. No sé quién me escuchó».

Variante menos aforística si su voz llegó muy cerrada: «No quería que supieran todo».

#### Cómo el jugador entiende retrospectivamente que contribuyó a llegar ahí

La revisión opcional yuxtapone el límite S4, el permiso USB y la objeción S14 con envíos efectivamente elegidos. No dice «investigar estuvo mal»; muestra dónde se confundieron posesión, permiso y finalidad. Si no existieron esas transgresiones, el final no es elegible.

### Resultado 6

#### Nombre provisional

**Una vida administrada** (`ending_administered`).

#### Concepto

Los adultos sostienen recursos, cambian escuela y mantienen ayuda, pero terminan organizando la vida de Tomás sin él. Está acompañado en términos prácticos y profundamente solo en la participación. La ausencia final es la de su voz, no la de su cuerpo.

#### Qué lo diferencia de todos los demás

No muere ni provoca un incidente. No pierde privacidad pública como en exposición. Tampoco es salida: aunque cambie de institución, no pudo decidir cómo salir ni a quién seguir contando. Hay recursos reales y verdad confirmada, pero autonomía persistentemente vaciada.

#### Por qué es trágico

Julián intenta evitar otra pérdida y acepta convertirse en intérprete único. Laura empieza a preguntar al profesional qué quiso decir su hijo en vez de preguntárselo a él; Marcelo confunde cumplimiento con recuperación. Tomás aprende que la manera menos costosa de convivir es no mostrar preferencias. No se presenta como irreversible de por vida: la tragedia es el vínculo destruido y el tiempo perdido, no negar toda recuperación futura.

#### Personajes involucrados

Tomás, Julián, Laura, Marcelo y Marina. Santiago y Nico permanecen en resolución del caso, sin nuevos papeles de villanos. Marina puede señalar el problema, no diagnosticarlo con una frase perfecta.

#### Combinación emocional que lo favorece

Miedo y ansiedad altos durante etapas anteriores; confianza concentrada en Julián puede ser alta. Después baja la activación visible, baja expresión de enojo y continúa autonomía dañada. Distinguir calma disponible de sumisión por historia de decisiones, no por postura aislada.

#### Variables secundarias

Apoyos objetivos activos, autonomía muy reducida, aislamiento de decisiones propias, apoyo percibido decreciente, vínculo materno mediado. Tendencia de Julián a dirigir y justificarse, incluso cuando no tiene obsesión investigadora. Esto lo separa causalmente del final de exposición.

#### Flags

`decisions_substituted_across_acts`, `family_contact_mediated`, `care_network_active`, `preferences_overridden`, `compliance_misread_as_consent`, `agency_withdrawal_persisted`. Todos describen acciones/retirada sostenidas; no se activa por recurrir a apoyo externo ni por una intervención puntual necesaria dentro de la ficción.

#### Decisiones desde S1 que empiezan a construirlo

Definir utilidad y encuadre sin preguntar qué espera; contactos familiares interpretados como autorización general; resolver malestar eligiendo por Tomás. En S3 centralizar conversación, S7 reunión dirigida sin revisión, S8 justificar protección, S14 centralizar todos los interlocutores y S16 convertir alta confianza en exclusividad. Una decisión de estructura temprana sigue siendo reparable.

#### Primeras pistas

«¿Para qué me preguntás si ya decidiste?»; Laura consulta «¿Lo dejo hablar de eso o le cambio de tema?» y Julián puede devolverle conversación en lugar de administrar cada gesto. Más tarde Tomás responde «Como digan» a cuestiones donde antes tenía preferencias.

#### Evolución

Cada sustitución alivia una dificultad concreta y refuerza que Julián lo gestione todo. Los recursos funcionan, por eso la ruta puede parecer satisfactoria. Los avisos aumentan: Tomás deja de proponer temas, Laura transmite pedidos mediante Julián, Marcelo celebra que «por fin entiende». Marina ofrece revisar ese patrón, no abandonar apoyo.

La alternativa reparadora siempre es apoyo **con** participación, no dejarlo solo. Un límite explicado o coordinación acordada no construyen este final. La retirada surge cuando las oportunidades de devolver voz son repetidamente descartadas.

#### S17

Laura y Marcelo presentan una alternativa escolar ya organizada. El jugador puede abrir una revisión real de preferencias, limitar su papel o seguir hablando por Tomás. Una frase «¿vos qué querés?» sin aceptar ninguna respuesta distinta no repara. Si hubo participación antes, el mismo cambio de escuela pertenece a salida, no a este final.

#### S18

Tomás llega tranquilo y contesta con precisión lo que imagina que esperan. Dice «Está todo organizado». No hay mentira sorpresa sobre un plan violento: la revelación es que ha dejado de sentir la consulta como espacio propio.

#### Clímax

Laura explica una decisión sobre su continuidad mientras Tomás está presente. Se detiene: «¿Es eso lo que vos querías?». Él contesta «Preguntale a él». Laura comprende el costo de la intermediación; no se convierte de inmediato en una madre perfecta.

#### Decisiones del jugador durante el clímax

D1, Tomás «Preguntale a él»:

- «No debería responder por vos. También contribuí a que termináramos así» [P]. Tomás: «Ahora que ya está todo hecho».
- «Quiero explicar por qué fuimos tomando estas decisiones» [J]. Tomás: «Siempre hay una explicación».
- «Podemos detener esta conversación y ver qué no querés seguir aceptando» [R]. Tomás: «No quiero decidir para que después me convenzan».

D2, cómo cerrar la relación:

- Ofrecer traspaso a otro profesional con Tomás participando en qué se transmite [R]. Acepta decidir un aspecto pequeño; no restituye relación anterior.
- Revisar con Marina la centralización y comunicar a la familia límites del papel de Julián [L]. Laura puede recuperar conversación directa, con resistencia de Marcelo.
- Preguntar a Tomás si quiere decir algo antes del cierre y aceptar que no [S]. Se respeta un silencio por primera vez sin interpretarlo como acuerdo. El traspaso de apoyo ocurre igualmente, no se lo deja sin continuidad.

Dos decisiones tardías pueden limitar daño futuro y modificar última memoria. No borran la pérdida que define el resultado; una recuperación más profunda quedaría fuera del tiempo del epílogo.

#### Consecuencia

La relación con Julián termina sin explosión, pero Tomás no puede reconocerla como un espacio donde decidir. Laura debe aprender a hablarle sin mediación; Marcelo sigue valorando orden y no comprende todo. Continúa ayuda con otra persona, con confianza dañada hacia el proceso.

#### Epílogo

Verdad institucional confirmada; vida cotidiana aparentemente estabilizada. No presentar tratamiento, medicación, internación ni restricción legal inventada como mecanismo de castigo: nada de eso es necesario para esta tragedia. Lo que se muestra es sustitución relacional sostenida, no «buscar ayuda arruinó su vida».

Marina pregunta a Julián cuándo dejó de distinguir acompañar de responder por él. El jugador puede reconocer un momento concreto de su historial, sin que Marina lo declare único causante.

#### Última escena

Laura pregunta a Tomás qué quiere hacer esa tarde. Mira el teléfono como esperando que otra persona indique la respuesta. Ella lo deja sobre la mesa y espera. Él tarda. No se resuelve con abrazo ni diálogo perfecto: primera posibilidad pequeña después de una pérdida grande.

#### Última frase si corresponde

«No sé. Hace bastante que no lo elijo».

#### Cómo el jugador entiende retrospectivamente que contribuyó a llegar ahí

El cuaderno muestra peticiones auténticas seguidas por decisiones tomadas por terceros, y «está bien» registrado como acuerdo sin explorarlo. Contrasta con ocasiones donde podía haber ofrecido coordinación limitada. El jugador entiende que no falló por conseguir ayuda, sino por sustituir reiteradamente a la persona en nombre de esa ayuda.

## Parte 10 — Mapa global compacto

| Tramo del tronco | Invariantes | Estado y memoria que llegan a la convergencia | Apertura posterior |
|---|---|---|---|
| S1–3: encuadre y prueba | Consulta obligada, pelea inventada, padres informados | Ritmo/desafío, promesa/aviso, primer puente con Laura, supervisión | S4: todos reciben mensaje, distinta experiencia de sospecha. |
| S4–7: sospecha y pasado | Mensajes, Bruno, pelea real con Santi | Registro/copia, Bruno persona/pista, alcance familiar, distancia con Santi | S8: prueba revelada voluntaria o confrontativamente. |
| **S8: bisagra** | Pelea falsa y versión de Camila | Reconocimiento/justificación, acción reparadora pendiente | S9–10: mismo pasado/USB, diferentes reservas y permisos. |
| S9–10: hechos y culpa | Lagos/Arce, pedido de ayuda, USB y nota ambigua | Culpa, permiso de archivos, pausa cumplida o ignorada | S11: Nico aliado plausible según soledad. |
| S11–14: alianza y entrega | Nico autor, fingimiento de Tomás, amenaza, entrega | Saber por actor, estilo investigador, apoyo, alcance de pruebas | S15: verdad conocida, daño presente no resuelto. |
| S15–16: acción y malestar | Minimización, señalamiento, doble confesión, regreso | Repliegue/agravio, exposición propuesta, control/apoyo, promesa | **S17: bisagra**, recursos reales y participación pueden desviar. |
| S17 → S18 anterior al compromiso | Regreso y alternativas, consecuencias de promesas | Puertas factuales + historia + emociones combinadas | Salida / crisis / violencia / exposición / vida administrada. |
| S18 → clímax | Resultado fijado solo tras escena de compromiso | Contacto, última respuesta, límites restantes | Crisis se divide: sobrevive o muere. Total: seis resultados. |
| Epílogos | Investigación confirma encubrimiento en todos | Destino y relación, no porcentaje de aciertos | Relectura de historia compartida. |

Las ramas locales vuelven al tronco al final de cada momento, cargando eventos de memoria. Las grandes rutas comparten S1–16; S17 usa variantes; S18 y clímax sí tienen bloques propios. La verdad se mantiene común, la vida que queda alrededor no.

### Matriz de diferencias entre los seis resultados

| Resultado | Tomás | Verdad institucional | Pérdida / posibilidad central |
|---|---|---|---|
| Salida | Vive, participa en cambio | Confirmada | Puede dejar de ser el caso. |
| Crisis: sobrevive | Vive, continúa ayuda | Confirmada | Sigue viviendo tras crisis; relación debe cambiar. |
| Crisis: muere | Muere; acto no mostrado | Confirmada | Pérdida irreparable sin explicación única. |
| Violencia | Muere; otras personas heridas | Confirmada | Daño a otros y a su vida; ninguna justificación. |
| Verdad sin refugio | Vive, voz propia pero intimidad circulante | Confirmada | No puede recuperar la reserva de su historia. |
| Vida administrada | Vive, apoyos activos sin participación previa | Confirmada | Perdió agencia dentro de relaciones que decían sostenerla. |

## Parte 11 — Cambios necesarios a la historia escrita

### Lo que no cambia

No cambiar identidades, autoría anónima, papel de Camila, participación activa de Arce, culpabilidad de Lagos en manipulación, muerte previa de Bruno, conflicto Tomás/Santiago, fingimiento ante Nico ni hechos de los cuatro finales originales. No completar el sentido de la nota USB. No atribuir causa única a ninguna muerte. No introducir nuevos villanos, conspiraciones, diagnósticos sorpresa o accidentes alternativos.

### Cambios puntuales de agencia y puesta en escena

| Escena actual / tensión | Modificación necesaria | Invariante que conserva |
|---|---|---|
| S1 preguntas y respuestas sucesivas de Julián dentro de `lines` | Convertir preguntas de encuadre, contradicción y cierre en momentos de elección. | Tomás obligado, irónico, mide al terapeuta. |
| S2 comunicación a padres a veces tratada como evitable por contenido/flags | Unificar acontecimiento canónico; ofrecer destinatario inicial, aviso y alcance, no falsa opción de impedirlo. Explicitar desacuerdo. | Padres conocen supuesta pelea y S3 tiene fundamento. |
| S3 lectura de la frase como nota final | Dar réplica jugable antes de interpretar en cuaderno. | «Se van a arrepentir» sigue siendo ambigua. |
| S4 reproche idéntico para cualquier trato | Pregunta temerosa con confianza; acusación si hubo sesgo. | Sospecha externa existe aunque Julián no acuse. |
| Specs S5 «Julián presiona demasiado», S6/S9 «convierte en investigación» | Convertir esos comportamientos en opciones tentadoras, no actos obligatorios. | La tentación de confundir caso/paciente permanece; el jugador decide sostenerla o no. |
| S6 Bruno como información | Añadir recuerdo cotidiano breve, compatible con biografía, sin nueva pista. | Persona real en la ficción, no explicación única de su muerte. |
| S7 segunda comunicación familiar | Hacer jugable cómo ocurre; no quitar presión posterior de Marcelo. | Pelea real y padres involucrados. |
| S8 disculpa como puerta que entrega todo | Dos réplicas y promesa comprobable; información mínima siempre, intimidad variable. | Revelación de prueba en S8; pasado completo progresivo en S9. |
| S9 culpa seguida por pregunta automática sobre pruebas | Elegir entre contextualizar, explorar, investigar o callar. | Testigos, Lagos/Arce y ayuda pedida por Bruno. |
| S10 entrega/lectura lineal | Orden de archivos y pausas, autorizaciones separadas de posesión. | Se abre juntos en S10 y nota no se resuelve. |
| S12 implementación cuenta autoría directamente en consulta; canon indica reserva inicial | Separar escena Nico–Tomás observada de conocimiento de Julián. En consulta se insinúa, se confirma para Julián al entregarse/contarse después. | Revelación al jugador en S12, reserva de Tomás y entrega S14. |
| S13 diálogo automático admite maniobra | Elegir cómo preguntar; Tomás puede reservar detalle aunque el jugador ya lo vio. | Obtiene material fingiendo compartir justicia, no se vuelve autor anónimo. |
| S14 revisión independiente como frase automática | Convertirla en opción junto a priorizar evidencia o preguntar límites. | Evidencia sostiene encubrimiento real. |
| S14–15 circulación de material poco diferenciada | Añadir destinatario/alcance y objeciones antes de acción; base del final de exposición. | No inventar otra fuente anónima ni cambiar caso. |
| S3/7/15 Laura solo reacciona | Sembrar iniciativa discreta de averiguar alternativa escolar, independiente de obedecer a Julián. Evoluciona más rápido y compartida si se negocia. | Laura preocupada y recuperable, oferta de cambio en salida. |
| S16 promesa «por ahora» declarada canónica por spec antiguo | Pasar a una opción explícita junto a límites y apoyo negociado. Registrar revisión/ruptura si se elige. | Doble confesión y miedo; contradicción de autonomía; regreso impuesto. |
| S17 combinaciones dominadas por sumas | Sustituir selector implícito por conversaciones y ejecución de recursos previos. | Última bisagra, no reparación instantánea. |
| S18 resolver → ending | Separar entrada, decisiones, compromiso, clímax y epílogo; conservar cursor guardado. | Cuatro resultados originales más dos propuestos. |
| Llamada final frase de Julián automática | Mantenerla como una de tres opciones, con segunda réplica. | Reproche de Tomás, corte e intervención externa. |
| Apoyo presentado únicamente como protector | Mostrar distinción entre coordinación participativa y sustitución sostenida. | Buscar apoyo sigue siendo valioso; no penalizar ayuda como tal. |

### Cuaderno, UI y alcance de implementación posterior

Mantener apertura automática al terminar sesión, hipótesis obligatoria, nota opcional y cierre/avance automático al guardar. No restaurar un botón adicional de «siguiente sesión». Introducir decisiones de interludio antes del guardado para no omitir Marina/padres. Requiere transición única que guarde todo o no avance.

Retirar «+ / − Confianza potencial» y las barras de clima emocional. Conservar estilo visual de las tarjetas, números para teclado y etiquetas de intención neutrales si ayudan, sin colores de acierto/error. Una intervención por vez, opciones cuando corresponde y segundo intercambio antes de converger. Mantener escena y personajes en proporciones del diseño aprobado; este rediseño no necesita rehacer arte ni agrandar consultorio.

No convertir las nueve conversaciones de ejemplo en un guion clínico. Evitar afirmaciones de deber legal concreto sobre confidencialidad; una revisión especializada independiente deberá evaluar realismo y sensibilidad antes de usarlo con estudiantes. La experiencia se presenta como ficción y reflexión sobre decisiones, no práctica clínica acreditada ni entrenamiento de predicción de violencia.

### Orden de producción recomendado

1. Contrato de datos v2, historial de eventos y conocimiento por actor; pruebas de transacciones y guardado.
2. Corte vertical S1–3 y retorno S8: comprobar diferencias reales, memoria y cuaderno sin saltos.
3. Modos emocionales y presentación no numérica; revisión de opciones automáticas de Julián.
4. S4–16 con registro de permisos, apoyos y promesas; guionizar microconversaciones faltantes sobre estas fichas.
5. Resolver cinco trayectorias/seis resultados, S17–18 y clímax jugables; fixtures de cobertura y desempate.
6. Lectura completa de seis recorridos, revisión de seguridad temática y pruebas de accesibilidad. Ajustar magnitudes recién después de observar recorridos, no inventar porcentajes clínicos.

No se propone generar automáticamente todo el guion desde perfiles. Los perfiles resuelven consistencia; las voces, los subtextos y los momentos incómodos necesitan escritura específica.
