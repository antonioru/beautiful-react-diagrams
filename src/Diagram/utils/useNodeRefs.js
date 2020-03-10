import { useContext } from 'react';
import DiagramContext from './DiagramContext';

/**
 * Returns the node references from the DiagramContext
 */
const usePortRefs = () => {
  const { nodes } = useContext(DiagramContext);

  return nodes;
};

export default usePortRefs;
