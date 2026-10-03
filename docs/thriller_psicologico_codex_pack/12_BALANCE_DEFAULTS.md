# Balance Defaults

Estos valores son **parámetros narrativos iniciales**, no modelos clínicos. Deben poder ajustarse durante playtesting sin reescribir contenido.

## Escala
Todas las variables numéricas usan rango `0..100` y deben clamp-earse al rango.

## Estado inicial sugerido
```text
trust = 35
isolation = 35
hopelessness = 20
hostility = 20
perceived_support = 35
autonomy = 40
maternal_bond = 55
external_support = 20
investigation_bias = 20
guilt = 50
perceived_injustice = 45
school_return_pressure = 0
```

## Slots de temas por confianza
- `trust 0–24`: 1 tema principal.
- `trust 25–49`: 2 temas.
- `trust 50–74`: 3 temas.
- `trust 75–100`: 3 temas + 1 tema/revelación opcional cuando exista contenido.

No todas las sesiones deben ofrecer cuatro temas; esta regla define el máximo accesible.

## Magnitud de efectos
Usar como convención:
- leve: `±3..5`
- moderado: `±6..10`
- fuerte: `±11..15`
- bisagra: `±16..22`

Evitar deltas mayores a 22 en una sola decisión salvo evento narrativo obligatorio.

## Efectos base importantes
### S02 — comunicar la pelea a padres
```text
trust -8
autonomy -5
```
El efecto completo se revela recién en S08.

### S04 — tratar a Tomás como sospechoso
```text
trust -7
investigation_bias +8
isolation +3
```

### S06 — investigar en lugar de escuchar
```text
trust -6
investigation_bias +10
perceived_support -4
```

### S07 — volver a involucrar a padres sin trabajar primero con Tomás
```text
trust -8
autonomy -10
isolation +6
```

### S08 — Bisagra 1
Disculpa sin justificación:
```text
trust +18
autonomy +6
perceived_support +6
investigation_bias -4
```

Justificación:
```text
trust -10
autonomy -4
```

Defensividad:
```text
trust -16
autonomy -8
perceived_support -6
```

### S10 — reducir autoculpabilización
```text
trust +10
perceived_support +10
guilt -12
```

Seguir investigando en ese momento:
```text
trust -7
investigation_bias +10
guilt +4
```

### S11 — priorizar investigación de Nico
```text
trust -8
investigation_bias +10
perceived_support -4
```

### S14 — preguntar qué quiere hacer Tomás
```text
trust +10
autonomy +14
perceived_support +8
```

### S15 — escuela minimiza + acusación pública
Evento obligatorio:
```text
isolation +12
hopelessness +12
hostility +10
perceived_injustice +12
```

### S16 — Bisagra 2
Explicar necesidad de apoyo externo con transparencia:
```text
perceived_support +12
autonomy +6
external_support +15
trust +4
```

Prometer no involucrar a nadie:
```text
trust +8
autonomy +3
external_support -12
hopelessness +4
flag therapist_unkeepable_promise = true
```

Actuar sin explicar:
```text
trust -18
autonomy -15
external_support +15
isolation +6
```

### Final Acto III
Regreso confirmado + minimización del padre:
```text
school_return_pressure +25
hopelessness +8
hostility +5
perceived_support -5
```

## Scores de ruta
Calcular al final de S16 y recalcular durante S17.

```text
exit_score =
  0.20 * trust +
  0.20 * autonomy +
  0.20 * perceived_support +
  0.15 * maternal_bond +
  0.15 * external_support +
  0.10 * (100 - isolation)

self_harm_score =
  0.25 * hopelessness +
  0.20 * isolation +
  0.15 * guilt +
  0.15 * school_return_pressure +
  0.15 * (100 - perceived_support) +
  0.10 * (100 - maternal_bond)

violence_score =
  0.25 * hostility +
  0.20 * isolation +
  0.15 * school_return_pressure +
  0.15 * perceived_injustice +
  0.15 * (100 - autonomy) +
  0.10 * (100 - perceived_support)
```

## Ambigüedad
Si los dos scores más altos están a menos de **8 puntos**, mantener la sesión ambigua y no fijar ruta hasta una decisión posterior de S17.

## Redirección hacia salida en S17
Una ruta peligrosa puede redirigirse si se cumplen **todas**:
```text
trust >= 50
perceived_support >= 48
autonomy >= 45
exit_score >= max(self_harm_score, violence_score) - 12
```

y el jugador explora ambas ideas:
1. no es obligatorio volver a la misma escuela;
2. resolver el caso no es responsabilidad personal de Tomás.

Si falla cualquiera, esas respuestas siguen siendo valiosas pero no borran el estado acumulado.

## Supervivencia en ruta suicida
Calcular al inicio del clímax:
```text
survival_network =
  0.45 * maternal_bond +
  0.20 * perceived_support +
  0.15 * autonomy +
  0.10 * external_support +
  0.10 * trust
```

Valor inicial recomendado:
- `>= 58`: variante supervivencia.
- `< 58`: variante muerte.

Este umbral debe balancearse con playtesting.

## Ruta de violencia
Si violencia domina tras S17 y no hubo redirección, la historia entra en el final trágico ya definido. Las elecciones del clímax pueden cambiar diálogo, comprensión y presentación de consecuencias, pero no convertir esa escena en un final estable.

## Regla de diseño
Nunca mostrar scores, fórmulas o thresholds al jugador.
