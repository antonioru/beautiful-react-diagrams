import { FunctionComponent } from 'react';
import { Callback, DefaultProps } from './_shared';

export type SelectOptionItem = {
  label: string,
  value?: boolean | string | number,
  disabled?: boolean,
};

export type SelectOptionGroup = {
  name: string,
  options: SelectOptionItem[],
};

export type SingleValue = number | string | boolean;

export type SelectProps = DefaultProps & {
  /**
   * The select options. <br/>
   * Can be an array of object defined like the following: <br />
   * ```
   * const options = [
   *    { label: 'Option 1', value: 1 },
   *    { label: 'Option 2', value: 2 },
   *    { label: 'Option 3', value: 'option3', disabled: true },
   * ];
   * ```
   *
   * or an array of options group like: <br />
   * ```
   * const optionsGroup = [
   *  {
   *    name: 'Group 1',
   *    options: [
   *      { label: 'Option 1', value: 1 },
   *      { label: 'Option 2', value: 2 },
   *      { label: 'Option 3', value: 'option3', disabled: true },
   *    ],
   *  },
   *  {
   *    name: 'Group 2',
   *    options: [
   *      { label: 'Option 4', value: 4 },
   *      { label: 'Option 5', value: 5 },
   *      { label: 'Option 6', value: 6 },
   *    ],
   *  }
   * ];
   * ```
   */
  options: SelectOptionItem[] | SelectOptionGroup[],
  /**
   * The value of the selected item, if not set will show the placeholder
   */
  value: SingleValue | SingleValue[],
  /**
   * The on change callback
   */
  onChange: Callback<SelectOptionItem[] | SelectOptionGroup[], SingleValue | SingleValue[]>,
  /**
   * Displays a help text right under the component
   */
  helpText?: string,
  /**
   * The text to show when nothing is selected
   */
  placeholder?: string,
  /**
   * Defines if the select should take all the possible width
   */
  fluid?: boolean,
  /**
   * Defines whether the onChange callback should be fired on option select
   */
  toggleOnChange?: boolean,
  /**
   * Defines whether the options list should be filtrable or not
   */
  filtrable?: boolean,
  /**
   * Defines the multiple selection style
   */
  multiStyle?: 'strings' | 'pills',
  /**
   * Defines the filter input placeholder
   */
  filterInputPlaceholder?: string,
  /**
   * Defines the message to show when no results are found
   */
  filterNoResultLabel?: string,
  /**
   * Defines if the select should be clearable or not
   */
  clearable?: boolean,
};

declare const Select: FunctionComponent<SelectProps>;

export default Select;
