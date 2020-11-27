import { useState, useCallback } from 'react';
import { Events } from '../../shared/Constants';
import { getEventPoint } from '../../shared/funcs/getEventPoint';
import stopEvent from '../../shared/funcs/stopEvent';

const bboxToPlainObj = ({ bottom, height, left, right, top, width, x, y }) => ({ bottom, height, left, right, top, width, x, y });
const getBBox = (el) => bboxToPlainObj(el.parentElement.getBoundingClientRect());
const fromEventPointToCanvasRelativePoint = (x, y, [panX, panY], { left, top }) => (
  [Math.round(-panX + x - left), Math.round(-panY + y - top)]
);

/**
 * TODO: document this thing
 * Inspired by this article:
 * https://jclem.net/posts/pan-zoom-canvas-react?utm_campaign=building-a-s--zoomable-canvasdi
 */
const useDragAround = ({ onPositionChange, disableDrag, pan, zoom, nodeIndex, coordinates, elRef }) => {
  const [isDragging, setDragging] = useState(false);

  // TODO: document this callback
  const performDrag = useCallback((event) => {
    stopEvent(event);

    if (!disableDrag) {
      const [x, y] = getEventPoint(event);
      const bbox = getBBox(elRef.current);
      const [nextX, nextY] = fromEventPointToCanvasRelativePoint(x, y, pan, bbox);

      setDragging(true);
      onPositionChange(nodeIndex, { coordinates: [nextX, nextY] });
    }
  }, [coordinates.toString(), onPositionChange, nodeIndex, elRef.current, pan.toString()]);

  // TODO: document this callback
  const endDrag = useCallback(() => {
    setDragging(false);
    document.removeEventListener(Events.MOUSE_MOVE, performDrag);
    document.removeEventListener(Events.MOUSE_END, endDrag);
  }, [performDrag]);

  // TODO: document this callback
  const onDragStart = useCallback((event) => {
    stopEvent(event);

    if (!disableDrag) {
      document.addEventListener(Events.MOUSE_MOVE, performDrag);
      document.addEventListener(Events.MOUSE_END, endDrag);
    }
  }, [performDrag, endDrag]);

  return [isDragging, onDragStart];
};

export default useDragAround;
