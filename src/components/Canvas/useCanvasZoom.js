import { useState, useEffect, useCallback } from 'react';
import Events from '../../shared/Events';

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

const defaultOptions = { initialZoom: 1, maxZoom: 5, minZoom: 0.4 };
const wheelOffset = 0.01; // TODO: document this

/**
 * TODO: document this thing
 * inspired by: https://jclem.net/posts/pan-zoom-canvas-react?utm_campaign=building-a-pannable--zoomable-canvasdi
 */
const useCanvasZoom = (ref, options = defaultOptions) => {
  const { initialZoom, maxZoom, minZoom, zoomable, zoomOnWheel } = options;
  const [scale, setScale] = useState(initialZoom);

  const scaleOnWheel = useCallback((event) => {
    if (zoomable && zoomOnWheel) {
      event.preventDefault(); // FIXME: double check on event bubbling

      setScale((currentScale) => {
        // Adjust up to or down to the maximum or minimum scale levels by `interval`.
        if (event.deltaY > 0) {
          return (currentScale + wheelOffset < maxZoom) ? (currentScale + wheelOffset) : maxZoom;
        }

        return (currentScale - wheelOffset > minZoom) ? (currentScale - wheelOffset) : minZoom;
      });
    }
  }, [zoomable, setScale, maxZoom, minZoom]);

  useEvent(ref, Events.WHEEL, scaleOnWheel, { passive: false });

  return [scale, setScale];
};

export default useCanvasZoom;
