import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { entityCoordinatesById } from '../../state/entities';
import makeSvgPath from '../../shared/funcs/makeSvgPath';

import './link.scss';

/**
 * // TODO: document
 */
const Link = ({ input, output }) => {
  // const inputCoordinates = useRecoilValue(entityCoordinatesById(input));
  // const outputCoordinates = useRecoilValue(entityCoordinatesById(output));
  // const path = makeSvgPath(inputCoordinates, outputCoordinates);
  console.log(`${input}-${output}`);
  const path = 10;
  return (
    <g className="brd-line">
      <path d={path} />
    </g>
  );
};

Link.propTypes = {
  input: PropTypes.string.isRequired,
  output: PropTypes.string.isRequired,
};

export default Link;
