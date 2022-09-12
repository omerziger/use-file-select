import { useState } from 'react'
import { useFileInput } from '.'
import { decodeAudioFile, enforceRules, isValidAudio, isValidImage, isValidVideo } from './utils'
import { FileType, Rule, UFSFile } from './types'

export interface UseFileSelectProps {
  accept: FileType
  onDone?: (files: UFSFile[]) => Promise<any>
  objectURL?: boolean
  multiple?: boolean
  rules?: Rule[]
}

export function useFileSelect(props: UseFileSelectProps) {
  const { accept, onDone, objectURL, rules } = props
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [files, setFiles] = useState<UFSFile[]>([])

  const handleReaderLoadEnd = async (e: ProgressEvent, file: File, resolve: any) => {
    const arrayBuffer = (e.target as FileReader).result as ArrayBuffer
    const resolvedFile: UFSFile = { file, arrayBuffer, errors: [] }

    if (isValidAudio(file, accept) || isValidVideo(file, accept)) {
      await decodeAudioFile(arrayBuffer, (audioBuffer: AudioBuffer) => {
        resolvedFile.audioBuffer = audioBuffer
      })
    }

    if (isValidImage(file, accept) && objectURL) resolvedFile.objectURL = URL.createObjectURL(file)

    if (rules?.length) resolvedFile.errors = await enforceRules(rules, resolvedFile)

    resolve(resolvedFile)
  }

  const processFile = (file: File) => {
    return new Promise(resolve => {
      const fileReader = new FileReader()
      fileReader.onloadend = e => handleReaderLoadEnd(e, file, resolve)
      fileReader.readAsArrayBuffer(file)
    })
  }

  const handleFileChange = async (e: Event) => {
    const fileList = (e.target as HTMLInputElement).files as FileList
    if (!fileList.length) return

    setIsLoading(true)
    const readers: Promise<any>[] = []

    const fileArray = Array.from(fileList)
    fileArray.forEach(f => readers.push(processFile(f)))

    await Promise.all(readers).then(async (resolvedFiles: UFSFile[]) => {
      setFiles(resolvedFiles)
      await onDone?.(resolvedFiles)
      setIsLoading(false)
    })
  }

  const fileInput = useFileInput({
    accept,
    multiple: true,
    onChange: handleFileChange,
  })

  return {
    files,
    isLoading,
    select: () => fileInput.current.click(),
    clear: () => {
      fileInput.current.value = ''
      setFiles([])
      setIsLoading(false)
    },
  }
}
