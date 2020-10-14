import { FunctionComponent, MemoExoticComponent } from 'react';
import { DiagramSchema } from './DiagramSchema';

export type DiagramProps<P = unknown> = {
  schema?: DiagramSchema<P>;
  onChange?: (schema: DiagramSchema<P>) => unknown;
};

declare const Diagram: MemoExoticComponent<FunctionComponent<DiagramProps>>;

export default Diagram;
