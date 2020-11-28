import React, { useCallback } from 'react';
import { useRenderInfo } from 'beautiful-react-hooks';
import PropTypes from 'prop-types';
import { SchemaType } from '../../shared/Types';
import NodeDraggableElement from '../NodeDraggableElement';
import updateNodeAt from './updateNodeAt';

import './diagram.scss';

/**
 *
 * @param schema
 * @param onChange
 * @returns {*}
 * @constructor
 */
const Diagram = ({ schema, onChange }) => {
  useRenderInfo('Diagram');

  const onNodeChange = useCallback((nodeIndex, properties) => {
    const nextNodes = updateNodeAt(schema.nodes, nodeIndex, properties);
    onChange({ nodes: nextNodes });
  }, [onChange, schema.nodes]);

  return (
    <div className="bi bi-diagram">
      <div className="bi bi-diagram-nodes">
        {schema.nodes.map((node, index) => (
          <NodeDraggableElement {...node} onPositionChange={onNodeChange} key={node.id} nodeIndex={index} />
        ))}
      </div>
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
