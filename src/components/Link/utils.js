import { getElementRect } from '../../shared/funcs/elementsUtils';
import { transformCoordinates } from '../../shared/funcs/pointTransformations';

export const getEntityElement = (id) => document.querySelector(`[data-brd-id='${id}']`);

export const getEntityAttribute = (el) => (el ? el.getAttribute('data-brd-type') : '');

export const getEntityCoordinates = (entityElement, canvasEl, scale) => {
  if (entityElement && canvasEl) {
    const parentRect = getElementRect(canvasEl);
    const rect = getElementRect(entityElement);
    const coords = [
      (rect.left + (rect.width / 2)) - parentRect.left,
      (rect.top + (rect.height / 2)) - parentRect.top,
    ];

    return transformCoordinates(coords, scale);
  }

  return null;
};
