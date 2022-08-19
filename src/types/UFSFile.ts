import { UFSError } from "./UFSError"

export type UFSFile = {
    file: File
    arrayBuffer: ArrayBuffer
    audioBuffer?: AudioBuffer
    preview?: string | null
    errors: UFSError[]
}