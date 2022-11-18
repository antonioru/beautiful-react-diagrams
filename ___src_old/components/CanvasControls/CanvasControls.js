import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import PlusIcon from './IconPlus';
import MinusIcon from './IconMinus';
import CenterIcon from './IconCenter';
import { canvasCallbacks, maxScaleState, minScaleState, scaleState } from '../../states/canvas';
import stopEvent from '../../shared/funcs/stopEvent';

import './canvas-controls.scss';

const zoomRatio = 0.25;

/**
 * The CanvasControls component provides a series of controls for scaling and panning to the Canvas component.
 * It is a stateful component as it receives the state and its handlers from the Canvas component.
 */
const CanvasControls = (props) => {
  const {
    placement, alignment, showScaleButtons, showResetButton, className,
    ElementRender, ButtonRender, ScaleInBtnRender, ScaleOutBtnRender, CenterBtnRender,
  } = props;
  const classList = useMemo(() => (
    classNames('brd brd-diagram-ctrls', `brd-diagram-ctrls-${placement}`, `brd-diagram-ctrls-${alignment}`, className)
  ), [placement, className, alignment]);

  const methods = useRecoilValue(canvasCallbacks);
  const zoom = useRecoilValue(scaleState);
  const minScale = useRecoilValue(minScaleState);
  const maxScale = useRecoilValue(maxScaleState);
  const { onScaleChange, onPanChange } = methods;

  const zoomInHandler = useCallback((event) => {
    const nextScale = parseFloat((zoom + zoomRatio).toFixed(2));
    stopEvent(event);

    if (nextScale <= maxScale) {
      onScaleChange(nextScale);
    }
  }, [onScaleChange, zoom, maxScale]);

  const zoomOutHandler = useCallback((event) => {
    const nextScale = parseFloat((zoom - zoomRatio).toFixed(2));
    stopEvent(event);

    if (nextScale >= minScale) {
      onScaleChange(nextScale);
    }
  }, [onScaleChange, zoom, minScale]);

  const resetHandler = useCallback((event) => {
    stopEvent(event);
    onPanChange([0, 0]);
    onScaleChange(1);
  }, [onPanChange, onScaleChange]);

  return (
    <ElementRender className={classList}>
      {showScaleButtons && (
        <ButtonRender onClick={zoomInHandler} className="brd-ctrls-btn" disabled={zoom >= maxScale}>
          <ScaleInBtnRender />
        </ButtonRender>
      )}
      {showResetButton && (
        <ButtonRender onClick={resetHandler} className="brd-ctrls-btn">
          <CenterBtnRender />
        </ButtonRender>
      )}
      {showScaleButtons && (
        <ButtonRender onClick={zoomOutHandler} className="brd-ctrls-btn" disabled={zoom <= minScale}>
          <ScaleOutBtnRender />
        </ButtonRender>
      )}
    </ElementRender>
  );
};

CanvasControls.propTypes = {
  /**
   * Defines the controls placement
   */
  placement: PropTypes.oneOf(['top-left', 'top-right', 'top-center', 'bottom-right', 'bottom-center', 'bottom-left', 'left', 'right']),
  /**
   * Defines the controls alignment
   */
  alignment: PropTypes.oneOf(['vertical', 'horizontal']),
  /**
   * Decide whether display the scale buttons (+/-)
   */
  showScaleButtons: PropTypes.bool,
  /**
   * Decide whether display the reset button
   */
  showResetButton: PropTypes.bool,
  ButtonRender: PropTypes.elementType,
  ScaleInBtnRender: PropTypes.elementType,
  CenterBtnRender: PropTypes.elementType,
  ScaleOutBtnRender: PropTypes.elementType,
  ElementRender: PropTypes.elementType,
};

CanvasControls.defaultProps = {
  placement: 'bottom-left',
  alignment: 'vertical',
  showScaleButtons: true,
  showResetButton: true,
  ButtonRender: 'button',
  ScaleInBtnRender: PlusIcon,
  CenterBtnRender: CenterIcon,
  ScaleOutBtnRender: MinusIcon,
  ElementRender: 'nav',
};

export default React.memo(CanvasControls);
