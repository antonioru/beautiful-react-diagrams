```js
import Diagram from 'beautiful-react-diagrams';
import { Button } from 'beautiful-react-ui';


const CustomRender = (props) => { 
  return (
    <div style={{background: 'red', padding: '20px'}}>
        <Button onClick={props.data.onClick}>{props.content}</Button>
    </div>
  )
};

const initialSchema = {
  nodes: [
    { 
      id: 'node-1', 
      content: 'Node 1', 
      coordinates: [150, 60], 
      render: CustomRender,
      data: {  onClick: () => alert('no') },
      outputs: [ { id: 'port-1', alignment: 'right' } ],
    },
  ]
};

const UncontrolledDiagram = () => {
  // create diagrams schema
  const [schema, setSchema] = React.useState(initialSchema);

  const onClick = React.useCallback(() => console.log(schema), [JSON.stringify(schema)]);

  const addNewNode = () => {
    const nextNode = {
      id: `node-${schema.nodes.length + 1}`,
      content: `Node ${schema.nodes.length + 1}`,
      coordinates: [ 
        schema.nodes[schema.nodes.length - 1].coordinates[0] + 10,
        schema.nodes[schema.nodes.length - 1].coordinates[1] + 20,
      ],
      render: CustomRender,
      data: {
        onClick,
      },
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
