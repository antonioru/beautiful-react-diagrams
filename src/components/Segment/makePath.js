import { AlignmentTypes, EntityTypes } from '../Link/utils';

const DEFAULT_OFFSET_CURVE = 0.4;
const getCenter = ([sourceX, sourceY], [targetX, targetY]) => [(sourceX + targetX) / 2, (sourceY + targetY) / 2];
const isHorizontalAlignment = (alignment) => [AlignmentTypes.right, AlignmentTypes.left].includes(alignment);
const isVerticalAlignment = (alignment) => [AlignmentTypes.top, AlignmentTypes.bottom].includes(alignment);

/**
 * Creates an SVG path from one point to the other by taking into account both the alignment and the type of the involved entities.
 */
const makePath = (from, to, inputEntityType, outputEntityType, inputAlignment, outputAlignment, offsetCurve = DEFAULT_OFFSET_CURVE) => {
  const [sourceX, sourceY] = from;
  const [targetX, targetY] = to;

  // Connecting two ports
  if (inputEntityType === EntityTypes.port && outputEntityType === EntityTypes.port) {
    // if both ports are horizontally aligned
    if (isHorizontalAlignment(inputAlignment) || isHorizontalAlignment(outputAlignment)) {
      const sourceCurve = sourceX + Math.abs(targetX - sourceX) * offsetCurve;
      const targetCurve = targetX - Math.abs(targetX - sourceX) * offsetCurve;

      return `M ${sourceX} ${sourceY} C ${sourceCurve} ${sourceY} ${targetCurve} ${targetY} ${targetX} ${targetY}`;
    }

    // if both ports are vertically aligned
    // TODO: this formula is wrong, needs to be fixed
    if (isVerticalAlignment(inputAlignment) || isVerticalAlignment(outputAlignment)) {
      // ********************** Solution with original naming convention *********************
      // Need to identify which element has the lowest Y
      // const sourceCurve = targetY - Math.abs(targetY - sourceY) * offsetCurve;
      // const targetCurve = sourceY + Math.abs(targetY - sourceY) * offsetCurve;

      // return `M ${sourceX} ${sourceY} C ${sourceX} ${sourceCurve} ${targetX} ${targetCurve} ${targetX} ${targetY}`;

      // ********************** Solution with proposed naming convention *********************
      // Proposal to rename variables
      // C accepts two control points and a target to draw the bezier.
      let controlOffset = Math.abs(targetY - sourceY) * offsetCurve;
      // The initial implementation assumes a source is above the target, the same
      // goes for horizontal alignment, it assume the source is to the left of the target
      if (targetY < sourceY) {
        controlOffset = -controlOffset;
      }
      const control1X = sourceX;
      const control1Y = targetY - controlOffset;
      const control2X = targetX;
      const control2Y = sourceY + controlOffset;

      return `M ${sourceX} ${sourceY} C ${control1X} ${control1Y} ${control2X} ${control2Y} ${targetX} ${targetY}`;
    }

    // if input is vertical and output is horizontal
    // TODO: this formula is wrong, needs to be fixed
    if (isVerticalAlignment(inputAlignment) || isHorizontalAlignment(outputAlignment)) {
      const sourceCurve = sourceX + Math.abs(targetX - sourceX) * offsetCurve;
      const targetCurve = targetX - Math.abs(targetX - sourceX) * offsetCurve;

      return `M ${sourceX} ${sourceY} C ${sourceCurve} ${sourceY} ${targetCurve} ${targetY} ${targetX} ${targetY}`;
    }

    // if input is horizontal and output is vertical
    // TODO: this formula is wrong, needs to be fixed
    const sourceCurve = sourceX + Math.abs(targetX - sourceX) * offsetCurve;
    const targetCurve = targetX - Math.abs(targetX - sourceX) * offsetCurve;

    return `M ${sourceX} ${sourceY} C ${sourceCurve} ${sourceY} ${targetCurve} ${targetY} ${targetX} ${targetY}`;
  }

  // Connecting one input node and one output port
  if (inputEntityType === EntityTypes.node && outputEntityType === EntityTypes.port) {
    // TODO
  }

  // Connecting one input port and one output node
  if (inputEntityType === EntityTypes.port && outputEntityType === EntityTypes.node) {
    // TODO
  }

  // Connecting two nodes
  const [centerX, centerY] = getCenter(from, to);

  // TODO: this formula is wrong.
  return `M${sourceX},${sourceY} C${centerX},${centerY} ${targetX},${centerY} ${targetX},${targetY}`;
};

export default makePath;
