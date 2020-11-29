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

export const PortShape = {
  id: PropTypes.string.isRequired,
  canLink: PropTypes.func,
};

/**
 * Port
 */
export const PortType = PropTypes.shape(PortShape);
export const PortList = PropTypes.arrayOf(PortType);

/**
 * Node
 */
export const NodeType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  coordinates: CoordinatesType,
  disableDrag: PropTypes.bool,
  content: PropTypes.node,
  inputs: PortList,
  outputs: PortList,
  render: PropTypes.elementType,
  inputsAlignment: PortAlignment,
  outputsAlignment: PortAlignment,
  data: PropTypes.shape({}),
  className: PropTypes.string,
});

/**
 * Schema
 */
export const SchemaType = PropTypes.shape({
  nodes: PropTypes.arrayOf(NodeType).isRequired,
  links: PropTypes.arrayOf(LinkType),
});
