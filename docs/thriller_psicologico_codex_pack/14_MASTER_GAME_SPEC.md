# MASTER GAME SPEC — La Silla Vacía

Documento consolidado para consulta. Los archivos separados siguen siendo la fuente modular recomendada.


---

# SOURCE: 00_START_HERE.md

# START HERE — Thriller psicológico interactivo

## Objetivo
Implementar un videojuego web narrativo en el que el jugador controla a **Julián Rivas**, un psicólogo joven que atiende a **Tomás Ferreyra**, un adolescente de 17 años que sufre bullying y está vinculado a un caso escolar antiguo que fue encubierto.

La historia combina:
- thriller psicológico;
- misterio;
- decisiones de diálogo;
- confianza visible;
- variables emocionales ocultas;
- información incompleta;
- consecuencias diferidas;
- cuatro desenlaces principales.

## Regla narrativa central
Resolver el misterio **no equivale** a ayudar a Tomás.

Los Actos I–III recompensan al jugador por descubrir información. El Acto IV rompe esa lógica: una vez conocida la verdad, el problema central pasa a ser qué hizo Julián con la relación terapéutica y qué red de apoyo conserva Tomás.

## Orden recomendado de lectura
1. `01_GAME_OVERVIEW.md`
2. `02_CHARACTER_BIBLE.md`
3. `03_CANON_TIMELINE.md`
4. `04_VARIABLES_AND_BRANCHING.md`
5. `05_NOTEBOOK_SYSTEM.md`
6. `06_SESSION_SPEC_01_18.md`
7. `07_ENDINGS.md`
8. `08_CONTENT_AND_DIALOGUE_RULES.md`
9. `09_CONTENT_DATA_SCHEMA.md`
10. `10_ACCEPTANCE_CRITERIA.md`
11. `11_CODEX_MASTER_PROMPT.md`

## Restricciones narrativas
- No presentar ningún diagnóstico como causa automática de violencia.
- No convertir bullying → suicidio o bullying → violencia en una cadena causal simple.
- No incluir métodos, preparación operativa ni instrucciones de suicidio o violencia escolar.
- Las escenas críticas se narran desde señales, vínculo, consecuencias y decisiones; no desde detalles operativos.
- No existe una frase mágica que “salva” o “condena” a Tomás.
- Los finales peligrosos deben depender de acumulación de variables y decisiones bisagra.
- La historia no debe moralizar ni presentar finales como “bueno/malo”.

## Estructura macro
- **Prólogo**
- **Acto I — Confianza**: Sesiones 1–4
- **Acto II — Sospecha**: Sesiones 5–10
- **Acto III — Ruptura**: Sesiones 11–16
- **Acto IV — Desenlace**: Sesiones 17–18 + clímax + epílogo

## Finales
1. **Salida del conflicto**: cambia de escuela, entrega la evidencia y sigue con otro terapeuta.
2. **Supervivencia tras crisis suicida**: es localizado a tiempo, sobrevive y continúa con otro profesional.
3. **Muerte por suicidio**: final trágico, sin mostrar método ni acto.
4. **Violencia escolar trágica**: hay personas heridas; Tomás muere durante la intervención externa; no se muestran detalles operativos.


---

# SOURCE: 01_GAME_OVERVIEW.md

# Game Overview

## Título de trabajo
**La Silla Vacía**

El título es provisional, pero encaja con el motivo visual del consultorio y con el epílogo de las rutas trágicas.

## Género
Thriller psicológico interactivo / drama narrativo / misterio.

## Perspectiva
El jugador controla casi siempre a **Julián Rivas**, psicólogo de 28 años.

La información externa llega mediante:
- sesiones;
- llamadas;
- mensajes;
- reuniones con padres;
- comunicaciones de la escuela;
- documentos y pistas narrativas.

No se controla directamente a Tomás durante escenas críticas. Esto mantiene la incertidumbre del jugador alineada con la del psicólogo.

## Fantasía del jugador
No es “resolver un caso criminal”.

Es:
> escuchar, interpretar información incompleta, decidir límites, elegir qué priorizar y convivir con consecuencias que a veces aparecen varias sesiones después.

## Tema central
**Escuchar a una persona no es lo mismo que entender un caso.**

Temas secundarios:
- confianza;
- autonomía;
- culpa;
- límites profesionales;
- fallas institucionales;
- necesidad de justicia;
- aislamiento;
- incertidumbre;
- consecuencias no intencionales.

## Sensación buscada
El jugador debe preguntarse repetidamente:
- “¿Me está diciendo la verdad?”
- “¿Estoy ayudándolo o intentando resolverlo?”
- “¿Cuándo respetar su autonomía y cuándo involucrar a otros?”
- “¿Estoy leyendo una señal real o confirmando mi propia hipótesis?”

## Loop principal
1. Preparación entre sesiones.
2. Revisión de cuaderno.
3. Consulta con Tomás.
4. Elegir temas a explorar.
5. Tomar decisiones de diálogo.
6. Observar reacciones inmediatas.
7. Registrar pistas / hipótesis / observaciones.
8. Recibir consecuencias diferidas por mensajes, padres, escuela o próxima sesión.
9. Actualizar variables internas.

## Duración objetivo
Entre **4 y 7 horas** para una primera partida, dependiendo de velocidad de lectura y exploración.

La rejugabilidad viene de:
- temas no explorados;
- hipótesis distintas;
- confianza variable;
- rutas finales;
- información bloqueada o revelada en distinto orden.

## Actos
### Acto I — Confianza
El jugador intenta conseguir que Tomás hable. Primeras pruebas de confianza. Aparecen los mensajes anónimos.

### Acto II — Sospecha
Aparece Bruno, el caso antiguo, la falsa acusación, Camila, Lagos, Verónica y la USB.

### Acto III — Ruptura
Se descubre a Nico, se consigue la evidencia, el misterio institucional queda prácticamente resuelto y la relación terapéutica se deteriora / repara según decisiones.

### Acto IV — Desenlace
El misterio deja de importar como objetivo jugable principal. Lo importante es la red de apoyo, la autonomía y el estado acumulado de Tomás.


---

# SOURCE: 02_CHARACTER_BIBLE.md

# Character Bible

