import {FunctionComponent, MemoExoticComponent} from 'react';
import {DiagramSchema} from "./DiagramSchema";

export type DiagramProps = {
  schema?: DiagramSchema,
  onChange?: (schema: DiagramSchema) => unknown,
};

declare const Diagram: MemoExoticComponent<FunctionComponent<DiagramProps>>;

export default Diagram;
