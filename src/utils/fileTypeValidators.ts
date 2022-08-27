export const isAudio = (file: File) => file.type.split('/')[0] === 'audio'
export const isVideo = (file: File) => file.type.split('/')[0] === 'video'
export const isText = (file: File) => file.type.split('/')[0] === 'text'
export const isImage = (file: File) => file.type.split('/')[0] === 'image'

export function isValidAudio(file: File, accept: string): boolean {
    return accept === 'audio' && isAudio(file)
}

export function isValidVideo(file: File, accept: string): boolean {
    return accept === 'video' && isVideo(file)
}

export function isValidImage(file: File, accept: string): boolean {
    return accept === 'image' && isImage(file)
}