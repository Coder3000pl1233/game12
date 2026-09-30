# Especificación de atmósfera visual y sonora

**Proyecto:** *Fuera de sesión*  
**Relación:** etapa estética posterior al MVP de `02-spec-mvp.md` y sus módulos en `03-spec-modulos-mvp.md`  
**Estado:** propuesta para producción visual y sonora  
**Idioma del producto:** español (Argentina)

## 1. Propósito

Definir una pasada de identidad visual y sonora para que el thriller se sienta más inmersivo y sus personajes tengan presencia, manteniendo la interfaz legible y funcional en escritorio y móvil.

Esta etapa trabaja sobre la presentación del juego existente: consultorio, retratos, ambiente, efectos de sonido, transiciones y ajustes. La revisión de trama, diálogos, pistas y ramificaciones queda para una etapa posterior.

## 2. Objetivos de experiencia

- Crear una atmósfera íntima, inquietante y contenida, sin recurrir a sobresaltos constantes.
- Darle a Tomás una presencia reconocible y coherente entre escenas.
- Usar sonido para reforzar cambios de espacio, tiempo y tensión.
- Mantener el texto y las decisiones como centro de la experiencia.
- Permitir jugar en silencio y con movimiento reducido sin perder información.
- Mantener todos los recursos dentro del proyecto; no depender de fuentes, imágenes ni audio remotos.

## 3. Dirección visual

### 3.1 Concepto

Realismo estilizado, nocturno y cálido-frío: paredes y sombras desaturadas, acentos ámbar de lámpara, negros suaves y pequeñas imperfecciones del espacio. El consultorio debe sentirse usado y creíble, no como un decorado de terror.

La tensión se transmite con encuadres, distancia, luz y cambios pequeños en el entorno. Evitar sangre, imágenes explícitas, glitches constantes y códigos visuales que sugieran que un diagnóstico identifica a una persona como peligrosa.

### 3.2 Paleta y materiales

- Base: carbón, gris cálido y marrón oscuro.
- Luz principal: ámbar tenue y localizada.
- Acento de interfaz: latón apagado, reservado para foco, metadatos y acciones destacadas.
- Contraste de texto: mantener lectura cómoda sobre fondos oscuros; el texto narrativo no debe usar el color de acento como único modo de énfasis.
- Texturas: grano fino, vidrio, papel, madera y metal envejecido, aplicados con moderación.

Los colores actuales de CSS son una base de prototipo. Los valores finales se consolidan como variables/tokens globales y se documentan para reutilizarlos.

### 3.3 Consultorio

Desarrollar un fondo/escena principal del consultorio con capas visuales que permitan pequeñas variaciones entre sesiones: lámpara, puerta, reloj, ventana o lluvia y objetos de escritorio. Los cambios deben ser sutiles y tener intención narrativa; no deben comunicar datos nuevos que la historia no haya establecido.

En escritorio, priorizar una composición amplia con personaje y texto claramente separados. En móvil, conservar el retrato en una banda compacta y llevar el diálogo y las opciones al primer plano, evitando que el fondo reduzca el área legible.

### 3.4 Personajes

Para el alcance de esta pasada se producen:

- **Tomás:** retrato base y cuatro estados visuales: neutral/reservado, incómodo, defensivo y vulnerable. Cambios controlados en postura, mirada e iluminación; mantener identidad, edad aparente, ropa y proporciones.
- **Psicólogo/jugador:** no requiere retrato. Puede representarse mediante el encuadre subjetivo y las opciones de diálogo.
- **Mauro y personajes secundarios:** no requieren retrato dentro de esta fase, salvo que una pantalla existente los presente directamente.

El retrato acompaña el estado observable de la escena; nunca revela valores ocultos como confianza o riesgo ni confirma culpabilidad. Las expresiones no deben usarse como sustituto de la información textual.

### 3.5 Tipografía y recursos

- Mantener una tipografía serif cómoda para diálogo y títulos, y una sans/monoespaciada para etiquetas breves.
- Empaquetar las fuentes con licencia de uso adecuada dentro de `src/assets/`; si no se incorpora una fuente, usar una pila de sistema intencional y documentada.
- Entregar imágenes en WebP/AVIF con fallback razonable, dimensiones y recorte previstos para escritorio y móvil.
- No usar imágenes externas, enlaces remotos ni fuentes remotas en producción.

## 4. Dirección sonora

