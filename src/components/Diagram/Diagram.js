import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { SchemaType } from '../../shared/Types';
import NodeDraggableElement from '../NodeDraggableElement';
import Link from '../Link';
import { updateNodeByIndex } from './utils';

import './diagram.scss';

/**
 * The Diagram component is the root-node of any diagram.
 * It's a controlled component that accepts a `schema`, defining the current state of the diagram, and an `onChange` handler.
 * Being a controlled component it allows the developer to have the best possible control over the diagram and its interactions
 * with the user.
 */
const Diagram = (props) => {
  const { schema, onChange } = props;

  const onNodeChange = useCallback((nodeIndex, properties) => {
    // in this case is safe to update a node by its index as the callback and the diagram
    // will be refreshed each time the schema changes
    const nextNodes = updateNodeByIndex(schema.nodes, nodeIndex, properties);
    onChange({ nodes: nextNodes });
  }, [onChange, schema]);

  return (
    <div className="brd brd-diagram">
      {schema.nodes && schema.nodes.length > 0 && (
        <div className="brd-diagram-nodes">
          {schema.nodes.map((node, index) => (
            <NodeDraggableElement {...node} onPositionChange={onNodeChange} key={node.id} nodeIndex={index} />
          ))}
        </div>
      )}
      {schema.links && schema.links.length > 0 && (
        <svg xmlns="http://www.w3.org/2000/svg" className="brd-diagram-links">
          {schema.links.map((link) => (
            <Link {...link} schema={schema} key={`${link.input}-${link.output}`} />
          ))}
        </svg>
      )}
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
