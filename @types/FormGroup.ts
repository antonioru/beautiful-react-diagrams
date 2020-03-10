import { FunctionComponent } from 'react';
import { DefaultProps } from './_shared';

export type FormGroupProps = DefaultProps & {
  /**
   * Defines if children should be vertically or horizontally aligned
   */
  orientation?: 'horizontal' | 'vertical',
};

/**
 * Declares the FormGroup functional component
 */
declare const FormGroup: FunctionComponent<FormGroupProps>;

export default FormGroup;
