import React from 'react';
import PropTypes from 'prop-types';

/**
 * Diagram link label
 */
const LinkLabel = ({ label, position }) => (
  <foreignObject x={position[0]} y={position[1]}>
    <div className="bi-diagram-link-label">
      {label}
    </div>
  </foreignObject>
);

LinkLabel.propTypes = {
  label: PropTypes.string.isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default React.memo(LinkLabel);
