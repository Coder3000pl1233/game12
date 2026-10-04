import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { consultationRoomBackground, consultationRoomMobileBackground, julianTherapistPortrait, tomasPortrait } from '../assets/asset-manifest'
import { useSoundscape } from '../features/settings/useSoundscape'
import { addNotebookNote, applyStoryChoice, completeStorySession, createInitialStorySave, evaluateCondition, exploreTopic, getAvailableHypotheses, getAvailableStoryChoices, getAvailableTopics, getStoryScene, updateHypothesis, validateStoryCampaign } from '../features/story/engine'
import { laSillaVaciaCampaign } from '../content/campaigns/la-silla-vacia'
import { deleteStorySave, readStorySave, writeStorySave } from '../features/story/storage'
import type { StoryCampaign, StorySave, StoryChoice } from '../features/story/types'
import type { Preferences } from '../features/narrative/types'
import './story-shell.css'

const campaign: StoryCampaign = laSillaVaciaCampaign
const campaignErrors = validateStoryCampaign(campaign)
const PREFERENCES_KEY = 'la-silla-vacia:preferences:v1'
type Panel = 'notebook' | 'settings' | 'warning' | 'phone' | 'info' | null
type InfoTopic = 'trust' | 'routes' | 'chapters' | 'notebook'
const defaultPreferences: Preferences = { textScale: 'normal', ambience: false, effects: false, ambientVolume: 22, effectsVolume: 36, reducedMotion: false }

