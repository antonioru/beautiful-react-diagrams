### Ports

```js
import Diagram, {
  Canvas,
  createSchema,
  useSchema,
  useCanvas,
  CanvasControls,
} from 'beautiful-react-diagrams'

const initialSchema = createSchema({
  nodes: [
    {
      content: 'Start',
      coordinates: [100, 150],
      disableDrag: true,
      outputs: [
        { id: 'port-1', label: 'Source 1' },
        { id: 'port-2', label: 'Source 2' },
      ],
      outputsAlignment: 'right',
    },
    {
      content: 'Middle',
      coordinates: [300, 150],
      inputs: [{ id: 'port-3' }, { id: 'port-4' }],
      outputs: [{ id: 'port-5' }, { id: 'port-6' }],
      inputsAlignment: 'left',
      outputsAlignment: 'right',
    },
    {
      content: 'StartDEBUG',
      coordinates: [600, 50],
      disableDrag: false,
      outputs: [
        { id: 'portDEBUG-1', label: 'Source 1' },
        { id: 'portDEBUG-2', label: 'Source 2' },
      ],
      outputsAlignment: 'bottom',
    },
    {
      content: 'MiddleDEBUG',
      coordinates: [750, 350],
      inputs: [{ id: 'portDEBUG-3' }, { id: 'portDEBUG-4' }],
      outputs: [{ id: 'portDEBUG-5' }, { id: 'portDEBUG-6' }],
      inputsAlignment: 'top',
      outputsAlignment: 'bottom',
    },
    /*{
      content: 'End',
      coordinates: [600, 150],
      inputsAlignment: 'left',
      inputs: [ 
        { id: 'port-7', label: 'End 1' }, 
        { id: 'port-8', label: 'End 2' },
      ],
    },*/
  ],
  links: [
    { input: 'port-1', output: 'port-4' },
    { input: 'portDEBUG-1', output: 'portDEBUG-4' },
  ],
})

const UncontrolledDiagram = () => {
  const [canvasState, handlers] = useCanvas() // creates canvas state
  const [schema, { onChange }] = useSchema(initialSchema) // creates diagrams schema

  return (
    <div style={{ height: '30rem' }}>
      <Canvas {...canvasState} {...handlers}>
        <Diagram schema={schema} onChange={onChange} />
        <CanvasControls />
      </Canvas>
    </div>
  )
}

;<UncontrolledDiagram />
```

### Readonly Links

```js
import Diagram, {
  Canvas,
  createSchema,
  useSchema,
  useCanvas,
  CanvasControls,
} from 'beautiful-react-diagrams'

// the diagram model
const initialSchema = createSchema({
  nodes: [
    { id: 'node-1', content: 'Hey Jude', coordinates: [312, 27] },
    { id: 'node-2', content: "Don't", coordinates: [330, 90] },
    { id: 'node-3', content: 'be afraid', coordinates: [100, 320] },
    { id: 'node-4', content: 'let me down', coordinates: [306, 332] },
    { id: 'node-5', content: 'make it bad', coordinates: [515, 330] },
    { id: 'node-6', content: 'Take a sad song', coordinates: [295, 460] },
  ],
  links: [
    {
      input: 'node-1',
      output: 'node-2',
      readonly: true,
      className: 'my-custom-link-class',
    },
    { input: 'node-2', output: 'node-3', readonly: true },
    { input: 'node-2', output: 'node-4', readonly: true },
    { input: 'node-2', output: 'node-5', readonly: true },
    { input: 'node-3', output: 'node-6', readonly: true },
    { input: 'node-4', output: 'node-6', readonly: true },
    { input: 'node-5', output: 'node-6', readonly: true },
  ],
})

const DiagramExample = () => {
  const [canvasStates, canvasStateHandlers] = useCanvas() // creates canvas states
  const [schema, { onChange }] = useSchema(initialSchema) // creates diagrams schema

  return (
    <div style={{ height: '35rem' }}>
      <Canvas {...canvasStates} {...canvasStateHandlers}>
        <Diagram schema={schema} onChange={onChange} />
        <CanvasControls />
      </Canvas>
    </div>
  )
}

;<DiagramExample />
```
