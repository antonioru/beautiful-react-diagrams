```js
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';

const CustomNode = (props) => {
  const { inputs } = props;
  
  return (
    <div style={{ background: '#717EC3', borderRadius: '10px' }}>
      <div style={{ padding: '10px', color: 'white'  }}>
        Custom Node
      </div>
      <div style={{marginTop: '20px'}}>
        {inputs.map((port) => React.cloneElement(port, {
          style: { width: '50px', height: '25px', background: '#1B263B' }
        }))}
      </div>
    </div>
  );
};

const initialSchema = createSchema({
  nodes: [
    { 
      id: 'node-1', 
      content: 'Node 1', 
      coordinates: [150, 60], 
      outputs: [ { id: 'port-1', alignment: 'right' } ], 
    },
    { 
      id: 'node-custom', 
      coordinates: [250, 60], 
      render: CustomNode,
      inputs: [ { id: 'custom-port-1',  alignment: 'left' } ],
    },
  ]
});

const UncontrolledDiagram = () => {
  // create diagrams schema
  const [schema, { onChange }] = useSchema(initialSchema);

  return (
    <div style={{ height: '22.5rem' }}>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
};

<UncontrolledDiagram />
```
