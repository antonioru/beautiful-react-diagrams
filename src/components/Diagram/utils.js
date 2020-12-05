export const updateNodeByIndex = (nodes, nodeIndex, updatedProperties) => {
  // eslint is disabled even if it's right because this update it's done on purpose for performances reasons
  // eslint-disable-next-line no-param-reassign
  nodes[nodeIndex] = { ...nodes[nodeIndex], ...updatedProperties };

  return nodes;
};