## Tomás Ferreyra — 17
Paciente central.

### Personalidad
- sarcástico;
- perceptivo;
- hostil cuando se siente controlado;
- capaz de mentir deliberadamente si siente que necesita probar a un adulto;
- emocionalmente agotado;
- conserva humor seco incluso en escenas tensas.

### Quiere al inicio
Determinar si Julián es diferente a los demás adultos.

### Sabe
- Camila nunca acusó a Bruno en los términos que circularon;
- Lagos la presionó;
- Santiago también fue testigo;
- escucharon a Lagos y Verónica hablar de haber “controlado” la situación;
- Bruno decía tener pruebas;
- conserva la USB de Bruno.

### Oculta progresivamente
- la prueba falsa de la pelea;
- el caso antiguo;
- la presencia de Santiago;
- la USB;
- identidad de Nico;
- pensamientos autodestructivos y fantasías de venganza.

### Contradicción central
Quiere que alguien actúe, pero cuando los adultos actúan sin consultarlo siente que pierde el control.

---

## Lic. Julián Rivas — 28
Psicólogo controlado por el jugador.

### Personalidad
- observador;
- tranquilo;
- curioso;
- algo rígido;
- teme parecer inexperto;
- le cuesta tolerar no saber.

### Defecto central
Confunde **comprender el caso** con **comprender al paciente**.

### Arco posible
Pasa de “tengo que entender todo para ayudarlo” a comprender que resolver el misterio no sustituye sostener el vínculo ni pedir apoyo profesional.

---

## Laura Ferreyra — 44
Madre de Tomás.

### Rasgos
- afectuosa;
- preocupada;
- ansiosa;
- puede volverse invasiva por miedo;
- es capaz de reconocer errores.

### Función narrativa
Es la red familiar más recuperable. Su vínculo con Tomás puede ser decisivo en la ruta suicida.

---

## Marcelo Ferreyra — 47
Padre de Tomás.

### Rasgos
- práctico;
- incómodo con lo emocional;
- minimiza;
- cree que endurecer a Tomás lo ayuda.

### Arco
Pasa de minimizar a controlar en exceso. Nunca llega a asumir por completo cuánto dañó esa postura.

---

## Santiago “Santi” Acosta — 17
Ex mejor amigo y principal figura del bullying.

### Historia
Fue muy cercano a Tomás. Compartieron el secreto del caso Bruno.

### Ruptura
- teme que salga el caso antiguo;
- Lagos tiene información con la que puede presionarlo;
- empieza a integrarse a otro grupo;
- usa a Tomás como blanco para encajar;
- termina participando activamente del hostigamiento.

### Quiere
Que el pasado permanezca enterrado.

---

## Nicolás “Nico” Vega — 17
Autor de mensajes y filtraciones.

### Historia
Fue cercano a Bruno. Se distanciaron antes de su muerte.

### Motivación
Culpa + resentimiento + una idea rígida de justicia.

### Creencia
Quienes actuaron mal y quienes sabían y callaron deben afrontar consecuencias.

### Función narrativa
Es un espejo posible de Tomás: convertir toda la vida en una misión de hacer pagar a otros.

---

## Bruno Salvatierra — 16 al morir
Estudiante fallecido.

### Regla narrativa
No debe existir solo como “víctima”. La USB debe mostrar humor, intereses, amistades, contradicciones y momentos cotidianos.

### Historia
Fue señalado falsamente como autor de una violación que Camila nunca denunció en esos términos. Reunió material porque sabía que el caso estaba siendo manipulado. Habló con Tomás, Santiago y Nico en distintos momentos. Murió por suicidio.

### Importante
La historia nunca establece una causa única para su muerte.

---

## Camila Torres — 17
Ex estudiante.

### Historia
Intentó hablar sobre conductas inapropiadas de Lagos hacia ella. Su relato fue manipulado. Se fue de la escuela por decisión propia.

### Regla
No regresa físicamente para “resolver” el misterio. Su declaración aparece mediante terceros durante la investigación externa.

---

## Prof. Esteban Lagos — 42
Docente implicado.

### Rasgos
- reputación de profesor exigente;
- controla narrativas;
- usa su posición para intimidar;
- tuvo conductas inapropiadas documentadas con estudiantes.

### Motivación
Proteger su posición y evitar consecuencias.

---

## Verónica Arce — 52
Autoridad escolar.

### Historia
Conocía antecedentes sobre Lagos. Ayudó activamente a suavizar, modificar y alterar registros para protegerse y proteger a la institución.

### Motivación
No solo protege a Lagos; se protege a sí misma y a la escuela.

---

## Lic. Marina Salas — 39
Supervisora/colega de Julián.

### Función
Representa la ayuda profesional disponible que Julián decide no usar durante demasiado tiempo.

### Personalidad
- experimentada;
- directa;
- no paternalista;
- nunca trata a Julián como incompetente.


---

# SOURCE: 03_CANON_TIMELINE.md

# Canon Timeline

## Antes del juego
1. Tomás y Santiago son mejores amigos.
2. Camila intenta hablar sobre conductas inapropiadas de Lagos.
3. Lagos presiona y reformula su relato.
4. Tomás y Santiago presencian parte de la presión.
5. Verónica, que conoce antecedentes previos, colabora en el encubrimiento.
6. Empieza a circular que Bruno violó a Camila; ella nunca hizo esa acusación en esos términos.
7. Bruno reúne correos, mensajes, capturas y contradicciones.
8. Bruno habla con Nico; eran cercanos, aunque la relación ya se deterioraba.
9. Bruno pide ayuda a Tomás y Santiago; ellos dudan.
10. Tomás y Santiago escuchan a Lagos y Verónica hablar de haber “controlado la situación”.
11. Empiezan a creer que Bruno decía la verdad.
12. Bruno muere por suicidio antes de que vuelvan a hablar con él.
13. Camila deja la escuela por decisión propia.
14. Parte de la evidencia desaparece.
15. Tomás conserva una USB que Bruno le dejó y nunca abre.
16. Nico conserva mensajes y copias parciales.
17. Tomás quiere hablar; Santiago se niega.
18. La amistad Tomás–Santiago se deteriora.
19. Santiago se integra a otro grupo y empieza a burlarse de Tomás.
20. El bullying escala a hostigamiento presencial y digital.
21. Nico empieza a investigar el caso y desarrolla una lógica de “justicia” propia.

