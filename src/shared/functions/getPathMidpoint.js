const getPathMidpoint = (pathElement) => {
  if (pathElement.getTotalLength && pathElement.getPointAtLength) {
    const midpoint = pathElement.getTotalLength() / 2;
    const { x, y } = pathElement.getPointAtLength(midpoint);
    return [x, y];
  }

  return [0, 0];
};

export default getPathMidpoint;
