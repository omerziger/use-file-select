import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from './Button'

const ButtonStory: any = {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button />

export const Primary: any = Template.bind({})

Primary.args = {
  primary: true,
  label: 'Button',
}

export default ButtonStory
