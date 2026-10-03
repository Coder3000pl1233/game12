import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { consultationRoomBackground, consultationRoomMobileBackground, tomasPortrait } from '../assets/asset-manifest'
import { useSoundscape } from '../features/settings/useSoundscape'
import { addNotebookNote, applyStoryChoice, completeStorySession, createInitialStorySave, evaluateCondition, exploreTopic, getAvailableStoryChoices, getAvailableTopics, getStoryScene, updateHypothesis, validateStoryCampaign } from '../features/story/engine'
import { laSillaVaciaCampaign } from '../content/campaigns/la-silla-vacia'
import { deleteStorySave, readStorySave, writeStorySave } from '../features/story/storage'
import type { StoryCampaign, StorySave, StatBlock } from '../features/story/types'
import type { Preferences } from '../features/narrative/types'
import './story-shell.css'

const campaign: StoryCampaign = laSillaVaciaCampaign
const campaignErrors = validateStoryCampaign(campaign)
const PREFERENCES_KEY = 'la-silla-vacia:preferences:v1'
type Panel = 'notebook' | 'settings' | 'warning' | 'phone' | 'info' | null
type InfoTopic = 'trust' | 'routes' | 'chapters' | 'notebook'
type EmotionalRead = { connection: number; unease: number; tension: number }
const defaultPreferences: Preferences = { textScale: 'normal', ambience: false, effects: false, ambientVolume: 22, effectsVolume: 36, reducedMotion: false }

function readPreferences(): Preferences {
  try {
    const stored = localStorage.getItem(PREFERENCES_KEY)
    return stored ? { ...defaultPreferences, ...JSON.parse(stored) as Partial<Preferences> } : defaultPreferences
  } catch { return defaultPreferences }
}

function emotionalRead(stats: StatBlock): EmotionalRead {
  return {
    connection: stats.trust,
    unease: (stats.isolation + stats.hopelessness) / 2,
    tension: (stats.hostility + stats.perceived_injustice) / 2,
  }
}

function emotionalChange(before: StatBlock, after: StatBlock): EmotionalRead {
  const a = emotionalRead(before)
  const b = emotionalRead(after)
  return { connection: b.connection - a.connection, unease: b.unease - a.unease, tension: b.tension - a.tension }
}

const acts = [
  { number: 1, title: 'Confianza', first: 1, last: 4 },
  { number: 2, title: 'Sospecha', first: 5, last: 10 },
  { number: 3, title: 'Ruptura', first: 11, last: 16 },
  { number: 4, title: 'Desenlace', first: 17, last: 18 },
]

function actProgress(save: StorySave | null, act: (typeof acts)[number]) {
  if (!save) return { percent: act.number === 1 ? 0 : 0, status: act.number === 1 ? 'Disponible' : 'Bloqueado' }
  const sessionIds = Object.values(campaign.sessions).filter((session) => session.number >= act.first && session.number <= act.last).map((session) => session.id)
  const completed = sessionIds.filter((id) => save.completedSessionIds.includes(id)).length + (save.phase === 'ending' && act.last === 18 ? 1 : 0)
  const current = campaign.sessions[save.currentSessionId]?.number ?? 0
  const currentInAct = current >= act.first && current <= act.last
  const prev = acts[act.number - 2]
  const previousComplete = act.number === 1 || !!prev && Object.values(campaign.sessions).filter((session) => session.number >= prev.first && session.number <= prev.last).every((session) => save.completedSessionIds.includes(session.id))
  const percent = Math.round((Math.min(act.last - act.first + 1, completed + (currentInAct && save.phase !== 'ending' ? 1 : 0)) / sessionIds.length) * 100)
  const status = completed === sessionIds.length ? 'Completado' : currentInAct || completed > 0 ? 'En curso' : previousComplete ? 'Disponible' : 'Bloqueado'
  return { percent, status }
}

