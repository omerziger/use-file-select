import React from 'react'
import { useFileSelect } from '../'

export default function Example() {
  const {select, files, loading, clear} = useFileSelect({
    accept: 'text',
    onDone(files) { console.log(files) },
    multiple: true,
  })
  return (
    <>
      <button onClick={select}>Select File</button>
      <p>{loading ? 'loading...' : null}</p>
      {files.map(f => {
        debugger
        return (
          <>
          <p>{f.file.name}</p>
          <br/>
          </>
        )
      })}
    </>
  )
}