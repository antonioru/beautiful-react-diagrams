import { JSXElementConstructor } from 'react'

export type ComponentRenderer<TProps = Record<string, unknown>> = JSXElementConstructor<TProps> | string;
