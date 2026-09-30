# Créditos y procedencia de recursos

## Arte

Los cinco originales visuales de esta primera pasada se generaron específicamente para *Fuera de sesión* con la herramienta de generación de imágenes de OpenAI. Los archivos WebP optimizados están dentro de esta carpeta. No se usaron fotos de personas reales ni recursos visuales externos.

Prompt base de Tomás: retrato vertical de un hombre argentino ficticio de unos 38 años, aspecto cotidiano y cansado, pelo oscuro ondulado corto, barba incipiente, campera de trabajo gris carbón y remera apagada; realismo pictórico cinematográfico, oficina desenfocada nocturna, luz ámbar de un lado y sombras azul grisáceas del otro, expresión reservada, sin señales de villanía.

Prompts de variantes: conservar identidad, rostro, edad aparente, pelo, ropa, encuadre e iluminación del retrato ancla; variar únicamente expresión y postura leve para representar incomodidad, defensividad contenida y vulnerabilidad reflexiva, sin dramatización.

Prompt de consultorio: interior modesto y vivido de un consultorio de Buenos Aires de noche, escritorio de madera, lámpara ámbar, puerta cerrada, ventana con lluvia y luces lejanas, composición panorámica con zona central poco cargada para texto, realismo pictórico, sin personas, texto ni pistas de la trama. `mobile.webp` es un recorte optimizado del mismo original panorámico.

Originales producidos el 2026-09-29. Los prompts completos y archivos fuente originales permanecen en el historial de generación de esta sesión; los WebP del proyecto son las versiones usadas por la aplicación.

## Audio

Los dos ambientes y cuatro efectos se sintetizan localmente a partir de señales y ruido deterministas mediante `scripts/generate-audio-assets.mjs`; no contienen samples de terceros ni música con derechos. Se distribuyen en Ogg Vorbis y MP3 de respaldo. El generador requiere un FFmpeg local con `libvorbis` y `libmp3lame`.

## Tipografías

No se empaquetan fuentes externas. La aplicación usa las pilas del sistema (`Georgia`, `Segoe UI` y `Consolas` con fallbacks genéricos), sujetas a las licencias del sistema operativo del usuario.
