import { useCallback, useRef, useState } from 'react'
import { useFileInput } from '.'
import { decodeAudioFile } from './utils'
import { UFSFile } from './types'

export interface UseFileSelectProps {
  accept: 'audio' | 'image' | 'video' | 'text'
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
    accept,
    onChange: handleInputChange,
  })

  const handleReaderLoad = useCallback((readerFile: File) => {
    const readerDecode = fileReader.current.result as ArrayBuffer

    switch (accept) {
      case 'audio':
      case 'video':
        const handleDecodeSuccess: DecodeSuccessCallback = (dd: AudioBuffer) => {
          setFile({ readerFile, readerDecode, audioData: dd })
          setLoading(false)
          onLoadEnd?.({ readerFile, readerDecode, audioData: dd })
        }
        decodeAudioFile(readerDecode as ArrayBuffer, handleDecodeSuccess)
        break
      case 'image':
        setFile({ readerFile, readerDecode })
        setLoading(false)
        preview && setFilePreview(URL.createObjectURL(readerFile))
        onLoadEnd?.({ readerFile, readerDecode })
        break
      case 'text':
        setFile({ readerFile, readerDecode })
        setLoading(false)
        onLoadEnd?.({ readerFile, readerDecode })
        break
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
