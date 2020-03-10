import { FunctionComponent } from 'react';
import { Color, DefaultProps } from './_shared';

export type TitleProps = DefaultProps & {
  /*
   * Defines the title color, can be one of the following:
   * `default`, `primary`, `secondary`, `info`, `warning`, `success`, `danger`.
   */
  color?: Color,
  /*
   * Defines the title size, can be one of the following:
   * `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`.
   */
  size?: 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl',
  /**
   * Defines which tag should be used to render the title
   */
  tagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  /**
   * Defines the title text align
   */
  textAlign?: 'center' | 'left' | 'right' | 'justify',
  /**
   * Defines the title breaks
   */
  wordBreak?: 'normal' | 'words' | 'all' | 'truncate',
};

declare const Title: FunctionComponent<TitleProps>;

export default Title;
