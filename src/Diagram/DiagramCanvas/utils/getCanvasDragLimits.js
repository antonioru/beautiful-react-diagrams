/**
 * Given the canvas and its parent dimensions, returns the canvas drag limits
 * @param canvasDim
 * @param canvasParentDim
 * @returns {[number, number, number, number]}
 */
const getCanvasDragLimits = (canvasDim, canvasParentDim) => {
  const [canvasWidth, canvasHeight] = Array.isArray(canvasDim) ? canvasDim : [0, 0];
  const [parentWidth, parentHeight] = Array.isArray(canvasParentDim) ? canvasParentDim : [0, 0];
  const topLimit = parentHeight > 0 ? -(parentHeight / 2) : 0;
  const rightLimit = canvasWidth > 0 && parentWidth > 0 ? -canvasWidth + (parentWidth / 2) : 0;
  const bottomLimit = canvasHeight > 0 && parentHeight > 0 ? -canvasHeight + (parentHeight / 2) : 0;
  const leftLimit = parentWidth > 0 ? -(parentWidth / 2) : 0;

  return [topLimit, rightLimit, bottomLimit, leftLimit];
};

export default getCanvasDragLimits;
