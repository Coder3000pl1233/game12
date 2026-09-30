import type { Preferences } from '../narrative/types'

type Props = { preferences: Preferences; onChange: (value: Preferences) => void; onClose: () => void }

export function SettingsPanel({ preferences, onChange, onClose }: Props) {
  function update<K extends keyof Preferences>(key: K, value: Preferences[K]) {
    onChange({ ...preferences, [key]: value })
  }

  return <div className="overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className="settings-card" role="dialog" aria-modal="true" aria-labelledby="settings-title">
      <header className="drawer__head"><div><p className="eyebrow">PREFERENCIAS</p><h2 id="settings-title">Ajustes</h2></div><button className="icon-button" onClick={onClose} aria-label="Cerrar ajustes">×</button></header>
      <div className="setting-row"><div><strong>Tamaño del texto</strong><p>Elegí la lectura que te resulte más cómoda.</p></div><div className="segmented" role="group" aria-label="Tamaño del texto">
        <button aria-pressed={preferences.textScale === 'normal'} onClick={() => update('textScale', 'normal')}>Normal</button>
        <button aria-pressed={preferences.textScale === 'large'} onClick={() => update('textScale', 'large')}>Grande</button>
      </div></div>
      <label className="setting-row setting-row--toggle"><span><strong>Ambiente sonoro</strong><small>El consultorio o el pasillo. Empieza apagado.</small></span><input type="checkbox" checked={preferences.ambience} onChange={(event) => update('ambience', event.target.checked)} /></label>
      <label className="setting-row setting-row--volume"><span><strong>Volumen del ambiente</strong><small>{preferences.ambientVolume}%</small></span><input type="range" min="0" max="100" value={preferences.ambientVolume} onChange={(event) => update('ambientVolume', Number(event.target.value))} aria-label="Volumen del ambiente" /></label>
      <label className="setting-row setting-row--toggle"><span><strong>Efectos de sonido</strong><small>Puerta, teléfono y expediente. Empiezan apagados.</small></span><input type="checkbox" checked={preferences.effects} onChange={(event) => update('effects', event.target.checked)} /></label>
      <label className="setting-row setting-row--volume"><span><strong>Volumen de efectos</strong><small>{preferences.effectsVolume}%</small></span><input type="range" min="0" max="100" value={preferences.effectsVolume} onChange={(event) => update('effectsVolume', Number(event.target.value))} aria-label="Volumen de efectos" /></label>
      <label className="setting-row setting-row--toggle"><span><strong>Reducir movimiento</strong><small>Desactivar transiciones animadas.</small></span><input type="checkbox" checked={preferences.reducedMotion} onChange={(event) => update('reducedMotion', event.target.checked)} /></label>
      <button className="button button--primary settings-done" onClick={onClose}>Listo <span aria-hidden="true">↗</span></button>
    </section>
  </div>
}
