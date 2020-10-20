import throttle from 'lodash.throttle';
import { useRef, useCallback, useEffect } from 'react';

const defaultOptions = {
  /**
   * A custom ref to be used in place of a new one
   * @default undefined
   */
  ref: undefined,
  /**
   * Throttle the onDrag handler by the given ms
   * @default 0ms
   */
  throttleBy: 0,
};

/**
 * Returns the click coordinates of a MouseEvent
 * @param event
 * @returns {*[]}
 */
const getEventCoordinates = (event) => [event.clientX, event.clientY];

/**
 * Create a persistent callback reference that will live trough a component lifecycle
 * @param ref
 * @returns {Function}
 */
const createCallbackRef = (ref) => useCallback((callback) => {
  if (!ref.current || callback !== ref.current) {
    // eslint-disable-next-line no-param-reassign
    ref.current = callback;
  }
}, [ref.current]);

/**
 * A custom hook exposing handlers and ref for developing draggable React elements.
 *
 * ## Basic Usage:
 *
 * ```
 * const DraggableItem = () => {
 *    const { ref, isDragging, onDragStart, onDrag, onDragEnd } = useDrag();
 *
 *    onDragStart(dragStartHandler);
 *
 *    onDrag(dragHandler);
 *
 *    onDragEnd(dragEndHandler);
 *
 *    return (
 *      <div ref={ref}>
 *        Drag me!
 *      </div>
 *    );
 * }
 * ```
 *
 * ## Options:
 *
 * ```
 * const DraggingItem = () => {
 *    const ref = useRef();
 *    const options = { ref, throttleBy: 60 };
 *    const { isDragging, onDragStart, onDrag, onDragEnd } = useDrag(options);
 *
 *    onDragStart(dragStartHandler);
 *
 *    onDrag(dragHandler);
 *
 *    onDragEnd(dragEndHandler);
 *
 *    return (
 *      <div ref={ref}>
 *        Drag me!
 *      </div>
 *    );
 * }
 * ```
 */
const useDrag = (options = defaultOptions) => {
  const targetRef = options.ref || useRef(); // the target draggable element
  const dragStartHandlerRef = useRef(); // a ref to user's onDragStart handler
  const dragHandlerRef = useRef(); // a ref to user's onDrag handler
  const dragEndHandlerRef = useRef(); // a ref to user's onDragEnd handler
  // the dragging state is created from a useRef rather than a useState to avoid rendering during the dragging process
  const { current: info } = useRef({ isDragging: false, start: null, end: null, offset: null });

  /**
   * When the dragging starts, updates the state then perform the user's onDragStart handler if exists
   */
  const onDragStart = useCallback((event) => {
    if (!info.isDragging && targetRef.current.contains(event.target)) {
      info.isDragging = true;
      info.end = null;
      info.offset = null;
      info.start = getEventCoordinates(event);

      if (dragStartHandlerRef.current) {
        dragStartHandlerRef.current(event, { ...info });
      }
    }
  }, [targetRef.current, info, dragStartHandlerRef.current]);

  /**
   * Whilst dragging the element, updates the state then perform the user's onDrag handler if exists
   */
  const onDrag = useCallback(throttle((event) => {
    if (info.isDragging) {
      info.offset = [info.start[0] - event.clientX, info.start[1] - event.clientY];

      if (dragHandlerRef.current) {
        dragHandlerRef.current(event, { ...info });
      }
    }
  }, options.throttleBy), [targetRef.current, info, dragHandlerRef.current]);

  /**
   * When the dragging ends, updates the state then perform the user's onDragEnd handler if exists
   */
  const onDragEnd = useCallback((event) => {
    if (info.isDragging) {
      info.isDragging = false;
      info.end = getEventCoordinates(event);

      if (dragEndHandlerRef.current) {
        dragEndHandlerRef.current(event, { ...info });
      }
    }
  }, [targetRef.current, info, dragEndHandlerRef.current]);

  /**
   * When the layout renders the target item, assign the dragging events
   */
  useEffect(() => {
    /* eslint-disable no-underscore-dangle */
    const _onDragStart = (e) => onDragStart(e);
    const _onDrag = (e) => onDrag(e);
    const _onDragEnd = (e) => onDragEnd(e);
    /* eslint-enable no-underscore-dangle */

    if (targetRef.current) {
      targetRef.current.addEventListener('mousedown', _onDragStart);
      document.addEventListener('mousemove', _onDrag);
      document.addEventListener('mouseup', _onDragEnd);
    }

    return () => {
      if (targetRef.current) {
        targetRef.current.removeEventListener('mousedown', _onDragStart);
        document.removeEventListener('mousemove', _onDrag);
        document.removeEventListener('mouseup', _onDragEnd);
      }
    };
  }, [targetRef.current]);

  return {
    ref: targetRef,
    onDragStart: createCallbackRef(dragStartHandlerRef),
    onDrag: createCallbackRef(dragHandlerRef),
    onDragEnd: createCallbackRef(dragEndHandlerRef),
  };
};

export default useDrag;
