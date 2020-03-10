### Basic usage

To start representing diagrams a valid model object shall be provided to the component via the `schema` prop.<br/>
A valid model is a plain object having a `nodes` property set.<br />
The `nodes` property must be an array of tuples (objects) described by a unique `id` (<strong>it must be unique</strong>), 
a `content` property (can be a React component) and a `coordinates` property describing the node position.<br/><br/>
Optionally a `links` property can be set describing links between the nodes, similar to the `nodes` property it must 
be an array of valid link describing tuples, a valid link must have an `input` and an `output` property.

``` jsx
import { Diagram } from 'beautiful-react-diagrams';

// the diagram model
const initialSchema = {
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

const UncontrolledDiagram = () => {
  // create diagrams schema
  const [schema, setSchema] = React.useState(initialSchema);

  return (
    <div style={{ height: '22.5rem' }}>
      <Diagram schema={schema} onChange={setSchema} />
    </div>
  );
};

<UncontrolledDiagram />
```

### Ports

``` jsx
import { Diagram } from 'beautiful-react-diagrams';

const initialSchema = {
  nodes: [
    {
      id: 'node-1',
      content: 'Start',
      coordinates: [100, 150],
      outputs: [
        { id: 'port-1', alignment: 'right' },
        { id: 'port-2', alignment: 'right' },
      ],
      data: {
        foo: 'bar',
        count: 0,
      }
    },
    {
      id: 'node-2',
      content: 'Middle',
      coordinates: [300, 150],
      inputs: [
        { id: 'port-3', alignment: 'left' },
        { id: 'port-4', alignment: 'left' },
      ],
      outputs: [
        { id: 'port-5', alignment: 'right' },
        { id: 'port-6', alignment: 'right' },
      ],
      data: {
        bar: 'foo',
      }
    },
    {
      id: 'node-3',
      content: 'End',
      coordinates: [600, 150],
      inputs: [
        { id: 'port-7', alignment: 'left' },
        { id: 'port-8', alignment: 'left' },
      ],
      data: {
        foo: true,
        bar: false,
        some: {
          deep: {
            object: true,
          }
        },
      }
    },
  ],
  links: [
    { input: 'port-1',  output: 'port-4' },
  ]
};

const UncontrolledDiagram = () => {
  // create diagrams schema
  const [schema, setSchema] = React.useState(initialSchema);

  const handleChange =  (schema) => {
    schema.nodes[0].data.count += 1;
    setSchema(schema); 
  }

  return (
    <div style={{ height: '22.5rem' }}>
      <Diagram schema={schema} onChange={handleChange} />
    </div>
  );
};

<UncontrolledDiagram />
```

### Link labels & readonly links

``` jsx
import { Diagram } from 'beautiful-react-diagrams';

const initialSchema = {
  nodes: [
    { id: 'node-1', content: 'Node 1', coordinates: [250, 60], },
    { id: 'node-2', content: 'Node 2', coordinates: [100, 200], },
    { id: 'node-3', content: 'Node 3', coordinates: [250, 220], },
    { id: 'node-4', content: 'Node 4', coordinates: [400, 200], },
  ],
  links: [
    { input: 'node-1',  output: 'node-2', label: 'Link 1', readonly: true },
    { input: 'node-1',  output: 'node-3', label: 'Link 2', readonly: true },
    { input: 'node-1',  output: 'node-4', label: 'Link 3', readonly: true },
  ]
};

const UncontrolledDiagram = () => {
  // create diagrams schema
  const [schema, setSchema] = React.useState(initialSchema);

  return (
    <div style={{ height: '22.5rem' }}>
      <Diagram schema={schema} onChange={setSchema} />
    </div>
  );
};

<UncontrolledDiagram />
```

### Customizable

``` jsx
import { Diagram } from 'beautiful-react-diagrams';

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

const initialSchema = {
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
};

const UncontrolledDiagram = () => {
  // create diagrams schema
  const [schema, setSchema] = React.useState(initialSchema);

  return (
    <div style={{ height: '22.5rem' }}>
      <Diagram schema={schema} onChange={setSchema} />
    </div>
  );
};

<UncontrolledDiagram />
```
