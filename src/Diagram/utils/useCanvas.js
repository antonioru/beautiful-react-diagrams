import { useContext } from 'react';
import DiagramContext from './DiagramContext';

/**
 * Returns the canvas bounding box from the DiagramContext
 */
const useCanvas = () => {
  const { canvas } = useContext(DiagramContext);

  return canvas;
};

export default useCanvas;
