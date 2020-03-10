import { FunctionComponent } from 'react';
import { DefaultProps } from './_shared';

export type PlaceholderProps = DefaultProps & {
  /**
   * Defines the number of paragraphs to shown
   */
  paragraphs?: number,
  /**
   * Defines if the component should hold place for a title
   */
  title?: boolean,
  /**
   * Defines if the component should hold place for an image
   */
  image?: boolean | 'rounded' | 'square',
};

/**
 * Declares the Placeholder functional component
 */
declare const Placeholder: FunctionComponent<PlaceholderProps>;

export default Placeholder;
