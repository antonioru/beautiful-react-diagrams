import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { RecoilRoot } from 'recoil';
import BackgroundGrid from './BackgroundGrid';
import useCanvasPanHandlers from './useCanvasPanHandlers';
import useCanvasScaleHandlers from './useCanvasScaleHandlers';
import useRecoilStateReconciler from './useRecoilStateReconciler';
import { filterControlsOut, controlsOnly, calcTransformationStyle } from './utils';
import { CoordinatesType } from '../../shared/Types';
import { noop } from '../../shared/Utils';

import './canvas.scss';

/**
 * The Canvas component is a controlled component providing a pannable and scalable container for
 * the Diagram component(s).
 * It can contains only components of type Diagram or CanvasControl.
 * Since it is a controlled component a 'pan' and a 'scale' props should be provided together with an onScaleChange
 * and an onPanChange handler.
 */
const Canvas = (props) => {
  const {
    pan, onPanChange, scale, onScaleChange, maxScale, minScale, scaleOnWheel, inertia, resetScaleOnDblClick,
    ElementRenderer, GridRenderer, className, children, ...rest
  } = props;
  const elRef = useRef();
  const classList = useMemo(() => classNames('brd brd-diagram-canvas', className), [className]);
  const style = useMemo(() => calcTransformationStyle(scale, pan), [scale, pan]);
  const startPan = useCanvasPanHandlers({ pan, onPanChange, inertia });

  useCanvasScaleHandlers(elRef, { onScaleChange, maxScale, minScale, scaleOnWheel, resetScaleOnDblClick });
  useRecoilStateReconciler(scale, pan, minScale, maxScale, onScaleChange, onPanChange, elRef);

  return (
    <ElementRenderer className={classList} onMouseDown={startPan} onTouchStart={startPan} ref={elRef} {...rest}>
      <BackgroundGrid translateX={pan[0]} translateY={pan[1]} scale={scale} />
      <div className="brd-canvas-content" style={style}>
        {filterControlsOut(children)}
      </div>
      {controlsOnly(children)}
    </ElementRenderer>
  );
};

Canvas.propTypes = {
  /**
   * Defines the canvas panning offset in the [x, y] format
   */
  pan: CoordinatesType,
  /**
   * Since Canvas is a controlled component, the 'onPanChange' prop is the change handler of the 'pan' prop
   */
  onPanChange: PropTypes.func,
  /**
   * Defines the canvas scale level
   */
  scale: PropTypes.number,
  /**
   * Since Canvas is a controlled component, the 'onZoomChange' prop is the change handler of the 'zoom' prop
   */
  onScaleChange: PropTypes.func,
  /**
   * Allow to scale in/out on mouse wheel
   */
  scaleOnWheel: PropTypes.bool,
  /**
   * The maximum allowed scale lv
   */
  maxScale: PropTypes.number,
  /**
   * The minimum allowed scale lv
   */
  minScale: PropTypes.number,
  /**
   * Defines whether the scale should be reset on mouse double click
   */
  resetScaleOnDblClick: PropTypes.bool,
  /**
   * Defines whether the canvas should apply inertia when the drag is over
   */
  inertia: PropTypes.bool,
  GridRenderer: PropTypes.elementType,
  ElementRenderer: PropTypes.elementType,
};

Canvas.defaultProps = {
  pan: [0, 0],
  onPanChange: noop,
  scale: 1,
  onScaleChange: noop,
  scaleOnWheel: true,
  maxScale: 2,
  minScale: 0.5,
  resetScaleOnDblClick: true,
  inertia: true,
  GridRenderer: BackgroundGrid,
  ElementRenderer: 'div',
};

const withRecoil = (Component) => (props) => <RecoilRoot><Component {...props} /></RecoilRoot>;

export default withRecoil(React.memo(Canvas));
