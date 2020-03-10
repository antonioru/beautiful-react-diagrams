import { ElementType, FunctionComponent } from 'react';
import { Callback, Color, DefaultProps } from './_shared';

export type CheckboxProps = DefaultProps & {
  /**
   * The checkbox value, boolean
   */
  value: boolean,
  /**
   * The checkbox on change handler
   */
  onChange?: Callback<MouseEvent, boolean>
  /**
   * Defines the checkbox background color
   */
  color?: Color,
  /**
   * Defines whether the checkbox shall be disabled or not
   */
  disabled?: boolean,
  /**
   * Displays a help text right under the component
   */
  helpText?: string,
  /**
   * Defines the check icon renderer
   */
  CheckIcon?: ElementType,
};

/**
 * Declares the Checkbox functional component
 */
declare const Checkbox: FunctionComponent<CheckboxProps>;

export default Checkbox;
