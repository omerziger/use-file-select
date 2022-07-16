import { useCallback, useRef, useState } from 'react'
import { useFileInput } from './'
import { decodeAudioFile } from './utils'
import { WizardFile } from './types'

export interface UseFileWizardProps {
  type: 'audio' | 'image' | 'video' | 'document'
  onLoadEnd?: (file: WizardFile) => void
}

export function useFileWizard(props: UseFileWizardProps) {
  const { type, onLoadEnd } = props
  const [loading, setLoading] = useState<boolean>(false)
  const [file, setFile] = useState<WizardFile>({ readerFile: null })
  const fileReader = useRef<FileReader>(new FileReader())

  const handleInputChange = useCallback((e: Event) => {
    const currentFileReader = fileReader.current
    const readersFile = (e.target as HTMLInputElement).files![0]

    currentFileReader.onloadstart = () => setLoading(true)
    currentFileReader.onload = () => handleReaderLoad(readersFile)

    switch (type) {
      case 'audio':
      case 'video':
        currentFileReader.readAsArrayBuffer(readersFile)
        break;
    }
  }, [fileReader.current])

  const fileInput = useFileInput({
    type: type !== 'document' ? type : null,
    onChange: handleInputChange,
  })

  const handleReaderLoad = useCallback((readerFile: File) => {
    const readerDecode = fileReader.current.result

    switch (type) {
      case 'audio':
      case 'video':
        const handleDecodeSuccess: DecodeSuccessCallback = (dd: AudioBuffer) => {
          const file = { readerFile, readerDecode, audioData: dd }
          setFile(file)
          onLoadEnd?.(file)
          setLoading(false)
        }
        decodeAudioFile(readerDecode as ArrayBuffer, handleDecodeSuccess)
        break;
    }
  }, [])

  return {
    file,
    loading,
    click: () => fileInput.current.click(),
    clear: () => {
      fileInput.current.value = ''
      fileReader.current.onload = null
      setFile({ readerFile: null })
      setLoading(false)
    },
  }
}
