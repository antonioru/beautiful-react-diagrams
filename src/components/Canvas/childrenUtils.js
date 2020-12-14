import React, { Children, cloneElement } from 'react';
import CanvasControls from '../CanvasControls';

// todo: document this method
export const filterControlsOut = (children, pan, scale) => Children.map(children, (C) => (C.type !== CanvasControls
  ? React.cloneElement(C, { pan, scale })
  : null));

// todo: document this method
export const enrichControls = (children, props) => Children.map(children, (C) => {
  if (C.type === CanvasControls) {
    return cloneElement(C, {
      onPanChange: C.props.onPanChange || props.onPanChange,
      onZoomChange: C.props.onZoomChange || props.onZoomChange,
      minZoom: C.props.minZoom || props.minZoom,
      maxZoom: C.props.maxZoom || props.maxZoom,
    });
  }
  return null;
});
