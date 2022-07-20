import { MutableRefObject, useEffect, useRef } from 'react'

export interface UseFileInputProps {
  accept?: 'audio' | 'image' | 'video' | 'text' | null
  formats?: string[]
  onChange: (e: Event) => void
}
const TEXT_DEFAULT = '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.text,application/pdf'

export function useFileInput(props: UseFileInputProps): MutableRefObject<HTMLInputElement> {
  const { accept, formats, onChange: handleChange } = props
  const fileInput = useRef<HTMLInputElement>(document.createElement('input'))

  useEffect(() => {
    const currentFileInput = fileInput.current
    currentFileInput.setAttribute('type', 'file')
    if (accept === 'text' && !formats) currentFileInput.setAttribute('accept', TEXT_DEFAULT)
    if (accept && accept !== 'text' && !formats) currentFileInput.setAttribute('accept', `${accept}/*`)
    if (accept && formats) currentFileInput.setAttribute('accept', `${accept}/*, ${formats.map((f) => `.${f}, `)}`)
    if (!accept && formats) currentFileInput.setAttribute('accept', `${formats.map((f) => `.${f}, `)}`)
  }, [formats])

  useEffect(() => {
    const currentFileInput = fileInput.current
    currentFileInput.addEventListener('change', handleChange)
    return () => currentFileInput.removeEventListener('change', handleChange)
  }, [handleChange])

  return fileInput
}
