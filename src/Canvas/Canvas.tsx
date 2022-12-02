import React, { Dispatch, FC, HTMLAttributes, SetStateAction, useRef } from 'react'
import clsx from 'clsx'
import { Coordinates } from '../utils/SchemaType'
import useCanvasPanHandlers from './useCanvasPanHandlers'
import { calcCanvasStyle } from '../utils/fns'
import CanvasGridBackground from './CanvasGridBackground'
import useCanvasScale from './useCanvasScale'

import './Canvas.style.scss'

/**
 * The Canvas component is a controlled component providing a pannable and scalable container for
 * the Diagram component(s).
 * It can contain only components of type Diagram or CanvasControl.
 * Since it is a controlled component a 'pan' and a 'scale' props should be provided together with an onScaleChange
 * and an onPanChange handler.
 */
const Canvas: FC<CanvasProps> = (props) => {
  const { pan, onPanChange, inertia, scale, onScaleChange, resetScaleOnDblClick, className, children, ...rest } = props
  const elRef = useRef<HTMLDivElement>(null)
  const onPanStart = useCanvasPanHandlers<HTMLDivElement>({ pan, onPanChange, inertia })
  const classList = clsx('brd-diagram-canvas', className)
  const style = calcCanvasStyle(scale || 1, pan)

  useCanvasScale(elRef, { onScaleChange, resetScaleOnDblClick })

  return (
    <div className={classList} {...rest} ref={elRef} role="none" onMouseDown={onPanStart}>
      <CanvasGridBackground translateX={pan.x} translateY={pan.y} scale={scale} />
      <div className="brd-canvas-content" style={style}>
        {children}
      </div>
    </div>
  )
}

export interface CanvasProps extends HTMLAttributes<HTMLElement> {
  /**
   * Defines the canvas panning offset in the [x, y] format
   */
  pan: Coordinates;
  /**
   * Since Canvas is a controlled component, the 'onPanChange' prop is the change handler of the 'pan' prop
   */
  onPanChange: Dispatch<SetStateAction<Coordinates>>,
  /**
   * Defines the canvas scale level
   */
  scale?: number,
  /**
   * Since Canvas is a controlled component, the 'onZoomChange' prop is the change handler of the 'zoom' prop
   */
  onScaleChange?: Dispatch<SetStateAction<number>>,
  /**
   * Defines whether the scale should be reset on when double click
   */
  resetScaleOnDblClick?: boolean,
  /**
   * Defines whether the canvas should apply an inertia effect when the panning is over
   */
  inertia?: boolean,
}

Canvas.defaultProps = {
  inertia: true,
  scale: 1,
  onScaleChange: undefined,
  resetScaleOnDblClick: true
}

export default React.memo(Canvas)
