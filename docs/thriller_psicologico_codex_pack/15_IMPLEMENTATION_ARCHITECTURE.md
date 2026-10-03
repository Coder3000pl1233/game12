# Implementación — Arquitectura de Fase 1

Este documento registra la arquitectura implementada antes de cargar diálogos y escenas. El contenido narrativo sigue gobernado por los documentos canónicos de este paquete.

## Árbol propuesto

```text
src/
  app/
    App.tsx                    # shell, composición de pantallas y estado de presentación
    story-shell.css            # tema visual del nuevo proyecto
  content/
    campaigns/                 # sesiones/escenas/hipótesis como datos; se completa después de revisar Fase 1
  features/
    story/
      types.ts                 # contratos de campaña, escena, elección y partida
      engine.ts                # transiciones, condiciones, efectos y evaluación provisional de rutas
      storage.ts               # lectura/escritura/versionado local
      engine.test.ts           # pruebas de reglas y aceptación narrativa (fase de contenido)
    notebook/                  # extraíble si el cuaderno crece más allá del shell actual
    accessibility/             # preferencias persistentes cuando se cierre el flujo visual
```

El repositorio ya usa React, TypeScript y Vite; no se agrega backend ni dependencia nueva. El antiguo contenido de `Fuera de sesión` queda fuera del flujo activo y no se usa como canon de esta historia.

## Modelo de datos

- `StoryCampaign`: metadatos, valores iniciales y límites, sesiones, escenas e hipótesis.
- `StorySession`: número, acto, título, escena de entrada, escenas disponibles y slots opcionales.
- `StoryScene`: identificador, sesión, clase visual, líneas tipadas por hablante/tono, temas y elecciones.
- `TopicDefinition`: etiqueta, umbral de Confianza, consumo de slot, condiciones y escena de destino.
- `StoryChoice`: condiciones, efectos, destino y marcador de decisión profesional importante.
- `StoryEffect`: delta acotado, flag, anotación de cuaderno o consecuencia diferida.
- `NotebookEntry`: pista, contradicción, observación o persona; el texto no se construye desde componentes.
- `HypothesisDefinition`: hipótesis y etiquetas de sesgo; activar otra conserva la anterior tachada.
- `StorySave`: estado serializable y versionado por campaña.

Todas las estadísticas usan escala `0..100` y se clamplean. `trust` es la única visible; el resto queda en estado interno y no se representa como puntuación clínica.

## Estado de partida

`StorySave` conserva campaña/fase/sesión/escena actuales; las 12 estadísticas del spec; flags; temas explorados; pistas, contradicciones, observaciones, personas y notas; hipótesis activas e historial; decisiones con escena/sesión/fecha; consecuencias diferidas; sesiones completadas y presión provisional de ruta. Los IDs de rutas no se presentan en UI.

Las consecuencias se guardan con una sesión de vencimiento y se aplican al completar la sesión previa al vencimiento. Los efectos y hechos narrativos siguen en datos; el motor solo interpreta contratos.

## Plan por fases

1. **Fase 1 — arquitectura y motor:** shell, tipos, estado serializable, motor de condiciones/temas/elecciones, Confianza, cuaderno, guardado local y evaluación provisional interna. Completa en este cambio; se detiene aquí para revisión.
2. **Fase 2:** prólogo y Acto I (sesiones 1–4), con pruebas del falso ensayo de confidencialidad y consecuencias diferidas.
3. **Fase 3:** Acto II (sesiones 5–10), pistas e interfaz data-driven de USB.
4. **Fase 4:** Acto III (sesiones 11–16), bisagras y supervisión/apoyo externo.
5. **Fase 5:** Acto IV, bifurcaciones, cuatro finales y resolución institucional común.
6. **Fase 6:** suite de aceptación, balance, accesibilidad, presentación y pulido.

## Decisiones técnicas asumidas

1. Mantener TypeScript estricto, React y Vite del proyecto; motor puro separado de React para poder probar rutas sin renderizar UI.
2. Persistir en `localStorage` con namespace y versión nuevos; no migrar ni borrar la partida del prototipo previo.
3. Modelar contenido en TypeScript para validación estática y esquema común, con diálogos fuera de componentes.
4. Usar el balance de `12_BALANCE_DEFAULTS.md` como configuración narrativa inicial, no como representación clínica.
5. Evaluar presión de rutas en el motor, sin exponer etiquetas, fórmulas ni umbrales al jugador.
6. No cargar una campaña temporal ni inventar diálogos para habilitar “Nueva partida” antes de revisar Fase 1. El adaptador visual está preparado, pero la campaña queda sin conectar.

## Estado de esta entrega

Las Fases 1–4 están implementadas: prólogo y Actos I–IV, con 18 sesiones, exploración de USB, progresión de variables y cuatro desenlaces resueltos por estado acumulado. La revelación de que la pelea de S02 fue una prueba queda reservada para S08; la autoría de Nico se confirma en S12. La lógica de rutas y las reglas narrativas principales cuentan con pruebas automatizadas. Pendiente: ampliar la suite de aceptación al diálogo completo, balancear mediante playtesting y pulir presentación/accesibilidad.
