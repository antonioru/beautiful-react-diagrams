import { FunctionComponent } from 'react';
import { DefaultProps } from './_shared';

export type DividerProps = DefaultProps & {
  /**
   * shows 2 lines instead of one
   */
  fancy?: boolean,
  /**
   * clears the content both left and right
   */
  clear?: boolean,
  /**
   * changes the line color from dark (default) to light
   */
  light?: boolean,
  /**
   * changes the line style
   */
  line?:'solid' | 'dashed' | 'dotted',
};

declare const Divider: FunctionComponent<DividerProps>;

export default Divider;
