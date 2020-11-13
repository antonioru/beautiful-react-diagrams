To start a diagram a valid schema shall be provided to the component via the `schema` prop.<br/>
A valid model is a plain object having a `nodes` property set.<br />

The `nodes` property is an array of javascript objects described by a unique `id` (<strong>it must be unique</strong>),
a `content` property (can be a React component) and a `coordinates` property describing the node position.<br/><br/>
Optionally a `links` property can be set describing links between the nodes, similar to the `nodes` property it must
be an array of valid link describing tuples, a valid link must have an `input` and an `output` property.

```jsx
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';

// the diagram model
const initialSchema = createSchema({
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
