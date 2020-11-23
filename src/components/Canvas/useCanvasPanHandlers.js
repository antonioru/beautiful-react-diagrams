import { useCallback, useRef } from 'react';
import { Events, isTouch } from '../../shared/Constants';

const friction = 0.8; // TODO: document this stuff
const getMouseEventPoint = (e) => ({ x: e.pageX, y: e.pageY });
const getTouchEventPoint = (e) => getMouseEventPoint(e.changedTouches[0]);
const getEventPoint = isTouch ? getTouchEventPoint : getMouseEventPoint;
const calculateDelta = (current, last) => ({ x: last.x - current.x, y: last.y - current.y });
const applyInertia = (value) => (Math.abs(value) >= 0.5 ? Math.trunc(value * friction) : 0);

/**
 * TODO: document this thing
 * Inspired by this article:
 * https://jclem.net/posts/pan-zoom-canvas-react?utm_campaign=building-a-s--zoomable-canvasdi
 */
const useCanvasPanHandlers = ({ pan, onPanChange, inertia }) => {
  const lastPointRef = useRef(pan);
  const deltaRef = useRef({ x: null, y: null });

  // TODO: document this callback
  const performPan = useCallback((event) => {
    if (onPanChange) {
      const lastPoint = { ...lastPointRef.current };
      const point = getEventPoint(event);
      lastPointRef.current = point;
      onPanChange(({ x, y }) => {
        const delta = calculateDelta(lastPoint, point);
        deltaRef.current = { ...delta };

        return { x: x + delta.x, y: y + delta.y };
      });
    }
  }, []);

  // TODO: document this callback
  const performInertia = useCallback(() => {
    if (inertia) {
      onPanChange(({ x, y }) => ({ x: x + deltaRef.current.x, y: y + deltaRef.current.y }));

      deltaRef.current.x = applyInertia(deltaRef.current.x);
      deltaRef.current.y = applyInertia(deltaRef.current.y);

      if (Math.abs(deltaRef.current.x) > 0 || Math.abs(deltaRef.current.y) > 0) {
        requestAnimationFrame(performInertia);
      }
    }
  }, [inertia, deltaRef.current.x, deltaRef.current.y]);

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
    if (onPanChange) {
      document.addEventListener(Events.MOUSE_MOVE, performPan);
      document.addEventListener(Events.MOUSE_END, endPan);
      lastPointRef.current = getEventPoint(event);
    }
  }, [onPanChange, performPan, endPan]);

  return onPanStart;
};

export default useCanvasPanHandlers;
