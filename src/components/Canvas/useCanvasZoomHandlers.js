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
const useCanvasZoomHandlers = (ref, options) => {
  const { onZoomChange, maxZoom, minZoom, zoomOnWheel, zoomResetOnDblClick } = options;

  /**
   * Prevent the default behaviour of the given mouse/touch and calculates the Canvas scale
   * according to the wheel movement.
   */
  const scaleOnWheel = useCallback((event) => {
    stopEvent(event);
    if (onZoomChange && zoomOnWheel) {
      onZoomChange((currentScale) => {
        if (event.deltaY < 0) {
          return (currentScale + wheelRatio < maxZoom) ? (currentScale + wheelRatio) : maxZoom;
        }

        return (currentScale - wheelRatio > minZoom) ? (currentScale - wheelRatio) : minZoom;
      });
    }
  }, [onZoomChange, zoomOnWheel, maxZoom, minZoom]);

  const resetZoom = useCallback((event) => {
    stopEvent(event);
    if (onZoomChange && zoomResetOnDblClick) {
      onZoomChange(1);
    }
  }, [onZoomChange, zoomResetOnDblClick]);

  useEvent(ref, Events.WHEEL, scaleOnWheel);
  useEvent(ref, Events.DOUBLE_CLICK, resetZoom);
};

export default useCanvasZoomHandlers;
