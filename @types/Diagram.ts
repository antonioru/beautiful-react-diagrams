import {FunctionComponent, MemoExoticComponent} from 'react';
import {DiagramSchema} from "./DiagramSchema";

export type DiagramProps<P> = {
  schema?: DiagramSchema<P>,
  onChange?: (schema: DiagramSchema<P>) => unknown,
};

declare const Diagram: MemoExoticComponent<FunctionComponent<DiagramProps<any>>>;

export default Diagram;
