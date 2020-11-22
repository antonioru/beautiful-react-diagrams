import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useCanvasPan from './useCanvasPan';
import useCanvasZoom from './useCanvasZoom';
import BackgroundGrid from './BackgroundGrid';

import './canvas.scss';

const makeStyle = (scale = 1, { x = 0, y = 0 }) => ({
  transform: `translate(${x}px, ${y}px) translateZ(0) scale(${scale})`,
});

/**
 * @TODO: Document this component
 */
const Canvas = (props) => {
  const {
    initialZoom, maxZoom, minZoom, zoomable, pannable, zoomOnWheel, inertia, debug, children, className,
    ElementRenderer, GridRenderer, ...rest
  } = props;
  const elRef = useRef();
  const [pan, startPan] = useCanvasPan({ pannable, inertia });
  const [scale] = useCanvasZoom(elRef, { initialZoom, maxZoom, minZoom, zoomable, zoomOnWheel });
  const classList = useMemo(() => classNames('bi bi-diagram bi-diagram-canvas', className), [className]);
  const style = useMemo(() => makeStyle(scale, pan), [scale, pan.x, pan.y]);

  return (
    <ElementRenderer className={classList} onMouseDown={startPan} onTouchStart={startPan} ref={elRef} {...rest}>
      <GridRenderer translateX={pan.x} translateY={pan.y} scale={scale} />
      <div className="bi-canvas-content" style={style}>
        {children}
      </div>
      {debug && (
        <div className="bi-canvas-debugger">
          <p>{JSON.stringify(pan)}</p>
          <p>{`Scale: ${scale}`}</p>
        </div>
      )}
    </ElementRenderer>
  );
};

Canvas.propTypes = {
  zoomable: PropTypes.bool,
  pannable: PropTypes.bool,
  initialZoom: PropTypes.number,
  zoomOnWheel: PropTypes.bool,
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,
  inertia: PropTypes.bool,
  debug: PropTypes.bool,
  GridRenderer: PropTypes.elementType,
  ElementRenderer: PropTypes.elementType,
};

Canvas.defaultProps = {
  zoomable: true,
  pannable: true,
  initialZoom: 1,
  zoomOnWheel: true,
  maxZoom: 5,
  minZoom: 0.4,
  inertia: true,
  debug: false,
  GridRenderer: BackgroundGrid,
  ElementRenderer: 'div',
};

export default React.memo(Canvas);
