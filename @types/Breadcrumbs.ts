import { FunctionComponent } from 'react';
import { Color, DefaultProps } from './_shared';
import { IconProps } from './Icon';


export type BreadcrumbItem = {
  path?: string,
  label?: string,
  icon?: IconProps,
  render: (item: BreadcrumbItem) => unknown,
}

export type BreadcrumbsProps = DefaultProps & {
  /**
   * Defines the items type, it must be an array of object, with label required.
   * The breadcrumb component accept an array of values, in order to show the path of pages.
   */
  items: BreadcrumbItem[],
  /**
   * Defines the link color of breadcrumbs, can be: `default`, `primary`, `secondary`, `info`, `warning`, `success`,
   * `danger`.
   * @default primary
   */
  color?: Color,
  /*
   * Defines how many items should be displayed into the breadcrumbs
   */
  maxDisplayedItems: number | string,
};

declare const Breadcrumbs: FunctionComponent<BreadcrumbsProps>;

export default Breadcrumbs;
