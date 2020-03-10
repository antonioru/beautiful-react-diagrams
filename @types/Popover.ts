import { FunctionComponent, ReactNode } from 'react';
import { Callback, DefaultProps, Placement } from './_shared';

export type PopoverProps = DefaultProps & {
  /**
   * Defines the React node to apply the popover to
   */
  trigger: ReactNode,
  /**
   * Defines the callback to be performed each time the event defined by the `action` prop fires,
   * by default a `click` event
   */
  onToggle: Callback,
  /**
   * Defines whether the popover is shown or not
   */
  isOpen?: boolean,
  /**
   * Defines when to fire the onToggle callback, it can be `click` or `hover`
   */
  action?: 'click' | 'hover',
  /**
   * Define the possible popup title
   */
  title?: string,
  /**
   * Defines the popup placement
   */
  placement?: Placement,
};

/**
 * Declares the Popover functional component
 */
declare const Popover: FunctionComponent<PopoverProps>;

export default Popover;
