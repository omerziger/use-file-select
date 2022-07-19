import { MutableRefObject, useEffect, useRef } from 'react'

export interface UseFileInputProps {
  accept?: 'audio' | 'image' | 'video' | null
  formats?: string[]
  onChange: (e: Event) => void
}

export function useFileInput(props: UseFileInputProps): MutableRefObject<HTMLInputElement> {
  const { accept, formats, onChange: handleChange } = props
  const fileInput = useRef<HTMLInputElement>(document.createElement('input'))

  useEffect(() => {
    const currentFileInput = fileInput.current
    currentFileInput.setAttribute('type', 'file')
    if (accept && !formats) currentFileInput.setAttribute('accept', `${accept}/*`)
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
