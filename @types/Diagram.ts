import { memo } from 'react';
import { DiagramSchema } from './DiagramSchema';

export type DiagramProps<P> = {
  schema?: DiagramSchema<P>;
  onChange?: (schema: DiagramSchema<P>) => unknown;
};

declare const Diagram: <P = unknown>(props: DiagramProps<P>) => JSX.Element;

export default memo(Diagram);
