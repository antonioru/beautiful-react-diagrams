import findIndex from 'lodash.findindex';

/**
 * Given a node id, an pair of new coordinates and the nodes array, clones the nodes array and update the node
 * having that id with the new coordinates, then returns the cloned array.
 */
const updateNodeCoordinates = (nodeId, coordinates, nodes) => {
  const index = findIndex(nodes, ['id', nodeId]);

  if (index > -1 && !nodes[index].disableDrag) {
    // eslint-disable-next-line no-param-reassign
    nodes[index].coordinates = coordinates;
  }

  return nodes;
};

export default updateNodeCoordinates;
