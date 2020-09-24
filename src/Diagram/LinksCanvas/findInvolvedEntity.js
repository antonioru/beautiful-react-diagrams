/**
 * Given an array of nodes and an id, returns the involved port/node
 */
const findInvolvedEntity = (nodes, entityId, type = 'node') => {
  if (!entityId || !nodes || nodes.length === 0) return undefined;

  let result;
  let index = 0;

  while (index < nodes.length && !result) {
    const node = nodes[index];

    if (node.id === entityId) {
      result = { type, entity: { ...node } };
    } else {
      result = findInvolvedEntity(node.inputs, entityId, 'port') || findInvolvedEntity(node.outputs, entityId, 'port');
    }

    index += 1;
  }

  return result;
};

export default findInvolvedEntity;
