import React, { useCallback, useState, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import DiagramCanvas from './DiagramCanvas/DiagramCanvas';
import NodesCanvas from './NodesCanvas/NodesCanvas';
import LinksCanvas from './LinksCanvas/LinksCanvas';
import { LinkType, NodeType } from './utils/Types';

import './diagram.scss';

/**
 * The Diagram component is a controlled component allowing the edit and creation of diagrams through a quite
 * simple, extensible and functional data model.
 */
const Diagram = (props) => {
  const { schema, onChange, ...rest } = props;
  const [segment, setSegment] = useState();
  const { current: portRefs } = useRef({}); // keeps the port elements references
  const { current: nodeRefs } = useRef({}); // keeps the node elements references

  // when nodes change, performs the onChange callback with the new incoming data
  const onNodesChange = useCallback((nextNodes) => {
    onChange({ ...schema, nodes: nextNodes });
  }, [schema, onChange]);

  // when a port is registered, save it to the local reference
  const onPortRegister = useCallback((portId, portEl) => {
    portRefs[portId] = portEl;
  }, [portRefs]);

  // when a node is registered, save it to the local reference
  const onNodeRegister = useCallback((nodeId, nodeEl) => {
    nodeRefs[nodeId] = nodeEl;
  }, [nodeRefs]);

  // when a new segment is dragged, save it to the local state
  const onDragNewSegment = useCallback((portId, from, to, alignment) => {
    setSegment({ id: `segment-${portId}`, from, to, alignment });
  }, []);

  // when a segment fails to connect, reset the segment state
  const onSegmentFail = useCallback(() => {
    setSegment(undefined);
  }, []);

  // when a segment connects, update the links schema, perform the onChange callback
  // with the new data, then reset the segment state
  const onSegmentConnect = useCallback((input, output) => {
    const nextLinks = [...(schema.links || []), { input, output }];
    onChange({ ...schema, links: nextLinks });
    setSegment(undefined);
  }, [schema, onChange]);

  // when links change, performs the onChange callback with the new incoming data
  const onLinkDelete = useCallback((nextLinks) => {
    onChange({ ...schema, links: nextLinks });
  }, [schema, onChange]);

  return (
    <DiagramCanvas portRefs={portRefs} nodeRefs={nodeRefs} {...rest}>
      <NodesCanvas
        nodes={schema.nodes}
        onChange={onNodesChange}
        onNodeRegister={onNodeRegister}
        onPortRegister={onPortRegister}
        onDragNewSegment={onDragNewSegment}
        onSegmentFail={onSegmentFail}
        onSegmentConnect={onSegmentConnect}
      />
      <LinksCanvas
        nodes={schema.nodes}
        links={schema.links}
        segment={segment}
        onChange={onLinkDelete}
      />
    </DiagramCanvas>
  );
};

Diagram.propTypes = {
  /**
   * The diagram current schema
   */
  schema: PropTypes.shape({
    nodes: PropTypes.arrayOf(NodeType).isRequired,
    links: PropTypes.arrayOf(LinkType),
  }),
  /**
   * The callback to be performed every time the model changes
   */
  onChange: PropTypes.func,
};

Diagram.defaultProps = {
  schema: { nodes: [], links: [] },
  onChange: undefined,
};

export default React.memo(Diagram, isEqual);
