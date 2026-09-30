import { useState } from 'react'
import type { CaseDefinition, SaveGame } from '../narrative/types'

type Props = {
  game: CaseDefinition
  save: SaveGame
  onClose: () => void
  onUpdate: (save: SaveGame) => void
}

export function CaseFilePanel({ game, save, onClose, onUpdate }: Props) {
  const [draft, setDraft] = useState('')
  const clues = save.discoveredClues.map((id) => game.clues[id]).filter(Boolean)

  function addNote() {
    const text = draft.trim()
    if (!text) return
    const now = new Date().toISOString()
    onUpdate({ ...save, notes: [...save.notes, { id: crypto.randomUUID(), text, updatedAt: now }], updatedAt: now })
    setDraft('')
  }

  function updateNote(id: string, text: string) {
    const now = new Date().toISOString()
    onUpdate({ ...save, notes: save.notes.map((note) => note.id === id ? { ...note, text, updatedAt: now } : note), updatedAt: now })
  }

  function deleteNote(id: string) {
    const now = new Date().toISOString()
    onUpdate({ ...save, notes: save.notes.filter((note) => note.id !== id), updatedAt: now })
  }

  return (
    <div className="overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="drawer" role="dialog" aria-modal="true" aria-labelledby="case-title">
        <header className="drawer__head">
          <div><p className="eyebrow">ARCHIVO RESERVADO · 001</p><h2 id="case-title">Expediente</h2></div>
          <button className="icon-button" onClick={onClose} aria-label="Cerrar expediente">×</button>
        </header>
        <div className="drawer__body">
          <section className="file-section">
            <p className="section-kicker">RESUMEN DEL CASO</p>
            <p className="file-summary">Tomás refiere entradas a su departamento que no puede confirmar. También expresó resentimiento hacia su antiguo encargado, Mauro, que ahora está desaparecido.</p>
          </section>
          <section className="file-section">
            <p className="section-kicker">DATOS REUNIDOS <span>{String(clues.length).padStart(2, '0')}</span></p>
            {clues.length ? <div className="clue-list">{clues.map((clue) => <article className="clue" key={clue.id}>
              <div className="clue__type">{clue.sourceType === 'observation' ? 'OBSERVACIÓN' : clue.sourceType === 'statement' ? 'DECLARACIÓN' : 'FUENTE EXTERNA'}</div>
              <h3>{clue.title}</h3><p>{clue.text}</p>
            </article>)}</div> : <p className="empty-copy">Todavía no registraste datos. Lo que observás y lo que te cuentan no siempre son lo mismo.</p>}
          </section>
          <section className="file-section">
            <p className="section-kicker">DECISIONES DE SESIÓN</p>
            {save.decisions.length ? <ol className="decision-list">{save.decisions.filter((decision) => decision.choiceId).map((decision, index) => <li key={`${decision.sceneId}-${decision.choiceId}-${index}`}>Sesión {game.scenes[decision.sceneId]?.session ?? '—'} · {decision.choiceId.replaceAll('_', ' ')}</li>)}</ol> : <p className="empty-copy">Las decisiones importantes van a quedar registradas acá.</p>}
          </section>
          <section className="file-section">
            <p className="section-kicker">NOTAS E HIPÓTESIS</p>
            <div className="notes-list">{save.notes.map((note, index) => <div className="note-entry" key={note.id}>
              <label className="sr-only" htmlFor={`note-${note.id}`}>Nota {index + 1}</label>
              <textarea id={`note-${note.id}`} value={note.text} onChange={(event) => updateNote(note.id, event.target.value)} rows={3} />
              <button className="text-button" onClick={() => deleteNote(note.id)}>Eliminar nota</button>
            </div>)}</div>
            <label className="sr-only" htmlFor="new-note">Nueva nota</label>
            <textarea id="new-note" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="¿Qué hipótesis querés dejar asentada?" rows={3} />
            <button className="button button--quiet note-add" disabled={!draft.trim()} onClick={addNote}>Guardar nota <span aria-hidden="true">＋</span></button>
          </section>
        </div>
        <footer className="drawer__foot"><span>SOLO EN ESTE DISPOSITIVO</span><button className="button button--primary" onClick={onClose}>Volver a la sesión <span aria-hidden="true">↗</span></button></footer>
      </section>
    </div>
  )
}
