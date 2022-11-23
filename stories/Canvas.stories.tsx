import React, { useState } from 'react'
import { ComponentStory } from '@storybook/react'
import Canvas from '../src/Canvas'

export default {
  title: 'Canvas',
  component: 'Canvas'
}
/**
 * Basic story template
 */
const Template: ComponentStory<typeof Canvas> = (args) => {
  const [pan, setPan] = useState({ x: 0, y: 0 })

  return (
    <div style={{ height: 500, width: 500 }}>
      <Canvas {...args} pan={pan} onPanChange={setPan}>
        <p>PIPPO!</p>
      </Canvas>
    </div>
  )
}

export const BasicUsage = Template.bind({})

BasicUsage.args = {
  pan: { x: 0, y: 0 }
}
