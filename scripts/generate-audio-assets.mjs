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

function render(duration, sample) {
  const length = Math.round(duration * sampleRate)
  const pcm = new Float32Array(length)
  for (let index = 0; index < length; index += 1) pcm[index] = sample(index / sampleRate, index, length)
  const blendLength = Math.min(Math.round(sampleRate * 0.24), Math.floor(length / 8))
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

function effect(name) {
  const random = noiseGenerator(name.length * 1729 + 43)
  if (name === 'notification') return render(0.72, (time) => {
    const envelope = Math.exp(-time * 4.4) * Math.min(1, time * 30)
    const frequency = time < 0.22 ? 587.33 : 493.88
    const phaseTime = time < 0.22 ? time : time - 0.22
    return envelope * 0.13 * Math.sin(2 * Math.PI * frequency * phaseTime)
  })
  if (name === 'phone-vibration') return render(0.82, (time) => {
    const pulse = Math.pow(Math.max(0, Math.sin(2 * Math.PI * 12 * time)), 5)
    const envelope = Math.min(1, time * 22) * Math.min(1, (0.82 - time) * 6)
    return envelope * pulse * (0.095 * Math.sin(2 * Math.PI * 92 * time) + 0.022 * random())
  })
  if (name === 'folder') return render(0.48, (time) => {
    const source = random()
    const envelope = time < 0.29 ? Math.sin(Math.PI * time / 0.29) : Math.exp(-(time - 0.29) * 11)
    return envelope * (0.055 * source + 0.035 * Math.sin(2 * Math.PI * 145 * time))
  })
  return render(1.25, (time) => {
    const source = random()
    const envelope = Math.sin(Math.PI * Math.min(1, time / 1.25))
    const scrape = 0.05 * source * (time < 0.86 ? 1 : 0.45)
    const creak = 0.04 * Math.sin(2 * Math.PI * (126 + 70 * time) * time)
    const close = time > 1.04 ? 0.055 * Math.sin(2 * Math.PI * 74 * (time - 1.04)) * Math.exp(-(time - 1.04) * 24) : 0
    return envelope * (scrape + creak) + close
  })
}

async function encode(ffmpegPath, source, destination, codec) {
  const options = codec === 'vorbis'
    ? ['-c:a', 'libvorbis', '-q:a', '2']
    : ['-c:a', 'libmp3lame', '-b:a', '64k']
  await execFileAsync(ffmpegPath, ['-hide_banner', '-loglevel', 'error', '-y', '-i', source, '-ac', '1', '-ar', '22050', ...options, destination])
}

const assets = [
  { file: 'src/assets/audio/ambience/consultorio', pcm: officeAmbience(), peak: 0.2 },
  { file: 'src/assets/audio/ambience/pasillo', pcm: hallwayAmbience(), peak: 0.2 },
  ...['notification', 'phone-vibration', 'folder', 'door'].map((name) => ({ file: `src/assets/audio/sfx/${name}`, pcm: effect(name), peak: 0.42 })),
]

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
