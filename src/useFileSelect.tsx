import { useState } from 'react'
import { useFileInput } from '.'
import { decodeAudioFile, uid } from './utils'
import { UFSFile } from './types'

export interface UseFileSelectProps {
  accept: 'audio' | 'image' | 'video' | 'text'
  onDone?: (files: UFSFile[]) => any
  preview?: boolean
  multiple?: boolean
}

export function useFileSelect(props: UseFileSelectProps) {
  const { accept, onDone, preview } = props
  const [loading, setLoading] = useState<boolean>(false)
  const [files, setFiles] = useState<UFSFile[]>([])

  const handleReaderLoadEnd = (e: ProgressEvent, file: File, UID: String, resolve: any) => {
    const arrayBuffer = (e.target as FileReader).result as ArrayBuffer

    switch (accept) {
      case 'audio':
      case 'video':
        decodeAudioFile(arrayBuffer, (audioBuffer: AudioBuffer) => resolve({ file, UID, arrayBuffer, audioBuffer }))
        break
      case 'image':
        resolve({ file, UID, arrayBuffer, preview: preview ? URL.createObjectURL(file) : null })
        break
      case 'text':
        resolve({ file, arrayBuffer, UID })
        break
    }
  }

  const processFile = (file: File, UID: String) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.onloadend = e => handleReaderLoadEnd(e, file, UID, resolve)
      fileReader.readAsArrayBuffer(file)
    })
  }

  const fileInput = useFileInput({
    accept,
    multiple: true,
    onChange: async (e: Event) => {
      const fileList = (e.target as HTMLInputElement).files as FileList
      if (!fileList.length) return

      const readers: Promise<any>[] = []

      setLoading(true)

      const fileArr = Array.from(fileList)
      fileArr.forEach(f => readers.push(processFile(f, uid())))

      await Promise.all(readers).then(async (resolvedFiles) => {
        setFiles(resolvedFiles)
        await onDone?.(resolvedFiles)
        setLoading(false)
      })
    },
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