## Durante el juego
### Sesiones 1–4
Tomás prueba la confidencialidad; Julián habla con los padres; aparece resentimiento; Nico inicia los mensajes anónimos; Tomás es señalado como posible autor.

### Sesiones 5–7
Los mensajes conectan con el caso antiguo. Se introduce a Bruno. Nico publica información del pasado. Santiago confronta a Tomás y ambos pelean.

### Sesión 8
Tomás revela que la primera pelea era falsa y que la acusación contra Bruno no coincidía con lo ocurrido.

### Sesión 9
Se confirma que Santiago era el otro testigo; aparecen Camila, Lagos y Verónica; Bruno había pedido ayuda y decía tener pruebas.

### Sesión 10
Tomás abre la USB con Julián.

### Sesiones 11–12
Nico se acerca a Tomás y finalmente queda expuesto como autor anónimo.

### Sesión 13
Tomás finge alinearse con Nico para conseguir toda la evidencia.

### Sesión 14
Santiago amenaza a Tomás; Tomás entrega el material a Julián.

### Sesión 15
La escuela vuelve a minimizar; Santiago instala que Tomás es el autor real; Tomás dice que hará algo por su cuenta.

### Sesión 16
Tomás admite ideas autodestructivas y fantasías de venganza; Julián promete no involucrar a nadie “por ahora”.

### Sesiones 17–18
El regreso a la escuela y la reacción del padre activan la bifurcación final.

## Resolución institucional
En todos los finales, la investigación externa termina confirmando:
- manipulación del relato de Camila;
- conductas inapropiadas documentadas de Lagos;
- alteración de versiones y documentos;
- participación activa de Verónica.

Camila declara mediante terceros. Nico entrega la evidencia y enfrenta consecuencias por amenazas y filtraciones. Santiago admite partes, pero nunca todo.


---

# SOURCE: 04_VARIABLES_AND_BRANCHING.md

# Variables y Branching

## Principio
No existe una elección única que determine un final.

Las rutas se forman mediante:
- variables acumuladas;
- decisiones bisagra;
- flags narrativos;
- disponibilidad de temas y respuestas;
- consecuencias diferidas.

## Variable visible
### `trust` — Confianza
Rango recomendado: 0–100.

Representa cuánto siente Tomás que puede hablar con Julián sin ser juzgado, usado, investigado o expuesto.

### Efectos jugables
- confianza baja: menos temas, respuestas breves, mentiras defensivas, cierres de sesión;
- confianza media: acceso normal;
- confianza alta: más temas, revelaciones voluntarias, posibilidad de reparación.

## Variables ocultas
### `isolation`
Aislamiento social y emocional.

Sube con:
- bullying;
- rumores;
- padres que presionan;
- pérdida de confianza;
- sentirse usado por Nico/Julián/Santiago.

Baja con:
- apoyo real;
- opciones de salida;
- vínculo madre-hijo;
- respeto por autonomía.

### `hopelessness`
Sensación de que ninguna acción va a cambiar nada.

Sube con:
- escuela minimizando;
- padre minimizando;
- acusaciones públicas;
- verdad conocida pero sin consecuencias visibles.

Baja con:
- investigación externa real;
- cambio de escuela posible;
- apoyo creíble;
- decisiones que devuelven agencia.

### `hostility`
Bronca dirigida hacia quienes Tomás percibe como responsables.

Sube con:
- hostigamiento;
- amenazas de Santiago;
- encubrimiento confirmado;
- falta de consecuencias.

Baja con:
- separación física del conflicto;
- apoyo;
- alternativas reales;
- cierre del vínculo con Santiago.

### `perceived_support`
Sensación subjetiva de que hay personas disponibles sin controlar ni abandonar.

### `autonomy`
Sensación de participar en decisiones que afectan su vida.

Baja cuando:
- Julián comunica cosas sin avisar;
- padres deciden todo;
- escuela impone sin escuchar;
- se promete algo y después se rompe sin explicación.

Sube cuando:
- se le consulta qué quiere;
- puede elegir temas;
- se transparentan límites;
- participa en decisiones sobre evidencia / cambio de escuela.

### `maternal_bond`
Calidad funcional del vínculo con Laura.

Es especialmente importante en la ruta suicida.

### `external_support`
Red de apoyo fuera del vínculo Julián–Tomás.

Incluye:
- supervisión;
- cambio de escuela;
- investigación externa;
- otros adultos confiables.

### `investigation_bias`
Variable del protagonista, no de Tomás.

Mide cuánto Julián convierte la terapia en investigación.

Afecta:
- qué opciones aparecen resaltadas;
- qué pistas se destacan;
- probabilidad de preguntas sesgadas;
- riesgo de perder el foco en Tomás.

### `guilt`
Culpa de Tomás respecto a Bruno y Santiago.

### `school_return_pressure`
Presión específica vinculada al regreso a la escuela en Acto IV.

## Decisiones bisagra
### Bisagra 1 — Sesión 8
Tomás revela que la pelea era falsa.

Respuesta de Julián:
- disculpa sin justificarse → fuerte recuperación de confianza;
- justificación → deterioro;
- defensividad → deterioro grave.

### Bisagra 2 — Sesión 16
Tomás admite ideas autodestructivas y fantasías de venganza.

La forma en que Julián maneja apoyo externo, límites y promesas afecta fuertemente autonomía, confianza y apoyo percibido.

### Bisagra 3 — Sesión 17
Julián puede introducir dos ideas:
1. volver a esa escuela no es inevitable;
2. resolver el caso no tiene que ser responsabilidad de Tomás.

Solo puede redirigir una ruta peligrosa si las variables previas todavía permiten reparación.

## Presiones de ruta
No usar estas fórmulas como verdad clínica; son lógica narrativa interna.

### Salida
Favorecida por:
- confianza;
- autonomía;
- apoyo percibido;
- vínculo con Laura;
- apoyo externo;
- posibilidad concreta de cambio de escuela.

### Crisis suicida
Favorecida por:
- desesperanza;
- aislamiento;
- culpa;
- baja percepción de apoyo;
- bajo vínculo con Laura;
- presión por volver.

