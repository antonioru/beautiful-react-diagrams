import { Dispatch, RefObject, SetStateAction, useEffect } from 'react'

type UseCanvasScaleOptions = {
  onScaleChange?: Dispatch<SetStateAction<number>>,
  resetScaleOnDblClick?: boolean,
}

/**
 * Handles and incorporates the business logic of scaling the Canvas.
 * This implementation has been inspired by this wonderful article by Jonathan Clem:
 * https://jclem.net/posts/pan-zoom-canvas-react?utm_campaign=building-a-s--zoomable-canvasdi
 *
 * TODO: consider to add the zoom-in/out on mouse wheel functionality
 */
const useCanvasScale = <TElement extends HTMLElement>(ref: RefObject<TElement>, options: UseCanvasScaleOptions) => {
  const { onScaleChange, resetScaleOnDblClick } = options

  /**
   * Makes sure the scale returns to its original value (1)
   * when mouse double clicks
   */
  useEffect(() => {
    const target = ref.current

    const onDoubleClick = () => {
      if (onScaleChange && resetScaleOnDblClick) {
        onScaleChange(1)
      }
    }

    if (target) {
      target.addEventListener('dblclick', onDoubleClick)
    }
    return () => {
      if (target) {
        target.removeEventListener('dblclick', onDoubleClick)
      }
    }
  }, [resetScaleOnDblClick])
}

export default useCanvasScale