### 4.1 Capas

Organizar el audio en buses independientes:

1. **Ambiente:** tono continuo y discreto del consultorio; variantes cortas para pasillo/intermedio si ayudan a ubicar el cambio de espacio.
2. **Efectos:** eventos puntuales, por ejemplo puerta, teléfono, notificación, vibración, reloj o movimiento de objetos.
3. **Voz:** queda reservado para una posible etapa posterior. No se grabará actuación de voz en esta fase.

La mezcla debe dejar siempre el diálogo en primer plano. Evitar música dramática permanente; si se agrega un motivo musical, debe ser escaso, muy bajo y no competir con la lectura.

### 4.2 Eventos y reglas de uso

| Evento de interfaz/historia | Sonido posible | Regla |
|---|---|---|
| Entrar por primera vez al juego | Activación gradual del ambiente | Solo tras una acción explícita del jugador |
| Avanzar entre sesiones | Cambio breve de ambiente | Sin fundido brusco ni incremento de volumen |
| Recibir un mensaje/noticia | Vibración o tono corto | Una sola vez por evento, sin sonido si el usuario lo silenció |
| Abrir/cerrar expediente | Papel o carpeta muy suave | Opcional; no sonorizar cada interacción de teclado |
| Cambio de retrato/estado | Sin efecto obligatorio | La actuación visual basta si el audio distrae |

No usar sonidos repentinos para sobresaltar ni sonidos que conviertan una inferencia del jugador en una falsa confirmación de culpabilidad.

### 4.3 Especificaciones de audio

- Formato principal: Ogg Vorbis; proveer MP3/AAC solo si pruebas en navegadores objetivo muestran una necesidad real.
- Audio mono para ambientes centrados y efectos puntuales; estéreo solo cuando la escena gane orientación espacial sin dificultar la escucha.
- Normalizar volumen percibido entre archivos y evitar clipping. Mantener margen de pico; ningún evento debe saltar notablemente por encima del ambiente.
- Guardar fuentes maestras editables fuera de los recursos compilados o en la carpeta de producción acordada; documentar procedencia y licencias.
- No descargar o reproducir audio hasta que el jugador active sonido, cumpliendo políticas de autoplay del navegador.

Los tamaños máximos se verifican al producir los archivos. Como objetivo inicial, ambiente en loop comprimido menor a 1 MB por variante y efectos individuales menores a 150 KB.

## 5. Movimiento y transiciones

- Transiciones cortas y lentas: fundidos, leve cambio de luz o profundidad, sin sacudidas ni flashes.
- Retrato: se permite variar encuadre/iluminación entre estados; evitar animación facial continua durante lectura.
- Fondo: movimiento casi imperceptible de lluvia, polvo o luz solo si no distrae.
- Efectos de entrada deben respetar `prefers-reduced-motion` y el ajuste manual de movimiento reducido.
- No destellar más de tres veces por segundo; preferentemente eliminar por completo destellos rápidos.
- Las transiciones no deben retrasar la activación de opciones ni bloquear el teclado.

### 5.1 Indicadores emocionales de la sesión

La pantalla de consulta incluye tres barras discretas: vínculo/confianza, ansiedad e irritación. Se actualizan después de cada respuesta, con una transición corta y una señal textual de tendencia (“subió”, “bajó” o “sin cambio”). Las barras comunican bandas cualitativas, no cifras exactas. No representar el riesgo del caso: ese dato se conserva en la lógica narrativa para no anticipar el desenlace.

El indicador debe leerse como una impresión narrativa del momento, no como una evaluación clínica objetiva. No usar verde/rojo como código moral; diferenciar las tres barras con etiquetas, iconografía simple y patrones/tonos compatibles con contraste. Con movimiento reducido, actualizar de inmediato y anunciar la tendencia con lector de pantalla.

## 6. Ajustes de presentación

Ampliar los ajustes existentes para incluir:

- Ambiente sonoro: activado/desactivado.
- Efectos de sonido: activados/desactivados.
- Volumen general y, si es simple de entender, volumen separado de ambiente y efectos.
- Tamaño de texto (normal/grande, conservando la opción existente).
- Reducir movimiento (conservar la opción existente y respetar preferencia del sistema).

El estado inicial de audio es apagado. Guardar estas preferencias localmente, separadas del progreso narrativo. Un control de silencio rápido puede quedar accesible durante el juego.

