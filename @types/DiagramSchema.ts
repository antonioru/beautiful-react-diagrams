import { ElementType, ReactElement, ReactNode } from 'react';

export type PortAlignment = 'right' | 'left' | 'top' | 'bottom';

export type Port = {
  id: string;
  canLink?: Function;
  alignment?: PortAlignment;
};

export type NodeCoordinates = [number, number];

export type Node<P> = {
  id: string;
  coordinates: NodeCoordinates;
  disableDrag?: boolean;
  content?: ReactNode;
  inputs?: Port[];
  outputs?: Port[];
  type?: 'default';
  render?: (props: NodeRenderProps<P>) => ElementType | ReactNode;
  className?: string;
  data?: P;
};

export type NodeRenderProps<P> = Omit<
  Node<P>,
  'coordinates' | 'disableDrag' | 'inputs' | 'outputs'
> & { inputs: ReactElement<Port>[]; outputs: ReactElement<Port>[] };

export type Link = {
  input: string;
  output: string;
  label?: ReactNode;
  readonly?: boolean;
  className?: string;
};

export type DiagramSchema<P> = {
  nodes: Node<P>[];
  links?: Link[];
};
