import PropTypes from 'prop-types';

export const CoordinatesType = (props, propName, componentName) => {
  // eslint-disable-next-line react/destructuring-assignment
  const value = props[propName];
  if (!value || !Array.isArray(value) || value.length !== 2) {
    return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`);
  }

  return null;
};

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
  coordinates: CoordinatesType,
  disableDrag: PropTypes.bool,
  content: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node]),
  inputs: PropTypes.arrayOf(PortType),
  outputs: PropTypes.arrayOf(PortType),
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
