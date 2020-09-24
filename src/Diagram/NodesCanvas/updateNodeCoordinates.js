import findIndex from 'lodash.findindex';
import cloneDeep from 'lodash.clonedeep';

/**
 * Given a node id, an pair of new coordinates and the nodes array, clones the nodes array and update the node
 * having that id with the new coordinates, then returns the cloned array.
 */
const updateNodeCoordinates = (nodeId, coordinates, nodes) => {
  const index = findIndex(nodes, ['id', nodeId]);

  if (index > -1) {
    const nextNodes = cloneDeep(nodes);

    nextNodes[index].coordinates = coordinates;

    return nextNodes;
  }

  return nodes;
};

export default updateNodeCoordinates;
