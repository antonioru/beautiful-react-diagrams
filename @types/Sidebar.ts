import { ElementType, FunctionComponent, ReactElement, SyntheticEvent } from 'react';
import { Callback, Color, DefaultProps, IconProp } from './_shared';

export type SidebarProps = DefaultProps & {
  isOpen: boolean,
  onToggle?: Callback<MouseEvent>,
  accent?: Color,
  title?: string,
  titleColor?: Color,
  headerLogo?: ReactElement | ElementType,
  toggleIcon?: IconProp,
  showToggle?: boolean,
  orientation?: 'left' | 'right',
  type?: 'shrinkable' | 'offcanvas',
  transitionType?: 'translate' | 'margin',
  HeaderRender?: ElementType,
  ElementRender?: ElementType,
  NavRender?: ElementType,
};

export type SidebarItemProps = DefaultProps & {
  text: string,
  to?: string,
  Icon?: IconProp,
  current?: boolean,
  onClick?: Callback<SyntheticEvent<MouseEvent>>,
  LinkRender?: ElementType,
  ElementRender?: ElementType,
};

export type SidebarDividerProps = DefaultProps & { ElementRender?: ElementType };

export type SidebarCollapsibleProps = DefaultProps & {
  text: string,
  Icon?: IconProp,
  current?: boolean,
  showOpen?: boolean,
  LinkRender?: ElementType,
  ElementRender?: ElementType,
  ListRender?: ElementType,
};

export type SidebarGroupProps = DefaultProps & {
  text: string,
  Icon?: IconProp,
  ItemRender?: ElementType,
  ElementRender?: ElementType,
  ListRender?: ElementType,
}

/**
 * Declares the Sidebar functional component
 */
declare const Sidebar: FunctionComponent<SidebarProps>
  & { Item: FunctionComponent<SidebarItemProps> }
  & { Collapsible: FunctionComponent<SidebarCollapsibleProps> }
  & { Divider: FunctionComponent<SidebarDividerProps> }
  & { Group: FunctionComponent<SidebarGroupProps> };


export default Sidebar;
