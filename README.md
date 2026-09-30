# Fuera de sesión

Base web del thriller psicológico interactivo. La aplicación usa React, TypeScript y Vite; no requiere backend.

## Requisitos

- Node.js 20.19+ (o 22.12+)
- npm

## Desarrollo

```sh
npm install
npm run dev
```

Vite informa la dirección local al iniciar.

## Compilación estática

```sh
npm run build
npm run preview
```

El sitio compilado queda en `dist/`. Los documentos de producto están en `docs/`.

## Recursos visuales y sonoros

Los retratos, escenas y sonidos se sirven desde `src/assets/`; la aplicación no descarga medios ni tipografías externas. La escena de consultorio tiene archivos separados para escritorio y móvil.

- Procedencia, prompts de arte y licencias: `src/assets/CREDITS.md`.
- El audio se generó proceduralmente desde `scripts/generate-audio-assets.mjs`. Para regenerarlo se necesita FFmpeg con soporte para libvorbis y libmp3lame; se puede pasar la ruta al ejecutable: `npm run assets:audio -- "C:/ruta/a/ffmpeg.exe"`.
- Para optimizar nuevos PNG de arte, prepará `neutral.png`, `uneasy.png`, `defensive.png`, `vulnerable.png` y `consultorio.png` en una carpeta, y ejecutá `node scripts/optimize-visual-assets.mjs <carpeta-de-origen>`.
