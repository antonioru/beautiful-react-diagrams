import React, { useMemo } from 'react';
import { CoordinatesType } from '../../shared/Types';
import makePath from './makePath';

import './segment.scss';

/**
 * // TODO: document
 */
const Segment = ({ from, to }) => {
  const path = useMemo(() => makePath(from, to), [from, to]);

  return (
    <g className="brd-segment">
      <path d={path} />
    </g>
  );
};

Segment.propTypes = {
  from: CoordinatesType,
  to: CoordinatesType,
};

Segment.defaultProps = {
  from: [0, 0],
  to: [0, 0],
};

export default React.memo(Segment);
