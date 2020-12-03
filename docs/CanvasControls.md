```js
import Diagram, { Canvas, createSchema, useSchema, useCanvas, CanvasControls } from 'beautiful-react-diagrams';

// the diagram model
const initialSchema = createSchema({
  nodes: [
    { id: 'node-1', content: 'Hey Jude', coordinates: [312, 27], },
    { id: 'node-2', content: 'Don\'t', coordinates: [330, 90], },
    { id: 'node-3', content: 'be afraid', coordinates: [100, 320], },
    { id: 'node-4', content: 'let me down', coordinates: [306, 332], },
    { id: 'node-5', content: 'make it bad', coordinates: [515, 330], },
  ],
  links: [
    { input: 'node-1',  output: 'node-2' },
    { input: 'node-2',  output: 'node-3' },
    { input: 'node-2',  output: 'node-4' },
    { input: 'node-2',  output: 'node-5' },
  ]
});

const DiagramExample = () => {
  const [ canvasStates, canvasStateHandlers] = useCanvas(); // creates canvas states
  const [schema, { onChange }] = useSchema(initialSchema); // creates diagrams schema

  return (
    <div style={{ height: '30rem' }}>
      <Canvas {...canvasStates} {...canvasStateHandlers}>
        <Diagram schema={schema} onChange={onChange} />
        <CanvasControls alignment="horizontal" placement="bottom-center" />
      </Canvas>
    </div>
  );
};

<DiagramExample />
```
