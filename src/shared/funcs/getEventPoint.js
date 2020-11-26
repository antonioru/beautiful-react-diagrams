import { isTouch } from '../Constants';

export const getMouseEventPoint = (e) => ([e.clientX, e.clientY]);

export const getTouchEventPoint = (e) => getMouseEventPoint(e.changedTouches[0]);

export const getEventPoint = isTouch ? getTouchEventPoint : getMouseEventPoint;
