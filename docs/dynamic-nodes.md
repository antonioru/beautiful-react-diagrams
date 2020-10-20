```js
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
import { Button } from 'beautiful-react-ui';

const initialSchema = createSchema({
  nodes: [
    {
      id: 'node-1',
      content: 'Node 1',
      coordinates: [150, 60],
      outputs: [ { id: 'port-1', alignment: 'right' } ],
    },
  ]
});

const CustomRender = ({ content, data }) => (
  <div onDoubleClick={data.onDoubleClick} role="button" style={{padding: '15px', background: 'purple'}}>
    {content}
  </div>
);

const UncontrolledDiagram = () => {
  // create diagrams schema
  const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema);

  const addNewNode = () => addNode({
      id: `node-${schema.nodes.length + 1}`,
      content: `Node ${schema.nodes.length + 1}`,
      coordinates: [
        schema.nodes[schema.nodes.length - 1].coordinates[0] + 10,
        schema.nodes[schema.nodes.length - 1].coordinates[1] + 20,
      ],
      render: CustomRender,
      data: {
         onDoubleClick: () => alert(`Schema length is: ${schema.nodes.length}`),
      },
      inputs: [
        { id: `port-${schema.nodes.length + 1}` }
      ]
   });

  const removeLast = () => {
      const lastNode = schema.nodes[schema.nodes.length - 1];
      removeNode(lastNode);
  };

  return (
    <div style={{ height: '22.5rem' }}>
      <Button color="primary" icon="plus" onClick={addNewNode}>Add new node</Button>
      <Button color="secondary" icon="minus" onClick={removeLast}>Remove last node</Button>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
};

<UncontrolledDiagram />
```