export default function App() {
  const [save, setSave] = useState<StorySave | null>(() => readStorySave(campaign.id))
  const [screen, setScreen] = useState<'menu' | 'playing'>('menu')
  const [panel, setPanel] = useState<Panel>(null)
  const [infoTopic, setInfoTopic] = useState<InfoTopic>('trust')
  const [notice, setNotice] = useState('')
  const [noteDraft, setNoteDraft] = useState('')
  const [preferences, setPreferences] = useState<Preferences>(readPreferences)
  const [recentEmotionalChange, setRecentEmotionalChange] = useState<EmotionalRead>({ connection: 0, unease: 0, tension: 0 })
  const scene = useMemo(() => {
    if (!save) return null
    try { return getStoryScene(campaign, save.currentSceneId) } catch { return null }
  }, [save])
  const session = save ? campaign.sessions[save.currentSessionId] : null
  const activeSavedSession = save ? campaign.sessions[save.currentSessionId] : undefined
  const choices = scene && save ? getAvailableStoryChoices(scene, save) : []
  const topics = scene && save && session ? getAvailableTopics(campaign, scene, save, session) : []
  const nextSession = session ? Object.values(campaign.sessions).sort((a, b) => a.number - b.number).find((item) => item.number > session.number) : undefined
  const environment = scene?.kind === 'interlude' ? 'pasillo' : 'consultorio'
  const { playEffect } = useSoundscape(preferences, environment)

  useEffect(() => {
    try { localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences)) } catch { /* preferencias opcionales */ }
  }, [preferences])

  function persist(next: StorySave, previous?: StorySave) {
    if (previous) setRecentEmotionalChange(emotionalChange(previous.stats, next.stats))
    setSave(next)
    setNotice(writeStorySave(next) ? '' : 'No se pudo guardar en este navegador. El progreso sigue abierto en esta pestaña.')
  }
  function startNewGame() {
    if (save && !window.confirm('¿Reemplazar el progreso guardado de esta historia?')) return
    const next = createInitialStorySave(campaign)
    setRecentEmotionalChange({ connection: 0, unease: 0, tension: 0 })
    persist(next)
    setPanel(null)
    setScreen('playing')
    playEffect('door')
  }
  function continueGame() { setScreen('playing'); setPanel(null) }
  function choose(choiceId: string) {
    if (!save || !scene) return
    const choice = choices.find((item) => item.id === choiceId)
    if (!choice) return
    const next = applyStoryChoice(campaign, scene, choice, save)
    persist(next, save)
    if (campaign.sessions[next.currentSessionId]?.number > campaign.sessions[save.currentSessionId]?.number) playEffect('door')
    else if (/usb|file|document/i.test(choice.id)) playEffect('folder')
    else if (/message|phone|call|notification/i.test(choice.id)) playEffect('notification')
  }
  function openTopic(topicId: string) {
    if (!save || !scene) return
    const topic = topics.find((item) => item.id === topicId)
    if (!topic) return
    const next = exploreTopic(campaign, scene, save, topic)
    persist(next, save)
    if (topic.kind === 'document') playEffect('folder')
  }
  function continueSession() {
    if (!save || !nextSession) return
    const next = completeStorySession(campaign, save, nextSession.id)
    persist(next, save)
    playEffect('door')
  }
  function saveNote() {
    if (!save) return
    persist(addNotebookNote(save, noteDraft), save)
    setNoteDraft('')
  }
  function restart() {
    if (!window.confirm('¿Borrar el progreso guardado de esta historia?')) return
    deleteStorySave(campaign.id)
    setSave(null)
    setPanel(null)
    setScreen('menu')
  }
  function openInfo(topic: InfoTopic) { setInfoTopic(topic); setPanel('info') }
  function openNotebookFromMenu() {
    if (!save) { openInfo('chapters'); return }
    if (save.phase !== 'between_sessions') { openInfo('notebook'); return }
    setScreen('playing')
    setPanel('notebook')
  }

  if (campaignErrors.length) return <main className="fatal-error"><h1>Error de contenido</h1><ul>{campaignErrors.map((error) => <li key={error}>{error}</li>)}</ul></main>
  if (screen === 'menu' || !save || !scene || !session) return <main className={`story-app story-app--menu ${preferences.textScale === 'large' ? 'story-app--large' : ''} ${preferences.reducedMotion ? 'story-app--reduced-motion' : ''}`} style={{ '--room-background': `url(${consultationRoomBackground})`, '--room-mobile-background': `url(${consultationRoomMobileBackground})` } as CSSProperties}>
    <header className="story-header story-header--menu"><a className="story-mark" href="#inicio" aria-label="La Silla Vacía, inicio"><span>LSV</span><small>THRILLER PSICOLÓGICO</small></a><button className="story-text-button" onClick={() => setPanel('settings')}>Configuración <span aria-hidden="true">⚙</span></button></header>
    <div className="story-home-layout" id="inicio">
      <section className="story-home"><p className="story-eyebrow">UN JUEGO DE ELECCIONES, CONSECUENCIAS Y VERDADES INCÓMODAS</p><h1>La<br /><em>Silla</em><br />Vacía</h1><div className="home-rule" />
        <div className="story-actions story-actions--menu">{save && <button className="home-action home-action--featured" onClick={continueGame}><span className="home-action-icon">▶</span><span><strong>Continuar</strong><small>{campaign.sessions[save.currentSessionId]?.act ? `Acto ${campaign.sessions[save.currentSessionId].act} · Sesión ${campaign.sessions[save.currentSessionId].number}` : 'Retomar tu historia'}</small></span><b>›</b></button>}<button className="home-action" onClick={() => setPanel('warning')}><span className="home-action-icon">▢</span><span><strong>Nueva partida</strong><small>Comienza una nueva historia</small></span><b>›</b></button><button className="home-action" onClick={() => document.getElementById('act-progress')?.scrollIntoView({ behavior: preferences.reducedMotion ? 'auto' : 'smooth' })}><span className="home-action-icon">▤</span><span><strong>Capítulos</strong><small>Explora la historia y su progreso</small></span><b>›</b></button><button className="home-action" onClick={() => setPanel('settings')}><span className="home-action-icon">⚙</span><span><strong>Configuración</strong><small>Audio, pantalla y accesibilidad</small></span><b>›</b></button></div>
        <p className="home-quote">“A veces, lo más difícil de escuchar es lo que callan.”</p>
      </section>
      <aside className="home-sidebar">
        <section className="home-panel" id="act-progress"><PanelHeading title="Tu progreso" eyebrow="CAMPAÑA" />{acts.map((act) => { const progress = actProgress(save, act); return <div className={`act-progress act-progress--${progress.status === 'En curso' ? 'active' : progress.status === 'Completado' ? 'complete' : progress.status === 'Bloqueado' ? 'locked' : 'available'}`} key={act.number}><span className="act-status" aria-hidden="true">{progress.status === 'Completado' ? '✓' : progress.status === 'Bloqueado' ? '⌑' : progress.status === 'En curso' ? '◉' : '○'}</span><div className="act-progress-copy"><div className="act-progress-title">Acto {['I','II','III','IV'][act.number - 1]} — {act.title}</div><div className="act-progress-meta"><span>Sesiones {act.first}–{act.last}</span><span>{progress.status === 'Bloqueado' ? 'Bloqueado' : `${progress.percent}%`}</span></div><div className="progress-track"><span style={{ width: `${progress.percent}%` }} /></div></div></div> })}</section>
        <section className="home-panel home-current"><PanelHeading title="Tu partida actual" eyebrow="SEGUIR DONDE QUEDASTE" action={save ? continueGame : undefined} />{save && activeSavedSession ? <button className="current-save" onClick={continueGame}><span className="current-save-art" style={{ backgroundImage: `url(${consultationRoomMobileBackground})` }} /><span className="current-save-copy"><strong>{activeSavedSession.act ? `Acto ${['','I','II','III','IV'][activeSavedSession.act]} — ${acts[activeSavedSession.act - 1]?.title}` : 'Prólogo'}</strong><small>{activeSavedSession.number ? `Sesión ${activeSavedSession.number} · ${activeSavedSession.title}` : 'Antes de la primera sesión'}</small><span className="progress-track"><span style={{ width: `${Math.min(100, ((save.completedSessionIds.length + (save.phase === 'ending' ? 1 : 0)) / 18) * 100)}%` }} /></span></span></button> : <p className="home-empty">Tu próxima sesión aparecerá aquí cuando comiences la historia.</p>}{save && <div className="current-save-foot"><span>◷</span><span>Guardado automáticamente en este dispositivo</span></div>}</section>
      </aside>
    </div>
    <nav className="home-feature-cards" aria-label="Información del juego"><button className="feature-card" onClick={() => openInfo('trust')}><span className="feature-icon">◉</span><span><strong>Confianza</strong><small>Tus decisiones influyen en el vínculo.</small></span><b>›</b></button><button className="feature-card" onClick={openNotebookFromMenu}><span className="feature-icon">▤</span><span><strong>Cuaderno</strong><small>Revisa notas, hipótesis y pistas.</small></span><b>›</b></button><button className="feature-card" onClick={() => openInfo('routes')}><span className="feature-icon">⌘</span><span><strong>Rutas</strong><small>Una historia con múltiples desenlaces.</small></span><b>›</b></button></nav>
    <footer className="story-footer story-footer--menu"><span>LA SILLA VACÍA</span><span>UN JUEGO NARRATIVO · JULIÁN RIVAS / TOMÁS FERREYRA</span></footer>
    {panel === 'settings' && <SettingsDialog preferences={preferences} onChange={setPreferences} onClose={() => setPanel(null)} />}
    {panel === 'warning' && <ContentWarning onClose={() => setPanel(null)} onStart={startNewGame} />}
    {panel === 'info' && <InfoDialog topic={infoTopic} onClose={() => setPanel(null)} />}
  </main>

  const emotional = emotionalRead(save.stats)
  const actName = acts[session.act - 1]?.title ?? 'Prólogo'
  const filteredLines = scene.lines.filter((line) => !line.conditions || line.conditions.every((condition) => evaluateCondition(condition, save)))
  const completedSessions = Math.min(18, save.completedSessionIds.length + (save.phase === 'ending' ? 1 : 0))
  const unlockedProgress = Math.round((completedSessions / 18) * 100)

  return <main className={`story-app story-app--playing story-app--${scene.kind} ${preferences.textScale === 'large' ? 'story-app--large' : ''} ${preferences.reducedMotion ? 'story-app--reduced-motion' : ''}`} style={{ '--room-background': `url(${consultationRoomBackground})`, '--room-mobile-background': `url(${consultationRoomMobileBackground})` } as CSSProperties}>
    <header className="game-header">
      <button className="story-mark story-mark--button" onClick={() => { setScreen('menu'); setPanel(null) }} aria-label="Volver al menú"><span>LSV</span><strong>La <em>Silla</em> Vacía</strong></button>
      <div className="game-header-chapter"><span>ACTO {session.act ? ['','I','II','III','IV'][session.act] : '0'} — {actName}</span><small>{session.number ? `Sesión ${session.number} · ${session.title}` : 'Prólogo'}</small></div>
      <TrustMeter value={save.stats.trust} />
      <p className="header-quote">“A veces, lo más difícil<br />de escuchar es lo que callan.”</p>
    </header>
    {notice && <p className="story-save-notice" role="status">{notice}</p>}
    {scene.kind === 'ending' ? <section className="ending-layout"><p className="story-eyebrow">LA SILLA VACÍA · FINAL DE LA HISTORIA</p><div className="ending-sigil">FIN</div><h1>{scene.label}</h1><div className="ending-copy">{filteredLines.map((line, index) => <p className={`story-line story-line--${line.tone ?? 'dialogue'}`} key={`${scene.id}-${index}`}>{line.speaker && <span className="story-speaker">{line.speaker}</span>}{line.text}</p>)}</div><div className="ending-actions"><button className="story-primary" onClick={() => { setScreen('menu'); setPanel(null) }}>Volver al inicio <span>↗</span></button></div></section> : <>
      <div className="game-layout">
        <section className="game-main">
          <div className="scene-stage" style={{ backgroundImage: `linear-gradient(0deg, rgba(4,10,13,.93) 0%, rgba(4,10,13,.1) 66%), url(${consultationRoomBackground})` }}>
            {scene.kind !== 'interlude' && <div className="stage-character"><img src={tomasPortrait} alt="Tomás Ferreyra, sentado en el consultorio" /><div className="character-caption"><span>TOMÁS FERREYRA</span><small>17 AÑOS · PACIENTE</small></div></div>}
            <div className="stage-note"><span>CONSULTORIO · BUENOS AIRES</span><span>{session.number ? `SESIÓN ${String(session.number).padStart(2, '0')} / 18` : 'PRÓLOGO'}</span></div>
            <article className={`dialogue-box ${scene.kind === 'interlude' ? 'dialogue-box--interlude' : ''}`}>
              {scene.kind === 'interlude' && <p className="dialogue-eyebrow">{scene.label ?? 'ENTRE SESIONES'}</p>}
              <div className="dialogue-lines">{filteredLines.map((line, index) => <p className={`story-line story-line--${line.tone ?? 'dialogue'}`} key={`${scene.id}-${index}`}>{line.speaker && <span className="story-speaker">{line.speaker}</span>}{line.text}</p>)}</div>
            </article>
          </div>
          {topics.length > 0 && <div className="mobile-topic-list"><PanelHeading title="Temas para explorar" eyebrow="ELEGÍ POR DÓNDE SEGUIR" />{topics.map((topic) => <button className="topic-row" key={topic.id} onClick={() => openTopic(topic.id)}><span className="topic-marker">{topic.kind === 'document' ? '▤' : '○'}</span><span>{topic.label}</span><b>›</b></button>)}</div>}
          {choices.length > 0 && <div className="choice-area">
            <PanelHeading title={scene.kind === 'interlude' ? '¿Qué hace Julián?' : 'Elegí cómo responder'} eyebrow="TU DECISIÓN" />
            {scene.kind === 'interlude'
              ? <div className="choice-grid choice-grid--single">{choices.map((choice, index) => <ChoiceButton key={choice.id} choice={choice} index={index} onClick={() => choose(choice.id)} />)}</div>
              : <div className="choice-grid">{choices.map((choice, index) => <ChoiceButton key={choice.id} choice={choice} index={index} onClick={() => choose(choice.id)} />)}</div>}
          </div>}
          {save.phase === 'between_sessions' && choices.length === 0 && <div className="between-actions"><div><span className="story-eyebrow">CIERRE DE SESIÓN</span><p>Podés revisar tus notas antes de continuar.</p></div><button className="story-primary" onClick={continueSession}>{nextSession ? `Continuar · Sesión ${nextSession.number}` : 'Continuar'} <span>↗</span></button></div>}
        </section>
        <aside className="game-sidebar">
          <section className="sidebar-panel session-context"><PanelHeading title="Contexto de la sesión" eyebrow="EXPEDIENTE ACTIVO" action={() => openInfo('chapters')} /><p className="context-title">{session.title}</p><p className="context-copy">Julián Rivas · Tomás Ferreyra<br />Acto {session.act || 'Prólogo'} · Sesión {session.number || 'inicial'}</p><div className="context-meta"><span>PROGRESO DE HISTORIA</span><span>{unlockedProgress}%</span></div><div className="progress-track"><span style={{ width: `${unlockedProgress}%` }} /></div></section>
          <section className="sidebar-panel topic-panel"><PanelHeading title="Temas para explorar" eyebrow={topics.length && topics.every((topic) => topic.kind === 'document') ? 'ARCHIVOS DISPONIBLES' : 'A TU RITMO'} />{topics.length ? topics.map((topic) => <button className="topic-row" key={topic.id} onClick={() => openTopic(topic.id)}><span className="topic-marker">{topic.kind === 'document' ? '▤' : '○'}</span><span>{topic.label}</span><b>›</b></button>) : <p className="sidebar-empty">No hay temas abiertos en este momento. La conversación también puede quedarse en silencio.</p>}</section>
          <EmotionalPanel values={emotional} changes={recentEmotionalChange} />
          <nav className="sidebar-actions" aria-label="Herramientas de la sesión"><button onClick={() => setPanel('notebook')} disabled={save.phase !== 'between_sessions'}><span>▤</span><span><strong>Cuaderno</strong><small>{save.phase === 'between_sessions' ? 'Notas, hipótesis y pistas' : 'Disponible entre sesiones'}</small></span><b>›</b></button><button onClick={() => setPanel('phone')}><span>☏</span><span><strong>Teléfono</strong><small>Comunicaciones archivadas</small></span><b>›</b></button><button onClick={() => setPanel('settings')}><span>⚙</span><span><strong>Opciones</strong><small>Audio, pantalla y accesibilidad</small></span><b>›</b></button></nav>
          <button className="leave-link" onClick={() => { setScreen('menu'); setPanel(null) }}>← Volver al menú sin perder el progreso</button>
        </aside>
      </div>
      <footer className="game-footer"><span>NO HAY RESPUESTAS QUE NO DEJEN HUELLA.</span><span>GUARDADO AUTOMÁTICO · {completedSessions} SESIONES COMPLETADAS</span><button onClick={restart}>Reiniciar partida</button></footer>
    </>}
    {panel === 'notebook' && <NotebookPanel save={save} campaign={campaign} noteDraft={noteDraft} setNoteDraft={setNoteDraft} onSaveNote={saveNote} onChooseHypothesis={(id) => persist(updateHypothesis(save, id), save)} onClose={() => setPanel(null)} />}
    {panel === 'settings' && <SettingsDialog preferences={preferences} onChange={setPreferences} onClose={() => setPanel(null)} />}
    {panel === 'phone' && <PhonePanel save={save} onClose={() => setPanel(null)} />}
  </main>
}