### Violencia hacia otros
Favorecida por:
- hostilidad;
- aislamiento;
- injusticia percibida;
- presión por volver;
- bajo apoyo;
- baja autonomía.

## Regla de selección de ruta
1. Calcular presiones después de Sesión 16.
2. Sesión 17 modifica fuertemente dichas presiones.
3. La ruta dominante define variantes de S17/S18.
4. Si la ruta de salida supera umbral y hay confianza/apoyo suficientes, puede redirigir una ruta peligrosa.
5. Si dos rutas peligrosas están cercanas, mantener ambigüedad hasta S18.

## Regla para variante supervivencia / muerte en ruta suicida
El factor principal es `maternal_bond`, acompañado por `perceived_support`, `trust` y `autonomy` acumulados.

No existe una última opción binaria de salvar/morir.


---

# SOURCE: 05_NOTEBOOK_SYSTEM.md

# Cuaderno del Psicólogo

## Objetivo
El cuaderno es la principal interfaz de metacognición del jugador.

Debe permitir registrar:
- pistas;
- contradicciones;
- observaciones emocionales;
- personas mencionadas;
- hipótesis personales.

## Disponibilidad
Solo se puede revisar y editar **entre sesiones**.

Durante una sesión el jugador debe decidir con lo que recuerda y con lo que preparó previamente.

## Secciones
### 1. Pistas
Hechos observados o relatados.

Ejemplos:
- Tomás evita hablar de la escuela.
- Primer mensaje contiene información privada.
- “Algo viejo” conecta a Tomás y Santiago.
- Bruno decía tener pruebas.

### 2. Contradicciones
Ejemplos:
- versiones distintas de una ausencia;
- pelea inicial finalmente revelada como falsa;
- versión escolar vs. relato de Camila;
- documentos antiguos vs. finales.

### 3. Estado / vínculo
No son diagnósticos.

Etiquetas narrativas posibles:
- hostil;
- evasivo;
- agotado;
- irónico;
- desconectado;
- confiado;
- preocupado;
- ambivalente.

### 4. Hipótesis
El jugador puede seleccionar una hipótesis principal y varias secundarias.

Las hipótesis pueden estar equivocadas.

## Efecto de hipótesis
Una hipótesis activa puede:
- resaltar ciertas preguntas;
- hacer que determinadas pistas parezcan más relevantes;
- desbloquear preguntas sesgadas;
- ocultar visualmente preguntas alternativas detrás de un segundo nivel.

El juego nunca debe alterar hechos objetivos para acomodarse a la hipótesis.

## Historial
Cuando una hipótesis se corrige, la anterior queda tachada pero visible.

Ejemplo:
- “Tomás probablemente manda los mensajes.”
- “Evidencia insuficiente.”
- “Nico confirmado como autor.”

## Relación con confianza
Confianza baja puede impedir registrar algunas observaciones porque Julián no obtiene suficiente información.

Confianza alta puede desbloquear pistas voluntarias.

## Fin de acto
Al terminar cada acto, mostrar una pantalla de recapitulación con:
- hechos confirmados;
- hipótesis abiertas;
- contradicciones sin resolver.

Nunca mostrar variables ocultas.


---

# SOURCE: 06_SESSION_SPEC_01_18.md

# Session Spec — Sesiones 1 a 18

Este documento resume qué debe ocurrir en cada sesión, qué información puede obtenerse y qué decisión es más importante. Los diálogos definitivos pueden escribirse encima de esta estructura.

---

## PRÓLOGO
### Objetivos
- presentar a Julián;
- mostrar que tiene supervisión disponible;
- presentar a Laura y Marcelo;
- establecer madre preocupada / padre minimizador.

### Decisión menor
Julián puede priorizar escuchar a Tomás, profundizar cambios conductuales o investigar la escuela.

---

# ACTO I — CONFIANZA

## S01 — “¿Eso era todo?”
### Núcleo
Tomás llega furioso y obligado.

### Temas
- terapia;
- padres;
- escuela;
- últimos meses.

### Pistas
- evita escuela;
- pequeñas contradicciones;
- mide al psicólogo.

### Cierre
“¿Eso era todo?”

---

## S02 — “¿Qué pasa si te digo…?”
### Núcleo
Tomás inventa una pelea para probar confidencialidad y reacción.

### Temas
- padres;
- escuela;
- ex amigo;
- enojo.

### Decisión clave
Julián puede alarmarse, explorar o mostrarse demasiado neutro.

### Consecuencia diferida
Julián comunica la supuesta pelea a los padres.

---

## S03 — “Se van a arrepentir”
### Núcleo
Tomás vuelve cerrado después de descubrir que la información salió de consulta.

### Temas
- padres;
- escuela;
- pelea;
- confianza.

### Cierre
“Algún día se van a arrepentir de todo esto.”

### Cuaderno
Jugador decide si registra la frase como enojo, amenaza o significado incierto.

---

## S04 — “Ya decidiste que fui yo”
### Núcleo
Primer mensaje anónimo con dato privado. Compañeros señalan a Tomás.

### Temas
- mensaje;
- dato privado;
- Santiago;
- bullying.

### Cierre
“Sos igual que todos. Ya decidiste que fui yo.”

---

# ACTO II — SOSPECHA

## S05 — “Algo viejo”
Segundo mensaje con referencia del pasado.

Tomás admite que proviene de “algo viejo”.

Temas:
- segundo mensaje;
- Santiago;
- secreto antiguo;
- autor.

Julián presiona demasiado.

---

## S06 — “Ya pasó una vez”
Tomás llega furioso por rumores.

Introduce a Bruno:
“Ya pasó una vez.”

Julián convierte la revelación en investigación.

Tomás:
“No te lo conté para que investigues.”

---

## S07 — “Otra vez”
Antes de sesión:
- publicación sobre Bruno;
- Santiago confronta a Tomás;
- pelea mutua.

Tomás llega con marcas.

Julián vuelve a involucrar a los padres.

Consecuencia: presión familiar y caída de autonomía.

---

## S08 — “La prueba” — BISAGRA 1
Tomás confronta a Julián:
“¿Para qué querés que te cuente algo si después se lo decís a todos?”

