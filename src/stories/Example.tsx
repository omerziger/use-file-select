import React from 'react'
import { useFileWizard } from '../'

type Props = {}

export default function Example({ }: Props) {
  const fileWizard = useFileWizard({
    type: 'audio', onLoad(file) {
      console.log(file);
    },
  })
  return (
    <button onClick={fileWizard.click}>Select File</button>
  )
}