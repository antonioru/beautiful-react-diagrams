import { FunctionComponent } from 'react';
import { Color, DefaultProps } from './_shared';

export type LabelProps = DefaultProps & {
  /**
   * Defines the text to be shown
   */
  text?: string,
  /**
   * Defines the label color
   */
  color?: Color,
  /**
   * Defines the label html tag
   */
  tagName?: 'span' | 'label'
  /**
   * Defines whether the label is referring to a required input or not
   */
  required?: boolean,
  /**
   * Defines the possible label `for` attribute
   */
  htmlFor?: string,
};

/**
 * Declares the Label functional component
 */
declare const Label: FunctionComponent<LabelProps>;

export default Label;
