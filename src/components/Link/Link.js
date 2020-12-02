import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import Segment from '../Segment';
import { SchemaType } from '../../shared/Types';
import { getElementRect } from '../../shared/funcs/elementsUtils';
import { zoomState } from '../../states/canvas';
import { transformCoordinates } from '../../shared/funcs/pointTransformations';

const getEntityCoordinates = (entityId, scale) => {
  const entity = document.querySelector(`[data-brd-id='${entityId}']`);
  if (entity) {
    const parentRect = getElementRect(entity.parentElement);
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
  const scale = useRecoilValue(zoomState);
  const from = getEntityCoordinates(input, scale);
  const to = getEntityCoordinates(output, scale);

  return from && to ? (<Segment from={from} to={to} />) : null;
};

Link.propTypes = {
  schema: SchemaType.isRequired,
  input: PropTypes.string.isRequired,
  output: PropTypes.string.isRequired,
};

export default React.memo(Link);
