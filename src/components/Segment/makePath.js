const DEFAULT_OFFSET_CURVE = 0.4;

const makePath = (from, to, offsetCurve) => {
  offsetCurve = typeof offsetCurve === 'undefined' ? DEFAULT_OFFSET_CURVE : offsetCurve;

  const [sourceX, sourceY] = from;
  const [targetX, targetY] = to;

  const sourceCurve = sourceX + Math.abs(targetX - sourceX) * offsetCurve;
  const targetCurve = targetX - Math.abs(targetX - sourceX) * offsetCurve;

  return `M ${sourceX} ${sourceY} C ${sourceCurve} ${sourceY} ${targetCurve} ${targetY} ${targetX} ${targetY}`;
};

export default makePath;
