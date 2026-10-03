# Content Data Schema

Objetivo: separar contenido narrativo de lógica de juego para permitir editar sesiones sin tocar el motor.

## Entidades mínimas

### Session
Campos sugeridos:
```json
{
  "id": "S08",
  "act": 2,
  "title": "La prueba",
  "entry_conditions": [],
  "scenes": [],
  "notebook_unlocks": [],
  "end_flags": []
}
```

### Scene
```json
{
  "id": "S08_SC01",
  "session_id": "S08",
  "speaker_focus": "tomas",
  "lines": [],
  "choices": [],
  "conditions": []
}
```

### Choice
```json
{
  "id": "S08_C_APOLOGIZE",
  "text": "Lo manejé mal.",
  "conditions": [],
  "effects": {
    "trust": 15,
    "autonomy": 5
  },
  "set_flags": ["therapist_acknowledged_error"],
  "unlock": ["S08_REVEAL_FAKE_FIGHT"]
}
```

### Topic
```json
{
  "id": "TOPIC_EX_FRIEND",
  "label": "Santiago",
  "required_trust": 35,
  "consumes_topic_slot": true,
  "scenes": ["S05_TOPIC_SANTIAGO"]
}
```

### Clue
```json
{
  "id": "CLUE_SECOND_MESSAGE_PRIVATE_INFO",
  "title": "Dato privado en el segundo mensaje",
  "category": "messages",
  "confirmed": true,
  "session_found": "S05"
}
```

### Hypothesis
```json
{
  "id": "HYP_PATIENT_AUTHOR",
  "text": "Tomás podría estar detrás de los mensajes.",
  "status": "active",
  "bias_tags": ["suspect_tomas"]
}
```

### Flag
Usar flags para hechos discretos:
- `fake_fight_revealed`
- `anonymous_author_identified`
- `usb_opened`
- `full_evidence_acquired`
- `therapist_unkeepable_promise`
- `school_return_confirmed`

## Persistencia
Guardar:
- variables;
- flags;
- temas explorados;
- pistas;
- hipótesis;
- historial de hipótesis;
- sesión actual;
- decisiones importantes;
- ruta provisional.

## Regla de contenido
Nunca hardcodear texto crítico dentro de componentes UI. Mantener diálogos y decisiones en data files.

## Ruta provisional
El motor puede calcularla internamente, pero la UI nunca debe mostrar nombres de rutas.
