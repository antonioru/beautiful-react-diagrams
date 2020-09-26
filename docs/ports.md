```js
import Diagram, { useSchema } from 'beautiful-react-diagrams';

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
  const [schema, { onChange }] = useSchema(initialSchema);

  return (
    <div style={{ height: '22.5rem' }}>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
};

<UncontrolledDiagram />
```
