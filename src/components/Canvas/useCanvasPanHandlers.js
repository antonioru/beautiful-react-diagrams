import { useCallback, useRef } from 'react';
import { Events } from '../../shared/Utils';
import { isomorphicGetEventPoint } from '../../shared/funcs/isomorphicGetEventPoint';
import stopEvent from '../../shared/funcs/stopEvent';

const friction = 0.9; // TODO: document this stuff
const calculateDelta = ([currentX, currentY], [lastX, lastY]) => ([lastX - currentX, lastY - currentY]);
const applyInertia = (value) => (Math.abs(value) >= 0.1 ? Math.trunc(value * friction) : 0);

/**
 * Handles and incorporates the business logic of the Canvas panning.
 * Takes the `pan` state, the `onPanChange` callback and the `inertia` flag.
 * This implementation has been inspired by this wonderful article by Jonathan Clem:
 * https://jclem.net/posts/pan-zoom-canvas-react?utm_campaign=building-a-s--zoomable-canvasdi
 */
const useCanvasPanHandlers = ({ pan, onPanChange, inertia }) => {
  const prevPointRef = useRef(pan);
  const deltaRef = useRef([0, 0]); // the delta between the last calculated point and the current one during the pan

  /**
   * Prevent the default behaviour of the given mouse/touch event, then calculates the next canvas coordinates
   * from the mouse/touch ones.
   */
  const performPan = useCallback((event) => {
    stopEvent(event);

    if (onPanChange) {
      const prevPoint = [...prevPointRef.current];
      const point = isomorphicGetEventPoint(event);

      prevPointRef.current = point;
      onPanChange(([x, y]) => {
        const delta = calculateDelta(prevPoint, point);
        deltaRef.current = [...delta];
        return [x + delta[0], y + delta[1]];
      });
    }
  }, [onPanChange, deltaRef]);

  /**
   * Simulates the inertia according the delta from the previous point to the last one
   */
  const performInertia = useCallback(() => {
    if (inertia) {
      onPanChange(([x, y]) => ([x + deltaRef.current[0], y + deltaRef.current[1]]));

      deltaRef.current[0] = applyInertia(deltaRef.current[0]);
      deltaRef.current[1] = applyInertia(deltaRef.current[1]);

      if (Math.abs(deltaRef.current[0]) > 0 || Math.abs(deltaRef.current[1]) > 0) {
        requestAnimationFrame(performInertia);
      }
    }
  }, [inertia, onPanChange, deltaRef]);

  /**
   * Removes the event listeners added by `onPanStart` and if the `inertia` flag is true
   * perform the inertia simulating function
   */
  const endPan = useCallback(() => {
    if (onPanChange) {
      document.removeEventListener(Events.MOUSE_MOVE, performPan);
      document.removeEventListener(Events.MOUSE_END, endPan);

      if (inertia) {
        requestAnimationFrame(performInertia);
      }
    }
  }, [performPan, inertia, performInertia, onPanChange]);

  /**
   * Prevent the default behaviour of the given mouse/touch event and adds the event listeners
   * needed to pan the canvas
   */
  const onPanStart = useCallback((event) => {
    stopEvent(event);

    if (onPanChange) {
      document.addEventListener(Events.MOUSE_MOVE, performPan, { passive: false });
      document.addEventListener(Events.MOUSE_END, endPan, { passive: false });
      prevPointRef.current = isomorphicGetEventPoint(event);
    }
  }, [onPanChange, performPan, endPan]);

  return onPanStart;
};

export default useCanvasPanHandlers;
