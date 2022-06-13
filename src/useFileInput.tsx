import { MutableRefObject, useEffect, useRef } from 'react'

export interface UseFileInputProps {
  type?: 'audio' | 'image' | 'video' | null
  formats?: string[]
  onChange: (e: Event) => void
}

export default function useFileInput(
  props: UseFileInputProps
): MutableRefObject<HTMLInputElement> {
  const { type, formats, onChange: handleChange } = props
  const fileInput = useRef<HTMLInputElement>(document.createElement('input'))

  useEffect(() => {
    const currentFileInput = fileInput.current

    currentFileInput.setAttribute('type', 'file')

    if (type && !formats) currentFileInput.setAttribute('accept', `${type}/*`)
    if (type && formats)
      currentFileInput.setAttribute(
        'accept',
        `${type}/*, ${formats.map((f) => `.${f}, `)}`
      )
    if (!type && formats)
      currentFileInput.setAttribute(
        'accept',
        `${formats.map((f) => `.${f}, `)}`
      )

    currentFileInput.addEventListener('change', handleChange)

    return () => currentFileInput.removeEventListener('change', handleChange)
  }, [handleChange, formats])

  return fileInput
}
