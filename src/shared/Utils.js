export const isTouch = 'ontouchstart' in window;

export const noop = () => undefined;

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
