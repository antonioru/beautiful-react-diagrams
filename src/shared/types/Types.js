import PropTypes from 'prop-types';

/**
 * Link
 */
export const LinkType = PropTypes.shape({
  input: PropTypes.string.isRequired,
  output: PropTypes.string.isRequired,
  label: PropTypes.node,
  readonly: PropTypes.bool,
});

export const PortAlignment = PropTypes.oneOf(['right', 'left', 'top', 'bottom']);

/**
 * Port
 */
export const PortType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  canLink: PropTypes.func,
  alignment: PortAlignment,
});

/**
 * Node
 */
export const NodeType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node]),
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  inputs: PropTypes.arrayOf(PortType),
  outputs: PropTypes.arrayOf(PortType),
  type: PropTypes.oneOf(['default']),
  renderer: PropTypes.func,
  className: PropTypes.string,
});
