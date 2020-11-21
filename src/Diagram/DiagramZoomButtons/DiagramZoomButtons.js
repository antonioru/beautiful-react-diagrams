import React, { useRef, useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import getDiagramZoomButtonsPosition from './getDiagramZoomButtonsPosition';

// style
import './diagram-button.scss';

const DiagramZoomButtons = (props) => {
  const {
    onZoomIn, onResetZoom, onZoomOut, disableZoomInBtn, disableZoomOutBtn, buttonsPosition, className, ...rest
  } = props;
  const classList = classNames('diagram-zoom-buttons', {
    'vertical-orientation': !buttonsPosition.includes('center'),
  }, className);
  const buttonsGroupRef = useRef();

  const calculateButtonsPosition = useCallback((position) => {
    const parentElement = buttonsGroupRef.current && buttonsGroupRef.current.parentElement;
    const parentDim = parentElement && [parentElement.offsetWidth, parentElement.offsetHeight];
    // eslint-disable-next-line max-len
    const buttonsDim = buttonsGroupRef.current && [buttonsGroupRef.current.offsetWidth, buttonsGroupRef.current.offsetHeight];
    return getDiagramZoomButtonsPosition(buttonsDim, parentDim, position);
  }, [buttonsGroupRef.current]);

  return (
    <div ref={buttonsGroupRef} className={classList} style={calculateButtonsPosition(buttonsPosition)} {...rest}>
      <button
        type="button"
        aria-label="zoom-in"
        onClick={onZoomIn}
        className={`zoom-in-btn ${disableZoomInBtn ? 'disabled' : ''}`}
        disabled={disableZoomInBtn}
      />
      <button
        type="button"
        aria-label="zoom-reset"
        onClick={onResetZoom}
        className={`zoom-reset-btn ${disableZoomOutBtn ? 'disabled' : ''}`}
        disabled={disableZoomOutBtn}
      />
      <button
        type="button"
        aria-label="zoom-out"
        onClick={onZoomOut}
        className={`zoom-out-btn ${disableZoomOutBtn ? 'disabled' : ''}`}
        disabled={disableZoomOutBtn}
      />
    </div>
  );
};

DiagramZoomButtons.propTypes = {
  /**
   * A function to be perform on zoomIn button click
   */
  onZoomIn: PropTypes.func.isRequired,
  /**
   * A function to be perform on zoom reset button click
   */
  onResetZoom: PropTypes.func.isRequired,
  /**
   * A function to be perform on zoom out button click
   */
  onZoomOut: PropTypes.func.isRequired,
  /**
   * Boolean value used to disabled or not the zoom buttons
   */
  disableZoomOutBtn: PropTypes.bool,
  /**
   * Boolean value used to disabled or not the zoom in button
   */
  disableZoomInBtn: PropTypes.bool,
  // eslint-disable-next-line max-len
  buttonsPosition: PropTypes.oneOf(['top-left', 'top-right', 'top-center', 'bottom-right', 'bottom-center', 'bottom-left']),

};

DiagramZoomButtons.defaultProps = {
  disableZoomOutBtn: false,
  disableZoomInBtn: false,
  buttonsPosition: 'bottom-right',
};

export default DiagramZoomButtons;
