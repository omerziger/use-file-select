import React from 'react'
import useFileWizard from '../useFileWizard'
import './button.css'

export const Button = () => {
  const fileWizard = useFileWizard({ type: 'audio', onLoad: console.log })
  console.log(fileWizard)

  return (
    <>
      <div onClick={fileWizard.click}>click me</div>
    </>
  )
}
