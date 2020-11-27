import { useEffect, useCallback } from 'react';
import { Events, isTouch } from '../../shared/Constants';
import stopEvent from '../../shared/funcs/stopEvent';

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
    stopEvent(event);
    if (onZoomChange && zoomOnWheel) {
      onZoomChange((currentScale) => {
        if (event.deltaY > 0) {
          return (currentScale + wheelOffset < maxZoom) ? (currentScale + wheelOffset) : maxZoom;
        }

        return (currentScale - wheelOffset > minZoom) ? (currentScale - wheelOffset) : minZoom;
      });
    }
  }, [onZoomChange, zoomOnWheel, maxZoom, minZoom]);

  const resetZoom = useCallback((event) => {
    stopEvent(event);
    if (onZoomChange && zoomResetOnDblClick) {
      onZoomChange(1);
    }
  }, [onZoomChange, zoomResetOnDblClick]);

  if (!isTouch) {
    useEvent(ref, Events.WHEEL, scaleOnWheel);
    useEvent(ref, Events.DOUBLE_CLICK, resetZoom);
  }
};

export default useCanvasZoomHandlers;
