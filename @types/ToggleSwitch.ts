import { ElementType, FunctionComponent, ReactElement } from 'react';
import { Callback, Color, DefaultProps } from './_shared';

export type ToggleSwitchProps = DefaultProps & {
  /**
   * The toggle value, boolean
   */
  value: boolean,
  /**
   * The toggle on change handler
   */
  onChange?: Callback<Event, boolean>,
  /**
   * The toggle color
   */
  color?: Color,
  /**
   * Defines whether the toggle switch shall be disabled or not
   */
  disabled?: boolean,
  /**
   * Displays a help text right under the component
   */
  helpText?: string,
  /**
   * Define the toggle switch component
   */
  SwitchRender?: ReactElement,
  /**
   * Defines the switch rail renderer
   */
  RailRender?: ElementType
};

/**
 * Declares the Toggle functional component
 */
declare const ToggleSwitch: FunctionComponent<ToggleSwitchProps>;

export default ToggleSwitch;
