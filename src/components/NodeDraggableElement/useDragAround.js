import { useState, useCallback, useRef } from 'react';
import { Events } from '../../shared/Utils';
import { getEventPoint } from '../../shared/funcs/getEventPoint';
import stopEvent from '../../shared/funcs/stopEvent';

const bboxToPlainObj = ({ bottom, height, left, right, top, width, x, y }) => ({ bottom, height, left, right, top, width, x, y });
const getBBox = (el) => bboxToPlainObj(el.getBoundingClientRect());
const getPointElementOffset = (event, element) => {
  const [mouseX, mouseY] = getEventPoint(event);
  const elementRect = getBBox(element);

  return [mouseX - elementRect.left, mouseY - elementRect.top];
};

const fromEventPointToCanvasRelativePoint = (event, element, offset, zoom) => {
  const [mouseX, mouseY] = getEventPoint(event);
  const canvasRect = getBBox(element.parentElement);
  return [
    Math.round(mouseX - (canvasRect.left * zoom) - offset[0]),
    Math.round(mouseY - (canvasRect.top * zoom) - offset[1]),
  ];
};

/**
 * TODO: document this thing
 * Inspired by this article:
 * https://jclem.net/posts/pan-zoom-canvas-react?utm_campaign=building-a-s--zoomable-canvasdi
 */
const useDragAround = ({ onPositionChange, disableDrag, pan, zoom, nodeIndex, elRef }) => {
  const [isDragging, setDragging] = useState(false);
  const elClickPointOffset = useRef([0, 0]);

  // TODO: document this callback
  const performDrag = useCallback((event) => {
    stopEvent(event);

    if (!disableDrag) {
      const [nextX, nextY] = fromEventPointToCanvasRelativePoint(event, elRef.current, elClickPointOffset.current, zoom);

      setDragging(true);
      onPositionChange(nodeIndex, { coordinates: [nextX, nextY] });
    }
  }, [onPositionChange, nodeIndex, elRef, elClickPointOffset, disableDrag, zoom]);

  // TODO: document this callback
  const endDrag = useCallback(() => {
    setDragging(false);
    elClickPointOffset.current = [0, 0];
    document.removeEventListener(Events.MOUSE_MOVE, performDrag);
    document.removeEventListener(Events.MOUSE_END, endDrag);
  }, [performDrag, elClickPointOffset]);

  // TODO: document this callback
  const onDragStart = useCallback((event) => {
    stopEvent(event);

    if (!disableDrag) {
      elClickPointOffset.current = getPointElementOffset(event, elRef.current);

      document.addEventListener(Events.MOUSE_MOVE, performDrag);
      document.addEventListener(Events.MOUSE_END, endDrag);
    }
  }, [performDrag, endDrag, elRef, disableDrag]);

  return [isDragging, onDragStart];
};

export default useDragAround;
