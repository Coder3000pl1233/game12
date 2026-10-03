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
