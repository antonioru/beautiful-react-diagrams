const getDiagramNodeStyle = (coordinates, disableDrag) => ({
  left: coordinates[0],
  top: coordinates[1],
  cursor: disableDrag ? undefined : 'move',
});

export default getDiagramNodeStyle;
