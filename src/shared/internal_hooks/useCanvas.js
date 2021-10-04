import { useContext } from 'react';
import DiagramContext from '../../Context/DiagramContext';

/**
 * Returns the canvas bounding box from the DiagramContext
 */
const useCanvas = () => {
  const { canvas, panVal, scaleVal } = useContext(DiagramContext);

  return { canvas, panVal, scaleVal };
};

export default useCanvas;
