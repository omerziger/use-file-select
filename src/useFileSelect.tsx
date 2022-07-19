import { useCallback, useRef, useState } from 'react'
import { useFileInput } from '.'
import { decodeAudioFile } from './utils'
import { UFSFile } from './types'

export interface UseFileSelectProps {
  accept: 'audio' | 'image' | 'video' | 'document'
  onLoadEnd?: (UFSFile: UFSFile) => any
  preview?: boolean
}

export function useFileSelect(props: UseFileSelectProps) {
  const { accept, onLoadEnd, preview } = props
  const [loading, setLoading] = useState<boolean>(false)
  const [file, setFile] = useState<UFSFile | null>()
  const [filePreview, setFilePreview] = useState<string | null>()
  const fileReader = useRef<FileReader>(new FileReader())

  const handleInputChange = useCallback((e: Event) => {
    const currentFileReader = fileReader.current
    const readersFile = (e.target as HTMLInputElement).files![0]

    currentFileReader.onloadstart = () => setLoading(true)
    currentFileReader.onloadend = () => handleReaderLoad(readersFile)
    currentFileReader.readAsArrayBuffer(readersFile)
  }, [fileReader.current])

  const fileInput = useFileInput({
    accept: accept !== 'document' ? accept : null,
    onChange: handleInputChange,
  })

  const handleReaderLoad = useCallback((readerFile: File) => {
    const readerDecode = fileReader.current.result as ArrayBuffer

    switch (accept) {
      case 'audio':
      case 'video':
        const handleDecodeSuccess: DecodeSuccessCallback = (dd: AudioBuffer) => {
          const file = { readerFile, readerDecode, audioData: dd }
          setFile(file)
          setLoading(false)
          onLoadEnd?.(file)
        }
        decodeAudioFile(readerDecode as ArrayBuffer, handleDecodeSuccess)
        break
      case 'image':
        const file = { readerFile, readerDecode }
        setFile(file)
        setLoading(false)
        preview && setFilePreview(URL.createObjectURL(readerFile))
        onLoadEnd?.(file)
    }
  }, [])

  return {
    file,
    filePreview,
    loading,
    selectFile: () => fileInput.current.click(),
    clear: () => {
      fileInput.current.value = ''
      fileReader.current.onload = null
      setFile(null)
      setFilePreview(null)
      setLoading(false)
    },
  }
}
