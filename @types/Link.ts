import { ElementType, FunctionComponent } from 'react';
import { Color, DefaultProps } from './_shared';

export type LinkProps = DefaultProps & {
  /**
   * Defines the link href
   */
  href: string,
  /*
   * Defines the link color, can be one of the following:
   * `default`, `primary`, `secondary`, `info`, `warning`, `success`, `danger`.
   */
  color?: Color,
  /**
   * A renderer to replace the link element
   */
  ElementRender?: ElementType,
};

declare const Link: FunctionComponent<LinkProps>;

export default Link;
