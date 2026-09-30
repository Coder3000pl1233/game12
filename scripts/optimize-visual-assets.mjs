import path from 'node:path'
import { mkdir } from 'node:fs/promises'
import sharp from 'sharp'

const [sourceDirectory, outputDirectory = 'src/assets'] = process.argv.slice(2)
if (!sourceDirectory) {
  console.error('Uso: node scripts/optimize-visual-assets.mjs <carpeta-con-png-originales> [carpeta-de-salida]')
  process.exitCode = 1
} else {
  const sources = path.resolve(sourceDirectory)
  const output = path.resolve(outputDirectory)
  const portraitOutput = path.join(output, 'characters', 'tomas')
  const roomOutput = path.join(output, 'environments', 'consultorio')
  await Promise.all([mkdir(portraitOutput, { recursive: true }), mkdir(roomOutput, { recursive: true })])

  for (const expression of ['neutral', 'uneasy', 'defensive', 'vulnerable']) {
    await sharp(path.join(sources, `${expression}.png`))
      .resize({ width: 768, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(path.join(portraitOutput, `${expression}.webp`))
  }

  const desktopPath = path.join(roomOutput, 'desktop.webp')
  await sharp(path.join(sources, 'consultorio.png'))
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(desktopPath)
  const { width = 1600, height = 900 } = await sharp(desktopPath).metadata()
  const cropWidth = Math.min(width, Math.round(height * 0.8))
  const focalX = Math.round(width * 0.66)
  const left = Math.max(0, Math.min(width - cropWidth, focalX - Math.round(cropWidth / 2)))
  await sharp(desktopPath)
    .extract({ left, top: 0, width: cropWidth, height })
    .resize(800, 1000)
    .webp({ quality: 82, effort: 6 })
    .toFile(path.join(roomOutput, 'mobile.webp'))
  console.log(`Recursos visuales optimizados en ${output}`)
}
