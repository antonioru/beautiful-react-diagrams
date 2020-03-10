import { FunctionComponent } from 'react';
import { Callback, Color, DefaultProps } from './_shared';
import { IconProps } from './Icon';

export type ListItemProps = {
  icon?: IconProps,
  checkbox?: boolean,
  onChange?: Callback<Event, boolean>,
  value?: boolean,
  color?: Color,
  draggable?: boolean,
  onDragStart: Callback<Event>,
  onDragEnd: Callback<Event>
};

declare const ListItem: FunctionComponent<ListItemProps>;

export type ListProps = DefaultProps & {
  /*
   * Defines the list color, can be one of the following:
   * `default`, `primary`, `secondary`, `info`, `warning`, `success`, `danger`.
   */
  color?: Color,
  /*
   * Shrinks the list items so that it's possible to display more information
   */
  condensed?: boolean,
};

declare const List: FunctionComponent<ListProps> & { Item: typeof ListItem };

export default List;
