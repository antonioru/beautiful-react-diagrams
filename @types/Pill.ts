import { FunctionComponent } from 'react';
import { Color, DefaultProps } from './_shared';

export type PillProps = DefaultProps & {
  /**
   * Defines the pill's background color, can be `default`, `primary`, `secondary`,
   * `info`, `warning`, `success`, `danger`.
   * @default default
   */
  color?: Color,
  /**
   * Pill can possibly render a link, if this prop is set to a string the resulting tag will change from <span> to <a>.
   * @default undefined
   */
  href?: string,
  /**
   * Accepts a function/component and renders the returning value within the Pill component
   * @default undefined
   */
  render?: (props: PillProps) => unknown,
  /**
   * Indicates the Pill shape.
   * @default true
   */
  rounded?: boolean,
};

/**
 * Declares the Pill functional component
 */
declare const Pill: FunctionComponent<PillProps>;

export default Pill;
