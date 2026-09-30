import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { consultationRoomBackground, consultationRoomMobileBackground, portraits } from '../assets/asset-manifest'
import { CaseFilePanel } from '../features/case-file/CaseFilePanel'
import { EmotionalMeters } from '../features/session/EmotionalMeters'
import { applyChoice, createInitialSave, ENDING_SCENE_ID, getAvailableChoices, getScene, resolveEnding, validateCase } from '../features/narrative/engine'
import type { Preferences, SaveGame } from '../features/narrative/types'
import { deleteSave, loadPreferences, loadSave, writePreferences, writeSave } from '../features/save/storage'
import { SettingsPanel } from '../features/settings/SettingsPanel'
import { useSoundscape } from '../features/settings/useSoundscape'
import { outsideSessionCase } from '../content/cases/fuera-de-sesion-01'

type Screen = 'menu' | 'playing' | 'ending'
type Panel = 'case-file' | 'settings' | null
type ObservableStat = 'trust' | 'anxiety' | 'hostility'
type EmotionalChanges = Partial<Record<ObservableStat, number>>

const validationErrors = validateCase(outsideSessionCase)
const knownSceneIds = [...Object.keys(outsideSessionCase.scenes), ENDING_SCENE_ID]
const knownClueIds = Object.keys(outsideSessionCase.clues)