Revela que la primera pelea era falsa.

Si Julián se disculpa sin justificarse, Tomás revela:
- Bruno fue falsamente señalado;
- Camila no acusó en esos términos;
- había otro testigo.

---

## S09 — “Controlaron la situación”
Se confirma que Santiago era el otro testigo.

Se revela:
- Lagos presionó a Camila;
- Tomás y Santiago escucharon a Lagos y Verónica;
- Bruno decía tener pruebas;
- Bruno pidió ayuda y ellos dudaron.

Julián vuelve a enfocarse demasiado en la evidencia.

---

## S10 — “La memoria”
Tomás revela la USB.

Mecánica especial de exploración de archivos:
- mensajes;
- correos;
- notas;
- capturas.

Aparece frase ambigua sobre personas que “estaban ahí”.

Tomás pasa de culpa a bronca hacia los adultos.

Julián puede ayudar a reducir autoculpabilización.

Cierre: nueva filtración contiene material similar a la USB.

---

# ACTO III — RUPTURA

## S11 — “El único que me entiende”
Nico se acerca como supuesto aliado.

Tomás:
“Es el único que parece entenderme.”

Julián puede explorar el vínculo o investigar a Nico.

Pista: Nico habla de Bruno con demasiada familiaridad.

---

## S12 — “Justicia”
Tomás observa a Nico y lo confronta.

Nico termina confesando:
- era cercano a Bruno;
- se distanciaron;
- siente culpa;
- es autor de mensajes y filtraciones;
- cree que Tomás y Santiago también merecen consecuencias.

Muestra mensajes y correos parciales.

Tomás no informa todavía a Julián.

---

## S13 — “Hacer justicia”
Tomás finge compartir la lógica de Nico para obtener todo el material.

Lo consigue.

Lo oculta a Julián porque teme que vuelva a actuar sin consultarlo.

---

## S14 — “No quiero destruirme para contarla”
Santiago amenaza ambiguamente a Tomás.

Tomás lleva la evidencia a Julián.

Se confirman:
- presión de Lagos;
- documentos contradictorios;
- antecedentes;
- intervención institucional.

Julián pregunta qué quiere hacer Tomás.

Tomás:
“Quiero que se sepa la verdad, pero no quiero ser yo el que tenga que destruirse para contarla.”

---

## S15 — “Entonces voy a hacer algo yo”
La escuela minimiza nuevamente.

Santiago instala públicamente que Tomás es el autor de todo.

Tomás pasa de derrota a bronca.

“Entonces voy a hacer algo yo.”

---

## S16 — “Desaparecer / hacerlos pagar” — BISAGRA 2
Tomás admite:
- a veces piensa en hacerse daño;
- otras veces fantasea con vengarse;
- le asustan esos pensamientos.

Julián considera apoyo externo.

Tomás se opone.

Línea canónica: Julián promete que “por ahora” no involucrará a nadie.

Cierre:
- regreso a escuela confirmado;
- Marcelo vuelve a minimizar.

---

# ACTO IV — DESENLACE

## S17 — “Volver” — BISAGRA 3
Inicio común:
- Tomás no quiere volver;
- padre lo acusa de escapar;
- Julián explora alternativas.

Si variables lo permiten, puede abrirse la idea:
- no volver a esa escuela;
- dejar que otros continúen el caso.

Después la sesión adopta una variante según ruta dominante.

### Variante salida
Tomás empieza a considerar “irse sin desaparecer”.

### Variante suicida
“Ya da igual.”
Se percibe como carga para los demás.

### Variante violencia
Habla de personas concretas y pregunta demasiado por el regreso.

---

## S18 — Variante salida
Laura ofrece cambio de escuela.
La investigación externa empieza.
Tomás acepta entregar evidencia y pide no ser informado salvo necesidad.

Después:
- última conversación con Santiago;
- última sesión con Julián;
- cambia de terapeuta.

---

## S18 — Variante suicida
Tomás está inusualmente calmado.
Discute por sentirse controlado.
Se despide de forma demasiado amable.
Después empieza a ordenar asuntos y desprenderse de algunas cosas.
Manda a Julián: “Gracias por la charla del otro día. Creo que estoy un poco mejor.”
Horas después desaparece el contacto.

Clímax:
- padre llama;
- Laura busca;
- Tomás responde solo a Laura.

Subruta supervivencia / muerte depende del vínculo acumulado con Laura y la red de apoyo.

---

## S18 — Variante violencia
Tomás pregunta por detalles del regreso.
Cuando Julián lo confronta:
“¿No eras vos el que decía que tenía que enfrentar las cosas?”

La bronca desaparece.
“Ya sé lo que tengo que hacer.”

Julián pregunta si piensa dañarse o dañar a alguien.
Tomás miente: “No.”

Al día siguiente Laura encuentra nota + cuaderno.
Tomás ya está en la escuela.

Clímax:
- incidente grave;
- personas heridas;
- Tomás llama a Julián;
- reproche final;
- intervención externa;
- Tomás muere.


---

# SOURCE: 07_ENDINGS.md

# Endings

## Final 1 — Salida del conflicto
### Requisitos narrativos
- suficiente confianza;
- autonomía moderada/alta;
- apoyo percibido;
- posibilidad de reparación en S17;
- cambio de escuela viable.

### Resolución
Tomás acepta cambiar de escuela y entrega evidencia a la investigación externa. Pide no recibir novedades salvo que sean necesarias.

Santiago lo busca. Conversación final tensa:
“Hay cosas que no te voy a perdonar. Pero tampoco quiero seguir odiándote.”

Última sesión con Julián:
“Al final no fue tan inútil.”

Tomás continúa con otro terapeuta.

Última imagen: entra a una nueva escuela como un estudiante más.

---

## Final 2 — Supervivencia tras crisis suicida
### Requisitos narrativos
Ruta suicida dominante + vínculo con Laura suficiente + red de apoyo no totalmente destruida.

### Clímax
Tomás desaparece y solo responde a Laura. Los mensajes son ambivalentes. Julián deja de intentar ser protagonista y ayuda a Laura a mantener el vínculo.

Laura se quiebra emocionalmente; no usa una frase mágica. Tomás continúa respondiendo y deja suficiente información indirecta para que puedan localizarlo.

