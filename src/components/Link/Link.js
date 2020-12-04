import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import Segment from '../Segment';
import { SchemaType } from '../../shared/Types';
import { getElementRect } from '../../shared/funcs/elementsUtils';
import { canvasElement, scaleState } from '../../states/canvas';
import { transformCoordinates } from '../../shared/funcs/pointTransformations';

const getEntityCoordinates = (entityId, canvasEl, scale) => {
  const entity = document.querySelector(`[data-brd-id='${entityId}']`);

  if (entity && canvasEl) {
    const parentRect = getElementRect(canvasEl.querySelector('.brd-canvas-content')); // TODO: Find a better way
    const rect = getElementRect(entity);
    const coords = [
      (rect.left + (rect.width / 2)) - parentRect.left,
      (rect.top + (rect.height / 2)) - parentRect.top,
    ];

    return transformCoordinates(coords, scale);
  }

  return null;
};

// todo: document this
const Link = ({ schema, input, output }) => {
  const scale = useRecoilValue(scaleState);
  const canvasEl = useRecoilValue(canvasElement);
  const from = getEntityCoordinates(input, canvasEl, scale);
  const to = getEntityCoordinates(output, canvasEl, scale);

  return from && to ? (<Segment from={from} to={to} />) : null;
};

Link.propTypes = {
  schema: SchemaType.isRequired,
  input: PropTypes.string.isRequired,
  output: PropTypes.string.isRequired,
};

export default React.memo(Link);
