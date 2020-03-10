import { FunctionComponent, ReactElement } from 'react';
import { Callback, Size, Color, DefaultProps } from './_shared';

export type TextAreaProps = DefaultProps & {
  /**
   * The textarea value
   */
  value?: number | string,
  /**
   * The on change handler
   */
  onChange?: Callback<KeyboardEvent, number | string>,
  /**
   * Defines the textarea placeholder
   */
  placeholder?: string,
  /**
   * Disables the textarea
   */
  disabled?: boolean,
  /**
   * Displays a help text right under the component
   */
  helpText?: string,
  /**
   * Defines the textarea border color
   */
  color?: Color,
  /**
   * Defines the textarea size,
   */
  size?: Size,
  /**
   * Defines if the textarea should take all the possible width
   */
  fluid?: boolean,
  /**
   * Defines if the textarea should be resizable
   */
  resizable?: boolean,
};

/**
 * Declares the Input functional component
 */
declare const TextArea: FunctionComponent<TextAreaProps>;

export default TextArea;
