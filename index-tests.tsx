import * as React from 'react';
import Diagram, { DiagramSchema, Node } from '.';
import { Button } from 'beautiful-react-ui';

export const UncontrolledDiagram1 = () => {
  const initialSchema: DiagramSchema = {
    nodes: [
      { id: 'node-1', content: 'Node 1', coordinates: [250, 60], },
      { id: 'node-2', content: 'Node 2', coordinates: [100, 200], },
      { id: 'node-3', content: 'Node 3', coordinates: [250, 220], },
      { id: 'node-4', content: 'Node 4', coordinates: [400, 200], },
    ],
    links: [
      { input: 'node-1',  output: 'node-2' },
      { input: 'node-1',  output: 'node-3' },
      { input: 'node-1',  output: 'node-4' },
    ]
  };

  // create diagrams schema
  const [schema, setSchema] = React.useState(initialSchema);

  return (
    <div style={{ height: '22.5rem' }}>
      <Diagram schema={schema} onChange={setSchema} />
    </div>
  );
};


export const UncontrolledDiagram2 = () => {
  const initialSchema: DiagramSchema = {
    nodes: [
      {
        id: 'node-1',
        content: 'Node 1',
        coordinates: [150, 60],
        outputs: [ { id: 'port-1', alignment: 'right' } ],
      },
    ]
  };

  const [schema, setSchema] = React.useState(initialSchema);

  const addNewNode = () => {
    const nextNode: Node = {
      id: `node-${schema.nodes.length + 1}`,
      content: `Node ${schema.nodes.length + 1}`,
      coordinates: [
        (schema.nodes[schema.nodes.length - 1].coordinates || [])[0] || 0 + 10,
        (schema.nodes[schema.nodes.length - 1].coordinates || [])[1] || 0 + 20,
      ],
      inputs: [
        { id: `port-${schema.nodes.length + 1}` }
      ]
    };

    setSchema({
       ...schema,
       nodes: [ ...schema.nodes, nextNode ],
    });
  };

  const removeLast = () => {
    const nextNodes = [ ...schema.nodes ];

    nextNodes.length = nextNodes.length - 1;

    setSchema({
      ...schema,
      nodes: nextNodes,
    });
  };

  return (
    <div style={{ height: '22.5rem' }}>
      <Button color="primary" icon="plus" onClick={addNewNode}>Add new node</Button>
      <Button color="secondary" icon="minus" onClick={removeLast}>Remove last node</Button>
      <Diagram schema={schema} onChange={setSchema} />
    </div>
  );
};
