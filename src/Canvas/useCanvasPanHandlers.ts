import { Dispatch, MouseEventHandler, SetStateAction, useCallback, useRef } from 'react'
import { Coordinates } from '../utils/SchemaType'
import { calculateCoordinatesDelta, getMouseEventPoint } from '../utils/fns'

type UseCanvasPanHandlersOptions = {
  pan: Coordinates,
  onPanChange: Dispatch<SetStateAction<Coordinates>>,
  inertia?: boolean,
}

const friction = 0.9
const applyInertia = (value: number) => (Math.abs(value) >= 0.1 ? Math.trunc(value * friction) : 0)

/**
 * Handles and incorporates the business logic of the Canvas panning.
 * Takes the `pan` state, the `onPanChange` callback and the `inertia` flag.
 * This implementation has been inspired by this wonderful article by Jonathan Clem:
 * https://jclem.net/posts/pan-zoom-canvas-react?utm_campaign=building-a-s--zoomable-canvasdi
 */
const useCanvasPanHandlers = <TElement extends HTMLElement>(options: UseCanvasPanHandlersOptions) => {
  const { pan, onPanChange, inertia } = options
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

  const performInertia = useCallback(() => {
    if (inertia) {
      onPanChange(({ x, y }) => ({ x: x + deltaRef.current.x, y: y + deltaRef.current.y }))

      deltaRef.current.x = applyInertia(deltaRef.current.x)
      deltaRef.current.y = applyInertia(deltaRef.current.y)

      if (Math.abs(deltaRef.current.x) > 0 || Math.abs(deltaRef.current.y) > 0) {
        requestAnimationFrame(performInertia)
      }
    }
  }, [inertia])

  const endPan = useCallback(() => {
    document.removeEventListener('mousemove', performPan)
    document.removeEventListener('mouseup', endPan)

    if (inertia) {
      requestAnimationFrame(performInertia)
    }
  }, [inertia])

  const onPanStart: MouseEventHandler<TElement> = useCallback((event) => {
    event.preventDefault()

    document.addEventListener('mousemove', performPan, { passive: false })
    document.addEventListener('mouseup', endPan, { passive: false })

    prevPointRef.current = getMouseEventPoint(event)
  }, [onPanChange])

  return onPanStart
}

export default useCanvasPanHandlers
