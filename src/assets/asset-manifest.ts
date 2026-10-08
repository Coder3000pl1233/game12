import tomasPortrait from './characters/tomas/portrait-v2.webp'
import julianTherapistPortrait from './characters/julian-therapist-v2.png'
import consultationRoom from './environments/consultorio/desktop.webp'
import consultationRoomMobile from './environments/consultorio/mobile.webp'
import ambientMusic from './audio/ambience/silla-vacia-music.wav'
import notification from './audio/sfx/notification.mp3'
import vibration from './audio/sfx/phone-vibration.mp3'
import folder from './audio/sfx/folder.mp3'
import door from './audio/sfx/door.mp3'

export const portraits = {
  neutral: tomasPortrait,
  uneasy: tomasPortrait,
  defensive: tomasPortrait,
  vulnerable: tomasPortrait,
} as const

export { tomasPortrait }
export { julianTherapistPortrait }

export const consultationRoomBackground = consultationRoom
export const consultationRoomMobileBackground = consultationRoomMobile

export const soundAssets = {
  ambience: {
    consultorio: { wav: ambientMusic },
    pasillo: { wav: ambientMusic },
  },
  effects: {
    notification: { ogg: notification, mp3: notification },
    'phone-vibration': { ogg: vibration, mp3: vibration },
    folder: { ogg: folder, mp3: folder },
    door: { ogg: door, mp3: door },
  },
} as const
