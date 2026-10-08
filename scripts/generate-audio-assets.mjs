import { execFile } from 'node:child_process'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'

const execFileAsync = promisify(execFile)
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ffmpeg = process.argv[2] || 'ffmpeg'
const sampleRate = 22050

function noiseGenerator(seed) {
  let state = seed >>> 0
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0
    return (state / 0xffffffff) * 2 - 1
  }
}

function render(duration, sample, loop = true) {
  const length = Math.round(duration * sampleRate)
  const pcm = new Float32Array(length)
  for (let index = 0; index < length; index += 1) pcm[index] = sample(index / sampleRate, index, length)
  const blendLength = loop ? Math.min(Math.round(sampleRate * 0.24), Math.floor(length / 8)) : 0
  for (let offset = 0; offset < blendLength; offset += 1) {
    const mix = (offset + 1) / (blendLength + 1)
    const tail = length - blendLength + offset
    const head = offset
    const average = pcm[head] * (1 - mix) + pcm[tail] * mix
    pcm[head] = average
    pcm[tail] = average
  }
  return pcm
}

function writeWav(pcm, destination, targetPeak) {
  const dataLength = pcm.length * 2
  const buffer = Buffer.alloc(44 + dataLength)
  let currentPeak = 0
  for (const sample of pcm) currentPeak = Math.max(currentPeak, Math.abs(sample))
  const gain = currentPeak > 0 ? targetPeak / currentPeak : 1
  buffer.write('RIFF', 0)
  buffer.writeUInt32LE(36 + dataLength, 4)
  buffer.write('WAVE', 8)
  buffer.write('fmt ', 12)
  buffer.writeUInt32LE(16, 16)
  buffer.writeUInt16LE(1, 20)
  buffer.writeUInt16LE(1, 22)
  buffer.writeUInt32LE(sampleRate, 24)
  buffer.writeUInt32LE(sampleRate * 2, 28)
  buffer.writeUInt16LE(2, 32)
  buffer.writeUInt16LE(16, 34)
  buffer.write('data', 36)
  buffer.writeUInt32LE(dataLength, 40)
  for (let index = 0; index < pcm.length; index += 1) {
    const value = Math.max(-0.88, Math.min(0.88, pcm[index] * gain))
    buffer.writeInt16LE(Math.round(value * 32767), 44 + index * 2)
  }
  return writeFile(destination, buffer)
}

function officeAmbience() {
  const random = noiseGenerator(7917)
  let air = 0
  let rain = 0
  return render(22, (time) => {
    const source = random()
    air += (source - air) * 0.022
    rain += (source - rain) * 0.21
    const slow = 0.84 + 0.16 * Math.sin(2 * Math.PI * 0.043 * time)
    return slow * (0.040 * Math.sin(2 * Math.PI * 50 * time) + 0.014 * Math.sin(2 * Math.PI * 100 * time) + 0.052 * air + 0.012 * rain)
  })
}

function hallwayAmbience() {
  const random = noiseGenerator(2183)
  let low = 0
  let mid = 0
  return render(17, (time) => {
    const source = random()
    low += (source - low) * 0.018
    mid += (source - mid) * 0.09
    const slow = 0.87 + 0.13 * Math.sin(2 * Math.PI * 0.055 * time + 1)
    return slow * (0.027 * Math.sin(2 * Math.PI * 55 * time) + 0.016 * Math.sin(2 * Math.PI * 73 * time) + 0.057 * low + 0.014 * mid)
  })
}

// Original, seamless 48-second score: soft keys and slow minor/add9 chords.
// Each voice wraps its decay across the loop, avoiding a silent restart.
function ambientMusic() {
  const duration = 48
  const pcm = new Float32Array(sampleRate * duration)
  const chords = [[45, 52, 59, 60], [41, 48, 55, 57], [48, 55, 62, 64], [43, 50, 57, 59]]
  const voices = []
  for (let bar = 0; bar < 8; bar++) {
    const chord = chords[bar % chords.length]
    for (const note of chord) voices.push({ note, start: bar * 6, length: 9, pad: true, gain: 0.035 })
    for (let step = 0; step < 3; step++) {
      voices.push({ note: chord[[1, 3, 2][step]] + 12, start: bar * 6 + step * 2, length: 8, pad: false, gain: 0.075 })
    }
  }
  for (const voice of voices) {
    const hz = 440 * 2 ** ((voice.note - 69) / 12)
    for (let i = 0; i < voice.length * sampleRate; i++) {
      const t = i / sampleRate
      const envelope = voice.pad
        ? Math.sin(Math.PI * t / voice.length) ** 2
        : (1 - Math.exp(-t * 30)) * Math.exp(-t * 0.8) * Math.min(1, (voice.length - t) / 0.4)
      const phase = 2 * Math.PI * hz * t
      const tone = Math.sin(phase) + 0.18 * Math.sin(phase * 2) * Math.exp(-t) + 0.05 * Math.sin(phase * 3)
      const index = (Math.round(voice.start * sampleRate) + i) % pcm.length
      pcm[index] += voice.gain * envelope * tone
      // Quiet delay tails provide space without noise or a rhythmic beat.
      pcm[(index + Math.round(sampleRate * 0.37)) % pcm.length] += voice.gain * envelope * tone * 0.22
      pcm[(index + Math.round(sampleRate * 0.73)) % pcm.length] += voice.gain * envelope * tone * 0.1
    }
  }
  return pcm
}

