import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { SchemaType } from '../../shared/Types';
import NodeDraggableElement from '../NodeDraggableElement';
import Link from '../Link';
import updateNodeAt from './updateNodeAt';

import './diagram.scss';

/**
 * // TODO: document
 */
const Diagram = (props) => {
  const { schema, onChange } = props;

  const onNodeChange = useCallback((nodeIndex, properties) => {
    // todo: update can't realy on nodeIndex as it may change during renderings, remove nodeIndex and reference nodes by id
    const nextNodes = updateNodeAt(schema.nodes, nodeIndex, properties);
    onChange({ nodes: nextNodes });
  }, [onChange, schema.nodes]);

  return (
    <div className="brd brd-diagram">
      <div className="brd-diagram-nodes">
        {schema.nodes.map((node, index) => (
          <NodeDraggableElement {...node} onPositionChange={onNodeChange} key={node.id} nodeIndex={index} />
        ))}
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" className="brd-diagram-links">
        {schema.links.map((link) => <Link {...link} />)}
      </svg>
    </div>
  );
};

Diagram.propTypes = {
  /**
   * The diagram current schema
   */
  schema: SchemaType,
  /**
   * The callback to be performed every time the model changes
   */
  onChange: PropTypes.func,
};

Diagram.defaultProps = {
  schema: { nodes: [], links: [] },
  onChange: undefined,
};

export default React.memo(Diagram);
