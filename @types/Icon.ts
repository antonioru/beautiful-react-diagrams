import { FunctionComponent } from 'react';
import { Color, DefaultProps, Size } from './_shared';

export type IconProps = DefaultProps & {
  /**
   * The [font-awesome](https://fontawesome.com/) icon name
   */
  name: string | string[],
  /**
   * The icon color, if not defined get the color of its parent.
   */
  color?: Color,
  /**
   * The icon size, if not defined get the size of its parent text
   */
  size?: Size,
};

declare const Icon: FunctionComponent<IconProps>;

export default Icon;
