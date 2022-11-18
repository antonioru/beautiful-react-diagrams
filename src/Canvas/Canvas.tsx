import React, { FC, HTMLAttributes } from 'react'
import clsx from 'clsx'
import { DiagramNodeCoordinates } from '../utils/SchemaType';

import './Canvas.style.scss'

/**
 * Canvas description
 */
const Canvas: FC<CanvasProps> = (props) => {
  const { pan, onPanChange, className, ...rest } = props;
  const classList = clsx('brd-canvas', className)

  return (
    <div className={classList} {...rest}>
      Hello, Canvas
    </div>
  )
}

export interface CanvasProps extends HTMLAttributes<HTMLElement> {
  /*
   * prop description
   */
  pan: DiagramNodeCoordinates;
  onPanChange: (nextPan: DiagramNodeCoordinates) => void,
}

export default React.memo(Canvas)
