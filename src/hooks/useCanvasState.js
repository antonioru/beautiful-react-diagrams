import { useState } from 'react';

const defaultInitialState = {
  pan: [0, 0],
  zoom: 1,
};

/**
 * TODO: document this thing
 */
const useCanvasState = (initialState = defaultInitialState) => {
  const [pan, onPanChange] = useState(initialState.pan);
  const [zoom, onZoomChange] = useState(initialState.zoom);

  return [{ pan, zoom }, { onPanChange, onZoomChange }];
};

export default useCanvasState;
