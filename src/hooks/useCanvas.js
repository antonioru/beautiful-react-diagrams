import { useState } from 'react';

const defaultInitialState = {
  pan: [0, 0],
  scale: 1,
};

/**
 * TODO: document this thing
 */
const useCanvas = (initialState = defaultInitialState) => {
  const [pan, onPanChange] = useState(initialState.pan);
  const [scale, onScaleChange] = useState(initialState.zoom);

  return [{ pan, scale }, { onPanChange, onScaleChange }];
};

export default useCanvas;
