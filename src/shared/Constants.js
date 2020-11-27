export const isTouch = 'ontouchstart' in window;

export const noop = () => undefined;

const getMouseEventPoint = (e) => ({ x: e.pageX, y: e.pageY });
const getTouchEventPoint = (e) => getMouseEventPoint(e.changedTouches[0]);
export const getEventPoint = isTouch ? getTouchEventPoint : getMouseEventPoint;

const getMouseEventTarget = (e) => e.target;
const getTouchEventTarget = (e) => document.elementFromPoint(
  e.changedTouches[0].clientX,
  e.changedTouches[0].clientY,
);
export const getEventTarget = isTouch ? getTouchEventTarget : getMouseEventTarget;

/**
 * TODO: explain why on earth you'd do something like this
 */
export const Events = Object.freeze({
  MOUSE_START: isTouch ? 'touchstart' : 'mousedown',
  MOUSE_MOVE: isTouch ? 'touchmove' : 'mousemove',
  MOUSE_END: isTouch ? 'touchend' : 'mouseup',
  DOUBLE_CLICK: 'dblclick',
  WHEEL: 'wheel',
});

export const stopPropagation = (e) => e.stopPropagation();
