import { AUDIO, IMAGE, VIDEO } from "../constants"
import { FileType } from "../types"

export const isAudio = (file: File) => file.type.split('/')[0] === 'audio'
export const isVideo = (file: File) => file.type.split('/')[0] === 'video'
export const isText = (file: File) => file.type.split('/')[0] === 'text'
export const isImage = (file: File) => file.type.split('/')[0] === 'image'

export function isValidFile(file: File, accept: FileType): boolean {
    switch (accept) {
        case AUDIO:
            return isAudio(file)
        case VIDEO:
            return isVideo(file)
        case IMAGE:
            return isImage(file)
        default:
            return false
    }
}