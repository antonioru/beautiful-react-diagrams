import { isTouch } from './Constants';

export default Object.freeze({
  MOUSE_START: isTouch ? 'touchstart' : 'mousedown',
  MOUSE_MOVE: isTouch ? 'touchmove' : 'mousemove',
  MOUSE_END: isTouch ? 'touchend' : 'mouseup',
  WHEEL: 'wheel',
});
