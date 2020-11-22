/**
 * Return a transform css attribute object with translate property calculated
 * based on the passed dimensions and position
 * @param buttonsDim
 * @param parentDim
 * @param position
 * @returns {{transform: string}}
 */
const getDiagramZoomButtonsPosition = (buttonsDim, parentDim, position) => {
  let [left, top] = [0, 0];
  if (!Array.isArray(buttonsDim) || !Array.isArray(parentDim) || buttonsDim.length !== 2 || parentDim.length !== 2) {
    return { transform: `translate(${left}px,${top}px)` };
  }

  const translateValues = {
    'bottom-right': [parentDim[0] - buttonsDim[0], parentDim[1] - buttonsDim[1]],
    'bottom-left': [0, parentDim[1] - buttonsDim[1]],
    'bottom-center': [parentDim[0] / 2 - buttonsDim[0] / 2, parentDim[1] - buttonsDim[1]],
    'top-right': [parentDim[0] - buttonsDim[0], 0],
    'top-left': [0, 0],
    'top-center': [parentDim[0] / 2 - buttonsDim[0] / 2, 0],
  };
  [left, top] = translateValues[position];

  return { transform: `translate(${left}px,${top}px)` };
};

export default getDiagramZoomButtonsPosition;
