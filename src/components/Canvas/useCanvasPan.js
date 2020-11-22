import { useState, useCallback, useRef } from 'react';
import Events from '../../shared/Events';
import { isTouch } from '../../shared/Constants';

const initialState = { x: 0, y: 0 };
const friction = 0.8; // TODO: document this stuff
const getMouseEventPoint = (e) => ({ x: e.pageX, y: e.pageY });
const getTouchEventPoint = (e) => getMouseEventPoint(e.changedTouches[0]);
const getEventPoint = isTouch ? getTouchEventPoint : getMouseEventPoint;
const getDelta = (point, lastPoint) => ({ x: lastPoint.x - point.x, y: lastPoint.y - point.y });
const applyInertia = (value) => (Math.abs(value) >= 0.5 ? Math.trunc(value * friction) : 0);

/**
 * TODO: document this thing
 * Inspired by this article:
 * https://jclem.net/posts/pan-zoom-canvas-react?utm_campaign=building-a-pannable--zoomable-canvasdi
 */
const useCanvasPan = ({ pannable, inertia }) => {
  const [pan, setPan] = useState(initialState);
  const lastPointRef = useRef(initialState);
  const deltaRef = useRef({ x: null, y: null });

  // TODO: document this callback
  const performPan = useCallback((event) => {
    if (pannable) {
      const lastPoint = { ...lastPointRef.current };
      const point = getEventPoint(event);
      lastPointRef.current = point;
      setPan(({ x, y }) => {
        const delta = getDelta(lastPoint, point);
        deltaRef.current = { ...delta };

        return { x: x + delta.x, y: y + delta.y };
      });
    }
  }, []);

  // TODO: document this callback
  const performInertia = useCallback(() => {
    if (inertia) {
      setPan(({ x, y }) => ({ x: x + deltaRef.current.x, y: y + deltaRef.current.y }));

      deltaRef.current.x = applyInertia(deltaRef.current.x);
      deltaRef.current.y = applyInertia(deltaRef.current.y);

      if (Math.abs(deltaRef.current.x) > 0 || Math.abs(deltaRef.current.y) > 0) {
        requestAnimationFrame(performInertia);
      }
    }
  }, [inertia, deltaRef.current.x, deltaRef.current.y]);

  // TODO: document this callback
  const endPan = useCallback(() => {
    if (pannable) {
      document.removeEventListener(Events.MOUSE_MOVE, performPan);
      document.removeEventListener(Events.MOUSE_END, endPan);

      if (inertia) {
        requestAnimationFrame(performInertia);
      }
    }
  }, [performPan]);

  // TODO: document this callback
  const onPanStart = useCallback((event) => {
    if (pannable) {
      document.addEventListener(Events.MOUSE_MOVE, performPan);
      document.addEventListener(Events.MOUSE_END, endPan);
      lastPointRef.current = getEventPoint(event);
    }
  }, [performPan, endPan]);

  return [pan, onPanStart];
};

export default useCanvasPan;
