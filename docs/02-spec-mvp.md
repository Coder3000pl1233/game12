# Especificación del MVP

**Proyecto:** *Fuera de sesión* (título provisional)  
**Tipo:** thriller psicológico narrativo para navegador  
**Estado:** definición de primera versión jugable  
**Idioma:** español rioplatense

## 1. Visión

El jugador interpreta a un psicólogo que atiende a Tomás, un paciente que dice que alguien entra a su departamento mientras duerme. En paralelo, Tomás expresa resentimiento hacia un antiguo compañero de trabajo, que luego desaparece. A través de sesiones, expedientes y noticias, el jugador decide qué explorar, qué creer y cómo actuar ante un riesgo incierto.

La tensión nace de interpretar información incompleta y convivir con las consecuencias de las decisiones. La historia tiene una solución autoral definida; las elecciones determinan qué se descubre y qué sucede después.

## 2. Objetivo del MVP

Comprobar que una historia breve con diálogo ramificado, variables invisibles, expediente y consecuencias fuera de sesión resulta atractiva y comprensible en web.

## 3. Público y plataforma

- Público inicial: personas interesadas en thrillers narrativos y juegos de decisiones.
- Plataforma: navegadores actuales en computadora y móvil.
- Sesión total objetivo: 20–30 minutos.
- Control principal: mouse o pantalla táctil; soporte de teclado.

## 4. Alcance

Incluye:

- Una historia autocontenida con un paciente central.
- Tres sesiones, con escenas intermedias fuera del consultorio.
- Aproximadamente 20–30 minutos de lectura y decisiones.
- Opciones de diálogo con efectos en confianza, ansiedad, hostilidad, riesgo y pistas.
- Indicadores visuales de vínculo, ansiedad e irritación que cambian tras las respuestas; muestran bandas cualitativas y tendencia, no puntajes clínicos ni cifras exactas. El riesgo narrativo permanece oculto.
- Expediente con resumen, pistas descubiertas e hipótesis/notas del jugador.
- Noticias, llamadas o mensajes que reflejan consecuencias.
- Cuatro desenlaces con condiciones narrativas distintas.
- Guardado y continuación local, reinicio y menú.
- Interfaz responsive, ambiente sonoro opcional y preferencias básicas.

Fuera del alcance:

- Campaña con varios pacientes jugables o múltiples capítulos.
- Sistema diagnóstico clínico, puntuaciones académicas o evaluación educativa formal.
- Juego multijugador, cuentas, sincronización entre dispositivos o backend.
- Investigación libre por escenarios explorables, inventario complejo o combate.
- Diálogos generados por IA, actuación de voz completa y cinemáticas extensas.
- Editor de historias para usuarios.

## 5. Premisa y verdad narrativa

Tomás afirma que alguien entra en su departamento cuando duerme y habla con rencor de un excompañero. El jugador puede considerar varias explicaciones: hay un intruso real, Tomás oculta algo, alguien intenta incriminarlo o el jugador está interpretando señales de forma sesgada.

Antes de escribir escenas finales, el equipo debe definir en una biblia de historia: qué ocurrió, quién sabe qué, cronología, pistas verificables, falsas pistas, motivaciones y causalidad de cada desenlace. Ninguna rama debe cambiar al culpable solo para sorprender al jugador.

## 6. Bucle principal

1. Revisar expediente y contexto de la sesión.
2. Leer y responder durante la entrevista.
3. Elegir una nota o hipótesis breve al cerrar la sesión.
4. Recibir una noticia, mensaje o llamada entre sesiones.
5. Tomar una decisión ética o práctica que afecte el siguiente encuentro.
6. Avanzar hasta una conclusión determinada por decisiones y pistas.

## 7. Principios de diseño

- La información se gana mediante preguntas y atención a detalles, no por adivinar una respuesta única.
- Las opciones expresan estrategias distintas y comprensibles, sin marcarse como buenas o malas.
- Los efectos pueden ser diferidos; una decisión puede cambiar la relación sin revelar el cambio con números.
- El jugador puede equivocarse razonablemente. La historia debe distinguir una sospecha de una prueba.
- La incertidumbre surge de secretos y circunstancias concretas, no de presentar un diagnóstico como señal de criminalidad.
- El tono es íntimo, tenso y contenido; la mayor parte de la experiencia ocurre en el consultorio.

## 8. Desenlaces objetivo

