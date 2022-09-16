import { useState } from 'react'
import { useFileInput } from '.'
import { decodeAudioFile, enforceRules, isValidFile } from './utils'
import { AUDIO, VIDEO } from './constants'
import { FileType, Rule, UFSFile } from './types'

export interface UseFileSelectProps {
  accept?: FileType
  rules?: Rule[]
  objectURL?: boolean
  multiple?: boolean
  onDone?: (files: UFSFile[]) => Promise<any>
}

export function useFileSelect(props: UseFileSelectProps = {}) {
  const { accept, rules, objectURL, multiple, onDone } = props
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [files, setFiles] = useState<UFSFile[]>([])

  const handleReaderLoadEnd = async (e: ProgressEvent, file: File, resolve: any, reject: any) => {
    const arrayBuffer = (e.target as FileReader).result as ArrayBuffer
    const resolvedFile: UFSFile = { file, arrayBuffer, errors: [] }

    if (accept) {
      if (!isValidFile(file, accept)) {
        reject(new Error(`Mime type "${file.type}" of file: ${file.name}, does not match the accept prop`))
      }

      switch (accept) {
        case AUDIO:
        case VIDEO:
          await decodeAudioFile(arrayBuffer, (audioBuffer: AudioBuffer) => {
            resolvedFile.audioBuffer = audioBuffer
          })
      }
    }

    if (rules?.length) resolvedFile.errors = await enforceRules(rules, resolvedFile)
    if (objectURL) resolvedFile.objectURL = URL.createObjectURL(file)

    resolve(resolvedFile)
  }

  const processFile = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.onloadend = e => handleReaderLoadEnd(e, file, resolve, reject)
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
    multiple,
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
