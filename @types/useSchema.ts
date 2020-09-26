import {DiagramSchema, Link, Node} from "./DiagramSchema";

type DiagramMethods = {
  onChange: (schemaChanges: { links?: Link[], nodes?: Node[] }) => undefined,
  addNode: (node: Node) => undefined,
  removeNode: (node: Node) => undefined,
  connect: (inputId: string, outputId: string) => undefined,
}


declare const useSchema: (initialSchema: DiagramSchema) => [DiagramSchema, DiagramMethods];

export default useSchema;
