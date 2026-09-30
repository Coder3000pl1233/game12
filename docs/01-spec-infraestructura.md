# Especificación de infraestructura

**Proyecto:** thriller psicológico interactivo para web  
**Estado:** propuesta base para el MVP  
**Idioma de producto:** español (Argentina)  
**Fecha:** 2026-09-29

## 1. Propósito

Definir la infraestructura mínima para desarrollar, ejecutar y publicar una experiencia narrativa para un jugador. El juego se ejecuta en el navegador y guarda el progreso localmente. No requiere cuentas, servicios externos ni backend para el MVP.

## 2. Decisiones de arquitectura

- Aplicación web de página única (SPA), adaptable a escritorio y móvil.
- React y TypeScript para interfaz y lógica; Vite para desarrollo y compilación.
- CSS propio para la presentación visual, sin sistema de componentes obligatorio.
- Contenido narrativo separado del motor y almacenado en JSON/TypeScript validable.
- Estado de partida explícito, serializable y versionado.
- Persistencia local mediante `localStorage` para el MVP.
- Distribución como archivos estáticos en cualquier hosting compatible.

## 3. Vista lógica

```text
Navegador
├── Interfaz React
│   ├── Menú / juego / expediente / ajustes
│   └── Componentes de diálogo y navegación
├── Motor narrativo (puro, determinista)
│   ├── Resolver opciones y condiciones
│   ├── Aplicar efectos al estado
│   └── Resolver finales
├── Contenido del caso
│   ├── Escenas y opciones
│   ├── Condiciones y consecuencias
│   └── Recursos narrativos
└── Almacenamiento del navegador
    ├── Partida guardada
    └── Preferencias de presentación
          │
          └── Hosting estático (HTML, JS, CSS, imágenes y audio)
```

## 4. Tecnologías y versiones

Usar las versiones estables vigentes al iniciar la implementación y fijarlas en el lockfile del gestor de paquetes.

| Área | Elección | Responsabilidad |
|---|---|---|
| Lenguaje | TypeScript | Modelos de contenido, estado y motor |
| UI | React | Renderizar pantallas y responder a elecciones |
| Herramienta de desarrollo | Vite | Servidor local y compilación estática |
| Estilos | CSS | Diseño responsive, transiciones y accesibilidad visual |
| Contenido | JSON o módulos TypeScript | Escenas, opciones, condiciones y textos |
| Persistencia | `localStorage` | Guardar partida y preferencias en este dispositivo |
| Control de versiones | Git | Historial de cambios de código y contenido |

No se incorpora framework de servidor, base de datos, autenticación, analítica ni IA generativa en el MVP.

## 5. Entornos

- **Desarrollo:** ejecución local con Vite; contenido y partidas de prueba locales.
- **Revisión:** build estático publicado como preview para revisar narrativa y diseño.
- **Producción:** build estático publicado bajo HTTPS.

Los tres entornos usan el mismo artefacto de frontend. No hay secretos ni configuración de servidor que inyectar en el cliente.

## 6. Estructura de proyecto sugerida

```text
src/
  app/                 # composición de la aplicación y rutas/vistas
  components/          # piezas compartidas de interfaz
  features/
    narrative/         # tipos, motor, condiciones y resolución de escenas
    save/              # guardado, carga y migración de partida
    case-file/         # expediente, notas e hipótesis
  content/
    cases/             # definición del caso y escenas
  styles/              # tokens, estilos globales y responsive
  assets/              # retratos, sonido y recursos propios
  main.tsx
public/                # recursos estáticos servidos sin transformar
docs/                  # especificaciones de producto e implementación
```

## 7. Estado y persistencia

El estado de juego debe poder convertirse a JSON sin funciones ni referencias cíclicas. Como mínimo registra:

```ts
type SaveGame = {
  schemaVersion: number;
  caseId: string;
  sceneId: string;
  sessionNumber: number;
  hidden: {
    trust: number;
    anxiety: number;
    hostility: number;
    risk: number;
  };
  discoveredClues: string[];
  decisions: Array<{ choiceId: string; sceneId: string }>;
  notes: string[];
  updatedAt: string;
};
```

- Guardar después de cada decisión importante y al cerrar una sesión.
- Usar una clave con espacio de nombres, por ejemplo `fuera-de-sesion:save:v1`.
- Validar los datos al cargar; si son inválidos o de versión desconocida, informar y ofrecer empezar una partida nueva sin bloquear el menú.
- Incluir “Continuar”, “Nueva partida” y confirmación antes de reemplazar una partida existente.
- Permitir reiniciar la historia desde el menú.
- No guardar información personal real. Las notas son ficción del jugador dentro de la partida y permanecen en el dispositivo.

## 8. Contratos del motor narrativo

El motor recibe el estado actual, una escena y la opción seleccionada; devuelve el estado actualizado y el siguiente destino. Debe ser determinista: el mismo estado y elección producen el mismo resultado. Las condiciones y efectos se definen como datos y se limitan a operaciones permitidas (comparaciones, inclusión de pistas y cambios numéricos acotados), sin ejecutar código arbitrario desde el contenido.

Tipos conceptuales:

```ts
type Choice = {
  id: string;
  text: string;
  when?: Condition[];
  effects?: Effect[];
  nextSceneId: string;
};

type Scene = {
  id: string;
  session: number;
  speaker: string;
  text: string;
  choices: Choice[];
};
```

La historia mantiene una verdad narrativa autoral. El motor modifica acceso a información, relaciones y consecuencias; no genera hechos aleatorios que contradigan las pistas.

## 9. Requisitos de calidad

- Carga inicial ligera y funcionamiento sin conexión una vez cargados los recursos esenciales, salvo la primera visita.
- Diseño usable en móvil y escritorio; diálogos y opciones deben caber y poder desplazarse sin perder contexto.
- Navegación por teclado, foco visible, contraste legible y controles con nombres accesibles.
- Reducir o desactivar movimiento según la preferencia del sistema.
- No depender únicamente del color para comunicar estados.
- No enviar a terceros elecciones, notas, pistas ni estado de partida.
- Audio opcional y silenciado hasta que el jugador lo active.

## 10. Compilación y publicación

La compilación produce recursos estáticos en `dist/`. El hosting debe servir `index.html` para la ruta raíz y permitir fallback a ese archivo si luego se agregan rutas internas. Los nombres de recursos compilados deben incluir hash para caché; el HTML se sirve con revalidación para que nuevas versiones aparezcan.

Flujo de publicación: cambio en Git → revisión local → compilación → preview → publicación estática por HTTPS. La elección del proveedor de hosting queda abierta; no afecta la arquitectura.

## 11. Evolución posterior

Si se necesitan perfiles, partidas sincronizadas o edición docente colaborativa, añadir backend como una fase aparte. En ese caso habría que definir identidad, permisos, retención y tratamiento de datos antes de guardar información en servidor. Los datos de la fase actual no deben acoplar el motor a un proveedor concreto.

## 12. Criterios de aceptación de infraestructura

- El proyecto puede instalar dependencias, ejecutarse localmente y compilarse como sitio estático.
- El contenido del caso se mantiene separado de los componentes visuales.
- Una partida se serializa, se guarda, se restaura y se reinicia desde la UI.
- Una partida guardada inválida no deja la aplicación inutilizable.
- La aplicación no requiere red después de entregar sus recursos ni envía datos de juego a servicios externos.
