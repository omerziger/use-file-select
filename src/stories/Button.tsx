import React from 'react'
import useFileWizard from '../useFileWizard'
import './button.css'

export const Button = () => {
  const fileWizard = useFileWizard({ type: 'audio', onLoad: console.log })
  console.log(fileWizard)

  return (
    <>
      <div onClick={fileWizard.click}>click me</div>
      <div
        style={{
          width: '100%',
          height: '20px',
          border: '1px solid black',
          position: 'relative',
          backgroundColor: '#f0f0f0',
        }}
      >
        <div
          style={{
            backgroundColor: 'green',
            height: '100%',
            width: fileWizard.progress + '%',
          }}
        ></div>
        <div
          style={{
            textAlign: 'center',
            zIndex: 1,
            color: 'black',
            position: 'absolute',
            inset: 0,
          }}
        >
          {fileWizard.progress}%
        </div>
      </div>
    </>
  )
}
