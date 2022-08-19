export async function decodeAudioFile(file: ArrayBuffer, handleDecodeSuccess: DecodeSuccessCallback) {
    const audioContext = new AudioContext()
    await audioContext.decodeAudioData(file, handleDecodeSuccess)
}