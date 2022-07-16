import React from 'react'
import { useFileWizard } from '../'

export default function Example() {
  const { file, click, filePreview } = useFileWizard({
    type: 'image',
    onLoadEnd(wizardFile) { console.log(wizardFile) },
    preview: true
  })
  return (
    <>
      <button onClick={click}>Select File</button>
      <text>{file?.readerFile?.name}</text>
      <br/>
      {filePreview && <img src={filePreview} />}
    </>
  )
}