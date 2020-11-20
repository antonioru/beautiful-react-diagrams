It is possible to create big diagram and navigate into it using `draggable` prop.
This prop will let you to move the diagram canvas in every direction till its limits.

``` jsx
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';

// the diagram model
const initialSchema = createSchema({
  nodes: [
    { id: 'node-1', content: 'Node 1', coordinates: [2450, 2350], },
    { id: 'node-2', content: 'Node 2', coordinates: [2200, 2500], },
    { id: 'node-3', content: 'Node 3', coordinates:[2450, 2500], },
    { id: 'node-4', content: 'Node 4', coordinates: [2700, 2500], },
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
    <div style={{ height: '22.5rem', width: '40rem'}}>
      <Diagram schema={schema} onChange={onChange} draggable/>
    </div>
  );
};

<UncontrolledDiagram />
```

It is possible to zoom into the diagram using two props:
- `showZoomButtons`: that will let you zoom into the diagram using buttons.
- `zoomOnWheel`: that will let you zoom into the diagram using the mouse wheel.
It is possible to change the zoom button position using `zoomButtonsPosition` that accepts one of the following values:
`top-left`, `top-right`, `top-center`, `bottom-right`, `bottom-center`, `bottom-left`. 
The default value for `zoomButtonsPosition` is `bottom-right`.

``` jsx
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';

// the diagram model
const initialSchema = createSchema({
  nodes: [
    { id: 'node-1', content: 'Node 1', coordinates: [2450, 2350], },
    { id: 'node-2', content: 'Node 2', coordinates: [2200, 2500], },
    { id: 'node-3', content: 'Node 3', coordinates:[2450, 2500], },
    { id: 'node-4', content: 'Node 4', coordinates: [2700, 2500], },
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
    <div style={{ height: '22.5rem', width: '40rem'}}>
      <Diagram schema={schema} onChange={onChange} showZoomButtons/>
    </div>
  );
};

<UncontrolledDiagram />
```
