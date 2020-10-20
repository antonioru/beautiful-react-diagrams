import PropTypes from 'prop-types';

/**
 * Link
 */
export const LinkType = PropTypes.shape({
  input: PropTypes.string.isRequired,
  output: PropTypes.string.isRequired,
  label: PropTypes.node,
  readonly: PropTypes.bool,
  className: PropTypes.string,
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
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired, // TODO: must be an array of 2 numbers only
  content: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node]),
  inputs: PropTypes.arrayOf(PortType),
  outputs: PropTypes.arrayOf(PortType),
  type: PropTypes.oneOf(['default']),
  render: PropTypes.elementType,
  className: PropTypes.string,
});

/**
 * Schema
 */
export const SchemaType = PropTypes.shape({
  nodes: PropTypes.arrayOf(NodeType).isRequired,
  links: PropTypes.arrayOf(LinkType),
});
