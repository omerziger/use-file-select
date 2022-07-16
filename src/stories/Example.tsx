import React from 'react'
import { useFileWizard } from '../'

type Props = {}

export default function Example({ }: Props) {
  const fileWizard = useFileWizard({
    type: 'image', onLoadEnd(wizardFile) {
      console.log(wizardFile);
    },
  })
  return (
    <button onClick={fileWizard.click}>Select File</button>
  )
}