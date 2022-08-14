export type UFSFile = {
    UID: String
    file: File
    arrayBuffer: ArrayBuffer
    audioBuffer?: AudioBuffer
    preview?: string | null
}