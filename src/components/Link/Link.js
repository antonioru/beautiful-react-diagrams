import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { getElementRect } from '../../shared/funcs/elementsUtils';

const findElementCoordinates = (entityId) => {
  const element = document.querySelector(`[data-brd-id="${entityId}"]`);
  const rect = getElementRect(element);
  console.log(element);
  return [1, 1];
};

/**
 * // TODO: document
 */
const Link = ({ input, output }) => {
  const [inputX, inputY] = useMemo(() => findElementCoordinates(input), [input]);
  const [outputX, outputY] = useMemo(() => findElementCoordinates(output), [output]);

  return (
    <g>
      <path d="M451,182 C1147,182 1147,201.5 1343,201.5" />
    </g>
  );
};

Link.propTypes = {
  input: PropTypes.string.isRequired,
  output: PropTypes.string.isRequired,
};

export default React.memo(Link);
