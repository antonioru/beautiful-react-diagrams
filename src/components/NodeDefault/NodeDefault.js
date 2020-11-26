import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import { useRenderInfo } from 'beautiful-react-hooks';
import { PortType } from '../../shared/Types';

import './node-default.scss';

/**
 * // TODO: fix
 * @param props
 * @returns {*}
 * @constructor
 */
const NodeDefault = (props) => {
  const { content, ElementRender } = props;

  useRenderInfo('NodeDefault');

  return (
    <ElementRender className="bi-default-node">
      {content}
    </ElementRender>
  );
};

NodeDefault.propTypes = {
  /**
   * The diagram node id
   */
  id: PropTypes.oneOfType([PropTypes.string]).isRequired,
  /**
   * The diagram current coordinates, relative to the container
   */
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  /**
   * The diagram content
   */
  content: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node]),
  /**
   * An array of input ports
   */
  inputs: PropTypes.arrayOf(PortType),
  /**
   * An array of output ports
   */
  outputs: PropTypes.arrayOf(PortType),
  /**
   * An object to possibly keep data between renders
   */
  data: PropTypes.shape({}),
  /**
   * The callback to be fired when a new diagram is mounted
   */
  onMount: PropTypes.func,
  /**
   * The callback to be fired when a new port is settled
   */
  onPortRegister: PropTypes.func,
  /**
   * The callback to be fired when component unmount
   */
  onNodeRemove: PropTypes.func,
  /**
   * The callback to be fired when dragging a new segment from one of the node's port
   */
  onDragNewSegment: PropTypes.func,
  /**
   * The callback to be fired when a new segment fails to connect
   */
  onSegmentFail: PropTypes.func,
  /**
   * The callback to be fired when a new segment connects to a port
   */
  onSegmentConnect: PropTypes.func,
  /**
   * The main element renderer
   */
  ElementRender: PropTypes.elementType,
};

NodeDefault.defaultProps = {
  content: null,
  data: null,
  outputs: [],
  inputs: [],
  ElementRender: 'div',
};

export default React.memo(NodeDefault);
