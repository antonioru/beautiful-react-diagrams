import {ComponentClass, FunctionComponent, ReactElement, ReactInstance} from 'react';
import {IconProps} from "./Icon";

/**
 * Exports all the shared colors supported by the library
 */
export type Color = 'default' | 'primary' | 'secondary' | 'info' | 'warning' | 'success' | 'danger';

/**
 * Exports the available size shared between some components
 */
export type Size = 'small' | 'default' | 'large';

/**
 * Defines a generic callback
 */
export type Callback<Event = undefined, Value = undefined> = (event: Event, value?: Value) => unknown;

/**
 * Defines the default props each component should have
 */
export type DefaultProps = {
  id?: string,
  className?: string,
}

/**
 * Defines the available type of placement that can possibly be applied to the floating components
 */
export type Placement = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center'
  | 'bottom-right' | 'left-center' | 'right-center';

export type IconProp = string | string[] | ReactElement<IconProps>;

// TODO: to be improved
export type Renderer<Props> = ComponentClass<Props> | FunctionComponent<Props> | ReactInstance;
