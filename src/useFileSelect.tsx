import { useMemo, useState } from 'react'
import { useFileInput } from '.'
import { decodeAudioFile, enforceRules, isValidAudio, isValidImage, isValidVideo } from './utils'
import { Rule, UFSFile } from './types'

export interface UseFileSelectProps {
  accept: 'audio' | 'image' | 'video' | 'text'
  onDone?: (files: UFSFile[]) => any
  preview?: boolean
  multiple?: boolean
  rules?: Rule[]
}

export function useFileSelect(props: UseFileSelectProps) {
  const { accept, onDone, preview, rules } = props
  const [loading, setLoading] = useState<boolean>(false)
  const [files, setFiles] = useState<UFSFile[]>([])
  const isRules = useMemo(() => Boolean(rules?.length), [rules])

  const handleReaderLoadEnd = async (e: ProgressEvent, file: File, resolve: any) => {
    const arrayBuffer = (e.target as FileReader).result as ArrayBuffer
    const resolvedFile: Partial<UFSFile> = { file, arrayBuffer, errors: [] }

    if (isValidAudio(file, accept) || isValidVideo(file, accept)) {
      await decodeAudioFile(arrayBuffer, (audioBuffer: AudioBuffer) => {
        resolvedFile.audioBuffer = audioBuffer
      })
    }

    if (isValidImage(file, accept) && preview) resolvedFile.preview = URL.createObjectURL(file)

    if (isRules) resolvedFile.errors = enforceRules(rules as Rule[], resolvedFile as UFSFile)

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

    setLoading(true)
    const readers: Promise<any>[] = []

    const fileArray = Array.from(fileList)
    fileArray.forEach(f => readers.push(processFile(f)))

    await Promise.all(readers).then(async (resolvedFiles: UFSFile[]) => {
      setFiles(resolvedFiles)
      await onDone?.(resolvedFiles)
      setLoading(false)
    })
  }

  const fileInput = useFileInput({
    accept,
    multiple: true,
    onChange: handleFileChange,
  })

  return {
    files,
    loading,
    select: () => fileInput.current.click(),
    clear: () => {
      fileInput.current.value = ''
      setFiles([])
      setLoading(false)
    },
  }
}
