import { FunctionComponent, ReactElement } from 'react';
import { Callback, Size, Color, DefaultProps } from './_shared';
import { IconProps } from './Icon';

export type InputProps = DefaultProps & {
  /**
   * The input value
   */
  value?: number | string,
  /**
   * The on change handler
   */
  onChange?: Callback<KeyboardEvent, number | string>,
  /**
   * Defines the input placeholder
   */
  placeholder?: string,
  /**
   * Disables the input
   */
  disabled?: boolean,
  /**
   * Displays a help text right under the component
   */
  helpText?: string,
  /**
   * Defines the input color
   */
  color?: Color,
  /**
   * Defines the input size,
   */
  size?: Size,
  /**
   * Shows the possible icon
   */
  icon?: string | string[] | ReactElement<IconProps>,
  /**
   * Defines the icon position
   */
  iconPosition?: 'right' | 'left',
  /**
   * Defines if the input should take all the possible width
   */
  fluid?: boolean,
};

/**
 * Declares the Input functional component
 */
declare const Input: FunctionComponent<InputProps>;

export default Input;
