import { ElementType, FunctionComponent, ReactElement } from 'react';
import { Color, Size, Callback, DefaultProps } from './_shared';
import { IconProps } from './Icon';
import { SpinnerProp } from './Spinner';
import { PillProps } from './Pill';

export type ButtonProps = DefaultProps & {
  /**
   * Defines the button color, can be `default`, `primary`, `secondary`, `info`, `warning`, `success`, `danger`
   * or `transparent`
   */
  color?: Color,
  /**
   * Defines the button's size, can be `small`, `default`, `large`
   */
  size?: Size,
  /**
   * Shows the outlines only
   */
  outline?: boolean,
  /**
   * Makes the button rounded
   */
  rounded?: boolean,
  /**
   * Defines the button's type
   */
  type?: 'submit' | 'button' | 'reset',
  /**
   * Disables the button
   */
  disabled?: boolean,
  /**
   * Makes the button completely fluid (full width)
   */
  fluid?: boolean,
  /**
   * Defines the hover effect, can be `round`, `zoom`,  `shrink`,  `float`, `reflection`
   */
  hover?: boolean | 'round' | 'zoom' | 'shrink' | 'float' | 'reflection',
  /**
   * Attaches a callback to the 'click' event
   */
  onClick?: Callback<Event, undefined>,
  /**
   * Shows an icon, you can pass both a valid Icon component name prop or the instance of an Icon component
   */
  icon?: string | string[] | ReactElement<IconProps>,
  /**
   * Shows a spinner icon within the button. The prop value can be "true" to show a standard <Spinner />
   * or the actual instance of a <Spinner /> component.
   * If the prop value is "false" or any falsy value (undefined or null) the spinner won't show.
   */
  spinner?: boolean | ReactElement<SpinnerProp>
  /**
   * Show a pill into the button. You can pass both a valid pill label prop or the instance of an pill component
   */
  pill?: string | ReactElement<PillProps>
  /**
   * A renderer to replace the button element
   */
  ElementRender?: ElementType,
};

declare const Button: FunctionComponent<ButtonProps>;

export default Button;
