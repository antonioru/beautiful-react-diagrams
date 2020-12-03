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
 * TODO: document this thing
 * @param props
 * @returns {*}
 * @constructor
 */
const CanvasControls = (props) => {
  const { placement, alignment, className, ElementRender, ButtonRender, ScaleInBtnRender, ScaleOutBtnRender, CenterBtnRender } = props;
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
      <ButtonRender onClick={zoomInHandler} className="brd-ctrls-btn" disabled={zoom >= maxScale}><ScaleInBtnRender /></ButtonRender>
      <ButtonRender onClick={resetHandler} className="brd-ctrls-btn"><CenterBtnRender /></ButtonRender>
      <ButtonRender onClick={zoomOutHandler} className="brd-ctrls-btn" disabled={zoom <= minScale}><ScaleOutBtnRender /></ButtonRender>
    </ElementRender>
  );
};

CanvasControls.propTypes = {
  // eslint-disable-next-line max-len
  placement: PropTypes.oneOf(['top-left', 'top-right', 'top-center', 'bottom-right', 'bottom-center', 'bottom-left', 'left', 'right']),
  alignment: PropTypes.oneOf(['vertical', 'horizontal']),
  ButtonRender: PropTypes.elementType,
  ScaleInBtnRender: PropTypes.elementType,
  CenterBtnRender: PropTypes.elementType,
  ScaleOutBtnRender: PropTypes.elementType,
  ElementRender: PropTypes.elementType,
};

CanvasControls.defaultProps = {
  placement: 'bottom-left',
  alignment: 'vertical',
  ButtonRender: 'button',
  ScaleInBtnRender: PlusIcon,
  CenterBtnRender: CenterIcon,
  ScaleOutBtnRender: MinusIcon,
  ElementRender: 'nav',
};

export default React.memo(CanvasControls);
