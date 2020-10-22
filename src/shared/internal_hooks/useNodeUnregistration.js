import { useEffect } from 'react';
import getNodePortsId from '../functions/getNodePortsId';

/**
 * Takes the inputs and outputs node ports and onNodeRemove callback to be performed when the node is unmounted
 */
const useNodeUnregistration = (onNodeRemove, inputs, outputs, id) => {
  useEffect(() => () => {
    if (onNodeRemove) {
      const node = { inputs, outputs };
      const inputsPort = getNodePortsId(node, 'inputs');
      const outputsPort = getNodePortsId(node, 'outputs');
      onNodeRemove(id, inputsPort, outputsPort);
    }
  }, []);
};

export default useNodeUnregistration;
