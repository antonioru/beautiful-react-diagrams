import * as React from 'react';
import Diagram, { useSchema } from '.';
import { Button } from 'beautiful-react-ui';

export const UncontrolledDiagram1 = () => {
  // create diagrams schema
  const [schema, { onChange }] = useSchema({
    nodes: [
      { id: 'node-1', content: 'Node 1', coordinates: [250, 60] },
      { id: 'node-2', content: 'Node 2', coordinates: [100, 200] },
      { id: 'node-3', content: 'Node 3', coordinates: [250, 220] },
      { id: 'node-4', content: 'Node 4', coordinates: [400, 200] },
    ],
    links: [
      { input: 'node-1', output: 'node-2' },
      { input: 'node-1', output: 'node-3' },
      { input: 'node-1', output: 'node-4' },
    ],
  });

  return (
    <div style={{ height: '22.5rem' }}>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
};

export const UncontrolledDiagram2 = () => {
  const [schema, { onChange, addNode, removeNode }] = useSchema({
    nodes: [
      {
        id: 'node-1',
        content: 'Node 1',
        coordinates: [150, 60],
        outputs: [{ id: 'port-1', alignment: 'right' }],
        data: {
          onDoubleClick: () => console.warn('hello'),
        }
      },
    ],
  });

  const addNewNode = () =>
    addNode({
      id: `node-${schema.nodes.length + 1}`,
      content: `Node ${schema.nodes.length + 1}`,
      coordinates: [
        schema.nodes[schema.nodes.length - 1].coordinates[0] + 10,
        schema.nodes[schema.nodes.length - 1].coordinates[1] + 20,
      ],
      render: ({ content, data }) => (
        <div
          onDoubleClick={data?.onDoubleClick}
          role='button'
          style={{ padding: '15px', background: 'purple' }}
        >
          {content}
        </div>
      ),
      data: {
        onDoubleClick: () => alert(`Schema length is: ${schema.nodes.length}`),
      },
      inputs: [{ id: `port-${schema.nodes.length + 1}` }],
    });

  const removeLast = () => {
    const lastNode = schema.nodes[schema.nodes.length - 1];
    removeNode(lastNode);
  };

  return (
    <div style={{ height: '22.5rem' }}>
      <Button color='primary' icon='plus' onClick={addNewNode}>
        Add new node
      </Button>
      <Button color='secondary' icon='minus' onClick={removeLast}>
        Remove last node
      </Button>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
};
