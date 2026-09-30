import type { HiddenStat } from '../narrative/types'

type ObservableState = Pick<Record<HiddenStat, number>, 'trust' | 'anxiety' | 'hostility'>
type Props = { values: ObservableState; changes: Partial<Record<keyof ObservableState, number>> }

const indicators: Array<{ key: keyof ObservableState; label: string }> = [
  { key: 'trust', label: 'Vínculo' },
  { key: 'anxiety', label: 'Ansiedad' },
  { key: 'hostility', label: 'Irritación' },
]

function band(value: number) {
  if (value >= 4) return 'Alta'
  if (value >= 2) return 'Media'
  return 'Baja'
}

function trend(value: number | undefined) {
  if (value === undefined || value === 0) return { text: 'sin cambio', symbol: '—', className: 'steady' }
  if (value > 0) return { text: 'subió', symbol: '↑', className: 'up' }
  return { text: 'bajó', symbol: '↓', className: 'down' }
}

export function EmotionalMeters({ values, changes }: Props) {
  const changedLabels = indicators
    .filter(({ key }) => (changes[key] ?? 0) !== 0)
    .map(({ key, label }) => `${label} ${trend(changes[key]).text}`)

  return <section className="emotional-panel" aria-label="Indicadores de la sesión">
    <div className="emotional-panel__heading"><span>LECTURA DE LA SESIÓN</span><span>IMPRESIÓN CUALITATIVA</span></div>
    <div className="emotion-meters">{indicators.map(({ key, label }) => {
      const level = Math.max(0, Math.min(6, values[key]))
      const movement = trend(changes[key])
      return <div className="emotion-meter" key={key}>
        <div className="emotion-meter__labels"><span>{label}</span><span className="emotion-meter__band">{band(level)}</span></div>
        <div className="emotion-meter__track" role="meter" aria-label={label} aria-valuemin={0} aria-valuemax={6} aria-valuenow={level} aria-valuetext={`${band(level)}; ${movement.text}`}>
          <span className={`emotion-meter__fill emotion-meter__fill--${key}`} style={{ width: `${(level / 6) * 100}%` }} />
        </div>
        <div className={`emotion-meter__trend emotion-meter__trend--${movement.className}`} aria-hidden="true"><span>{movement.symbol}</span> {movement.text}</div>
      </div>
    })}</div>
    <p className="emotional-panel__disclaimer">Impresiones narrativas, no una evaluación clínica.</p>
    <p className="emotional-panel__note" role="status" aria-live="polite">
      {changedLabels.length ? `Después de tu respuesta: ${changedLabels.join(' · ')}.` : 'Las señales se actualizan con tus respuestas.'}
    </p>
  </section>
}
