import {DiagramSchema, Link, Node} from "./DiagramSchema";

type DiagramMethods<P> = {
  onChange: (schemaChanges: { links?: Link[], nodes?: Node<P>[] }) => undefined,
  addNode: (node: Node<P>) => undefined,
  removeNode: (node: Node<P>) => undefined,
  connect: (inputId: string, outputId: string) => undefined,
}


declare const useSchema: <P>(initialSchema: DiagramSchema<P>) => [DiagramSchema<P>, DiagramMethods<P>];

export default useSchema;
