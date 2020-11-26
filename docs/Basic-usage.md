To start using the library import a `Canvas` and a `Diagram` component, both are [controlled components](https://reactjs.org/docs/forms.html#controlled-components) 
so you'll need to provide a [state](https://reactjs.org/docs/faq-state.html) and a [state handler](https://reactjs.org/docs/faq-state.html#how-do-i-update-state-with-values-that-depend-on-the-current-state) 
(*beautiful-react-diagrams* exports mainly controlled components).

A *Diagram* component needs to be wrapped into a *Canvas* which allows panning/zooming functionality.<br />

A *Diagram* can easily be represented by a "*schema*" (the library provides a set of pre-made utilities to define and validate schemas).
A "*schema*" is a plain object having, at least, a "*nodes*" property defined.<br />

The "*nodes*" property must be an array of tuples (objects) described by a unique "*id*" (if not provided the library will create a unique id for the node), 
a "*content*" property (can be a React component) and a "*coordinates*" property describing the node position.

Optionally a "*links*" property can be defined to define links between the nodes, similar to the "*nodes*" property it must 
be an array of valid link describing tuples, a valid link must have an "*input*" and an "*output*" property.

In order to avoid unnecessary complexity the `useSchema`, `useCanvasState` hooks have been provided together with the
 `createSchema` utility.

```js
import Diagram, { Canvas, createSchema, useSchema, useCanvasState, CanvasControls } from 'beautiful-react-diagrams';

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
  const [canvasStates, handlers] = useCanvasState(); // creates canvas state
  const [schema, { onChange }] = useSchema(initialSchema); // creates diagrams schema

  return (
    <div style={{ height: '30rem' }}>
      <Canvas {...canvasStates} {...handlers}>
        <Diagram schema={schema} onChange={onChange} />
        <CanvasControls />
      </Canvas>
    </div>
  );
};

<DiagramExample />
```