No se muestran métodos ni detalles del acto.

### Epílogo
Tomás sobrevive y recibe apoyo fuera del vínculo con Julián. Semanas después tiene una última sesión con él y acuerdan continuar con otro profesional. También cambia de escuela.

---

## Final 3 — Muerte por suicidio
### Requisitos narrativos
Ruta suicida dominante + vínculo con Laura / apoyo / autonomía demasiado deteriorados.

### Clímax
La madre actúa de forma similar a la variante de supervivencia, pero la red acumulada ya no alcanza. Tomás deja de responder.

No se muestra el acto, método ni cuerpo.

### Epílogo
Corte temporal al consultorio. El jugador comprende gradualmente que Tomás murió.

Foco:
- Laura repasando decisiones;
- Marcelo enfrentando cuánto minimizó;
- Julián revisando control, investigación, promesas y distanciamiento.

Nunca se señala una única causa.

---

## Final 4 — Violencia escolar trágica
### Requisitos narrativos
Hostilidad, aislamiento, injusticia percibida y presión de regreso muy altas; apoyo y autonomía bajas; ruta no redirigida en S17.

### Clímax
Laura encuentra nota y cuaderno cuando Tomás ya entró a la escuela. Ocurre un incidente grave y hay personas heridas, algunas relacionadas con el bullying y otras no.

No se muestran preparación, armas, táctica ni detalles operativos.

Tomás llama a Julián.

Reproche:
“Cuando necesitaba que hicieras algo, no hiciste nada; cuando no quería que hicieras nada, te metiste en todo.”

Julián:
“Tenés razón en muchas cosas que decís sobre mí, pero esto no tiene que terminar así.”

Tomás:
“Ya es tarde.”

La llamada termina. Intervención externa. Tomás muere.

### Epílogo
Investigación externa continúa. Las víctimas y familias quedan con consecuencias irreversibles. Julián termina en el consultorio frente a la silla vacía.

---

# Regla común a todos los finales
El caso institucional se resuelve independientemente del destino de Tomás.

Se confirma:
- manipulación de Camila;
- conductas inapropiadas de Lagos;
- alteración de documentos;
- participación activa de Verónica.

Esto evita una lectura de “descubrir la verdad = salvar a Tomás”.


---

# SOURCE: 08_CONTENT_AND_DIALOGUE_RULES.md

# Reglas de contenido y diálogo

## Salud mental
- No usar diagnósticos como explicación automática de conductas violentas.
- No convertir síntomas en “pistas de criminalidad”.
- No presentar la terapia como una ciencia exacta.
- Julián puede equivocarse, dudar y pedir apoyo.
- El juego no es una guía clínica real.

## Suicidio
- No mostrar ni describir métodos.
- No mostrar preparación operativa.
- No presentar señales como checklist clínico para el jugador.
- Las señales narrativas deben estar contextualizadas dentro del personaje y su arco.
- No romanticizar la muerte.
- No tratar el suicidio de Bruno o Tomás como consecuencia de una sola causa.

## Violencia escolar
- No mostrar preparación, adquisición de armas, rutas, puntos vulnerables, tácticas ni ejecución detallada.
- El clímax se centra en:
  - información incompleta;
  - urgencia;
  - vínculo;
  - consecuencias;
  - intervención externa.

## Bullying
- Mostrar formas presenciales y digitales.
- Santiago no debe ser un villano plano.
- El bullying explica contexto y daño, no un destino inevitable.

## Diálogo
### Tomás
- sarcástico;
- respuestas cortas cuando desconfía;
- nunca habla como un manual psicológico;
- cuando confía, sigue sin volverse excesivamente explicativo.

### Julián
- profesional pero joven;
- preguntas claras;
- puede caer en interrogatorio cuando `investigation_bias` está alto;
- sus errores deben sentirse plausibles, no absurdos.

### Laura
- preocupación que puede sonar invasiva;
- evita discursos perfectos.

### Marcelo
- minimización cotidiana, no crueldad caricaturesca.

### Nico
- tono calmado;
- lógica moral rígida;
- nunca se describe a sí mismo como villano.

### Santiago
- defensividad y miedo;
- puede ser agresivo;
- no debe recibir una redención repentina.

## Consecuencias diferidas
Preferir consecuencias que aparezcan 1–4 sesiones después.

Ejemplo:
S2: Julián comunica la pelea.
S3: Tomás se cierra.
S8: se revela que la pelea era falsa y el jugador entiende el alcance real de S2.

## Evitar
- “respuesta correcta” marcada en verde;
- moralizar;
- puntuación de “buen terapeuta”;
- finales llamados bueno/malo;
- diagnósticos sorpresa;
- giro de “Tomás estaba loco todo el tiempo”.


---

# SOURCE: 09_CONTENT_DATA_SCHEMA.md

# Content Data Schema

Objetivo: separar contenido narrativo de lógica de juego para permitir editar sesiones sin tocar el motor.

## Entidades mínimas

### Session
Campos sugeridos:
```json
{
  "id": "S08",
  "act": 2,
  "title": "La prueba",
  "entry_conditions": [],
  "scenes": [],
  "notebook_unlocks": [],
  "end_flags": []
}
```

### Scene
```json
{
  "id": "S08_SC01",
  "session_id": "S08",
  "speaker_focus": "tomas",
  "lines": [],
  "choices": [],
  "conditions": []
}
```

### Choice
```json
{
  "id": "S08_C_APOLOGIZE",
  "text": "Lo manejé mal.",
  "conditions": [],
  "effects": {
    "trust": 15,
    "autonomy": 5
  },
  "set_flags": ["therapist_acknowledged_error"],
  "unlock": ["S08_REVEAL_FAKE_FIGHT"]
}
```

### Topic
```json
{
  "id": "TOPIC_EX_FRIEND",
  "label": "Santiago",
  "required_trust": 35,
  "consumes_topic_slot": true,
  "scenes": ["S05_TOPIC_SANTIAGO"]
}
```

### Clue
```json
{
  "id": "CLUE_SECOND_MESSAGE_PRIVATE_INFO",
  "title": "Dato privado en el segundo mensaje",
  "category": "messages",
  "confirmed": true,
  "session_found": "S05"
}
```

