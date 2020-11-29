import React from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import { entityById } from '../../state/nodes';

/**
 * // TODO: document
 */
const Link = ({ input, output }) => {
  const inputEl = useRecoilValue(entityById(input));
  const outputEl = useRecoilValue(entityById(output));

  console.log(`${input}-${output}`, inputEl, outputEl);

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
