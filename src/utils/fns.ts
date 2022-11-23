import { Coordinates } from './SchemaType'

export const getMouseEventPoint = <TEvent extends { clientX: number, clientY: number }>(e: TEvent) => ({ x: e.clientX, y: e.clientY })
export const getTouchEventPoint = (e: TouchEvent) => getMouseEventPoint(e.changedTouches[0])

export const calculateCoordinatesDelta = (first: Coordinates, second: Coordinates) => ({ x: second.x - first.x, y: second.y - first.y })

/**
 * Takes scale and pan and returns the style to be applied to Canvas element
 */
export const calcCanvasStyle = (scale: number, coordinates: Coordinates) => ({
  transform: `translate3d(${coordinates.x}px, ${coordinates.y}px, 0) scale(${scale})`
})
