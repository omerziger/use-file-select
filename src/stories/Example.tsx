import React from 'react'
import { useFileSelect } from '../'

export default function Example() {
  const { select, files, loading } = useFileSelect({
    accept: 'audio',
    onDone(files) {
      console.log(files)
    },
    multiple: true,
    rules: [{ key: 'duration', max: 9 }]
  })
  return (
    <>
      <button onClick={select}>Select File</button>
      <p>{loading ? 'loading...' : null}</p>

      {files.map(file => (
        <div key={Math.floor(Math.random() * 10000000000) + ''}>
          <p style={file.errors.length ? { color: 'red' } : {}}>{file.file.name}</p>
          <br />
        </div>
      ))}
    </>
  )
}