function PanelHeading({ title, eyebrow, action }: { title: string; eyebrow?: string; action?: () => void }) {
  return <div className="panel-heading"><div>{eyebrow && <span className="panel-eyebrow">{eyebrow}</span>}<h2>{title}</h2></div>{action && <button className="panel-heading-action" onClick={action} aria-label={`Más información: ${title}`}>i</button>}</div>
}

function TrustMeter({ value }: { value: number }) {
  const description = value < 25 ? 'inicial' : value < 50 ? 'en desarrollo' : value < 75 ? 'sólida' : 'cercana'
  return <div className="trust-meter" role="img" aria-label={`Confianza ${description}`}><div className="trust-meter-icon">◉</div><div className="trust-meter-copy"><span>CONFIANZA</span><div className="trust-meter__track"><div style={{ width: `${value}%` }} /></div></div></div>
}

function ChoiceButton({ choice, index, onClick }: { choice: { id: string; text: string; importantDecision?: boolean }; index: number; onClick: () => void }) {
  return <button className={`story-choice ${choice.importantDecision ? 'story-choice--important' : ''}`} onClick={onClick}><span className="choice-number">{String(index + 1).padStart(2, '0')}</span><span className="choice-copy"><strong>{choice.text}</strong>{choice.importantDecision && <small>Esta decisión puede afectar la relación terapéutica.</small>}</span><b>↗</b></button>
}

