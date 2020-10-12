import { ElementType, ReactNode } from 'react';

export type PortAlignment = 'right' | 'left' | 'top' | 'bottom';

export type Port = {
  id: string,
  canLink?: Function,
  alignment?: PortAlignment,
}

export type NodeCoordinates = [number, number];

export type Node = {
  id: string,
  coordinates: NodeCoordinates,
  content?: ReactNode,
  inputs?: Port[],
  outputs?: Port[],
  type?: 'default',
  render?: ElementType,
  className?: string,
};

export type Link = {
  input: string,
  output: string,
  label?: ReactNode,
  readonly?: boolean,
  className?: string,
}

export type DiagramSchema = {
  nodes: Node[],
  links?: Link[],
}
