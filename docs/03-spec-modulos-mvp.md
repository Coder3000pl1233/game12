# Especificación de módulos del MVP

**Relación:** desglosa e implementa el alcance descrito en `02-spec-mvp.md` usando la infraestructura de `01-spec-infraestructura.md`.

## 1. Mapa de módulos

| Módulo | Responsabilidad | Depende de |
|---|---|---|
| Aplicación y navegación | Cambiar entre menú, juego, intermedio y cierre | UI, estado de partida |
| Motor narrativo | Resolver escenas, condiciones, elecciones y efectos | Modelo de contenido |
| Contenido del caso | Definir escenas, opciones, pistas y finales | Tipos narrativos |
| Sesión de diálogo | Presentar conversación y recoger elecciones | Motor, contenido |
| Expediente | Mostrar pistas y permitir notas/hipótesis | Estado de partida |
| Intermedios | Mostrar noticias, mensajes y decisión entre sesiones | Motor, contenido |
| Guardado local | Persistir, validar, cargar y reiniciar | Modelo de estado |
| Ajustes y accesibilidad | Controlar preferencias de lectura, audio y movimiento | UI |
| Cierre de historia | Presentar final y resumen de ruta | Motor, estado |
| Indicadores de sesión | Mostrar cambios cualitativos de vínculo, ansiedad e irritación tras responder | Estado y efectos de elección |

## 2. Modelo de contenido

### 2.1 Entidades

```ts
type CaseDefinition = {
  id: string;
  title: string;
  startSceneId: string;
  scenes: Record<string, Scene>;
  endings: Record<string, Ending>;
};

type Scene = {
  id: string;
  kind: "dialogue" | "interlude" | "decision" | "ending";
  session?: number;
  speaker?: string;
  text: string;
  clueIds?: string[];
  choices?: Choice[];
  nextSceneId?: string;
};

type Choice = {
  id: string;
  text: string;
  conditions?: Condition[];
  effects?: Effect[];
  nextSceneId: string;
  recordInCaseFile?: boolean;
};

type Condition =
  | { type: "statAtLeast"; stat: HiddenStat; value: number }
  | { type: "statAtMost"; stat: HiddenStat; value: number }
  | { type: "hasClue"; clueId: string }
  | { type: "hasDecision"; choiceId: string };

type Effect =
  | { type: "changeStat"; stat: HiddenStat; amount: number }
  | { type: "addClue"; clueId: string }
  | { type: "setFlag"; flag: string; value: boolean };

type HiddenStat = "trust" | "anxiety" | "hostility" | "risk";
```

Condiciones ausentes significan que la opción está disponible. Si ninguna opción condicional está disponible, el motor usa una salida de respaldo definida para esa escena o informa un error de contenido durante desarrollo; nunca deja al jugador sin poder avanzar.

### 2.2 Pistas

Cada pista tiene `id`, `title`, `text`, `sourceType` (`observation`, `statement`, `externalEvidence`) y `discoveredAt`. Una pista se añade una sola vez. El expediente muestra su fuente para separar lo observado de lo dicho por un personaje.

## 3. Especificación por módulo

### 3.1 Aplicación y navegación

**Responsabilidad:** definir el estado de pantalla y proporcionar navegación entre fases.

**Estados:** `menu`, `playing`, `interlude`, `ending`, `settings`.

**Acciones:** nueva partida, continuar, volver al juego desde el expediente, seguir al siguiente segmento, volver al menú, reiniciar.

**Reglas:** no perder estado al cambiar de pantalla; confirmar reemplazo de partida; si no existe guardado válido, ocultar “Continuar”.

### 3.2 Motor narrativo

**Responsabilidad:** ser la única autoridad para avanzar la historia y modificar estado.

**Operaciones:**

- `getScene(caseDefinition, sceneId)` obtiene escena o error de contenido.
- `getAvailableChoices(scene, save)` filtra las alternativas por condiciones.
- `applyChoice(scene, choice, save)` devuelve una copia actualizada del estado.
- `resolveEnding(caseDefinition, save)` selecciona final según reglas ordenadas y explícitas.

**Reglas:** cambios de variables dentro de límites definidos por caso; no mutar el estado anterior; almacenar elección y escena de origen; mantener orden de prioridad de finales documentado.

### 3.3 Contenido del caso

**Responsabilidad:** alojar textos y reglas del caso `fuera-de-sesion-01` fuera de los componentes.

**Requisitos editoriales:** todos los IDs son únicos; todas las referencias a escenas, pistas y finales existen; cada sesión puede terminar y conduce a la siguiente; no hay callejones sin salida; los requisitos de finales se pueden satisfacer.

**Entrega inicial:** prólogo, tres sesiones, dos intermedios, pistas y cuatro finales según las cantidades del MVP.

### 3.4 Sesión de diálogo

**Responsabilidad:** presentar la escena, identificar hablante y permitir elegir una respuesta.

**Elementos:** indicador discreto de sesión, nombre del hablante, texto de diálogo, opciones, control de continuar para escenas sin elección y acceso al expediente.

**Comportamiento:** desactivar doble selección mientras se aplica una elección; mover el foco al nuevo texto tras avanzar; dar feedback perceptible a lector de pantalla; no revelar las variables ocultas.