function EmotionalPanel({ values, changes }: { values: EmotionalRead; changes: EmotionalRead }) {
  const readings: Array<{ key: keyof EmotionalRead; label: string }> = [{ key: 'connection', label: 'Vínculo' }, { key: 'unease', label: 'Inquietud' }, { key: 'tension', label: 'Tensión' }]
  const band = (value: number, key: keyof EmotionalRead) => key === 'connection' ? value < 30 ? 'distante' : value < 60 ? 'en desarrollo' : 'cercano' : value < 30 ? 'baja' : value < 60 ? 'presente' : 'intensa'
  return <section className="sidebar-panel emotional-panel"><PanelHeading title="Clima emocional" eyebrow="LECTURA NARRATIVA · NO CLÍNICA" />{readings.map(({ key, label }) => { const delta = changes[key]; return <div className="emotion-row" key={key}><div className="emotion-label"><span>{label}</span><span>{delta ? delta > 0 ? '↑ subió' : '↓ bajó' : band(values[key], key)}</span></div><div className="emotion-track" aria-hidden="true"><span className={`emotion-fill emotion-fill--${key}`} style={{ width: `${Math.max(4, Math.min(100, values[key]))}%` }} /></div></div> })}<p className="emotion-footnote">Las respuestas modifican cómo se siente la conversación; no son un diagnóstico.</p></section>
}

