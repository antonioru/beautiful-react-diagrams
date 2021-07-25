import getRelativePoint from '../../shared/functions/getRelativePoint';

/**
 * Return the coordinates of a given entity (node or port)
 */
const getEntityCoordinates = (entity, portRefs, nodeRefs, canvas) => {
  if (entity && entity?.type === 'node' && entity?.entity?.id && nodeRefs[entity.entity.id]) {
    const nodeEl = nodeRefs[entity.entity.id];
    const bbox = nodeEl.getBoundingClientRect();
    return [entity.entity.coordinates[0] + (bbox.width / 2), entity.entity.coordinates[1] + (bbox.height / 2)];
  }

  if (portRefs && entity?.entity?.id && portRefs[entity.entity.id]) {
    const portEl = portRefs[entity.entity.id];
    const bbox = portEl.getBoundingClientRect();

    return getRelativePoint([bbox.x + (bbox.width / 2), bbox.y + (bbox.height / 2)], [canvas.x, canvas.y]);
  }

  return undefined;
};

export default getEntityCoordinates;
