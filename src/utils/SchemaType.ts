import { HTMLAttributes, ReactNode } from 'react';
import { ComponentRenderer } from './commonTypes';

export interface DiagramNodeCoordinates {
  x: number,
  y: number
}

export type PortAlignment = 'top' | 'bottom' | 'left' | 'right';

export interface NodePort {
  id: string,
  label?: string,
  canLink?: (sourcePortId: string, targetPortId: string, portType: 'output' | 'input') => boolean,
  className?: HTMLAttributes<HTMLElement>['className'],
}

export interface DiagramNode<TData> {
  id: string,
  coordinates: DiagramNodeCoordinates,
  inputs?: NodePort[],
  inputsAlignment?: PortAlignment,
  outputs?: NodePort[],
  outputsAlignment?: PortAlignment,
  draggable?: boolean,
  content?: ReactNode,
  NodeRenderer?: ComponentRenderer,
  data?: TData,
  className?: HTMLAttributes<HTMLElement>['className'],
}

export interface DiagramLinks {
  inputId: string,
  outputId: string,
  label?: ReactNode,
  readonly?: boolean,
  className?: HTMLAttributes<HTMLElement>['className'],
}

export interface DiagramSchema<TData> {
  nodes: DiagramNode<TData>[],
  links?: DiagramLinks[],
}
