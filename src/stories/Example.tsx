import React from 'react'
import { useFileSelect } from '../'

export default function Example() {
  const { file, selectFile, filePreview } = useFileSelect({
    accept: 'image',
    onLoadEnd(file) { console.log(file) },
    preview: true
  })
  return (
    <>
      <button onClick={selectFile}>Select File</button>
      <text>{file?.readerFile?.name}</text>
      <br/>
      {filePreview && <img src={filePreview} />}
    </>
  )
}