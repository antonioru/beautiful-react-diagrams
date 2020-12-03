import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CoordinatesType, PortAlignment, PortType } from '../../shared/Types';
import { createInputs, createOutputs } from '../../shared/PortFactory';
import PortsWrapper from './PortsWrapper';

import './node-default.scss';

/**
 * // TODO: fix
 * @param props
 * @returns {*}
 * @constructor
 */
const NodeDefault = (props) => {
  const { content, ElementRender, inputs, outputs, inputsAlignment, outputsAlignment, className } = props;
  const classList = useMemo(() => classNames('brd-default-node', className), [className]);
  const Inputs = useMemo(() => createInputs(inputs), [inputs]);
  const Outputs = useMemo(() => createOutputs(outputs), [outputs]);

  return (
    <ElementRender className={classList}>
      <PortsWrapper alignment="left" portAlignments={{ outputsAlignment, inputsAlignment }} Elements={{ Inputs, Outputs }} />
      <div className="brd-node-central-content">
        <PortsWrapper alignment="top" portAlignments={{ outputsAlignment, inputsAlignment }} Elements={{ Inputs, Outputs }} />
        <div className="brd-node-content">
          {content}
        </div>
        <PortsWrapper alignment="bottom" portAlignments={{ outputsAlignment, inputsAlignment }} Elements={{ Inputs, Outputs }} />
      </div>
      <PortsWrapper alignment="right" portAlignments={{ outputsAlignment, inputsAlignment }} Elements={{ Inputs, Outputs }} />
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
  coordinates: CoordinatesType,
  /**
   * The diagram content
   */
  content: PropTypes.node,
  /**
   * An array of input ports
   */
  inputs: PropTypes.arrayOf(PortType),
  /**
   * Defines the alignment of the input ports
   */
  inputsAlignment: PortAlignment,
  /**
   * An array of output ports
   */
  outputs: PropTypes.arrayOf(PortType),
  /**
   * Defines the alignment of the output ports
   */
  outputsAlignment: PortAlignment,
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
  coordinates: [0, 0],
  content: null,
  data: null,
  outputs: [],
  inputs: [],
  inputsAlignment: 'left',
  outputsAlignment: 'right',
  ElementRender: 'div',
};

export default React.memo(NodeDefault);
