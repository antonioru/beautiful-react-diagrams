Since *Diagram* is a [controlled components](https://reactjs.org/docs/forms.html#controlled-components), it needs to 
be provided with a "*schema*", which represents its state, and an "*onChange*" handler.

Being a *controlled component* allows extreme flexibility in manipulating the schema at runtime, on the other hand, the 
operations performed on a schema are quite often the same. For this reason I've summed up the most common operations
in the `useSchema` hook.

```typescript static
type DiagramMethods<P> = {
  onChange: (schemaChanges: DiagramSchema<P>) => undefined;
  addNode: (node: Node<P>) => undefined;
  removeNode: (node: Node<P>) => undefined;
  connect: (inputId: string, outputId: string) => undefined;
};

declare const useSchema: <P>(initialSchema: DiagramSchema<P>) => [DiagramSchema<P>, DiagramMethods<P>];
```
