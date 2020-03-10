import { ElementType, FunctionComponent } from 'react';
import { Callback, Color, DefaultProps } from './_shared';

export type AccordionProps = DefaultProps & {
  /**
   * Defines the current active tab index
   */
  active?: number | string,
  /**
   * The callback to be performed on content change
   */
  onChange?: Callback<MouseEvent, number | string>,
  /**
   * Defines the color of the accordion, can be one of the following:
   * `default`, `primary`, `secondary`, `info`, `warning`, `success`, `danger`.
   */
  color?: Color,
  /**
   * A render function to be used as the accordion element instead of the default one
   */
  ElementRender?: ElementType,
};


export type AccordionContentProps = DefaultProps & {
  title?: ElementType,
  ButtonRender: ElementType,
  ContentRender: ElementType,
  ElementRender: ElementType,
  CaretRender: ElementType,
}

declare const Accordion: FunctionComponent<AccordionProps> & { Content: FunctionComponent<AccordionContentProps> };

export default Accordion;
