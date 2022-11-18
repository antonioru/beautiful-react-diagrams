import React from 'react'
import { ComponentStory } from '@storybook/react'
import Tost from '../src/Test'

export default {
  title: 'Test',
  component: 'Test'
}
/**
 * Basic story template
 */
const Template: ComponentStory<typeof Tost> = (args) => <Tost {...args} />

export const BasicUsage = Template.bind({})

BasicUsage.args = {
  name: 'Pippo'
}