function SettingsDialog({ preferences, onChange, onClose }: { preferences: Preferences; onChange: (value: Preferences) => void; onClose: () => void }) {
  function update<K extends keyof Preferences>(key: K, value: Preferences[K]) { onChange({ ...preferences, [key]: value }) }
  return <div className="story-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="story-drawer story-settings" role="dialog" aria-modal="true" aria-labelledby="settings-title"><button className="story-close" onClick={onClose} aria-label="Cerrar configuración">×</button><p className="story-eyebrow">PREFERENCIAS</p><h2 id="settings-title">Configuración</h2>
    <label className="setting-row"><span><strong>Ambiente sonoro</strong><small>Consultorio y pasillo. Empieza apagado.</small></span><input type="checkbox" checked={preferences.ambience} onChange={(event) => update('ambience', event.target.checked)} /></label>
    <label className="setting-row setting-row--volume"><span><strong>Volumen del ambiente</strong><small>{preferences.ambientVolume}%</small></span><input type="range" min="0" max="100" value={preferences.ambientVolume} onChange={(event) => update('ambientVolume', Number(event.target.value))} aria-label="Volumen del ambiente" /></label>
    <label className="setting-row"><span><strong>Efectos de sonido</strong><small>Puerta, notificaciones y expediente.</small></span><input type="checkbox" checked={preferences.effects} onChange={(event) => update('effects', event.target.checked)} /></label>
    <label className="setting-row setting-row--volume"><span><strong>Volumen de efectos</strong><small>{preferences.effectsVolume}%</small></span><input type="range" min="0" max="100" value={preferences.effectsVolume} onChange={(event) => update('effectsVolume', Number(event.target.value))} aria-label="Volumen de efectos" /></label>
    <label className="setting-row"><span><strong>Texto grande</strong><small>Mejora la lectura de los diálogos.</small></span><input type="checkbox" checked={preferences.textScale === 'large'} onChange={(event) => update('textScale', event.target.checked ? 'large' : 'normal')} /></label>
    <label className="setting-row"><span><strong>Reducir movimiento</strong><small>Desactiva transiciones animadas.</small></span><input type="checkbox" checked={preferences.reducedMotion} onChange={(event) => update('reducedMotion', event.target.checked)} /></label>
    <button className="story-primary settings-done" onClick={onClose}>Listo <span>↗</span></button></section></div>
}

