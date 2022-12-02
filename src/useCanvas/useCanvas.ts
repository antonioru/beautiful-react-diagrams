import { useState } from 'react'
import { Coordinates } from '../utils/SchemaType'

type InitialCanvasState = {
  pan?: Coordinates,
  scale?: number,
}

/**
 * TODO: document this
 */
const useCanvas = (initialState?: InitialCanvasState) => {
  const [pan, onPanChange] = useState(initialState?.pan || { x: 0, y: 0 })
  const [scale, onScaleChange] = useState(initialState?.scale || 1)

  return {
    pan,
    scale,
    onPanChange,
    onScaleChange
  }
}

export default useCanvas
