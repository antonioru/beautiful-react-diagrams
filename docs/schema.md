Managing complex and large schemas could be a problem, for this reason a set of function to handle the schema object 
comes with the library.

### createSchema

Creates a valid diagam `schema` by validating the passed one. 
It ensures the nodes' id by creating a random one if none is provided.

```javascript static
import Diagram, { createSchema } from 'beautiful-react-diagrams';

const validSchema = createSchema({
  nodes: [
    { content: 'Node 1', coordinates: [250, 60], },
    { content: 'Node 2', coordinates: [100, 200], },
  ],
});
```

### Schema validators


```javascript static
import { validateNode, validateNodes, validateSchema, validateLink, validateLinks, validatePort } from 'beautiful-react-diagrams';

// a valid schema
const schema = createSchema({
  nodes: [
    { 
        id: 'n1', 
        content: 'Node 1', 
        coordinates: [250, 60], 
        outputs: [ { id: 'port-1' } ], 
    },
    { 
        id: 'n2', 
        content: 'Node 2', 
        coordinates: [270, 80], 
        inputs: [ { id: 'port-2' } ], 
    },
  ],
  links: [
    { input: 'port-1', output: 'port-2' }
  ]
});


validateSchema(schema); // returns true or throw an error
validateNodes(schema.nodes); // returns true or throw an error
validateNode(schema.nodes[0); // returns true or throw an error
validateLinks(schema.links); // returns true or throw an error
validateLink(schema.links[0]); // returns true or throw an error
validatePort(schema.nodes[0].outputs[0]); // returns true or throw an error
```
