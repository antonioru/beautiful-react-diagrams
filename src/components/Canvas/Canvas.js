import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { RecoilRoot } from 'recoil';
import useRenderInfo from 'beautiful-react-hooks/useRenderInfo';
import useCanvasPanHandlers from './useCanvasPanHandlers';
import useCanvasZoomHandlers from './useCanvasZoomHandlers';
import useRecoilStateReconciler from './useRecoilStateReconciler';
import BackgroundGrid from './BackgroundGrid';
import { filterControlsOut, controlsOnly } from './childrenUtils';
import { CoordinatesType } from '../../shared/Types';
import { noop } from '../../shared/Utils';

import './canvas.scss';

const calcTransformation = (scale = 1, [x, y]) => ({ transform: `translate(${x}px, ${y}px) translateZ(0) scale(${scale})` });

/**
 * @TODO: Document this component
 */
const Canvas = (props) => {
  const {
    pan, onPanChange, zoom, onZoomChange, maxZoom, minZoom, zoomOnWheel, inertia, zoomResetOnDblClick,
    ElementRenderer, GridRenderer, className, children, ...rest
  } = props;
  const elRef = useRef();
  const classList = useMemo(() => classNames('bi bi-diagram bi-diagram-canvas', className), [className]);
  const style = useMemo(() => calcTransformation(zoom, pan), [zoom, pan[0], pan[1]]);
  const startPan = useCanvasPanHandlers({ pan, onPanChange, inertia });

  useCanvasZoomHandlers(elRef, { onZoomChange, maxZoom, minZoom, zoomOnWheel, zoomResetOnDblClick });
  useRecoilStateReconciler(zoom, pan, minZoom, maxZoom, onZoomChange, onPanChange);
  useRenderInfo('Canvas');

  return (
    <React.StrictMode>
      <ElementRenderer className={classList} onMouseDown={startPan} onTouchStart={startPan} ref={elRef} {...rest}>
        <GridRenderer translateX={pan[0]} translateY={pan[1]} scale={zoom} />
        <div className="bi-canvas-content" style={style}>
          {filterControlsOut(children)}
        </div>
        {controlsOnly(children)}
      </ElementRenderer>
    </React.StrictMode>
  );
};

Canvas.propTypes = {
  /**
   * Since Canvas is a controlled component, the 'pan' prop defines the canvas panning
   */
  pan: CoordinatesType,
  /**
   * Since Canvas is a controlled component, the 'onPanChange' prop is the change handler of the 'pan' prop
   */
  onPanChange: PropTypes.func,
  /**
   * Since Canvas is a controlled component, the 'zoom' prop defines its zoom level, aka: how much the canvas is scaling
   */
  zoom: PropTypes.number,
  /**
   * Since Canvas is a controlled component, the 'onZoomChange' prop is the change handler of the 'zoom' prop
   */
  onZoomChange: PropTypes.func,
  /**
   * Allow to zoom in/out on mouse wheel
   */
  zoomOnWheel: PropTypes.bool,
  /**
   * The maximum allowed zoom
   */
  maxZoom: PropTypes.number,
  /**
   * The minimum allowed zoom
   */
  minZoom: PropTypes.number,
  /**
   * Defines whether the zoom should be reset on double click
   */
  zoomResetOnDblClick: PropTypes.bool,
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
  zoom: 1,
  onZoomChange: noop,
  zoomOnWheel: true,
  maxZoom: 2,
  minZoom: 0.5,
  zoomResetOnDblClick: true,
  inertia: true,
  GridRenderer: BackgroundGrid,
  ElementRenderer: 'div',
};

const MemoCanvas = React.memo(Canvas);

export default React.memo((props) => <RecoilRoot><MemoCanvas {...props} /></RecoilRoot>);
