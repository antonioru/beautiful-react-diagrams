import { ElementType, ReactNode } from 'react';

export type PortAlignment = 'right' | 'left' | 'top' | 'bottom';

export type Port = {
  id: string;
  canLink?: Function;
};

export type NodeCoordinates = [number, number];

export type Node<P> = {
  id: string;
  coordinates: NodeCoordinates;
  disableDrag?: boolean;
  content?: ReactNode;
  inputs?: Port[];
  outputs?: Port[];
  inputsAlignment?: PortAlignment,
  outputsAlignment?: PortAlignment
  render?: (props: Omit<Node<P>, 'coordinates'>) => ElementType | ReactNode;
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
