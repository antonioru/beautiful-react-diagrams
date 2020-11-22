// Returns an object with the transform style for the diagram canvas

const getDiagramCanvasCoords = (left, top, scaleValue) => {
  const newLeft = left || 0;
  const newTop = top || 0;
  const newScaleValue = scaleValue || 1;
  return ({
    transform: `translate(${newLeft}px, ${newTop}px) scale(${newScaleValue})`,
  });
};

export default getDiagramCanvasCoords;
