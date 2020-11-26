### Ports

```js
import Diagram, { Canvas, createSchema, useSchema, useCanvasState, CanvasControls } from 'beautiful-react-diagrams';

const initialSchema = createSchema({
  nodes: [
    {
      id: 'node-1',
      content: 'Start',
      coordinates: [100, 150],
      outputs: [
        { id: 'port-1', alignment: 'right' },
        { id: 'port-2', alignment: 'right' },
      ],
      disableDrag: true,
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
});

const UncontrolledDiagram = () => {
  const [canvasState, handlers] = useCanvasState(); // creates canvas state
  const [schema, { onChange }] = useSchema(initialSchema); // creates diagrams schema

  return (
    <div style={{ height: '30rem' }}>
      <Canvas {...canvasState} {...handlers}>
         <Diagram schema={schema} onChange={onChange} />
         <CanvasControls />
      </Canvas>
    </div>
  );
};

<UncontrolledDiagram />
```

### Readonly Links

```js static
import Diagram, { Canvas, createSchema, useSchema, useCanvasState, CanvasControls } from 'beautiful-react-diagrams';

// the diagram model
const initialSchema = createSchema({
  nodes: [
    { id: 'node-1', content: 'Hey Jude', coordinates: [312, 27], },
    { id: 'node-2', content: 'Don\'t', coordinates: [330, 90], },
    { id: 'node-3', content: 'be afraid', coordinates: [100, 320], },
    { id: 'node-4', content: 'let me down', coordinates: [306, 332], },
    { id: 'node-5', content: 'make it bad', coordinates: [515, 330], },
    { id: 'node-6', content: 'Take a sad song', coordinates: [295, 460], },
  ],
  links: [
    { input: 'node-1',  output: 'node-2', readonly: true, className: 'my-custom-link-class' },
    { input: 'node-2',  output: 'node-3', readonly: true },
    { input: 'node-2',  output: 'node-4', readonly: true },
    { input: 'node-2',  output: 'node-5', readonly: true },
    { input: 'node-3',  output: 'node-6', readonly: true },
    { input: 'node-4',  output: 'node-6', readonly: true },
    { input: 'node-5',  output: 'node-6', readonly: true },
  ]
});

const DiagramExample = () => {
  const [canvasState, handlers] = useCanvasState(); // creates canvas state
  const [schema, { onChange }] = useSchema(initialSchema); // creates diagrams schema

  return (
    <div style={{ height: '35rem' }}>
      <Canvas {...canvasState} {...handlers}>
        <Diagram schema={schema} onChange={onChange} />
        <CanvasControls />
      </Canvas>
    </div>
  );
};

<DiagramExample />
```
