import { useCallback } from 'react';
import stopEvent from '../../shared/funcs/stopEvent';
import { Events } from '../../shared/Utils';
import { isomorphicGetEventPoint } from '../../shared/funcs/isomorphicGetEventPoint';

const useDragHandlers = (onDrag) => {
  const trackDrag = useCallback((event) => {
    stopEvent(event);

    if (onDrag) {
      const point = isomorphicGetEventPoint(event);

      onDrag(point);
    }
  }, [onDrag]);

  /**
   * Removes the event listeners added by `onDragStart` and if the `inertia` flag is true
   * perform the inertia simulating function
   */
  const endPan = useCallback(() => {
    if (onDrag) {
      document.removeEventListener(Events.MOUSE_MOVE, trackDrag);
      document.removeEventListener(Events.MOUSE_END, endPan);
    }
  }, [trackDrag]);

  /**
   * Prevent the default behaviour of the given mouse/touch event and adds the event listeners
   * needed to pan the canvas
   */
  const onDragStart = useCallback((event) => {
    stopEvent(event);
    document.addEventListener(Events.MOUSE_MOVE, trackDrag, { passive: false });
    document.addEventListener(Events.MOUSE_END, endPan, { passive: false });
    console.log(event.target);
  }, [endPan, trackDrag]);

  return onDragStart;
};

export default useDragHandlers;