function readPreferences(): Preferences {
  try {
    const stored = localStorage.getItem(PREFERENCES_KEY)
    return stored ? { ...defaultPreferences, ...JSON.parse(stored) as Partial<Preferences> } : defaultPreferences
  } catch { return defaultPreferences }
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
  const [mobileTopicsOpen, setMobileTopicsOpen] = useState(false)
  const [preferences, setPreferences] = useState<Preferences>(readPreferences)
  const [dialogueStep, setDialogueStep] = useState(0)
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

  useEffect(() => {
    setDialogueStep(save?.dialogueCursor ?? 0)
    setMobileTopicsOpen(false)
  }, [scene?.id])

  useEffect(() => {
    const currentSession = save ? campaign.sessions[save.currentSessionId] : undefined
    if (screen === 'playing' && save?.phase === 'between_sessions' && currentSession && currentSession.number > 0) setPanel('notebook')
  }, [save?.phase, save?.currentSessionId, screen])

  function persist(next: StorySave, _previous?: StorySave) {
    setSave(next)
    setNotice(writeStorySave(next) ? '' : 'No se pudo guardar en este navegador. El progreso sigue abierto en esta pestaña.')
  }
  function startNewGame() {
    if (save && !window.confirm('¿Reemplazar el progreso guardado de esta historia?')) return
    const next = createInitialStorySave(campaign)
    persist(next)
    setPanel(null)
    setScreen('playing')
    playEffect('door')
  }
  function continueGame() { setScreen('playing'); setPanel(save?.phase === 'between_sessions' ? 'notebook' : null) }
  function scrollToSceneOnMobile() {
    if (!window.matchMedia('(max-width: 760px)').matches) return
    window.requestAnimationFrame(() => document.querySelector('.scene-stage')?.scrollIntoView({ behavior: preferences.reducedMotion ? 'auto' : 'smooth', block: 'start' }))
  }
  function choose(choiceId: string) {
    if (!save || !scene) return
    if (save.phase === 'between_sessions' && session?.number && !save.flags[`hypothesis_selected:${save.currentSessionId}`]) {
      setNotice('Elegí una hipótesis en el cuaderno antes de continuar.')
      setPanel('notebook')
      return
    }
    const choice = choices.find((item) => item.id === choiceId)
    if (!choice) return
    const next = applyStoryChoice(campaign, scene, choice, save)
    persist(next, save)
    scrollToSceneOnMobile()
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
  function advanceDialogue() {
    if (!save) return
    const cursor = dialogueStep + 1
    setDialogueStep(cursor)
    const next = { ...save, dialogueCursor: cursor, updatedAt: new Date().toISOString() }
    setSave(next)
    writeStorySave(next)
  }
  function continueSession() {
    if (!save || !nextSession) return
    if (session?.number && !save.flags[`hypothesis_selected:${save.currentSessionId}`]) {
      setNotice('Elegí una hipótesis en el cuaderno antes de continuar.')
      setPanel('notebook')
      return
    }
    const next = completeStorySession(campaign, save, nextSession.id)
    persist(next, save)
    playEffect('door')
  }
  function chooseHypothesisAndContinue(hypothesisId: string, interludeChoiceId?: string) {
    if (!save) return
    const withOptionalNote = noteDraft.trim() ? addNotebookNote(save, noteDraft) : save
    const reviewed = updateHypothesis(withOptionalNote, hypothesisId)
    setNoteDraft('')
    if (scene?.kind === 'interlude' && interludeChoiceId) {
      const interludeChoice = getAvailableStoryChoices(scene, reviewed).find((item) => item.id === interludeChoiceId)
      if (interludeChoice) {
        const next = applyStoryChoice(campaign, scene, interludeChoice, reviewed)
        persist(next, save)
        setPanel(null)
        playEffect('door')
        return
      }
    }
    if (nextSession) {
      const next = completeStorySession(campaign, reviewed, nextSession.id)
      persist(next, save)
      setPanel(null)
      playEffect('door')
      return
    }
    persist(reviewed, save)
    setPanel(null)
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

  const actName = acts[session.act - 1]?.title ?? 'Prólogo'
  const filteredLines = scene.lines.filter((line) => !line.conditions || line.conditions.every((condition) => evaluateCondition(condition, save)))
  const activeDialogueIndex = Math.min(dialogueStep, Math.max(0, filteredLines.length - 1))
  const activeDialogueLine = filteredLines[activeDialogueIndex]
  const dialogueComplete = filteredLines.length === 0 || activeDialogueIndex >= filteredLines.length - 1
  const completedSessions = Math.min(18, save.completedSessionIds.length + (save.phase === 'ending' ? 1 : 0))
  const unlockedProgress = Math.round((completedSessions / 18) * 100)
  const hypothesisSelectedForCurrentSession = !!save.flags[`hypothesis_selected:${save.currentSessionId}`]

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
            {scene.kind !== 'interlude' && <><div className="stage-character"><img src={tomasPortrait} alt="Tomás Ferreyra, sentado en el consultorio" /><div className="character-caption"><span>TOMÁS FERREYRA</span><small>17 AÑOS · PACIENTE</small></div></div><div className="stage-therapist"><img src={julianTherapistPortrait} alt="Julián Rivas visto de espaldas, en el rol del psicólogo" /></div></>}
            <div className="stage-note"><span>CONSULTORIO · BUENOS AIRES</span><span>{session.number ? `SESIÓN ${String(session.number).padStart(2, '0')} / 18` : 'PRÓLOGO'}</span></div>
            <article className={`dialogue-box dialogue-box--speaker-${activeDialogueLine?.speaker?.toLowerCase().includes('julián') ? 'julian' : activeDialogueLine?.speaker?.toLowerCase().includes('tomás') ? 'tomas' : 'narrator'} ${scene.kind === 'interlude' ? 'dialogue-box--interlude' : ''}`}>
              {scene.kind === 'interlude' && <p className="dialogue-eyebrow">{scene.label ?? 'ENTRE SESIONES'}</p>}
              {activeDialogueLine && <div className="dialogue-lines" key={`${scene.id}-${activeDialogueIndex}`}><p className={`story-line story-line--${activeDialogueLine.tone ?? 'dialogue'}`}>{activeDialogueLine.speaker && <span className="story-speaker">{activeDialogueLine.speaker}</span>}{activeDialogueLine.text}</p></div>}
              {!dialogueComplete && <button className="dialogue-next" onClick={advanceDialogue}><span>Continuar</span><b>›</b></button>}
              {dialogueComplete && choices.length > 0 && <p className="dialogue-choice-prompt">Elegí cómo responder</p>}
              <div className="dialogue-progress" aria-label={`Diálogo ${activeDialogueIndex + 1} de ${filteredLines.length}`}>{filteredLines.map((_, index) => <span className={index <= activeDialogueIndex ? 'is-read' : ''} key={index} />)}</div>
            </article>
          </div>
          {topics.length > 0 && <div className={`mobile-topic-list ${mobileTopicsOpen ? 'is-open' : ''}`}><button className="mobile-topic-toggle" type="button" aria-expanded={mobileTopicsOpen} aria-controls="mobile-topics-content" onClick={() => setMobileTopicsOpen((open) => !open)}><span><small>ELEGÍ POR DÓNDE SEGUIR</small><strong>Temas para explorar</strong></span><span className="mobile-topic-count">{topics.length}</span><b aria-hidden="true">⌄</b></button><div className="mobile-topic-content" id="mobile-topics-content" hidden={!mobileTopicsOpen}>{topics.map((topic) => <button className="topic-row" key={topic.id} onClick={() => openTopic(topic.id)}><span className="topic-marker">{topic.kind === 'document' ? '▤' : '○'}</span><span>{topic.label}</span><b>›</b></button>)}</div></div>}
          {choices.length > 0 && dialogueComplete && <div className="choice-area choice-area--revealed">
            {scene.kind === 'interlude'
              ? <div className="choice-grid choice-grid--single">{choices.map((choice, index) => <ChoiceButton key={choice.id} choice={choice} index={index} onClick={() => choose(choice.id)} />)}</div>
              : <div className="choice-grid">{choices.map((choice, index) => <ChoiceButton key={choice.id} choice={choice} index={index} onClick={() => choose(choice.id)} />)}</div>}
          </div>}
          {save.phase === 'between_sessions' && choices.length === 0 && <div className="between-actions"><div><span className="story-eyebrow">CIERRE DE SESIÓN</span><p>{hypothesisSelectedForCurrentSession ? 'Hipótesis registrada. Ya podés continuar.' : 'Elegí una hipótesis obligatoria; las notas son opcionales.'}</p></div><button className="story-primary" onClick={() => hypothesisSelectedForCurrentSession ? continueSession() : setPanel('notebook')}>{hypothesisSelectedForCurrentSession && nextSession ? `Continuar · Sesión ${nextSession.number}` : 'Abrir cuaderno'} <span>↗</span></button></div>}
        </section>
        <aside className="game-sidebar">
          <section className="sidebar-panel session-context"><PanelHeading title="Contexto de la sesión" eyebrow="EXPEDIENTE ACTIVO" action={() => openInfo('chapters')} /><p className="context-title">{session.title}</p><p className="context-copy">Julián Rivas · Tomás Ferreyra<br />Acto {session.act || 'Prólogo'} · Sesión {session.number || 'inicial'}</p><div className="context-meta"><span>PROGRESO DE HISTORIA</span><span>{unlockedProgress}%</span></div><div className="progress-track"><span style={{ width: `${unlockedProgress}%` }} /></div></section>
          <section className="sidebar-panel topic-panel"><PanelHeading title="Temas para explorar" eyebrow={topics.length && topics.every((topic) => topic.kind === 'document') ? 'ARCHIVOS DISPONIBLES' : 'A TU RITMO'} />{topics.length ? topics.map((topic) => <button className="topic-row" key={topic.id} onClick={() => openTopic(topic.id)}><span className="topic-marker">{topic.kind === 'document' ? '▤' : '○'}</span><span>{topic.label}</span><b>›</b></button>) : <p className="sidebar-empty">No hay temas abiertos en este momento. La conversación también puede quedarse en silencio.</p>}</section>
          <section className="sidebar-panel emotional-panel"><PanelHeading title="Clima de la sesión" eyebrow="LECTURA NARRATIVA · NO CLÍNICA" /><p className="emotion-footnote">Observá silencios, postura y forma de responder. Ansiedad, miedo y enojo permanecen ocultos y no predicen por sí solos un desenlace.</p></section>
          <nav className="sidebar-actions" aria-label="Herramientas de la sesión"><button onClick={() => setPanel('notebook')} disabled={save.phase !== 'between_sessions'}><span>▤</span><span><strong>Cuaderno</strong><small>{save.phase === 'between_sessions' ? 'Notas, hipótesis y pistas' : 'Disponible entre sesiones'}</small></span><b>›</b></button><button onClick={() => setPanel('phone')}><span>☏</span><span><strong>Teléfono</strong><small>Comunicaciones archivadas</small></span><b>›</b></button><button onClick={() => setPanel('settings')}><span>⚙</span><span><strong>Opciones</strong><small>Audio, pantalla y accesibilidad</small></span><b>›</b></button></nav>
          <button className="leave-link" onClick={() => { setScreen('menu'); setPanel(null) }}>← Volver al menú sin perder el progreso</button>
        </aside>
      </div>
      <footer className="game-footer"><span>NO HAY RESPUESTAS QUE NO DEJEN HUELLA.</span><span>GUARDADO AUTOMÁTICO · {completedSessions} SESIONES COMPLETADAS</span><button onClick={restart}>Reiniciar partida</button></footer>
    </>}
    {panel === 'notebook' && <NotebookPanel save={save} campaign={campaign} noteDraft={noteDraft} setNoteDraft={setNoteDraft} onSaveNote={saveNote} onChooseHypothesis={chooseHypothesisAndContinue} onClose={() => setPanel(null)} />}
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

function ChoiceButton({ choice, index, onClick }: { choice: StoryChoice; index: number; onClick: () => void }) {
  const supportive = choice.intention === 'validate' || /pausa|escuchar|validar|reconocer|acompañar|qué necesita|dar espacio/i.test(choice.text)
  const exploratory = choice.intention === 'question' || choice.intention === 'deepen' || /preguntar|explorar|entender|indagar/i.test(choice.text)
  const labels: Partial<Record<NonNullable<StoryChoice['intention']>, string>> = { question: 'Preguntar', deepen: 'Profundizar', confront: 'Confrontar', validate: 'Validar', redirect: 'Redirigir', limit: 'Establecer límite', apologize: 'Reconocer', justify: 'Explicar', silence: 'Guardar silencio', avoid: 'Cambiar de tema' }
  const approach = choice.intention ? labels[choice.intention] : supportive ? 'Validar' : exploratory ? 'Explorar' : 'Responder'
  const tone = supportive ? 'warm' : exploratory && !choice.importantDecision ? 'mint' : 'blue'
  return <button className={`story-choice story-choice--${tone}`} onClick={onClick}>
    <span className="choice-number" aria-hidden="true">{index + 1}</span>
    <span className="choice-copy"><span className="choice-text">{choice.text}</span><span className="choice-rule" aria-hidden="true" /><span className="choice-meta"><span className="choice-approach">{approach}</span></span></span>
  </button>
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
  type PhoneTab = 'messages' | 'calls' | 'alerts' | 'contacts' | 'archive'
  const [activeTab, setActiveTab] = useState<PhoneTab>('messages')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const records = [...save.discoveredClues, ...save.observations]
  const searchable = (entry: { id: string; title: string; category?: string }) => `${entry.category ?? ''} ${entry.id} ${entry.title}`
  const messages = records.filter((entry) => /message|mensaje|filtr|grupo|digital|correo|email|captura|whatsapp/i.test(searchable(entry)))
  const calls = records.filter((entry) => /call|llamad|phone|tel[eé]fono|vibraci[oó]n/i.test(searchable(entry)))
  const alerts = records.filter((entry) => /alert|notific|amenaza/i.test(searchable(entry)))
  const tabItems: Record<PhoneTab, typeof records> = { messages, calls, alerts, contacts: save.people, archive: records }
  const tabs: Array<{ id: PhoneTab; label: string; icon: string }> = [
    { id: 'messages', label: 'Mensajes', icon: '▱' },
    { id: 'calls', label: 'Llamadas', icon: '⌕' },
    { id: 'alerts', label: 'Alertas', icon: '◇' },
    { id: 'contacts', label: 'Contactos', icon: '○' },
    { id: 'archive', label: 'Archivo', icon: '▤' },
  ]
  const visibleEntries = tabItems[activeTab]
  const selectedEntry = visibleEntries.find((entry) => entry.id === selectedId) ?? visibleEntries[0]
  return <div className="story-overlay story-overlay--phone" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="story-drawer story-phone" role="dialog" aria-modal="true" aria-labelledby="phone-title">
    <header className="phone-heading"><div><p className="story-eyebrow">DISPOSITIVO DE JULIÁN RIVAS</p><h2 id="phone-title">Teléfono</h2></div><button className="story-close" onClick={onClose} aria-label="Cerrar teléfono">×</button></header>
    <div className="phone-workspace">
      <nav className="phone-nav" aria-label="Secciones del teléfono">{tabs.map((tab) => <button className={activeTab === tab.id ? 'is-active' : ''} key={tab.id} onClick={() => { setActiveTab(tab.id); setSelectedId(null) }}><span>{tab.icon}</span><strong>{tab.label}</strong><small>{tabItems[tab.id].length}</small></button>)}<p>Solo aparecen datos y comunicaciones descubiertos en la historia.</p></nav>
      <section className="phone-inbox"><div className="phone-inbox-heading"><span>REGISTROS</span><span>{visibleEntries.length}</span></div>{visibleEntries.length ? visibleEntries.map((entry) => <button className={`phone-list-item ${selectedEntry?.id === entry.id ? 'is-selected' : ''}`} key={entry.id} onClick={() => setSelectedId(entry.id)}><span className="phone-avatar">{activeTab === 'contacts' ? entry.title.slice(0, 1) : '◌'}</span><span className="phone-list-copy"><strong>{entry.title}</strong><small>{entry.sessionId ? `Sesión ${entry.sessionId.replace(/^S/, '')}` : entry.category ?? 'Registro'}</small><span>{entry.text}</span></span></button>) : <p className="phone-empty-list">Todavía no hay registros en esta sección.</p>}</section>
      <section className="phone-device-wrap"><div className="phone-device"><div className="phone-device-status"><span>21:14</span><span>● ▮ ▰</span></div><div className="phone-device-contact"><span className="phone-avatar">{selectedEntry ? selectedEntry.title.slice(0, 1) : '·'}</span><span><strong>{selectedEntry?.title ?? 'Sin comunicaciones'}</strong><small>{selectedEntry ? (activeTab === 'contacts' ? 'Contacto conocido' : 'Registro archivado') : 'Bandeja de entrada'}</small></span><b>•••</b></div><div className="phone-device-thread">{selectedEntry ? <><p className="phone-thread-date">{selectedEntry.sessionId ? `EVIDENCIA · ${selectedEntry.sessionId}` : selectedEntry.category?.toUpperCase() ?? 'ARCHIVO'}</p><article className={`phone-bubble ${activeTab === 'contacts' ? 'phone-bubble--contact' : ''}`}>{selectedEntry.text}<small>{selectedEntry.category ?? 'Nota registrada'}</small></article><p className="phone-integrity-note">Vista de consulta · contenido registrado, sin mensajes añadidos</p></> : <div className="phone-empty-state"><span>☏</span><strong>{activeTab === 'contacts' ? 'Aún no hay contactos guardados' : 'No hay comunicaciones todavía'}</strong><p>Las conversaciones y pistas aparecerán acá cuando Julián las descubra durante la historia.</p></div>}</div><div className="phone-device-compose"><span>＋</span><span>Modo de consulta · solo lectura</span><b>➤</b></div></div></section>
      <aside className="phone-details"><span className="panel-eyebrow">{selectedEntry ? (activeTab === 'contacts' ? 'CONTACTO' : 'DETALLE DEL REGISTRO') : 'ESTADO DEL ARCHIVO'}</span><h3>{selectedEntry?.title ?? 'Sin datos nuevos'}</h3><p>{selectedEntry?.category ? `Categoría: ${selectedEntry.category}` : 'El archivo todavía no contiene información en esta sección.'}</p>{selectedEntry?.sessionId && <div className="phone-detail-row"><span>ORIGEN</span><strong>Sesión {selectedEntry.sessionId.replace(/^S/, '')}</strong></div>}<div className="phone-detail-row"><span>ATRIBUCIÓN</span><strong>No confirmada</strong></div><div className="phone-disclaimer">Una pista no confirma por sí sola quién envió un mensaje ni qué ocurrió.</div></aside>
    </div>
  </section></div>
}

function NotebookPanel({ save, campaign: activeCampaign, noteDraft, setNoteDraft, onSaveNote, onChooseHypothesis, onClose }: { save: StorySave; campaign: StoryCampaign; noteDraft: string; setNoteDraft: (value: string) => void; onSaveNote: () => void; onChooseHypothesis: (id: string, interludeChoiceId?: string) => void; onClose: () => void }) {
  const hypotheses = getAvailableHypotheses(activeCampaign, save)
  const currentHypothesis = save.flags[`hypothesis_selected:${save.currentSessionId}`] ? save.hypotheses.find((item) => item.status === 'active')?.hypothesisId ?? '' : ''
  const [pendingHypothesis, setPendingHypothesis] = useState(currentHypothesis)
  const interludeScene = activeCampaign.scenes[save.currentSceneId]
  const interludeChoices = interludeScene?.kind === 'interlude' ? getAvailableStoryChoices(interludeScene, save) : []
  const [pendingInterludeChoice, setPendingInterludeChoice] = useState(interludeChoices.length === 1 ? interludeChoices[0].id : '')
  const canContinue = !!pendingHypothesis && (!interludeChoices.length || !!pendingInterludeChoice)
  return <div className="story-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><aside className="story-drawer story-notebook" role="dialog" aria-modal="true" aria-labelledby="notebook-title"><button className="story-close" onClick={onClose} aria-label="Cerrar cuaderno">×</button><p className="story-eyebrow">CIERRE DE SESIÓN · ARCHIVO DE JULIÁN</p><h2 id="notebook-title">Cuaderno</h2><p className="story-muted">Antes de continuar, registrá qué hipótesis guía tu lectura de lo ocurrido.</p>
    <section className={`notebook-checkpoint ${pendingHypothesis ? 'is-complete' : ''}`}><span className="checkpoint-number">1</span><div><strong>{pendingHypothesis ? 'Hipótesis elegida' : 'Elegí una hipótesis'}</strong><p>{pendingHypothesis ? 'Guardala para cerrar el cuaderno y comenzar la siguiente sesión.' : 'Este paso es obligatorio para avanzar.'}</p></div><span className="checkpoint-state">{pendingHypothesis ? 'LISTA PARA GUARDAR' : 'OBLIGATORIO'}</span></section>
    <section className="notebook-section notebook-section--optional"><h3>Notas personales <small>Opcionales</small></h3><p className="story-muted">Si querés guardar una observación, hacelo antes de confirmar la hipótesis.</p><div className="notebook-note-form"><textarea value={noteDraft} onChange={(event) => setNoteDraft(event.target.value)} placeholder="Escribir una observación opcional…" /><button onClick={onSaveNote} disabled={!noteDraft.trim()}>Guardar nota</button></div>{save.notebookNotes.map((note, index) => <p className="notebook-note" key={`${index}-${note}`}>{note}</p>)}</section>
    <section className="notebook-section notebook-section--priority"><h3>Hipótesis de trabajo <small>Obligatoria</small></h3>{hypotheses.map((hypothesis) => { const selected = pendingHypothesis === hypothesis.id; return <button className={`hypothesis-option ${selected ? 'is-active' : ''}`} key={hypothesis.id} onClick={() => setPendingHypothesis(hypothesis.id)}><span>{hypothesis.text}</span><small>{selected ? '✓ ELEGIDA' : 'Elegir'}</small></button> })}</section>
    {interludeChoices.length > 1 && <section className="notebook-section notebook-section--priority"><h3>Decisión entre sesiones <small>Obligatoria</small></h3>{interludeChoices.map((item) => <button className={`hypothesis-option ${pendingInterludeChoice === item.id ? 'is-active' : ''}`} key={item.id} onClick={() => setPendingInterludeChoice(item.id)}><span>{item.text}</span><small>{pendingInterludeChoice === item.id ? '✓ ELEGIDA' : 'Elegir'}</small></button>)}</section>}
    <div className="notebook-continue"><button className="story-primary" onClick={() => canContinue && onChooseHypothesis(pendingHypothesis, pendingInterludeChoice || undefined)} disabled={!canContinue}>{canContinue ? 'Guardar hipótesis y continuar' : 'Completá las decisiones obligatorias'} <span>↗</span></button></div>
    <div className="notebook-overview"><span><strong>{save.discoveredClues.length}</strong><small>Pistas</small></span><span><strong>{save.contradictions.length}</strong><small>Contradicciones</small></span><span><strong>{save.people.length}</strong><small>Personas</small></span></div>
    <NotebookSection title="Pistas" entries={save.discoveredClues} /><NotebookSection title="Contradicciones" entries={save.contradictions} /><NotebookSection title="Observaciones" entries={save.observations} /><NotebookSection title="Personas" entries={save.people} />
  </aside></div>
}

function NotebookSection({ title, entries }: { title: string; entries: Array<{ id: string; title: string; text: string }> }) {
  return <section className="notebook-section"><h3>{title}</h3>{entries.length ? entries.map((entry) => <article className="notebook-entry" key={entry.id}><h4>{entry.title}</h4><p>{entry.text}</p></article>) : <p className="story-muted">Todavía no hay registros.</p>}</section>
}
