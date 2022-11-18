import { isTouch } from '../Utils';

export const getMouseEventPoint = (e) => ([e.clientX, e.clientY]);
export const getTouchEventPoint = (e) => getMouseEventPoint(e.changedTouches[0]);

/**
 * Receives a mouse or a touch event and returns its [clientX, clientY] coordinates
 */
export const isomorphicGetEventPoint = isTouch ? getTouchEventPoint : getMouseEventPoint;
