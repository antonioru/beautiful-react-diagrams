```js
import Diagram from 'beautiful-react-diagrams';
import { Button } from 'beautiful-react-ui';

const initialSchema = {
  nodes: [
    {
      id: 'node-1',
      content: 'Node 1',
      coordinates: [150, 60],
      outputs: [ { id: 'port-1', alignment: 'right' } ],
    },
  ]
};

const UncontrolledDiagram = () => {
  // create diagrams schema
  const [schema, setSchema] = React.useState(initialSchema);

  const addNewNode = () => {
    const nextNode = {
      id: `node-${schema.nodes.length + 1}`,
      content: `Node ${schema.nodes.length + 1}`,
      coordinates: [
        schema.nodes[schema.nodes.length - 1].coordinates[0] + 10,
        schema.nodes[schema.nodes.length - 1].coordinates[1] + 20,
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

<UncontrolledDiagram />
```
