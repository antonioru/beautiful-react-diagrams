import { useState } from 'react';
import Immutable from '../shared/funcs/Immutable';

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

  return [{ pan, zoom }, Immutable({ onPanChange, onZoomChange })];
};

export default useCanvasState;
