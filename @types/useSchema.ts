import { DiagramSchema, Node } from './DiagramSchema';

type DiagramMethods<P> = {
  onChange: (schemaChanges: DiagramSchema<P>) => undefined;
  addNode: (node: Node<P>) => undefined;
  removeNode: (node: Node<P>) => undefined;
  connect: (inputId: string, outputId: string) => undefined;
};

declare const useSchema: <P>(
  initialSchema: DiagramSchema<P>
) => [DiagramSchema<P>, DiagramMethods<P>];

export default useSchema;
