# Prompt maestro para Codex

Quiero que implementes un videojuego web narrativo interactivo basado en los documentos de esta carpeta.

## Antes de escribir código
1. Lee todos los archivos `.md` de este paquete en el orden indicado por `00_START_HERE.md`.
2. Inspecciona el repositorio actual y reutiliza su stack, estructura, convenciones y componentes existentes.
3. No cambies nombres, hechos canónicos, estructura de actos, sesiones, personajes, misterios o finales salvo que exista una contradicción técnica real.
4. Si una decisión técnica no está especificada, elegí una solución simple, mantenible y data-driven.

## Prioridades
1. Motor narrativo basado en datos.
2. Estado persistente de variables/flags.
3. Sesiones con temas explorables.
4. Barra visible de Confianza.
5. Variables ocultas.
6. Cuaderno entre sesiones.
7. Consecuencias diferidas.
8. Bifurcación del Acto IV.
9. Guardado/carga.
10. Presentación visual.

## Arquitectura requerida
Separar:
- engine / state;
- content data;
- UI;
- persistence;
- route evaluation;
- notebook.

No hardcodear la historia dentro de componentes.

## Implementación incremental
### Fase 1
Implementar:
- shell del juego;
- estado global;
- sistema de sesión;
- sistema de escenas y choices;
- barra de Confianza;
- cuaderno;
- guardado local.

### Fase 2
Implementar Prólogo + Acto I completo.

### Fase 3
Acto II.

### Fase 4
Acto III.

### Fase 5
Acto IV + finales.

### Fase 6
Pulido, testing narrativo, accesibilidad y balance.

## Reglas no negociables
- No mostrar variables ocultas.
- No etiquetar rutas al jugador.
- No presentar decisiones como correctas/incorrectas.
- No incluir métodos ni detalles operativos de suicidio o violencia escolar.
- No convertir diagnósticos en explicación de violencia.
- Resolver el misterio no debe garantizar un final estable.
- Los finales deben depender de acumulación + bisagras.

## Entregable esperado de Codex
Antes de desarrollar el contenido completo, genera:
1. árbol de archivos propuesto;
2. modelo de datos final;
3. esquema de estado;
4. plan de implementación por fases;
5. lista de decisiones técnicas que asumiste.

Luego implementa la Fase 1 y detente al terminarla para revisión antes de cargar todo el contenido narrativo.