function ContentWarning({ onClose, onStart }: { onClose: () => void; onStart: () => void }) {
  return <div className="story-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="story-drawer story-warning" role="dialog" aria-modal="true" aria-labelledby="warning-title"><button className="story-close" onClick={onClose} aria-label="Cerrar aviso">×</button><p className="story-eyebrow">ANTES DE EMPEZAR</p><h2 id="warning-title">Aviso de contenido</h2><p>Esta historia contiene referencias a bullying presencial y digital, suicidio, violencia escolar, abuso de poder y manipulación de acusaciones sexuales. Los hechos críticos se narran sin métodos ni detalles operativos.</p><p>Es una ficción interactiva, no una guía clínica. Podés salir al menú entre escenas.</p><div className="story-warning-actions"><button className="story-secondary" onClick={onClose}>Volver</button><button className="story-primary" onClick={onStart}>Continuar <span>↗</span></button></div></section></div>
}

function InfoDialog({ topic, onClose }: { topic: InfoTopic; onClose: () => void }) {
  const content: Record<InfoTopic, [string, string]> = {
    trust: ['Confianza', 'La confianza refleja cómo evoluciona el vínculo entre Julián y Tomás. No es una nota ni una evaluación clínica; cambia con lo que Julián hace y con lo que Tomás decide compartir.'],
    routes: ['Rutas', 'La historia contempla distintos desenlaces. Se forman a lo largo de las sesiones mediante decisiones, vínculos y apoyos; ninguna respuesta aislada determina el final.'],
    chapters: ['Capítulos', 'La campaña tiene cuatro actos: Confianza (sesiones 1–4), Sospecha (5–10), Ruptura (11–16) y Desenlace (17–18). Los actos aparecen a medida que avanza la partida.'],
    notebook: ['Cuaderno', 'El cuaderno se abre entre sesiones, cuando Julián puede ordenar las pistas, anotar contradicciones y revisar sus hipótesis. Tu progreso se guarda automáticamente.'],
  } as const
  return <div className="story-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="story-drawer story-info" role="dialog" aria-modal="true" aria-labelledby="info-title"><button className="story-close" onClick={onClose} aria-label="Cerrar">×</button><p className="story-eyebrow">LA SILLA VACÍA · GUÍA</p><h2 id="info-title">{content[topic][0]}</h2><p>{content[topic][1]}</p><button className="story-primary" onClick={onClose}>Entendido <span>↗</span></button></section></div>
}

