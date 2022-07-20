import React from 'react'
import { useFileSelect } from '../'

export default function Example() {
  const { file, selectFile, filePreview } = useFileSelect({
    accept: 'text',
    onLoadEnd(file) { console.log(file) },
  })
  return (
    <>
      <button onClick={selectFile}>Select File</button>
      <p>{file?.readerFile?.name}</p>
      <br/>
      {filePreview && <img src={filePreview} />}
    </>
  )
}