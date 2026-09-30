import tomasNeutral from './characters/tomas/neutral.webp'
import tomasUneasy from './characters/tomas/uneasy.webp'
import tomasDefensive from './characters/tomas/defensive.webp'
import tomasVulnerable from './characters/tomas/vulnerable.webp'
import consultationRoom from './environments/consultorio/desktop.webp'
import consultationRoomMobile from './environments/consultorio/mobile.webp'
import officeAmbienceOgg from './audio/ambience/consultorio.ogg'
import officeAmbienceMp3 from './audio/ambience/consultorio.mp3'
import hallwayAmbienceOgg from './audio/ambience/pasillo.ogg'
import hallwayAmbienceMp3 from './audio/ambience/pasillo.mp3'
import notificationOgg from './audio/sfx/notification.ogg'
import notificationMp3 from './audio/sfx/notification.mp3'
import vibrationOgg from './audio/sfx/phone-vibration.ogg'
import vibrationMp3 from './audio/sfx/phone-vibration.mp3'
import folderOgg from './audio/sfx/folder.ogg'
import folderMp3 from './audio/sfx/folder.mp3'
import doorOgg from './audio/sfx/door.ogg'
import doorMp3 from './audio/sfx/door.mp3'

export const portraits = {
  neutral: tomasNeutral,
  uneasy: tomasUneasy,
  defensive: tomasDefensive,
  vulnerable: tomasVulnerable,
} as const

export const consultationRoomBackground = consultationRoom
export const consultationRoomMobileBackground = consultationRoomMobile

export const soundAssets = {
  ambience: {
    consultorio: { ogg: officeAmbienceOgg, mp3: officeAmbienceMp3 },
    pasillo: { ogg: hallwayAmbienceOgg, mp3: hallwayAmbienceMp3 },
  },
  effects: {
    notification: { ogg: notificationOgg, mp3: notificationMp3 },
    'phone-vibration': { ogg: vibrationOgg, mp3: vibrationMp3 },
    folder: { ogg: folderOgg, mp3: folderMp3 },
    door: { ogg: doorOgg, mp3: doorMp3 },
  },
} as const
