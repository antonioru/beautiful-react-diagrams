import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import PlusIcon from './IconPlus';
import MinusIcon from './IconMinus';
import CenterIcon from './IconCenter';
import { canvasCallbacks, maxZoomState, minZoomState, zoomState } from '../../states/canvas';
import stopEvent from '../../shared/funcs/stopEvent';

import './canvas-controls.scss';

const zoomRatio = 0.25;

/**
 * TODO: document this thing
 * @param props
 * @returns {*}
 * @constructor
 */
const CanvasControls = (props) => {
  const { placement, alignment, className, ElementRender, ButtonRender, ZoomInBtnRender, ZoomOutBtnRender, CenterBtnRender } = props;
  const classList = useMemo(() => (
    classNames('brd brd-diagram-ctrls', `brd-diagram-ctrls-${placement}`, `brd-diagram-ctrls-${alignment}`, className)
  ), [placement, className, alignment]);

  const methods = useRecoilValue(canvasCallbacks);
  const zoom = useRecoilValue(zoomState);
  const minZoom = useRecoilValue(minZoomState);
  const maxZoom = useRecoilValue(maxZoomState);
  const { onZoomChange, onPanChange } = methods;

  const zoomInHandler = useCallback((event) => {
    const nextZoom = parseFloat((zoom + zoomRatio).toFixed(2));
    stopEvent(event);

    if (nextZoom <= maxZoom) {
      onZoomChange(nextZoom);
    }
  }, [onZoomChange, zoom, maxZoom]);

  const zoomOutHandler = useCallback((event) => {
    const nextZoom = parseFloat((zoom - zoomRatio).toFixed(2));
    stopEvent(event);

    if (nextZoom >= minZoom) {
      onZoomChange(nextZoom);
    }
  }, [onZoomChange, zoom, minZoom]);

  const resetHandler = useCallback((event) => {
    stopEvent(event);
    onPanChange([0, 0]);
    onZoomChange(1);
  }, [onPanChange, onZoomChange]);

  return (
    <ElementRender className={classList}>
      <ButtonRender onClick={zoomInHandler} className="brd-ctrls-btn" disabled={zoom >= maxZoom}><ZoomInBtnRender /></ButtonRender>
      <ButtonRender onClick={resetHandler} className="brd-ctrls-btn"><CenterBtnRender /></ButtonRender>
      <ButtonRender onClick={zoomOutHandler} className="brd-ctrls-btn" disabled={zoom <= minZoom}><ZoomOutBtnRender /></ButtonRender>
    </ElementRender>
  );
};

CanvasControls.propTypes = {
  // eslint-disable-next-line max-len
  placement: PropTypes.oneOf(['top-left', 'top-right', 'top-center', 'bottom-right', 'bottom-center', 'bottom-left', 'left', 'right']),
  alignment: PropTypes.oneOf(['vertical', 'horizontal']),
  ButtonRender: PropTypes.elementType,
  ZoomInBtnRender: PropTypes.elementType,
  CenterBtnRender: PropTypes.elementType,
  ZoomOutBtnRender: PropTypes.elementType,
  ElementRender: PropTypes.elementType,
};

CanvasControls.defaultProps = {
  placement: 'bottom-left',
  alignment: 'vertical',
  ButtonRender: 'button',
  ZoomInBtnRender: PlusIcon,
  CenterBtnRender: CenterIcon,
  ZoomOutBtnRender: MinusIcon,
  ElementRender: 'nav',
};

export default React.memo(CanvasControls);
