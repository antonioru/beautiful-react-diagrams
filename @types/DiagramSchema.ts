import { ElementType, ReactNode } from 'react';

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
  render?: (
    props: Omit<Node<P>, 'coordinates'>
  ) => ElementType | ReactNode;
  className?: string;
  data?: P;
};

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
