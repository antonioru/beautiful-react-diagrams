import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { CoordinatesType } from '../../shared/Types';
import makePath from './makePath';

import './segment.scss';

/**
 * // TODO: document
 */
const Segment = ({ from, to, inputEntityType, outputEntityType }) => {
  const path = makePath(from, to, inputEntityType, outputEntityType);

  return (
    <g className="brd-segment">
      <path d={path} />
    </g>
  );
};

Segment.propTypes = {
  from: CoordinatesType,
  to: CoordinatesType,
  inputEntityType: PropTypes.string, // TODO: define the entity type
  outputEntityType: PropTypes.string, // TODO: define the entity type
};

Segment.defaultProps = {
  from: [0, 0],
  to: [0, 0],
  inputEntityType: 'unknown',
  outputEntityType: 'unknown',
};

export default React.memo(Segment);
