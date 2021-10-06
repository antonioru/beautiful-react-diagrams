import { memo } from 'react';
import { DiagramSchema } from './DiagramSchema';
import type { DiagramCanvasProps } from './DiagramCanvas';

export type DiagramProps<P> = {
  schema?: DiagramSchema<P>;
  onChange?: (schema: DiagramSchema<P>) => unknown;
} & DiagramCanvasProps;

declare const Diagram: <P = unknown>(props: DiagramProps<P>) => JSX.Element;

export default memo(Diagram);