### Hypothesis
```json
{
  "id": "HYP_PATIENT_AUTHOR",
  "text": "Tomás podría estar detrás de los mensajes.",
  "status": "active",
  "bias_tags": ["suspect_tomas"]
}
```

### Flag
Usar flags para hechos discretos:
- `fake_fight_revealed`
- `anonymous_author_identified`
- `usb_opened`
- `full_evidence_acquired`
- `therapist_unkeepable_promise`
- `school_return_confirmed`

## Persistencia
Guardar:
- variables;
- flags;
- temas explorados;
- pistas;
- hipótesis;
- historial de hipótesis;
- sesión actual;
- decisiones importantes;
- ruta provisional.

## Regla de contenido
Nunca hardcodear texto crítico dentro de componentes UI. Mantener diálogos y decisiones en data files.

## Ruta provisional
El motor puede calcularla internamente, pero la UI nunca debe mostrar nombres de rutas.


---

# SOURCE: 10_ACCEPTANCE_CRITERIA.md

# Acceptance Criteria

## Narrativa
- [ ] Las 18 sesiones pueden jugarse en orden sin contradicciones.
- [ ] S2 establece la pelea falsa sin revelar que es falsa.
- [ ] S8 revela retroactivamente la prueba de confidencialidad.
- [ ] Nico no puede ser confirmado como autor antes de S12.
- [ ] La USB no contiene una explicación total del misterio.
- [ ] Camila nunca aparece obligada a resolver el caso en persona.
- [ ] El misterio institucional queda prácticamente cerrado antes del Acto IV.
- [ ] Los cuatro finales son accesibles mediante acumulación de estado.

## Variables
- [ ] Solo Confianza es visible.
- [ ] Ninguna UI expone `hopelessness`, `hostility`, `isolation`, etc.
- [ ] Las decisiones bisagra tienen peso alto, pero no determinan solas el final.
- [ ] La ruta suicida puede terminar en supervivencia o muerte sin una elección final binaria.

## Cuaderno
- [ ] Solo disponible entre sesiones.
- [ ] Permite pistas, contradicciones, observaciones e hipótesis.
- [ ] Hipótesis equivocadas alteran opciones resaltadas, no hechos.
- [ ] Historial de hipótesis queda visible.

## Sesiones
- [ ] Confianza baja reduce cantidad/profundidad de temas.
- [ ] Confianza alta desbloquea revelaciones voluntarias.
- [ ] Algunas consecuencias se resuelven varias sesiones después.

## Acto IV
- [ ] Nunca se muestra el nombre interno de una ruta.
- [ ] El final de violencia no contiene detalles operativos de ataque.
- [ ] Los finales suicidas no muestran método ni acto.
- [ ] La investigación institucional sigue independientemente del final de Tomás.

## UX
- [ ] El jugador siempre puede distinguir diálogo, pensamiento de Julián y texto del cuaderno.
- [ ] Decisiones profesionales especialmente importantes pueden mostrar una advertencia neutra como “Esta decisión puede afectar la relación terapéutica”.
- [ ] No usar mensajes “correcto/incorrecto”.

## Rejugabilidad
- [ ] Es posible terminar una partida sin ver todas las pistas.
- [ ] Temas omitidos pueden cambiar la interpretación del jugador.
- [ ] Diferentes hipótesis producen distintas preguntas resaltadas.

## Testing narrativo mínimo
Crear tests automáticos para:
1. S2 → comunicar pelea → S8 revela traición.
2. S8 disculpa → desbloquea revelación del caso antiguo.
3. S12 nunca ocurre sin pistas previas de Nico.
4. S16 registra ambivalencia sin forzar ruta.
5. S17 puede redirigir solo si estado previo lo permite.
6. Ruta suicida + maternal_bond alto → supervivencia posible.
7. Ruta suicida + maternal_bond bajo → muerte posible.
8. Ruta violencia no puede mostrar contenido operativo.
9. Ruta salida siempre termina con cambio de escuela + otro terapeuta.
10. Todos los finales disparan resolución institucional.


---

# SOURCE: 12_BALANCE_DEFAULTS.md

# Balance Defaults

Estos valores son **parámetros narrativos iniciales**, no modelos clínicos. Deben poder ajustarse durante playtesting sin reescribir contenido.

## Escala
Todas las variables numéricas usan rango `0..100` y deben clamp-earse al rango.

## Estado inicial sugerido
```text
trust = 35
isolation = 35
hopelessness = 20
hostility = 20
perceived_support = 35
autonomy = 40
maternal_bond = 55
external_support = 20
investigation_bias = 20
guilt = 50
perceived_injustice = 45
school_return_pressure = 0
```

## Slots de temas por confianza
- `trust 0–24`: 1 tema principal.
- `trust 25–49`: 2 temas.
- `trust 50–74`: 3 temas.
- `trust 75–100`: 3 temas + 1 tema/revelación opcional cuando exista contenido.

No todas las sesiones deben ofrecer cuatro temas; esta regla define el máximo accesible.

## Magnitud de efectos
Usar como convención:
- leve: `±3..5`
- moderado: `±6..10`
- fuerte: `±11..15`
- bisagra: `±16..22`

Evitar deltas mayores a 22 en una sola decisión salvo evento narrativo obligatorio.

## Efectos base importantes
### S02 — comunicar la pelea a padres
```text
trust -8
autonomy -5
```
El efecto completo se revela recién en S08.

### S04 — tratar a Tomás como sospechoso
```text
trust -7
investigation_bias +8
isolation +3
```

### S06 — investigar en lugar de escuchar
```text
trust -6
investigation_bias +10
perceived_support -4
```

### S07 — volver a involucrar a padres sin trabajar primero con Tomás
```text
trust -8
autonomy -10
isolation +6
```

### S08 — Bisagra 1
Disculpa sin justificación:
```text
trust +18
autonomy +6
perceived_support +6
investigation_bias -4
```

Justificación:
```text
trust -10
autonomy -4
```

Defensividad:
```text
trust -16
autonomy -8
perceived_support -6
```

### S10 — reducir autoculpabilización
```text
trust +10
perceived_support +10
guilt -12
```

Seguir investigando en ese momento:
```text
trust -7
investigation_bias +10
guilt +4
```

