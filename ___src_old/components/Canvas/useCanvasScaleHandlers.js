import { useEffect, useCallback } from 'react';
import { Events } from '../../shared/Utils';
import stopEvent from '../../shared/funcs/stopEvent';

// TODO: move this to the hooks library
const useEvent = (ref, event, callback, options) => {
  useEffect(() => {
    const el = ref.current;

    if (el) {
      ref.current.addEventListener(event, callback, options);
    }

    return () => {
      if (el) {
        el.removeEventListener(event, callback, options);
      }
    };
  }, [ref, callback, options, event]);
};

const wheelRatio = 0.02;

/**
 * Handles and incorporates the business logic of scaling the Canvas.
 * This implementation has been inspired by this wonderful article by Jonathan Clem:
 * https://jclem.net/posts/pan-zoom-canvas-react?utm_campaign=building-a-s--zoomable-canvasdi
 */
const useCanvasScaleHandlers = (ref, options) => {
  const { onScaleChange, maxScale, minScale, scaleOnWheel, resetScaleOnDblClick } = options;

  /**
   * Prevent the default behaviour of the given mouse/touch and calculates the Canvas scale
   * according to the wheel movement.
   */
  const performScaleOnWheel = useCallback((event) => {
    stopEvent(event);
    if (onScaleChange && scaleOnWheel) {
      onScaleChange((currentScale) => {
        if (event.deltaY < 0) {
          return (currentScale + wheelRatio < maxScale) ? (currentScale + wheelRatio) : maxScale;
        }

        return (currentScale - wheelRatio > minScale) ? (currentScale - wheelRatio) : minScale;
      });
    }
  }, [onScaleChange, scaleOnWheel, maxScale, minScale]);

  const resetZoom = useCallback((event) => {
    stopEvent(event);
    if (onScaleChange && resetScaleOnDblClick) {
      onScaleChange(1);
    }
  }, [onScaleChange, resetScaleOnDblClick]);

  useEvent(ref, Events.WHEEL, performScaleOnWheel);
  useEvent(ref, Events.DOUBLE_CLICK, resetZoom);
};

export default useCanvasScaleHandlers;
