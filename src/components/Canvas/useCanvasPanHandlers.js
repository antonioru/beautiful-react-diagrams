import { useCallback, useRef } from 'react';
import { Events } from '../../shared/Constants';
import { getEventPoint } from '../../shared/funcs/getEventPoint';
import stopEvent from '../../shared/funcs/stopEvent';

const friction = 0.8; // TODO: document this stuff
const calculateDelta = ([currentX, currentY], [lastX, lastY]) => ([lastX - currentX, lastY - currentY]);
const applyInertia = (value) => (Math.abs(value) >= 0.5 ? Math.trunc(value * friction) : 0);

/**
 * TODO: document this thing
 * Inspired by this article:
 * https://jclem.net/posts/pan-zoom-canvas-react?utm_campaign=building-a-s--zoomable-canvasdi
 */
const useCanvasPanHandlers = ({ pan, onPanChange, inertia }) => {
  const lastPointRef = useRef(pan);
  const deltaRef = useRef([0, 0]);

  // TODO: document this callback
  const performPan = useCallback((event) => {
    stopEvent(event);

    if (onPanChange) {
      const lastPoint = [...lastPointRef.current];
      const point = getEventPoint(event);

      lastPointRef.current = point;
      onPanChange(([x, y]) => {
        const delta = calculateDelta(lastPoint, point);
        deltaRef.current = [...delta];
        return [x + delta[0], y + delta[1]];
      });
    }
  }, [onPanChange, deltaRef.current.toString()]);

  // TODO: document this callback
  const performInertia = useCallback(() => {
    if (inertia) {
      onPanChange(([x, y]) => ([x + deltaRef.current[0], y + deltaRef.current[1]]));

      deltaRef.current[0] = applyInertia(deltaRef.current[0]);
      deltaRef.current[1] = applyInertia(deltaRef.current[1]);

      if (Math.abs(deltaRef.current[0]) > 0 || Math.abs(deltaRef.current[1]) > 0) {
        requestAnimationFrame(performInertia);
      }
    }
  }, [inertia, deltaRef.current.toString()]);

  // TODO: document this callback
  const endPan = useCallback(() => {
    if (onPanChange) {
      document.removeEventListener(Events.MOUSE_MOVE, performPan);
      document.removeEventListener(Events.MOUSE_END, endPan);

      if (inertia) {
        requestAnimationFrame(performInertia);
      }
    }
  }, [performPan, inertia, onPanChange]);

  // TODO: document this callback
  const onPanStart = useCallback((event) => {
    stopEvent(event);

    if (onPanChange) {
      document.addEventListener(Events.MOUSE_MOVE, performPan, { passive: false });
      document.addEventListener(Events.MOUSE_END, endPan, { passive: false });
      lastPointRef.current = getEventPoint(event);
    }
  }, [onPanChange, performPan, endPan]);

  return onPanStart;
};

export default useCanvasPanHandlers;
