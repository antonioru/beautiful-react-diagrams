import { isomorphicGetEventPoint } from './isomorphicGetEventPoint';
import { getElementRect } from './elementsUtils';

export const getPointElementOffset = (event, element) => {
  const [mouseX, mouseY] = isomorphicGetEventPoint(event);
  const elementRect = getElementRect(element);

  return [mouseX - elementRect.left, mouseY - elementRect.top];
};

export const transformCoordinates = ([x, y], scale) => ([x / scale, y / scale]);

export const eventPointToCanvasRelativePoint = (event, element, offset) => {
  const [mouseX, mouseY] = isomorphicGetEventPoint(event);
  const canvasRect = getElementRect(element.parentElement);

  return [
    Math.round(mouseX - (canvasRect.left) - offset[0]),
    Math.round(mouseY - (canvasRect.top) - offset[1]),
  ];
};