**Indicadores de sesión:** junto al diálogo, mostrar tres barras cualitativas: vínculo (confianza), ansiedad e irritación (hostilidad). Cada respuesta actualiza su nivel y muestra brevemente si subió, bajó o se mantuvo. Las barras no muestran números; usan niveles baja, media y alta. El riesgo narrativo no se representa en pantalla. Presentarlas como impresiones de la sesión, no como medición clínica ni diagnóstico.

### 3.5 Expediente

**Responsabilidad:** organizar lo que el jugador sabe y lo que sospecha.

**Secciones:** resumen, declaraciones, observaciones/evidencia, decisiones registradas, hipótesis y notas libres.

**Comportamiento:** separar claramente la procedencia de cada dato; permitir añadir, editar y borrar notas; conservarlas en el guardado; cerrar el panel y volver a la misma escena.

### 3.6 Intermedios

**Responsabilidad:** representar el paso del tiempo y comunicar repercusiones fuera de consulta.

**Contenido:** una noticia, llamada, mensaje o actualización de expediente por intermedio. Puede ofrecer opciones que afecten estado o siguiente escena.

**Reglas:** cada mensaje debe derivarse de estado o decisión previa; una noticia no debe certificar como hecho algo que la historia solo presenta como rumor; el jugador puede avanzar sin interacción externa.

### 3.7 Guardado local

**Responsabilidad:** ofrecer continuidad entre visitas en el mismo navegador.

**API interna:**

- `loadSave(): SaveGame | null`
- `writeSave(save: SaveGame): void`
- `deleteSave(): void`
- `validateSave(data: unknown): SaveGame | null`

**Reglas:** capturar errores de cuota o acceso y mostrar aviso; guardar después de elecciones y al actualizar notas; validar versión y referencias; reiniciar requiere confirmación.

### 3.8 Ajustes y accesibilidad

**Responsabilidad:** permitir lectura cómoda y controlar presentación opcional.

**Controles MVP:** tamaño de texto, audio ambiente activado/desactivado y movimiento reducido. Persistir preferencias aparte del progreso narrativo.

**Reglas:** audio apagado inicialmente; respetar `prefers-reduced-motion`; teclado puede enfocar y activar toda acción; foco visible y contraste legible.

### 3.9 Cierre de historia

**Responsabilidad:** cerrar la campaña con desenlace y resumen significativo.

**Contenido:** nombre del final, secuencia narrativa, pistas clave descubiertas y decisiones que llevaron a ese desenlace. No asigna calificación clínica ni afirma que una única opción era correcta.

**Acciones:** empezar de nuevo (confirmación), volver al menú.

## 4. Modelo de estado de partida

```ts
type SaveGame = {
  schemaVersion: number;
  caseId: string;
  sceneId: string;
  sessionNumber: number;
  hidden: Record<HiddenStat, number>;
  flags: Record<string, boolean>;
  discoveredClues: string[];
  decisions: Array<{
    choiceId: string;
    sceneId: string;
    timestamp: string;
  }>;
  notes: Array<{ id: string; text: string; updatedAt: string }>;
  updatedAt: string;
};
```

Los valores iniciales y los límites de variables se configuran en el caso, no en componentes de UI.

## 5. Flujo de datos principal

```text
Elección del jugador
  → Módulo de diálogo envía choiceId
  → Motor valida disponibilidad
  → Motor calcula efectos y destino
  → Guardado persiste el nuevo estado
  → Aplicación muestra escena/intermedio/final resultante
  → Expediente refleja pistas y decisiones nuevas
```

## 6. Manejo de errores de contenido

En desarrollo, validar al cargar el caso y reportar: IDs duplicados, escena destino inexistente, pista desconocida, condición inválida, escena sin salida y final inalcanzable por reglas estáticas. En producción, errores de contenido deben mostrar una pantalla recuperable con opción de volver al menú y conservar el guardado para diagnóstico local; no se debe enviar telemetría automáticamente.

## 7. Orden recomendado de implementación

1. Tipos y validador del contenido.
2. Estado de partida y motor narrativo mínimo.
3. Guardado local con validación.
4. Navegación, menú y escena de diálogo.
5. Expediente y notas.
6. Intermedios y reglas de finales.
7. Ajustes, accesibilidad y pulido visual.
8. Cargar el contenido completo y revisar manualmente las rutas.

## 8. Criterios de aceptación de módulos

- El motor resuelve escenas sin depender de React y produce el mismo resultado con la misma entrada.
- Contenido mal referenciado se detecta antes de que el jugador llegue a una pantalla bloqueada.
- El diálogo puede avanzar por elección y por continuación simple.
- Las barras de vínculo, ansiedad e irritación reflejan los efectos de las respuestas, ofrecen feedback accesible y no revelan el valor de riesgo.
- Las pistas aparecen con procedencia en el expediente.
- Notas, decisiones y estado oculto se restauran al continuar.
- El intermedio refleja al menos una diferencia causada por decisiones anteriores.
- Cada uno de los cuatro finales tiene condición verificable y una ruta documentada.
- La interfaz se puede usar sin ratón y en pantallas pequeñas.
