import React from 'react'
import { useFileSelect } from '..'
import { CustomRule, UFSFile } from '../types'

export default function Example() {
  const customRule: CustomRule = {key: 'channel-rule', validator: async(file: UFSFile) => {
    let isValid = true
    if (file.audioBuffer?.numberOfChannels !== 2) isValid = false
    return isValid
  }}
 
  const { select, files, isLoading } = useFileSelect({
    accept: 'audio',
    onDone(files) {
      console.log(files)
    },
    multiple: true,
    rules: [customRule]
  })
  return (
    <>
      <button onClick={select}>Select File</button>
      <p>{isLoading ? 'loading...' : null}</p>

      {files.map(file => (
        <div key={Math.floor(Math.random() * 10000000000) + ''}>
          <p style={file.errors.length ? { color: 'red' } : {}}>{file.file.name}</p>
          <br />
        </div>
      ))}
    </>
  )
}