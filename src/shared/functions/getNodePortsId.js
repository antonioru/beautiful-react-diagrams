/**
 * Given a node and the port type to check, returns an array with all node's ports ids
 * @param state
 * @param index
 * @param portName
 * @returns {*[]|*}
 */

const getNodePortsId = (node, portType) => {
  if (node[portType] && node[portType].length > 0) {
    return node[portType].map((port) => port.id);
  }
  return [];
};

export default getNodePortsId;
