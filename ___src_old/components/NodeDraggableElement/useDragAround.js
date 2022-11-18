import { useState, useCallback, useRef } from 'react';
import { Events } from '../../shared/Utils';
import stopEvent from '../../shared/funcs/stopEvent';
import { eventPointToCanvasRelativePoint, getPointElementOffset, transformCoordinates } from '../../shared/funcs/pointTransformations';

/**
 * Handles and incorporates the business logic of a single node dragging.
 * Returns the `isDragging` flag reporting whether the node is dragged and the `onDragStart`.
 * This implementation has been inspired by this wonderful article by Jonathan Clem:
 * https://jclem.net/posts/pan-zoom-canvas-react?utm_campaign=building-a-s--zoomable-canvasdi
 */
const useDragAround = ({ onPositionChange, disableDrag, zoom, nodeIndex, elRef }) => {
  const [isDragging, setDragging] = useState(false);
  const elClickPointOffset = useRef([0, 0]);

  /**
   * Prevent the default behaviour of the given mouse/touch event, then calculates the coordinates of the
   * node from the mouse/touch ones.
   */
  const performDrag = useCallback((event) => {
    stopEvent(event);

    if (!disableDrag) {
      const [nextX, nextY] = eventPointToCanvasRelativePoint(event, elRef.current, elClickPointOffset.current);
      const [transformedX, transformedY] = transformCoordinates([nextX, nextY], zoom);

      onPositionChange(nodeIndex, { coordinates: [transformedX, transformedY] });
    }
  }, [onPositionChange, nodeIndex, elRef, elClickPointOffset, disableDrag, zoom]);

  /**
   * Removes the event listeners added by `onDragStart`
   */
  const endDrag = useCallback(() => {
    setDragging(false);
    elClickPointOffset.current = [0, 0];
    document.removeEventListener(Events.MOUSE_MOVE, performDrag);
    document.removeEventListener(Events.MOUSE_END, endDrag);
  }, [performDrag, elClickPointOffset]);

  /**
   * Prevent the default behaviour of the given mouse/touch event and adds the event listeners
   * needed to drag the node
   */
  const onDragStart = useCallback((event) => {
    stopEvent(event);

    if (!disableDrag) {
      elClickPointOffset.current = getPointElementOffset(event, elRef.current);
      setDragging(true);
      document.addEventListener(Events.MOUSE_MOVE, performDrag);
      document.addEventListener(Events.MOUSE_END, endDrag);
    }
  }, [performDrag, endDrag, elRef, disableDrag]);

  return [isDragging, onDragStart];
};

export default useDragAround;
