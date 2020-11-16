import React, { useRef, useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import getDiagramZoomButtonsPosition from './getDiagramZoomButtonsPosition';

// style
import './diagram-button.scss';

const DiagramZoomButtons = (props) => {
  const { onZoomIn, onResetZoom, onZoomOut, scale, buttonsPosition, className, ...rest } = props;
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
      <button type="button" aria-label="zoom-in" onClick={onZoomIn} className="zoom-in-btn" />
      <button
        type="button"
        aria-label="zoom-reset"
        onClick={onResetZoom}
        className={`zoom-reset-btn ${scale === 1 ? 'disabled' : ''}`}
        disabled={scale === 1}
      />
      <button
        type="button"
        aria-label="zoom-out"
        onClick={onZoomOut}
        className={`zoom-out-btn ${scale === 1 ? 'disabled' : ''}`}
        disabled={scale === 1}
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
   * Diagram canvas scale, it is used to enable or disable reset zoom button and out zoom button
   */
  scale: PropTypes.number,
  // eslint-disable-next-line max-len
  buttonsPosition: PropTypes.oneOf(['top-left', 'top-right', 'top-center', 'bottom-right', 'bottom-center', 'bottom-left']),

};

DiagramZoomButtons.defaultProps = {
  scale: 1,
  buttonsPosition: 'bottom-right',
};

export default DiagramZoomButtons;