### S11 — priorizar investigación de Nico
```text
trust -8
investigation_bias +10
perceived_support -4
```

### S14 — preguntar qué quiere hacer Tomás
```text
trust +10
autonomy +14
perceived_support +8
```

### S15 — escuela minimiza + acusación pública
Evento obligatorio:
```text
isolation +12
hopelessness +12
hostility +10
perceived_injustice +12
```

### S16 — Bisagra 2
Explicar necesidad de apoyo externo con transparencia:
```text
perceived_support +12
autonomy +6
external_support +15
trust +4
```

Prometer no involucrar a nadie:
```text
trust +8
autonomy +3
external_support -12
hopelessness +4
flag therapist_unkeepable_promise = true
```

Actuar sin explicar:
```text
trust -18
autonomy -15
external_support +15
isolation +6
```

### Final Acto III
Regreso confirmado + minimización del padre:
```text
school_return_pressure +25
hopelessness +8
hostility +5
perceived_support -5
```

## Scores de ruta
Calcular al final de S16 y recalcular durante S17.

```text
exit_score =
  0.20 * trust +
  0.20 * autonomy +
  0.20 * perceived_support +
  0.15 * maternal_bond +
  0.15 * external_support +
  0.10 * (100 - isolation)

self_harm_score =
  0.25 * hopelessness +
  0.20 * isolation +
  0.15 * guilt +
  0.15 * school_return_pressure +
  0.15 * (100 - perceived_support) +
  0.10 * (100 - maternal_bond)

violence_score =
  0.25 * hostility +
  0.20 * isolation +
  0.15 * school_return_pressure +
  0.15 * perceived_injustice +
  0.15 * (100 - autonomy) +
  0.10 * (100 - perceived_support)
```

## Ambigüedad
Si los dos scores más altos están a menos de **8 puntos**, mantener la sesión ambigua y no fijar ruta hasta una decisión posterior de S17.

## Redirección hacia salida en S17
Una ruta peligrosa puede redirigirse si se cumplen **todas**:
```text
trust >= 50
perceived_support >= 48
autonomy >= 45
exit_score >= max(self_harm_score, violence_score) - 12
```

y el jugador explora ambas ideas:
1. no es obligatorio volver a la misma escuela;
2. resolver el caso no es responsabilidad personal de Tomás.

Si falla cualquiera, esas respuestas siguen siendo valiosas pero no borran el estado acumulado.

## Supervivencia en ruta suicida
Calcular al inicio del clímax:
```text
survival_network =
  0.45 * maternal_bond +
  0.20 * perceived_support +
  0.15 * autonomy +
  0.10 * external_support +
  0.10 * trust
```

Valor inicial recomendado:
- `>= 58`: variante supervivencia.
- `< 58`: variante muerte.

Este umbral debe balancearse con playtesting.

## Ruta de violencia
Si violencia domina tras S17 y no hubo redirección, la historia entra en el final trágico ya definido. Las elecciones del clímax pueden cambiar diálogo, comprensión y presentación de consecuencias, pero no convertir esa escena en un final estable.

## Regla de diseño
Nunca mostrar scores, fórmulas o thresholds al jugador.


---

# SOURCE: 13_UI_UX_SPEC.md

# UI / UX Spec

## Principio visual
Interfaz sobria, íntima y poco gamificada. La tensión debe venir del texto, silencios, información incompleta y cambios sutiles del entorno.

## Pantallas principales
### 1. Main Menu
- Continuar
- Nueva partida
- Cargar partida
- Ajustes
- Créditos

### 2. Act / Session Intro
Mostrar:
- Acto
- número de sesión
- título
- fecha relativa opcional

No mostrar objetivos ni ruta.

### 3. Consultorio
Elementos:
- Tomás / personaje frente a Julián;
- caja de diálogo;
- elecciones;
- selector de temas cuando corresponda;
- barra visible de Confianza, discreta;
- acceso bloqueado al cuaderno durante sesión.

### 4. Topic Selection
Mostrar 3–4 temas potenciales.
Los no disponibles por confianza pueden:
- no aparecer, o
- aparecer bloqueados solo cuando narrativamente tenga sentido.

Preferencia: no revelar explícitamente “requiere 50 de confianza”.

### 5. Interludios
Formatos:
- celular;
- llamada;
- reunión breve;
- pantalla de mensaje;
- comunicación escolar.

Mantener la perspectiva de Julián.

### 6. Cuaderno
Solo entre sesiones.
Tabs:
- Pistas
- Contradicciones
- Personas
- Hipótesis
- Historial

Todo dentro del mismo cuaderno; no crear un mapa de relaciones separado.

### 7. Fin de sesión
Flujo:
1. pequeña transición;
2. cuaderno;
3. selección/actualización de hipótesis;
4. guardado automático;
5. interludio si existe.

### 8. Fin de acto
Resumen de:
- hechos confirmados;
- contradicciones abiertas;
- hipótesis activas.

Nunca mostrar variables ocultas.

## Barra de Confianza
- visible;
- sin número exacto por defecto;
- usar segmentos o barra continua;
- cambios pequeños no necesitan animación llamativa;
- no usar rojo/verde para moralizar.

## Feedback de decisiones
### Normal
Solo reacción narrativa.

### Decisión profesional especialmente importante
Puede aparecer un aviso neutro:
> “Esta decisión puede afectar la relación terapéutica.”

No mostrar:
- +10 confianza;
- correcto;
- incorrecto;
- riesgo aumentado.

## Silencios
Los silencios son parte del lenguaje del juego.
Permitir:
- pausas antes de opciones;
- respuestas que tardan en aparecer;
- ausencia de música en sesiones importantes.

## Accesibilidad
- tamaño de texto configurable;
- velocidad de texto configurable;
- opción de mostrar texto instantáneamente;
- navegación completa con teclado;
- contraste suficiente;
- reducir animaciones;
- historial de diálogo de la sesión actual.

## Contenido sensible
Antes de nueva partida, mostrar aviso breve sobre:
- bullying;
- suicidio;
- violencia escolar;
- abuso de poder;
- acusaciones sexuales falsas/manipuladas.

Permitir salir al menú desde escenas sensibles sin penalización.
