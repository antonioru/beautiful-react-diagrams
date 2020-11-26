import { useContext } from 'react';
import DiagramContext from '../../contexts/DiagramContext';

/**
 * Returns the node references from the DiagramContext
 */
const useNodeRefs = () => {
  const { nodes } = useContext(DiagramContext);

  return nodes;
};

export default useNodeRefs;
