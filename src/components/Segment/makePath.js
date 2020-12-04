const Directions = {
  horizontal: Symbol('horizontal'),
  vertical: Symbol('vertical'),
};

const calculateCenter = ([sourceX, sourceY], [targetX, targetY]) => [(sourceX + targetX) / 2, (sourceY + targetY) / 2];
const calculatePointsRelativePlacement = ([sourceX, sourceY], [targetX, targetY]) => {
  const horizontalDistance = (targetX - sourceX) ** 2;
  const verticalDistance = (targetY - sourceY) ** 2;

  return horizontalDistance > verticalDistance ? Directions.horizontal : Directions.vertical;
};

const makePath = (from, to) => {
  const [centerX, centerY] = calculateCenter(from, to);
  const [sourceX, sourceY] = from;
  const [targetX, targetY] = to;
  const sourcePlacement = calculatePointsRelativePlacement(from, to);
  const targetPlacement = calculatePointsRelativePlacement(to, from);

  if (sourcePlacement === Directions.vertical && targetPlacement === Directions.vertical) {
    return `M${sourceX},${sourceY} C${centerX},${sourceY} ${centerX},${targetY} ${targetX},${targetY}`;
  }

  return `M${sourceX},${sourceY} C${sourceX},${centerY} ${targetX},${centerY} ${targetX},${targetY}`;
};

export default makePath;
