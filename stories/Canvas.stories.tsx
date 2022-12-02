import React from 'react'
import { ComponentStory } from '@storybook/react'
import Canvas from '../src/Canvas'
import useCanvas from '../src/useCanvas'

export default {
  title: 'Canvas',
  component: 'Canvas'
}
/**
 * Basic story template
 */
const Template: ComponentStory<typeof Canvas> = (args) => {
  const { pan, scale, onPanChange, onScaleChange } = useCanvas()

  return (
    <div style={{ height: 500, width: 500 }}>
      <Canvas {...args} pan={pan} onPanChange={onPanChange} scale={scale} onScaleChange={onScaleChange}>
        <p>PIPPO!</p>
      </Canvas>

      <hr />
      <button type="button" onClick={() => onScaleChange((c) => c + 0.2)}>scale in</button>
      <button type="button" onClick={() => onScaleChange((c) => c - 0.2)}>scale out</button>
    </div>
  )
}

export const BasicUsage = Template.bind({})

BasicUsage.args = {
  pan: { x: 0, y: 0 }
}
