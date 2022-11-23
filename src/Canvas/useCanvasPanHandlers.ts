import { Dispatch, MouseEventHandler, SetStateAction, useCallback, useRef } from 'react'
import { Coordinates } from '../utils/SchemaType'
import { calculateCoordinatesDelta, getMouseEventPoint } from '../utils/fns'

type UseCanvasPanHandlersOptions = {
  pan: Coordinates,
  onPanChange: Dispatch<SetStateAction<Coordinates>>,
  inertia?: number,
}

/**
 * Handles and incorporates the business logic of the Canvas panning.
 * Takes the `pan` state, the `onPanChange` callback and the `inertia` flag.
 * This implementation has been inspired by this wonderful article by Jonathan Clem:
 * https://jclem.net/posts/pan-zoom-canvas-react?utm_campaign=building-a-s--zoomable-canvasdi
 */
const useCanvasPanHandlers = <TElement extends HTMLElement>(options: UseCanvasPanHandlersOptions) => {
  const { pan, onPanChange } = options
  const prevPointRef = useRef(pan)
  const deltaRef = useRef({ x: 0, y: 0 })

  const performPan = useCallback((event: MouseEvent) => {
    const prevPoint = { x: prevPointRef.current.x, y: prevPointRef.current.y }
    const point = getMouseEventPoint(event)

    prevPointRef.current = point

    if (onPanChange) {
      onPanChange(({ x, y }) => {
        const delta = calculateCoordinatesDelta(prevPoint, point)
        deltaRef.current = delta

        return {
          x: x + delta.x,
          y: y + delta.y
        }
      })
    }
  }, [])

  const endPan = useCallback(() => {
    document.removeEventListener('mousemove', performPan)
    document.removeEventListener('mouseup', endPan)
  }, [])

  const onPanStart: MouseEventHandler<TElement> = useCallback((event) => {
    event.preventDefault()

    document.addEventListener('mousemove', performPan, { passive: false })
    document.addEventListener('mouseup', endPan, { passive: false })

    prevPointRef.current = getMouseEventPoint(event)
  }, [onPanChange])

  return onPanStart
}

export default useCanvasPanHandlers
