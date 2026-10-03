# Acceptance Criteria

## Narrativa
- [ ] Las 18 sesiones pueden jugarse en orden sin contradicciones.
- [ ] S2 establece la pelea falsa sin revelar que es falsa.
- [ ] S8 revela retroactivamente la prueba de confidencialidad.
- [ ] Nico no puede ser confirmado como autor antes de S12.
- [ ] La USB no contiene una explicación total del misterio.
- [ ] Camila nunca aparece obligada a resolver el caso en persona.
- [ ] El misterio institucional queda prácticamente cerrado antes del Acto IV.
- [ ] Los cuatro finales son accesibles mediante acumulación de estado.

## Variables
- [ ] Solo Confianza es visible.
- [ ] Ninguna UI expone `hopelessness`, `hostility`, `isolation`, etc.
- [ ] Las decisiones bisagra tienen peso alto, pero no determinan solas el final.
- [ ] La ruta suicida puede terminar en supervivencia o muerte sin una elección final binaria.

## Cuaderno
- [ ] Solo disponible entre sesiones.
- [ ] Permite pistas, contradicciones, observaciones e hipótesis.
- [ ] Hipótesis equivocadas alteran opciones resaltadas, no hechos.
- [ ] Historial de hipótesis queda visible.

## Sesiones
- [ ] Confianza baja reduce cantidad/profundidad de temas.
- [ ] Confianza alta desbloquea revelaciones voluntarias.
- [ ] Algunas consecuencias se resuelven varias sesiones después.

## Acto IV
- [ ] Nunca se muestra el nombre interno de una ruta.
- [ ] El final de violencia no contiene detalles operativos de ataque.
- [ ] Los finales suicidas no muestran método ni acto.
- [ ] La investigación institucional sigue independientemente del final de Tomás.

## UX
- [ ] El jugador siempre puede distinguir diálogo, pensamiento de Julián y texto del cuaderno.
- [ ] Decisiones profesionales especialmente importantes pueden mostrar una advertencia neutra como “Esta decisión puede afectar la relación terapéutica”.
- [ ] No usar mensajes “correcto/incorrecto”.

## Rejugabilidad
- [ ] Es posible terminar una partida sin ver todas las pistas.
- [ ] Temas omitidos pueden cambiar la interpretación del jugador.
- [ ] Diferentes hipótesis producen distintas preguntas resaltadas.

## Testing narrativo mínimo
Crear tests automáticos para:
1. S2 → comunicar pelea → S8 revela traición.
2. S8 disculpa → desbloquea revelación del caso antiguo.
3. S12 nunca ocurre sin pistas previas de Nico.
4. S16 registra ambivalencia sin forzar ruta.
5. S17 puede redirigir solo si estado previo lo permite.
6. Ruta suicida + maternal_bond alto → supervivencia posible.
7. Ruta suicida + maternal_bond bajo → muerte posible.
8. Ruta violencia no puede mostrar contenido operativo.
9. Ruta salida siempre termina con cambio de escuela + otro terapeuta.
10. Todos los finales disparan resolución institucional.
