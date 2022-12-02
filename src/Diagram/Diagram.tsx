import React, { FC, HTMLAttributes } from 'react'
import { DiagramSchema } from '../utils/SchemaType'

/**
 * The Diagram component is the root-node of any diagram.
 * It's a controlled component that accepts a `schema`, defining the current state of the diagram, and an `onChange` handler.
 * Being a controlled component it allows the developer to have the best possible control over the diagram and its interactions
 * with the user.
 */
const Diagram: FC<TestProps<any>> = ({ onChange, schema, className, ...rest }) => (
  <div {...rest}>
    Hello, Test
  </div>
)

export interface TestProps<TData> extends Pick<HTMLAttributes<HTMLElement>, 'style' | 'className'> {
  /**
   * The diagram current schema
   */
  schema: DiagramSchema<TData>
  onChange?: (nextSchema: DiagramSchema<TData>) => void,
}

Diagram.defaultProps = {
  onChange: undefined
}

export default React.memo(Diagram)
