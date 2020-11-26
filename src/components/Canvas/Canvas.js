import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useCanvasPanHandlers from './useCanvasPanHandlers';
import useCanvasZoomHandlers from './useCanvasZoomHandlers';
import BackgroundGrid from './BackgroundGrid';
import { noop } from '../../shared/Constants';
import { filterControlsOut, enrichControls } from './childrenUtils';

import './canvas.scss';

const calcTransformation = (scale = 1, { x = 0, y = 0 }) => ({
  transform: `translate(${x}px, ${y}px) translateZ(0) scale(${scale})`,
});

/**
 * @TODO: Document this component
 */
const Canvas = (props) => {
  const {
    pan, onPanChange, zoom, onZoomChange, maxZoom, minZoom, zoomOnWheel, inertia, zoomResetOnDblClick,
    ElementRenderer, GridRenderer, debug, className, children, ...rest
  } = props;
  const elRef = useRef();
  const classList = useMemo(() => classNames('bi bi-diagram bi-diagram-canvas', className), [className]);
  const style = useMemo(() => calcTransformation(zoom, pan), [zoom, pan.x, pan.y]);
  const startPan = useCanvasPanHandlers({ pan, onPanChange, inertia });

  useCanvasZoomHandlers(elRef, { onZoomChange, maxZoom, minZoom, zoomOnWheel, zoomResetOnDblClick });

  return (
    <ElementRenderer className={classList} onMouseDown={startPan} onTouchStart={startPan} ref={elRef} {...rest}>
      <GridRenderer translateX={pan.x} translateY={pan.y} scale={zoom} />
      <div className="bi-canvas-content" style={style}>
        {filterControlsOut(children)}
      </div>
      {debug && (
        <div className="bi-canvas-debugger">
          <p>{`Pan: ${pan.x}, ${pan.y}`}</p>
          <p>{`Scale: ${zoom}`}</p>
        </div>
      )}
      {enrichControls(children, { onPanChange, onZoomChange, minZoom, maxZoom })}
    </ElementRenderer>
  );
};

Canvas.propTypes = {
  /**
   * Since Canvas is a controlled component, the 'pan' prop defines the canvas panning
   */
  pan: PropTypes.exact({ x: PropTypes.number, y: PropTypes.number }),
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
  /**
   * Displays debug info
   */
  debug: PropTypes.bool,
  GridRenderer: PropTypes.elementType,
  ElementRenderer: PropTypes.elementType,
};

Canvas.defaultProps = {
  pan: { x: 0, y: 0 },
  onPanChange: noop,
  zoom: 1,
  onZoomChange: noop,
  zoomOnWheel: true,
  maxZoom: 2,
  minZoom: 0.5,
  zoomResetOnDblClick: true,
  inertia: true,
  debug: false,
  GridRenderer: BackgroundGrid,
  ElementRenderer: 'div',
};

export default React.memo(Canvas);