export default function App() {
  const [stored] = useState(() => loadSave(outsideSessionCase.id, knownSceneIds, knownClueIds))
  const [save, setSave] = useState<SaveGame | null>(stored.save)
  const [screen, setScreen] = useState<Screen>('menu')
  const [panel, setPanel] = useState<Panel>(null)
  const [emotionalChanges, setEmotionalChanges] = useState<EmotionalChanges>({})
  const [preferences, setPreferences] = useState<Preferences>(loadPreferences)
  const [notice, setNotice] = useState(stored.invalid ? 'No se pudo leer la partida guardada. Podés empezar una nueva.' : '')

  const scene = useMemo(() => {
    if (!save || save.sceneId === ENDING_SCENE_ID) return null
    try { return getScene(outsideSessionCase, save.sceneId) } catch { return null }
  }, [save])
  const ending = useMemo(() => save?.sceneId === ENDING_SCENE_ID ? resolveEnding(outsideSessionCase, save) : null, [save])
  const choices = scene && save ? getAvailableChoices(scene, save) : []
  const audioEnvironment = screen === 'playing' && scene?.kind === 'interlude' ? 'pasillo' : 'consultorio'
  const { playEffect } = useSoundscape({
    ambience: preferences.ambience && screen !== 'menu',
    effects: preferences.effects,
    ambientVolume: preferences.ambientVolume,
    effectsVolume: preferences.effectsVolume,
  }, audioEnvironment)
  const heardScene = useRef('')

  useEffect(() => {
    if (screen !== 'playing' || !scene || heardScene.current === scene.id) return
    heardScene.current = scene.id
    if (scene.kind === 'interlude') playEffect(scene.id === 'between_1' ? 'phone-vibration' : 'notification')
  }, [screen, scene?.id, scene?.kind, playEffect])

  function persist(next: SaveGame) {
    setSave(next)
    if (!writeSave(next)) setNotice('No se pudo guardar en este navegador. La partida seguirá abierta mientras no cierres esta pestaña.')
    else setNotice('')
    if (next.sceneId === ENDING_SCENE_ID) setScreen('ending')
  }

  function newGame() {
    if ((save || stored.invalid) && !window.confirm('¿Empezar una partida nueva? El progreso guardado se va a reemplazar.')) return
    playEffect('door')
    const next = createInitialSave(outsideSessionCase)
    persist(next)
    setScreen('playing')
    setPanel(null)
    setEmotionalChanges({})
  }

  function continueGame() {
    if (!save) return
    setScreen(save.sceneId === ENDING_SCENE_ID ? 'ending' : 'playing')
    setPanel(null)
    setEmotionalChanges({})
  }

  function makeChoice(choiceId: string) {
    if (!save || !scene) return
    const choice = choices.find((item) => item.id === choiceId)
    if (!choice) return
    const changes: EmotionalChanges = {}
    for (const effect of choice.effects ?? []) {
      if (effect.type === 'changeStat' && effect.stat !== 'risk') {
        changes[effect.stat] = (changes[effect.stat] ?? 0) + effect.amount
      }
    }
    setEmotionalChanges(changes)
    persist(applyChoice(outsideSessionCase, scene, choice, save))
  }

  function updatePreferences(next: Preferences) {
    setPreferences(next)
    writePreferences(next)
  }

  function restartAfterEnding() {
    if (!window.confirm('¿Borrar el progreso de esta historia y empezar de nuevo?')) return
    deleteSave()
    setSave(null)
    setScreen('menu')
    setNotice('')
  }

  function updateSave(next: SaveGame) { persist(next) }
  function openCaseFile() { setPanel('case-file'); playEffect('folder') }
  function closeCaseFile() { setPanel(null); playEffect('folder') }
  function toggleAllSound() {
    const turnOn = !preferences.ambience && !preferences.effects
    updatePreferences({ ...preferences, ambience: turnOn, effects: turnOn })
  }

  if (validationErrors.length) {
    return <main className="fatal-error"><p className="eyebrow">ERROR DE CONTENIDO</p><h1>No se pudo abrir el caso</h1><ul>{validationErrors.map((error) => <li key={error}>{error}</li>)}</ul></main>
  }

  return <main className={`shell ${preferences.textScale === 'large' ? 'text-large' : ''} ${preferences.reducedMotion ? 'reduce-motion' : ''} ${screen === 'playing' ? 'shell--game' : ''} ${scene?.kind === 'interlude' ? 'shell--interlude' : ''} ${scene?.session ? `shell--session-${scene.session}` : ''}`} style={{ '--office-background': `url("${consultationRoomBackground}")`, '--office-background-mobile': `url("${consultationRoomMobileBackground}")` } as CSSProperties}>
    <div className="grain" aria-hidden="true" />
    {screen === 'menu' ? <>
      <header className="topbar">
        <a className="wordmark" href="#inicio" aria-label="Fuera de sesión, inicio"><span className="wordmark__mark">FS</span><span>ARCHIVO CLÍNICO <i>·</i> 01</span></a>
        <div className="topbar__actions"><span className="status"><span className="status__dot" /> SISTEMA LOCAL</span><button className="header-button" onClick={() => setPanel('settings')}>Ajustes</button></div>
      </header>
      <section className="hero" id="inicio" aria-labelledby="title">
        <div className="hero__copy">
          <p className="eyebrow"><span>EXPEDIENTE 001</span><span>BUENOS AIRES · 23:17</span></p>
          <h1 id="title">Fuera de<br /><em>sesión.</em></h1>
          <p className="lede">Algunas cosas no quedan en el consultorio.</p>
          <div className="hero__actions">
            <button className="button button--primary" onClick={newGame}>{save ? 'Comenzar de nuevo' : 'Abrir expediente'} <span aria-hidden="true">↗</span></button>
            {save && <button className="button button--quiet" onClick={continueGame}>Continuar partida</button>}
          </div>
          {notice && <p className="inline-note" role="status">{notice}</p>}
        </div>
        <div className="hero__art" aria-label="Ilustración abstracta de una puerta entreabierta">
          <div className="art-glow" /><div className="doorframe"><div className="door"><span className="door__handle" /></div><div className="doorlight" /></div>
          <span className="art-caption">CONSULTORIO 04 <i>—</i> PUERTA CERRADA</span><span className="art-index">01 / 03</span>
        </div>
      </section>
      <footer className="footer"><span>UN THRILLER PSICOLÓGICO INTERACTIVO</span><span>LA SESIÓN COMIENZA CUANDO VOS DECIDÍS.</span></footer>
    </> : screen === 'playing' && save && scene ? <>
      <header className="playbar">
        <button className="play-brand" onClick={() => setScreen('menu')} aria-label="Volver al menú"><span className="wordmark__mark">FS</span><span>FUERA DE SESIÓN</span></button>
        <div className="session-mark"><span>CASO 001</span><i>·</i><span>SESIÓN {String(scene.session ?? save.sessionNumber).padStart(2, '0')} / 03</span></div>
        <div className="playbar__actions"><button className="header-button" onClick={openCaseFile}>Expediente <span className="count-pill">{save.discoveredClues.length}</span></button><button className="header-button" onClick={toggleAllSound} aria-pressed={preferences.ambience || preferences.effects}>{preferences.ambience || preferences.effects ? 'Silenciar' : 'Activar sonido'}</button><button className="header-button" onClick={() => setPanel('settings')}>Ajustes</button></div>
      </header>
      {notice && <div className="save-notice" role="status">{notice}</div>}
      <section className={`play-layout ${scene.kind === 'interlude' ? 'play-layout--interlude' : ''}`} aria-live="polite">
        <div className="play-meta"><span className="meta-rule" /><span>{scene.label ?? (scene.kind === 'interlude' ? 'ENTRE SESIONES' : 'CONSULTORIO 04')}</span><span className="meta-rule" /></div>
        {scene.kind === 'interlude' ? <article className="interlude-card">
          <p className="section-kicker">{scene.label?.toUpperCase() ?? 'ENTRE SESIONES'}</p><div className="interlude-mark" aria-hidden="true">✳</div>
          <p className="scene-text scene-text--interlude">{scene.text}</p>
          <EmotionalMeters values={save.hidden} changes={emotionalChanges} />
          <div className="choice-list">{choices.map((choice, index) => <button className="choice" key={choice.id} onClick={() => makeChoice(choice.id)}><span className="choice__number">0{index + 1}</span><span>{choice.text}</span><span className="choice__arrow">↗</span></button>)}</div>
        </article> : <article className="session-card">
          <div className="patient-portrait"><img src={portraits[scene.portraitState ?? 'neutral']} alt={`Tomás, expresión ${scene.portraitState === 'uneasy' ? 'incómoda' : scene.portraitState === 'defensive' ? 'defensiva' : scene.portraitState === 'vulnerable' ? 'vulnerable' : 'reservada'}`} /><span className="portrait-caption">TOMÁS · CONSULTA {String(scene.session ?? save.sessionNumber).padStart(2, '0')}</span></div>
          <div className="dialogue-content"><div className="speaker-line"><span className="speaker-dot" /><span>{scene.speaker ?? 'Narración'}</span><span className="speaker-time">{scene.kind === 'decision' ? '00:24' : 'EN CONSULTA'}</span></div>
            <p className="scene-text">{scene.text}</p>
            {scene.id === 's3_open' && save.flags.supervisorConsulted && <p className="interlude-extra">Tu supervisora devuelve la llamada: “Documentá los hechos y no confundas una frase inquietante con una certeza. Si el riesgo se vuelve inminente, consultame de nuevo.”</p>}
            {scene.id === 's3_open' && save.flags.familyContacted && <p className="interlude-extra">La hermana de Mauro confirmó que la familia tampoco sabe dónde está. Le preocupa que no responda desde hace días.</p>}
            {scene.id === 's3_open' && save.flags.accusedEarly && <p className="interlude-extra">Desde la última sesión, Tomás responde con más cautela. Cuando mencionás a Mauro, vuelve a mirar el teléfono.</p>}
            {scene.id === 's3_open' && save.hidden.trust >= 4 && <p className="interlude-extra">Tomás sostiene la mirada un segundo más. “No sé si estoy haciendo bien en contarte esto, pero no quiero ir solo.”</p>}
            {scene.id === 's3_phone' && save.flags.pressuredTomas && <p className="interlude-extra">Tomás aparta la silla de la mesa. “Ya decidiste quién soy. No sé para qué sigo hablando.”</p>}
            <EmotionalMeters values={save.hidden} changes={emotionalChanges} />
            <div className="choice-list">{choices.map((choice, index) => <button className="choice" key={choice.id} onClick={() => makeChoice(choice.id)}><span className="choice__number">0{index + 1}</span><span>{choice.text}</span><span className="choice__arrow">↗</span></button>)}</div>
          </div>
        </article>}
        <div className="play-foot"><span>NO HAY RESPUESTAS QUE NO DEJEN HUELLA.</span><span>PARTIDA GUARDADA EN ESTE DISPOSITIVO</span></div>
      </section>
    </> : ending && save ? <>
      <header className="playbar"><button className="play-brand" onClick={() => setScreen('menu')}><span className="wordmark__mark">FS</span><span>FUERA DE SESIÓN</span></button><span className="session-mark">CIERRE DEL EXPEDIENTE</span><button className="header-button" onClick={openCaseFile}>Ver expediente</button></header>
      <section className="ending-layout">
        <p className="eyebrow"><span>CASO 001</span><span>EPÍLOGO</span></p><div className="ending-sigil" aria-hidden="true">FS</div><h1>{ending.title}</h1><p className="ending-copy">{ending.text}</p>
        <EmotionalMeters values={save.hidden} changes={emotionalChanges} />
        <div className="ending-clues"><p className="section-kicker">PISTAS QUE QUEDAN EN EL EXPEDIENTE</p><div>{ending.keyClueIds.filter((id) => save.discoveredClues.includes(id)).map((id) => <span key={id}>{outsideSessionCase.clues[id]?.title}</span>)}{ending.keyClueIds.every((id) => !save.discoveredClues.includes(id)) && <span>Ninguna de las pistas clave llegó a confirmarse.</span>}</div></div>
        <div className="ending-actions"><button className="button button--primary" onClick={restartAfterEnding}>Volver a empezar <span aria-hidden="true">↗</span></button><button className="button button--quiet" onClick={() => setScreen('menu')}>Volver al menú</button></div>
      </section>
      <footer className="footer"><span>FIN DEL EXPEDIENTE 001</span><span>LO QUE NO SE ESCRIBE TAMBIÉN PESA.</span></footer>
    </> : <div className="fatal-error"><h1>Esta partida no puede continuar.</h1><p>{notice || 'El expediente apunta a una escena que ya no existe.'}</p><button className="button button--primary" onClick={() => { deleteSave(); setSave(null); setScreen('menu') }}>Volver al menú</button></div>}

    {panel === 'case-file' && save && <CaseFilePanel game={outsideSessionCase} save={save} onClose={closeCaseFile} onUpdate={updateSave} />}
    {panel === 'settings' && <SettingsPanel preferences={preferences} onChange={updatePreferences} onClose={() => setPanel(null)} />}
  </main>
}
