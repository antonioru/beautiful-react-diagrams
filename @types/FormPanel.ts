import {ElementType, FunctionComponent} from 'react';
import {DefaultProps} from './_shared';

export type FormPanelProps = DefaultProps & {
  /**
   * Defines the panel label to be shown on top of it
   */
  label?: string,
  /**
   * Defines the label type.
   * `floating` type shows a floating label on top of the form panel whilst `title` shows a title-like label
   */
  labelType?: 'floating' | 'title',
  /**
   * Defines the title render component
   */
  LabelRender?: ElementType
};

/**
 * Declares the FormPanel functional component
 */
declare const FormPanel: FunctionComponent<FormPanelProps>;

export default FormPanel;
