import { MutableRefObject, useEffect, useRef } from 'react'
import { TEXT, TEXT_DEFAULT_FORMATS } from './constants'
import { FileType } from './types'

export interface UseFileInputProps {
  accept?: FileType
  formats?: string[]
  onChange: (e: Event) => void
  multiple?: boolean
}

export function useFileInput(props: UseFileInputProps): MutableRefObject<HTMLInputElement> {
  const { accept, formats, onChange, multiple } = props
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
    currentFileInput.addEventListener('change', onChange)
    return () => currentFileInput.removeEventListener('change', onChange)
  }, [onChange])

  return fileInput
}
