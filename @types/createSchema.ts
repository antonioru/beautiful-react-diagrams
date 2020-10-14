import { DiagramSchema } from './DiagramSchema';

declare const createSchema: <P>(
  initialSchema: Partial<DiagramSchema<P>>
) => DiagramSchema<P>;

export default createSchema;
