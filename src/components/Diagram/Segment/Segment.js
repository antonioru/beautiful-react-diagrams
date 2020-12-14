import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { PortAlignment } from '../../../shared/Types';
import makeSvgPath from '../../../shared/functions/makeSvgPath';
import useCanvas from '../../../shared/internal_hooks/useCanvas';

/**
 * Segment
 */
const Segment = (props) => {
  const { from, to, alignment } = props;
  const pathOptions = { type: 'bezier', inputAlignment: alignment };
  const path = useMemo(() => makeSvgPath(from, to, pathOptions), [from, to, alignment]);
  const { scaleVal } = useCanvas();
  const nextScale = 1 / scaleVal;

  return (
    <g className="bi-diagram-segment" style={{ transform: `scale(${nextScale})` }}>
      <path d={path} />
      <circle r="6.5" cx={to[0]} cy={to[1]} />
    </g>
  );
};

Segment.propTypes = {
  from: PropTypes.arrayOf(PropTypes.number).isRequired,
  to: PropTypes.arrayOf(PropTypes.number).isRequired,
  alignment: PortAlignment,
};

Segment.defaultProps = {
  alignment: undefined,
};

export default React.memo(Segment);