1. **Intervención a tiempo:** se evita el crimen y se descubre al responsable mediante suficientes pistas y una decisión oportuna.
2. **Verdad tardía:** el responsable queda expuesto, pero el daño ya ocurrió.
3. **Falsa acusación:** la interpretación sesgada lleva a señalar o perjudicar a un inocente y el riesgo escala.
4. **Ambigüedad:** se evita una muerte inmediata, pero quedan dudas sobre la explicación completa.

Cada final se activa por condiciones explícitas de historia. Debe ser posible alcanzar más de un final en una partida de prueba desde decisiones iniciales diferentes.

## 9. Experiencia y pantallas

- **Menú:** título, nueva partida, continuar si existe guardado, ajustes y créditos.
- **Sesión:** ambiente del consultorio, número de sesión, diálogo y opciones de respuesta.
- **Expediente:** hechos confirmados, frases recordadas, notas del jugador e hipótesis.
- **Intermedio:** noticia, llamada o mensaje con botón para continuar.
- **Cierre:** resultado narrativo y resumen de pistas/decisiones importantes; permite volver al menú o empezar otra vez.

La interfaz debe dar prioridad al texto, mantener visible quién está hablando y evitar mostrar variables ocultas como puntuaciones.

## 10. Contenido estimado

- 3 sesiones, cada una con 3–5 escenas.
- 2 intermedios fuera de sesión.
- 3–5 opciones en escenas de decisión clave.
- 8–12 pistas, clasificadas como observación, declaración o evidencia externa.
- 4 finales.
- Lectura aproximada de 2.500–4.000 palabras, ajustable durante pruebas de ritmo.

Estas cantidades son objetivos de producción; se pueden ajustar sin cambiar el alcance del MVP si se mantiene el recorrido completo y los cuatro tipos de desenlace.

## 11. Requisitos funcionales

- RF-01: iniciar una partida desde el menú.
- RF-02: mostrar escenas y opciones disponibles según condiciones del estado.
- RF-03: aplicar efectos a la relación, el riesgo y las pistas al elegir una respuesta.
- RF-04: registrar decisiones relevantes en el estado de partida.
- RF-05: abrir el expediente durante el juego y añadir/editar notas del jugador.
- RF-06: presentar intermedios y decisiones posteriores a cada sesión.
- RF-07: guardar automáticamente y restaurar la partida en el mismo navegador.
- RF-08: resolver uno de los finales definidos según condiciones narrativas.
- RF-09: reiniciar o reemplazar la partida con confirmación.
- RF-10: ajustar audio, tamaño de texto y movimiento si se incluyen efectos animados.

## 12. Requisitos no funcionales

- Debe adaptarse a pantallas desde móvil hasta escritorio.
- Debe poder completarse con mouse, tacto y teclado.
- La lectura debe ser cómoda: tipografía legible, ancho de línea razonable y contraste suficiente.
- Los recursos visuales y sonoros no deben ser requisito para entender una pista.
- El progreso se conserva localmente y no se envía a un servidor.
- Los errores de datos guardados deben ofrecer recuperación clara.

## 13. Indicadores de éxito del prototipo

Validar en sesiones informales con jugadores si:

- Pueden explicar qué está en juego y quiénes son los personajes principales.
- Comprenden por qué sus decisiones alteran la historia aunque no vean estadísticas.
- Identifican al menos dos interpretaciones posibles del caso antes del final.
- El ritmo mantiene interés durante 20–30 minutos.
- Pueden completar una partida sin instrucciones externas.

## 14. Criterios de aceptación

- Una partida nueva recorre las tres sesiones y llega a un final.
- Las decisiones dejan consecuencias observables en texto, pistas o escenas posteriores.
- Los cuatro desenlaces pueden alcanzarse bajo rutas narrativas definidas.
- Continuar recupera la última decisión persistida; nueva partida reemplaza el progreso solo tras confirmación.
- El expediente diferencia hechos, declaraciones y anotaciones del jugador.
- La experiencia funciona en móvil y escritorio sin controles inaccesibles.

## 15. Riesgos narrativos y mitigaciones

- **Ramas inmanejables:** concentrar variación en estado y escenas convergentes; ramificar profundamente solo en hitos.
- **Pistas injustas:** establecer antes la cronología y comprobar cada pista contra los finales.
- **Sensacionalismo clínico:** asociar el riesgo con contexto, conducta y decisiones concretas, no con etiquetas diagnósticas.
- **Exceso de lectura:** alternar diálogo con cambios breves de escena, llamadas y pistas visuales opcionales.
- **Guardar mal una ruta:** versionar estado y validar IDs de escena y pistas al cargar.
