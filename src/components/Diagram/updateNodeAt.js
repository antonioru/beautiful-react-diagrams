const updateNodeAt = (nodes, position, properties) => {
  // eslint-disable-next-line no-param-reassign
  nodes[position] = { ...nodes[position], ...properties };

  return nodes;
};

export default updateNodeAt;
