import { FunctionComponent, ReactElement } from 'react';
import { DefaultProps, Placement } from './_shared';

export type DropDownProps = DefaultProps & {
  /**
   * Defines the React node to apply the dropdown to
   */
  trigger: ReactElement<any>,
  /**
   * Defines whether the dropdown is shown or not
   */
  isShown?: boolean,
  /**
   * Defines the callback to be performed when clicking on the given toggle,
   */
  onToggle: Function,
  /**
   * Defines the dropdown placement
   */
  placement?: Placement,
  /**
   * Defines whether or not the dropdown should show a pointing arrow
   */
  pointingArrow?: boolean,
};

declare const DropDown: FunctionComponent<DropDownProps>;

export default DropDown;
