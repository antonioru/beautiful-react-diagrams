import { useCallback, useEffect, useRef } from 'react';
import { Events } from '../../shared/Constants';
import { getEventPoint } from '../../shared/funcs/getEventPoint';

const bboxToPlainObj = ({ bottom, height, left, right, top, width, x, y }) => ({ bottom, height, left, right, top, width, x, y });
const fromEventPointToCanvasRelativePoint = (x, y, [panX, panY], { left, top }) => (
  [Math.round(-panX + x - left), Math.round(-panY + y - top)]
);

/**
 * TODO: document this thing
 * Inspired by this article:
 * https://jclem.net/posts/pan-zoom-canvas-react?utm_campaign=building-a-s--zoomable-canvasdi
 */
const useDragAround = ({ onPositionChange, disableDrag, pan, zoom, nodeIndex, coordinates, elRef }) => {
  const elBBoxRef = useRef();

  // TODO: document this callback
  useEffect(() => {
    if (elRef.current) {
      elBBoxRef.current = bboxToPlainObj(elRef.current.parentElement.getBoundingClientRect());
    }

    return () => {
      if (elRef.current) {
        elBBoxRef.current = null;
      }
    };
  }, [elRef.current]);

  // TODO: document this callback
  const performDrag = useCallback((event) => {
    if (!disableDrag) {
      const [x, y] = getEventPoint(event);
      const [nextX, nextY] = fromEventPointToCanvasRelativePoint(x, y, pan, elBBoxRef.current);

      onPositionChange(nodeIndex, { coordinates: [nextX, nextY] });
      event.preventDefault();
      event.stopPropagation();
    }
  }, [coordinates.toString(), onPositionChange, nodeIndex, elRef.current, pan.toString()]);

  // TODO: document this callback
  const endDrag = useCallback(() => {
    document.removeEventListener(Events.MOUSE_MOVE, performDrag);
    document.removeEventListener(Events.MOUSE_END, endDrag);
  }, [performDrag]);

  // TODO: document this callback
  const onDragStart = useCallback((event) => {
    if (!disableDrag) {
      event.preventDefault();
      event.stopPropagation();
      document.addEventListener(Events.MOUSE_MOVE, performDrag, { passive: false });
      document.addEventListener(Events.MOUSE_END, endDrag, { passive: false });
    }
  }, [performDrag, endDrag]);

  return onDragStart;
};

export default useDragAround;
