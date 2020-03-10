import { FunctionComponent } from 'react';
import { Color, DefaultProps, Size } from './_shared';

export type SpinnerProp = DefaultProps & {
  /**
   * Defines the spinner color, can be `default`, `primary`, `secondary`, `info`, `warning`, `success`, `danger`.
   */
  color?: Color,
  /**
   * Defines the button size, can be `small`, `default`, `large`
   */
  size?: Size,
  /**
   * Defines the spinner type, can be `circle` or `pulse`
   */
  type?: 'circle' | 'pulse',
};

declare const Spinner: FunctionComponent<SpinnerProp>;

export default Spinner;
