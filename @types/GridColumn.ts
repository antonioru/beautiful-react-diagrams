import { FunctionComponent } from 'react';
import { DefaultProps } from './_shared';

export type ColumnWidth = (
  '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12'
  | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12);

export type GridColumnProps = DefaultProps & {
  /**
   * Accepts a value from 1 to 12 to define the column width
   */
  size?: ColumnWidth,
  /**
   * Accepts a value from 1 to 12 to define the column width on small screen devices
   */
  sm?: ColumnWidth,
  /**
   * Accepts a value from 1 to 12 to define the column width on medium screen devices
   */
  md?: ColumnWidth,
  /**
   * Accepts a value from 1 to 12 to define the column width on large screen devices
   */
  lg?: ColumnWidth,
  /**
   * Accepts a value from 1 to 12 to define the column width on extra-large screen devices
   */
  xl?: ColumnWidth,
  /**
   * Accepts a value from 1 to 12 to define the column padding-left
   */
  offset?: ColumnWidth,
  /**
   * Accepts a value from 1 to 12 to define the column padding-left on small screen devices
   */
  offsetSm?: ColumnWidth,
  /**
   * Accepts a value from 1 to 12 to define the column padding-left on medium screen devices
   */
  offsetMd?: ColumnWidth,
  /**
   * Accepts a value from 1 to 12 to define the column padding-left on large screen devices
   */
  offsetLg?: ColumnWidth,
  /**
   * Accepts a value from 1 to 12 to define the column padding-left on extra-large screen devices
   */
  offsetXl?: ColumnWidth,
  /**
   * Defines the position of the the content along its container's cross axis.
   */
  selfAlign?: 'start' | 'center' | 'end' | 'stretch' | 'auto',
};

/**
 * Declares the GridColumn functional component
 */
declare const GridColumn: FunctionComponent<GridColumnProps>;

export default GridColumn;
