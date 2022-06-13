import React from 'react'
import useFileWizard from '../useFileWizard'
import './button.css'

const styles = {
  progressContainer: {
    width: '100%',
    height: '20px',
    border: '1px solid black',
    backgroundColor: '#f0f0f0',
  },
  progressBar: {
    backgroundColor: 'green',
    height: '100%',
  },
  progressText: {
    zIndex: 1,
    color: 'black',
    inset: 0,
  },
}

export const Button = () => {
  const fileWizard = useFileWizard({ type: 'audio', onLoad: console.log })
  console.log(fileWizard)

  return (
    <>
      <div onClick={fileWizard.click}>click me</div>
      <div style={{ position: 'relative', ...styles.progressContainer }}>
        <div
          style={{
            ...styles.progressBar,
            width: fileWizard.progress + '%',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            textAlign: 'center',
            ...styles.progressText,
          }}
        >
          {fileWizard.progress}%
        </div>
      </div>
    </>
  )
}
