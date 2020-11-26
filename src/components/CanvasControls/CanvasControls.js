import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PlusIcon from './IconPlus';
import MinusIcon from './IconMinus';
import CenterIcon from './IconCenter';
import { noop, stopPropagation } from '../../shared/Constants';

import './canvas-controls.scss';

/**
 * TODO: document this thing
 * @param props
 * @returns {*}
 * @constructor
 */
const CanvasControls = (props) => {
  const {
    placement, alignment, onPanChange, onZoomChange, className,
    ElementRender, ButtonRender, ZoomInBtnRender, ZoomOutBtnRender, CenterBtnRender,
  } = props;
  const classList = useMemo(() => (
    classNames('bi bi-diagram-ctrls', `bi-diagram-ctrls-${placement}`, `bi-diagram-ctrls-${alignment}`, className)
  ), [placement, className, alignment]);

  const zoomInHandler = useCallback(() => {
    onZoomChange((currentZoom) => (currentZoom + 0.25));
  }, [onZoomChange]);

  const zoomOutHandler = useCallback(() => {
    onZoomChange((currentZoom) => (currentZoom - 0.25));
  }, [onZoomChange]);

  const resetHandler = useCallback(() => {
    onPanChange({ x: 0, y: 0 });
    onZoomChange(1);
  }, [onZoomChange, onPanChange]);

  return (
    <ElementRender className={classList} onMouseDownCapture={stopPropagation} onTouchStartCapture={stopPropagation}>
      <ButtonRender onClick={zoomInHandler} className="bid-ctrls-btn"><ZoomInBtnRender /></ButtonRender>
      <ButtonRender onClick={resetHandler} className="bid-ctrls-btn"><CenterBtnRender /></ButtonRender>
      <ButtonRender onClick={zoomOutHandler} className="bid-ctrls-btn"><ZoomOutBtnRender /></ButtonRender>
    </ElementRender>
  );
};

CanvasControls.propTypes = {
  // eslint-disable-next-line max-len
  placement: PropTypes.oneOf(['top-left', 'top-right', 'top-center', 'bottom-right', 'bottom-center', 'bottom-left', 'left', 'right']),
  alignment: PropTypes.oneOf(['vertical', 'horizontal']),
  onPanChange: PropTypes.func,
  onZoomChange: PropTypes.func,
  ButtonRender: PropTypes.elementType,
  ZoomInBtnRender: PropTypes.elementType,
  CenterBtnRender: PropTypes.elementType,
  ZoomOutBtnRender: PropTypes.elementType,
  ElementRender: PropTypes.elementType,
};

CanvasControls.defaultProps = {
  placement: 'bottom-left',
  alignment: 'vertical',
  onPanChange: noop,
  onZoomChange: noop,
  ButtonRender: 'button',
  ZoomInBtnRender: PlusIcon,
  CenterBtnRender: CenterIcon,
  ZoomOutBtnRender: MinusIcon,
  ElementRender: 'nav',
};

export default React.memo(CanvasControls);
