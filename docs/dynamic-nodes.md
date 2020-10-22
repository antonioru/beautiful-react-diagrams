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

const CustomRender = ({ id, content, data, inputs, outputs }) => (
    <div style={{background: 'purple'}}>
      <div style={{textAlign: 'right'}}>
        <Button icon="times" size="small" onClick={()=>data.onClick(id)}/>
      </div>
      <div role="button" style={{padding: '15px'}}>
        {content}
      </div>
      <div style={{marginTop: '10px',display:'flex', justifyContent:'space-between'}}>
        {inputs.map((port) => React.cloneElement(port, {style: { width: '25px', height: '25px', background: '#1B263B' }}))}
        {outputs.map((port) => React.cloneElement(port, {style: { width: '25px', height: '25px', background: '#1B263B' }}))}
      </div>
    </div>
);

const UncontrolledDiagram = () => {
  // create diagrams schema
  const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema);
  const deleteNodeFromSchema = (id) => {
    const nodeToRemove = schema.nodes.find(node => node.id === id);
    removeNode(nodeToRemove);
    };

  const addNewNode = () => 
    addNode({
      id: `node-${schema.nodes.length+1}`,
      content: `Node ${schema.nodes.length+1}`,
      coordinates: [
        schema.nodes[schema.nodes.length - 1].coordinates[0] + 100,
        schema.nodes[schema.nodes.length - 1].coordinates[1],
      ],
      render: CustomRender,
      data: {onClick: deleteNodeFromSchema},
      inputs: [{ id: `port-${Math.random()}`}],
      outputs: [{ id: `port-${Math.random()}`}],
  });

  return (
    <div style={{ height: '22.5rem' }}>
      <Button color="primary" icon="plus" onClick={addNewNode}>Add new node</Button>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
};

<UncontrolledDiagram />
```