function PhonePanel({ save, onClose }: { save: StorySave; onClose: () => void }) {
  const communications = [...save.discoveredClues, ...save.observations].filter((entry) => /message|mensaje|usb|filtr|email|correo/i.test(`${entry.category ?? ''} ${entry.id} ${entry.title}`))
  return <div className="story-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="story-drawer story-phone" role="dialog" aria-modal="true" aria-labelledby="phone-title"><button className="story-close" onClick={onClose} aria-label="Cerrar teléfono">×</button><p className="story-eyebrow">JULIÁN RIVAS · DISPOSITIVO</p><h2 id="phone-title">Teléfono</h2><p className="story-muted">Comunicaciones archivadas y registradas durante la historia. El teléfono no agrega información que el jugador no haya descubierto.</p><section className="notebook-section"><h3>Mensajes y filtraciones</h3>{communications.length ? communications.map((entry) => <article className="phone-entry" key={entry.id}><span>◌</span><div><strong>{entry.title}</strong><small>{entry.category ?? 'Comunicación'} · {entry.sessionId ?? 'Archivo'}</small><p>{entry.text}</p></div></article>) : <p className="story-muted">Todavía no hay comunicaciones registradas en el cuaderno.</p>}</section><button className="story-primary" onClick={onClose}>Volver a la sesión <span>↗</span></button></section></div>
}