function effect(name) {
  const random = noiseGenerator(name.length * 1729 + 43)
  let filtered = 0
  const softNoise = () => { filtered += (random() - filtered) * 0.12; return filtered }
  const fade = (t, duration) => Math.min(1, t / 0.012, Math.max(0, (duration - t) / 0.06))
  if (name === 'notification') return render(1.2, (time) => {
    // Two overlapping soft bell notes; no abrupt frequency switch.
    let value = 0
    for (const [start, frequency] of [[0, 523.25], [0.19, 659.25]]) {
      const t = time - start
      if (t >= 0) value += (1 - Math.exp(-t * 90)) * Math.exp(-t * 5) * (Math.sin(2 * Math.PI * frequency * t) + 0.15 * Math.sin(2 * Math.PI * frequency * 2 * t))
    }
    return value * fade(time, 1.2)
  }, false)
  if (name === 'phone-vibration') return render(0.82, (time) => {
    const pulse = Math.sin(Math.PI * Math.min(1, Math.max(0, time < 0.32 ? time / 0.32 : (time - 0.46) / 0.32))) ** 2
    return fade(time, 0.82) * pulse * (Math.sin(2 * Math.PI * 92 * time) + 0.08 * softNoise())
  }, false)
  if (name === 'folder') return render(0.65, (time) => {
    const envelope = Math.sin(Math.PI * time / 0.65) ** 2
    return fade(time, 0.65) * envelope * softNoise() * (0.6 + 0.4 * Math.sin(2 * Math.PI * 7 * time) ** 2)
  }, false)
  return render(1.35, (time) => {
    const movement = Math.sin(Math.PI * Math.min(1, time / 1.05)) ** 2
    const t = Math.max(0, time - 0.95)
    const latch = time > 0.95 ? (1 - Math.exp(-t * 200)) * Math.exp(-t * 20) * (Math.sin(2 * Math.PI * 82 * t) + 0.3 * softNoise()) : 0
    return fade(time, 1.35) * (movement * softNoise() * 0.25 + latch)
  }, false)
}

async function encode(ffmpegPath, source, destination, codec) {
  const options = codec === 'vorbis'
    ? ['-c:a', 'libvorbis', '-q:a', '2']
    : ['-c:a', 'libmp3lame', '-b:a', '64k']
  await execFileAsync(ffmpegPath, ['-hide_banner', '-loglevel', 'error', '-y', '-i', source, '-ac', '1', '-ar', '22050', ...options, destination])
}

const musicOnly = process.argv.includes('--music-only')
const effectsOnly = process.argv.includes('--effects-only')
const assets = musicOnly || effectsOnly ? [] : [
  { file: 'src/assets/audio/ambience/consultorio', pcm: officeAmbience(), peak: 0.2 },
  { file: 'src/assets/audio/ambience/pasillo', pcm: hallwayAmbience(), peak: 0.2 },
  ...['notification', 'phone-vibration', 'folder', 'door'].map((name) => ({ file: `src/assets/audio/sfx/${name}`, pcm: effect(name), peak: 0.42 })),
]

if (!effectsOnly) {
  await writeWav(ambientMusic(), path.join(projectRoot, 'src/assets/audio/ambience/silla-vacia-music.wav'), 0.38)
  console.log('Original ambient score: silla-vacia-music.wav')
}
if (!musicOnly) {
  for (const name of ['notification', 'phone-vibration', 'folder', 'door']) {
    await writeWav(effect(name), path.join(projectRoot, `src/assets/audio/sfx/${name}-v2.wav`), name === 'notification' ? 0.3 : 0.38)
  }
  console.log('Updated effects: four WAV assets')
}

const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'fuera-de-sesion-audio-'))
try {
  for (const [index, asset] of assets.entries()) {
    const wav = path.join(temporaryDirectory, `${index}.wav`)
    const target = path.resolve(projectRoot, asset.file)
    await writeWav(asset.pcm, wav, asset.peak)
    await Promise.all([
      encode(ffmpeg, wav, `${target}.ogg`, 'vorbis'),
      encode(ffmpeg, wav, `${target}.mp3`, 'mp3'),
    ])
    console.log(`${asset.file}.ogg / .mp3`)
  }
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true })
}