Si el audio se activa después de haber iniciado una partida, debe comenzar con un fundido breve y volumen bajo. El control de volumen debe tener etiqueta accesible y un valor legible para lectores de pantalla.

## 7. Arquitectura de recursos

Mantener los archivos fuente y el código de reproducción organizados por función. Estructura sugerida:

```text
src/assets/
  characters/tomas/
    neutral.webp
    uneasy.webp
    defensive.webp
    vulnerable.webp
  environments/consultorio/
    desktop.webp
    mobile.webp
  audio/ambience/
  audio/sfx/
```

El código debe usar un manifiesto tipado de recursos/eventos en vez de construir rutas con texto libre. El sistema de audio será un módulo reutilizable con carga bajo demanda, buses de volumen y limpieza al salir de la experiencia. No reproducir dos loops de ambiente a la vez; al cambiar de escena, fundir el anterior y el siguiente.

### 7.1 Nota sobre el prototipo actual

La versión actual sintetiza un tono tenue con Web Audio cuando se activa “Ambiente sonoro”. Esta especificación lo considera provisional. La pasada estética debe reemplazarlo por un loop de ambiente producido y añadir el bus de efectos con los controles definidos arriba.

## 8. Accesibilidad y comodidad

- Toda información transmitida por audio debe tener equivalente visual cuando afecte la comprensión de la escena.
- Toda variación visual importante debe poder comprenderse sin sonido.
- No depender solo de color, dirección del sonido, expresión facial o animación para comunicar un evento.
- Mantener subtítulos si más adelante se incorporan voces; identificar hablante y sonidos relevantes sin transcribir elementos decorativos.
- Proveer controles por teclado y foco visible para volumen, sonido y movimiento.
- Respetar silencio del sistema, preferencia `prefers-reduced-motion`, cambio de tamaño de texto y controles de audio del jugador.
- Mantener contraste y área táctil suficientes en escritorio y móvil.

## 9. Flujo de producción

1. Aprobar moodboard de consultorio, iluminación, paleta y aspecto de Tomás.
2. Producir retrato base y cuatro expresiones; revisar coherencia del personaje.
3. Diseñar y exportar escena del consultorio para escritorio/móvil.
4. Elegir/producir loop de ambiente y un conjunto pequeño de efectos prioritarios.
5. Integrar recursos detrás de un manifiesto y controles de audio.
6. Revisar escenas con audio apagado, solo ambiente y ambiente más efectos.
7. Ajustar niveles, transiciones, recortes y legibilidad en móvil.
8. Documentar licencias, fuentes, créditos y parámetros de mezcla.

## 10. Criterios de aceptación

- Tomás conserva identidad y vestuario en las cuatro expresiones; ninguna imagen revela información no disponible en la escena.
- El consultorio se ve coherente en escritorio y móvil, y el diálogo/opciones permanecen legibles en ambos.
- El ambiente y los efectos tienen controles independientes y empiezan apagados.
- Activar/desactivar sonidos no duplica loops ni deja audio reproduciéndose al salir o reiniciar.
- Los sonidos se cargan localmente y no se realizan solicitudes a servicios externos.
- Volumen y preferencias persisten tras recargar sin alterar la partida.
- Juego completo en silencio sigue siendo comprensible.
- Reducir movimiento elimina o reduce las transiciones animadas.
- No hay clipping, reproducción automática antes de interacción ni efectos abruptos que tapen texto.
- Se entrega una hoja de créditos/licencias para imágenes, audio y tipografías incorporadas.

## 11. Fuera del alcance de esta etapa

- Reescritura de la trama, revisión de diagnósticos o ajuste de desenlaces.
- Nuevos pacientes, capítulos o ramas narrativas.
- Voces, doblaje, sincronía labial o cinemáticas.
- Editor de retratos/sonido para docentes o usuarios.
- Migración a backend, telemetría o perfiles.

## 12. Entregables

- Guía breve de dirección de arte con paleta, encuadres, materiales y referencias aprobadas.
- Retratos de Tomás y variantes de expresión optimizados para web.
- Fondo/escena del consultorio adaptable a móvil y escritorio.
- Loop de ambiente y paquete inicial de efectos sonoros con fuentes y licencias registradas.
- Módulo de audio con buses, carga bajo demanda, fundidos y preferencias.
- Ajustes visuales integrados en la aplicación.
- Registro de revisión visual/sonora en pantallas de escritorio y móvil.
