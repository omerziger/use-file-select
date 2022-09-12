import { UFSCustomError, UFSError } from "./errorTypes"

export type UFSFile = {
    file: File
    arrayBuffer: ArrayBuffer
    audioBuffer?: AudioBuffer
    objectURL?: string | null
    errors: Array<UFSError | UFSCustomError>
}

export type FileType = 'audio' | 'video' | 'image' | 'text'