import { isomorphicGetEventPoint } from './isomorphicGetEventPoint';

export const bboxToPlainObj = ({ bottom, height, left, right, top, width, x, y }) => ({ bottom, height, left, right, top, width, x, y });
export const getBBox = (el) => bboxToPlainObj(el.getBoundingClientRect());

export const getPointElementOffset = (event, element) => {
  const [mouseX, mouseY] = isomorphicGetEventPoint(event);
  const elementRect = getBBox(element);

  return [mouseX - elementRect.left, mouseY - elementRect.top];
};

export const transformCoordinates = ([x, y], scale) => ([x / scale, y / scale]);

export const eventPointToCanvasRelativePoint = (event, element, offset) => {
  const [mouseX, mouseY] = isomorphicGetEventPoint(event);
  const canvasRect = getBBox(element.parentElement);

  return [
    Math.round(mouseX - (canvasRect.left) - offset[0]),
    Math.round(mouseY - (canvasRect.top) - offset[1]),
  ];
};
