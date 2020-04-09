import {ElementType, ReactElement, ReactNode} from "react";

export type PortAlignment = 'right' | 'left' | 'top' | 'bottom';

export type Port = {
  id: string,
  canLink: Function,
  alignment: PortAlignment,
}

export type Node = {
  id: string,
  content?: ReactNode | ReactElement,
  coordinates?: number[],
  inputs?: Port[],
  outputs?: Port,
  type?: 'default',
  renderer?: ElementType,
  className?: string,
};

export type Link = {
  input: string,
  output: string,
  label?: ReactNode,
  readonly?: boolean,
}

export type DiagramSchema = {
  nodes: Node[],
  links?: Link[],
}