# La Silla Vacía

Juego web de thriller psicológico narrativo, construido con React, TypeScript y Vite. El paquete de `docs/thriller_psicologico_codex_pack/` es la fuente del canon narrativo y de las reglas de campaña.

## Estado

- Motor de sesiones, escenas, condiciones, elecciones, variables y consecuencias diferidas: `src/features/story/`.
- Campaña completa (prólogo y sesiones 1–18, Actos I–IV): `src/content/campaigns/`.
- Persistencia local versionada, cuaderno y Confianza visible: shell de `src/app/`.
- Interfaz nocturna responsive con progreso por actos, contexto de sesión, retrato de Tomás, indicadores emocionales cualitativos, teléfono y ajustes sonoros/accesibles.
- Los cuatro desenlaces se resuelven a partir de variables acumuladas; S17 puede redirigir hacia la salida si se cumplen las condiciones narrativas.
- Pruebas de campaña, revelaciones y desenlaces: `tests/narrative.test.mjs` (`npm test`).
- Especificación de implementación: [`docs/thriller_psicologico_codex_pack/15_IMPLEMENTATION_ARCHITECTURE.md`](docs/thriller_psicologico_codex_pack/15_IMPLEMENTATION_ARCHITECTURE.md).

## Desarrollo

Requisitos: Node.js 20.19+ (o 22.12+) y npm.

```sh
npm install
npm run dev
```

## Compilación

```sh
npm run build
npm run preview
```

El sitio compilado queda en `dist/`. La infraestructura de publicación para Netlify está en `netlify.toml`.
