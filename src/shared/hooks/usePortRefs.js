import { useContext } from 'react';
import DiagramContext from '../../Context/DiagramContext';

/**
 * Returns the port references from the DiagramContext
 */
const usePortRefs = () => {
  const { ports } = useContext(DiagramContext);

  return ports;
};

export default usePortRefs;
