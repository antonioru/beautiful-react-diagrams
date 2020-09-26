### Standard Links

```js
import Diagram from 'beautiful-react-diagrams';

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
    { input: 'node-1',  output: 'node-4', label: 'Link 3', readonly: true, className: 'my-custom-link-class' },
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
