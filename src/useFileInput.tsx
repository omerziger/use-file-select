import { MutableRefObject, useEffect, useRef } from 'react'
import { TEXT, TEXT_DEFAULT_FORMATS } from './constants'
import { FileType } from './types'

export interface UseFileInputProps {
  accept?:  FileType | null
  formats?: string[]
  onChange: (e: Event) => void
  multiple?: boolean
}

export function useFileInput(props?: UseFileInputProps): MutableRefObject<HTMLInputElement> {
  const { accept, formats, onChange: handleChange, multiple } = props ?? {}
  const fileInput = useRef<HTMLInputElement>(document.createElement('input'))

  useEffect(() => {
    const currentFileInput = fileInput.current
    currentFileInput.setAttribute('type', 'file')

    multiple && currentFileInput.setAttribute('multiple', multiple.toString())

    if (accept && accept === TEXT && !formats) currentFileInput.setAttribute('accept', TEXT_DEFAULT_FORMATS)
    if (accept && accept !== TEXT && !formats) currentFileInput.setAttribute('accept', `${accept}/*`)
    if (accept && formats) currentFileInput.setAttribute('accept', `${accept}/*, ${formats.map((f) => `.${f}, `)}`)
    if (!accept && formats) currentFileInput.setAttribute('accept', `${formats.map((f) => `.${f}, `)}`)
  }, [formats])

  useEffect(() => {
    const currentFileInput = fileInput.current
    handleChange && currentFileInput.addEventListener('change', handleChange)
    return () => handleChange && currentFileInput.removeEventListener('change', handleChange)
  }, [handleChange])

  return fileInput
}
