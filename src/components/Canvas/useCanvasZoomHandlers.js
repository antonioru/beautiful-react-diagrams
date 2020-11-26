import { useEffect, useCallback } from 'react';
import { Events } from '../../shared/Constants';

// TODO: move to the hooks library
const useEvent = (ref, event, callback, options) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener(event, callback, options);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener(event, callback, options);
      }
    };
  }, [ref.current]);
};

const defaultOptions = { zoom: 1, maxZoom: 5, minZoom: 0.4 };
const wheelOffset = 0.01; // TODO: document this

/**
 * TODO: document this thing
 * inspired by: https://jclem.net/posts/pan-zoom-canvas-react?utm_campaign=building-a-pannable--zoomable-canvasdi
 */
const useCanvasZoomHandlers = (ref, options = defaultOptions) => {
  const { onZoomChange, maxZoom, minZoom, zoomOnWheel, zoomResetOnDblClick } = options;

  const scaleOnWheel = useCallback((event) => {
    if (onZoomChange && zoomOnWheel) {
      event.preventDefault();
      event.stopPropagation();

      onZoomChange((currentScale) => {
        if (event.deltaY > 0) {
          return (currentScale + wheelOffset < maxZoom) ? (currentScale + wheelOffset) : maxZoom;
        }

        return (currentScale - wheelOffset > minZoom) ? (currentScale - wheelOffset) : minZoom;
      });
    }
  }, [onZoomChange, zoomOnWheel, maxZoom, minZoom]);

  const resetZoom = useCallback((event) => {
    if (onZoomChange && zoomResetOnDblClick) {
      event.preventDefault();
      event.stopPropagation();
      onZoomChange(1);
    }
  }, [onZoomChange, zoomResetOnDblClick]);

  useEvent(ref, Events.WHEEL, scaleOnWheel, { passive: false, capture: true });
  useEvent(ref, Events.DOUBLE_CLICK, resetZoom, { passive: false, capture: true });
};

export default useCanvasZoomHandlers;
