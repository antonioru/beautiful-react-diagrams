import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useWindowScroll, useWindowResize, useMouseEvents } from 'beautiful-react-hooks';
import isEqual from 'lodash.isequal';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DiagramContext from '../../Context/DiagramContext';
import getDiagramCanvasCoords from './utils/getDiagramCanvasCoords';
import getCanvasDragLimits from './utils/getCanvasDragLimits';
import DiagramZoomButtons from '../DiagramZoomButtons/DiagramZoomButtons';

/**
 * The DiagramCanvas component provides a context to the Diagram children.
 * The context contains the canvas bounding box (for future calculations) and the port references in order to
 * allow links to easily access to a the ports coordinates
 */
const DiagramCanvas = (props) => {
  const {
    children, portRefs, nodeRefs, draggable, delta, zoomButtonsPosition, showZoomButtons,
    maxZoom, minZoom, zoomOnWheel, className, style, ...rest
  } = props;
  const [bbox, setBoundingBox] = useState(null);
  const canvasRef = useRef();
  const mouseCoords = useRef();

  const [isDragging, setIsDragging] = useState(false);
  const { onMouseDown, onMouseMove, onMouseUp, onMouseLeave } = useMouseEvents(canvasRef);
  const [canvasTranslate, setCanvasTranslate] = useState([0, 0]);
  const [canvasScale, setCanvasScale] = useState(1);
  const classList = classNames('bi bi-diagram-canvas', {
    'enlarge-diagram-canvas': draggable || showZoomButtons || zoomOnWheel,
  }, className);

  const wrapperClassList = classNames('bi bi-diagram', {
    isPanning: isDragging,
    pannable: draggable || showZoomButtons || zoomOnWheel,
  });

  // calculate the given element bounding box and save it into the bbox state
  const calculateBBox = (el) => {
    if (el) {
      const nextBBox = el.getBoundingClientRect();
      if (!isEqual(nextBBox, bbox)) {
        setBoundingBox(nextBBox);
      }
    }
  };
  // when the canvas is ready and placed within the DOM, update canvasRef coordinates
  // and save its bounding box to be provided down to children component as a context value for future calculations.
  useEffect(() => {
    calculateBBox(canvasRef.current);
    if (draggable || showZoomButtons || zoomOnWheel) {
      const canvasBBox = canvasRef.current.getBoundingClientRect();
      setCanvasTranslate([-(canvasBBox.width / 2), -(canvasBBox.height / 2)]);
    }
  }, [canvasRef.current]);

  // same on window scroll and resize
  useWindowScroll(() => calculateBBox(canvasRef.current));
  useWindowResize(() => calculateBBox(canvasRef.current));

  // save mouse coordinated if diagram is draggable
  onMouseDown((event) => {
    if (draggable) {
      mouseCoords.current = [event.pageX, event.pageY];
      setIsDragging(true);
    }
  });

  /**
   * on mouse move update diagram canvas coordinates and save the latest mouse coordinates
   */
  onMouseMove((event) => {
    if (draggable && isDragging) {
      const currentMouseCoords = [event.pageX, event.pageY];
      const deltaXMouse = currentMouseCoords[0] - mouseCoords.current[0];
      const deltaYMouse = currentMouseCoords[1] - mouseCoords.current[1];
      const canvasParent = canvasRef.current.parentElement;
      const canvasParentDim = [canvasParent.offsetWidth, canvasParent.offsetHeight];
      const canvasDim = [canvasRef.current.offsetWidth, canvasRef.current.offsetHeight];
      // get the canvas drag limit
      const [topLimit, rightLimit, bottomLimit, leftLimit] = getCanvasDragLimits(canvasDim, canvasParentDim);
      // start dragging only if the mouse movement is bigger than the delta prop
      // drag the canvas till its limits
      if (deltaXMouse > delta && canvasTranslate[0] <= leftLimit) {
        setCanvasTranslate([canvasTranslate[0] + deltaXMouse, canvasTranslate[1]]);
        mouseCoords.current = [currentMouseCoords[0], mouseCoords.current[1]];
      }
      if (deltaXMouse < -delta && canvasTranslate[0] >= rightLimit) {
        setCanvasTranslate([canvasTranslate[0] + deltaXMouse, canvasTranslate[1]]);
        mouseCoords.current = [currentMouseCoords[0], mouseCoords.current[1]];
      }
      if (deltaYMouse > delta && canvasTranslate[1] <= topLimit) {
        setCanvasTranslate([canvasTranslate[0], canvasTranslate[1] + deltaYMouse]);
        mouseCoords.current = [mouseCoords.current[0], currentMouseCoords[1]];
      }
      if (deltaYMouse < -delta && canvasTranslate[1] >= bottomLimit) {
        setCanvasTranslate([canvasTranslate[0], canvasTranslate[1] + deltaYMouse]);
        mouseCoords.current = [mouseCoords.current[0], currentMouseCoords[1]];
      }
    }
  });

  const stopDragging = useCallback(() => {
    if (draggable) {
      setIsDragging(false);
      mouseCoords.current = [];
    }
  }, [draggable, setIsDragging]);

  onMouseUp(stopDragging);
  onMouseLeave(stopDragging);

  const zoomInHandler = useCallback(() => {
    if (canvasScale <= maxZoom) {
      setCanvasScale(canvasScale + 0.1);
    }
  }, [canvasScale, setCanvasScale, maxZoom]);

  const resetZoomHandler = useCallback(() => {
    setCanvasScale(1);
  }, [setCanvasScale]);

  const zoomOutHandler = useCallback(() => {
    if (canvasScale > minZoom) {
      setCanvasScale(canvasScale - 0.1);
    }
  }, [canvasScale, setCanvasScale, minZoom]);

  const zoomOnWheelHandler = useCallback((event) => {
    event.preventDefault();
    if (event.deltaY > 0) {
      zoomInHandler();
    } else {
      zoomOutHandler();
    }
  }, [zoomOutHandler, zoomInHandler]);

  const getDiagramStyle = useCallback(() => {
    if (draggable || showZoomButtons || zoomOnWheel) {
      return { ...style, ...getDiagramCanvasCoords(canvasTranslate[0], canvasTranslate[1], canvasScale) };
    }
    return { ...style };
  }, [draggable, showZoomButtons, zoomOnWheel, canvasTranslate[0], canvasTranslate[1], canvasScale]);

  return (
    <div className={wrapperClassList}>
      {(showZoomButtons) && (
        <DiagramZoomButtons
          onZoomIn={zoomInHandler}
          onResetZoom={resetZoomHandler}
          onZoomOut={zoomOutHandler}
          disableZoomOutBtn={canvasScale <= minZoom}
          disableZoomInBtn={canvasScale >= maxZoom}
          buttonsPosition={zoomButtonsPosition}
        />
      )}
      <div
        className={classList}
        ref={canvasRef}
        style={getDiagramStyle()}
        onWheel={zoomOnWheel ? zoomOnWheelHandler : undefined}
        {...rest}
      >
        <DiagramContext.Provider value={{ canvas: bbox, ports: portRefs, nodes: nodeRefs, _nodes: {} }}>
          {children}
        </DiagramContext.Provider>
      </div>
    </div>
  );
};

DiagramCanvas.propTypes = {
  portRefs: PropTypes.shape({}),
  nodeRefs: PropTypes.shape({}),
  /**
   * Defines if the user can move the diagram canvas to reach every node
   */
  draggable: PropTypes.bool,
  /**
   * Defines how many pixels the mouse should drag before starting the canvas panning
   */
  delta: PropTypes.number,
  /**
   * Enable the zoom on diagram canvas and show zoom buttons
   */
  showZoomButtons: PropTypes.bool,
  /**
   * Enable zoom on canvas by mouse wheel
   */
  zoomOnWheel: PropTypes.bool,
  // eslint-disable-next-line max-len
  zoomButtonsPosition: PropTypes.oneOf(['top-left', 'top-right', 'top-center', 'bottom-right', 'bottom-center', 'bottom-left']),
  className: PropTypes.string,
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
};

DiagramCanvas.defaultProps = {
  portRefs: {},
  nodeRefs: {},
  className: '',
  draggable: false,
  delta: 5,
  showZoomButtons: false,
  zoomOnWheel: false,
  zoomButtonsPosition: 'bottom-right',
  minZoom: 1,
  maxZoom: 100,
};

export default React.memo(DiagramCanvas);
