import pipe from './pipe';

export const bboxToPlainObj = ({ bottom, height, left, right, top, width, x, y }) => ({ bottom, height, left, right, top, width, x, y });
export const getBBox = (el) => (el ? el.getBoundingClientRect() : Object.create(null));

export const getElementRect = pipe(getBBox, bboxToPlainObj);