function NotebookPanel({ save, campaign: activeCampaign, noteDraft, setNoteDraft, onSaveNote, onChooseHypothesis, onClose }: { save: StorySave; campaign: StoryCampaign; noteDraft: string; setNoteDraft: (value: string) => void; onSaveNote: () => void; onChooseHypothesis: (id: string) => void; onClose: () => void }) {
  const hypotheses = Object.values(activeCampaign.hypotheses)
  return <div className="story-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><aside className="story-drawer story-notebook" role="dialog" aria-modal="true" aria-labelledby="notebook-title"><button className="story-close" onClick={onClose} aria-label="Cerrar cuaderno">×</button><p className="story-eyebrow">ARCHIVO DE JULIÁN · SOLO ENTRE SESIONES</p><h2 id="notebook-title">Cuaderno</h2><p className="story-muted">Pistas, contradicciones e hipótesis reunidas durante la historia.</p>
    <div className="notebook-overview"><span><strong>{save.discoveredClues.length}</strong><small>Pistas</small></span><span><strong>{save.contradictions.length}</strong><small>Contradicciones</small></span><span><strong>{save.people.length}</strong><small>Personas</small></span></div>
    <NotebookSection title="Pistas" entries={save.discoveredClues} /><NotebookSection title="Contradicciones" entries={save.contradictions} /><NotebookSection title="Observaciones" entries={save.observations} /><NotebookSection title="Personas" entries={save.people} />
    <section className="notebook-section"><h3>Hipótesis</h3>{hypotheses.length ? hypotheses.map((hypothesis) => { const active = save.hypotheses.some((item) => item.hypothesisId === hypothesis.id && item.status === 'active'); return <button className={`hypothesis-option ${active ? 'is-active' : ''}`} key={hypothesis.id} onClick={() => onChooseHypothesis(hypothesis.id)}>{hypothesis.text}<small>{active ? 'ACTIVA' : 'Seleccionar'}</small></button> }) : <p className="story-muted">Todavía no hay hipótesis disponibles.</p>}{save.hypotheses.filter((item) => item.status === 'crossed_out').map((item, index) => <p className="hypothesis-history" key={`${item.hypothesisId}-${index}`}><s>{activeCampaign.hypotheses[item.hypothesisId]?.text ?? item.hypothesisId}</s><span>Revisada</span></p>)}</section>
    <section className="notebook-section"><h3>Notas personales</h3><div className="notebook-note-form"><textarea value={noteDraft} onChange={(event) => setNoteDraft(event.target.value)} placeholder="Registrar una hipótesis u observación…" /><button onClick={onSaveNote} disabled={!noteDraft.trim()}>Guardar nota</button></div>{save.notebookNotes.map((note, index) => <p className="notebook-note" key={`${index}-${note}`}>{note}</p>)}</section>
  </aside></div>
}

function NotebookSection({ title, entries }: { title: string; entries: Array<{ id: string; title: string; text: string }> }) {
  return <section className="notebook-section"><h3>{title}</h3>{entries.length ? entries.map((entry) => <article className="notebook-entry" key={entry.id}><h4>{entry.title}</h4><p>{entry.text}</p></article>) : <p className="story-muted">Todavía no hay registros.</p>}</section>
}
