import { useCallback, useEffect, useRef } from 'react'
import { soundAssets } from '../../assets/asset-manifest'

type Environment = 'consultorio' | 'pasillo'
type EffectName = keyof typeof soundAssets.effects
type SoundSettings = { ambience: boolean; effects: boolean; ambientVolume: number; effectsVolume: number }

function selectAudioSource(source: { ogg: string; mp3: string }) {
  const probe = new Audio()
  if (probe.canPlayType('audio/ogg; codecs="vorbis"')) return source.ogg
  return source.mp3
}

class Soundscape {
  private ambient: HTMLAudioElement | null = null
  private ambientUrl = ''
  private ambientPlayers = new Set<HTMLAudioElement>()
  private effectsEnabled = false
  private effectsVolume = 0.4
  private players = new Set<HTMLAudioElement>()
  private timers = new Set<number>()

  configure(settings: SoundSettings, environment: Environment) {
    this.effectsEnabled = settings.effects
    this.effectsVolume = Math.max(0, Math.min(1, settings.effectsVolume / 100))
    if (!settings.ambience || settings.ambientVolume <= 0) {
      this.stopAmbient()
      return
    }
    const source = soundAssets.ambience[environment]
    const url = selectAudioSource(source)
    const volume = Math.max(0, Math.min(1, settings.ambientVolume / 100))
    if (this.ambient && this.ambientUrl === url) {
      this.ambient.volume = volume
      return
    }
    const previous = this.ambient
    const next = new Audio(url)
    next.loop = true
    next.preload = 'none'
    next.volume = 0
    this.ambient = next
    this.ambientUrl = url
    this.ambientPlayers.add(next)
    void next.play().then(() => this.fade(next, volume, 900)).catch(() => {
      if (this.ambient === next) {
        this.ambient = null
        this.ambientUrl = ''
      }
      this.ambientPlayers.delete(next)
    })
    if (previous) this.fade(previous, 0, 700, () => { previous.pause(); this.ambientPlayers.delete(previous) })
  }

  play(name: EffectName) {
    if (!this.effectsEnabled || this.effectsVolume <= 0) return
    const audio = new Audio(selectAudioSource(soundAssets.effects[name]))
    audio.preload = 'none'
    audio.volume = this.effectsVolume
    this.players.add(audio)
    audio.addEventListener('ended', () => this.players.delete(audio), { once: true })
    void audio.play().catch(() => this.players.delete(audio))
  }

  dispose() {
    for (const timer of this.timers) window.clearInterval(timer)
    this.timers.clear()
    this.ambient?.pause()
    this.ambient = null
    this.ambientUrl = ''
    for (const player of this.ambientPlayers) player.pause()
    this.ambientPlayers.clear()
    for (const player of this.players) player.pause()
    this.players.clear()
  }

  private stopAmbient() {
    if (!this.ambient) return
    const previous = this.ambient
    this.ambient = null
    this.ambientUrl = ''
    this.fade(previous, 0, 450, () => { previous.pause(); this.ambientPlayers.delete(previous) })
  }

  private fade(audio: HTMLAudioElement, target: number, duration: number, done?: () => void) {
    const start = audio.volume
    const startTime = performance.now()
    const timer = window.setInterval(() => {
      const progress = Math.min(1, (performance.now() - startTime) / duration)
      audio.volume = start + (target - start) * progress
      if (progress >= 1) {
        window.clearInterval(timer)
        this.timers.delete(timer)
        done?.()
      }
    }, 32)
    this.timers.add(timer)
  }
}

export function useSoundscape(settings: SoundSettings, environment: Environment) {
  const engineRef = useRef<Soundscape | null>(null)
  if (!engineRef.current) engineRef.current = new Soundscape()
  const engine = engineRef.current

  useEffect(() => {
    engine.configure(settings, environment)
  }, [engine, settings.ambience, settings.effects, settings.ambientVolume, settings.effectsVolume, environment])

  useEffect(() => () => engine.dispose(), [engine])
  const playEffect = useCallback((name: EffectName) => engine.play(name), [engine])
  return { playEffect }
}
