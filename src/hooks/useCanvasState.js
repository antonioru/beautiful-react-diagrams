import { useState } from 'react';

const defaultInitialState = {
  pan: { x: 0, y: 0 },
  zoom: 1,
};

/**
 * TODO: document this thing as it was necessary
 */
const useCanvasState = (initialState = defaultInitialState) => {
  const [pan, onPanChange] = useState(initialState.pan);
  const [zoom, onZoomChange] = useState(initialState.zoom);

  return [{ pan, zoom }, { onPanChange, onZoomChange }];
};

export default useCanvasState;
