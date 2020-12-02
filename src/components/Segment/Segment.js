import React, { useMemo } from 'react';
import { CoordinatesType } from '../../shared/Types';
import makeSvgPath from '../../shared/funcs/makeSvgPath';

import './segment.scss';

/**
 * // TODO: document
 */
const Segment = ({ from, to }) => {
  const path = useMemo(() => makeSvgPath(from, to), [from, to]);

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
