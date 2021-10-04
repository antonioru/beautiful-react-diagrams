import getRelativePoint from '../../../shared/functions/getRelativePoint';

/**
 * Return the coordinates of a given entity (node or port)
 */
// eslint-disable-next-line max-len
const getEntityCoordinates = (entity, portRefs, nodeRefs, canvas = { x: 0, y: 0 }, pan = { x: 0, y: 0 }) => {
  if (entity && entity.type === 'node' && nodeRefs[entity.entity.id]) {
    const nodeEl = nodeRefs[entity.entity.id];
    const bbox = nodeEl.getBoundingClientRect();

    return [entity.entity.coordinates[0] + (bbox.width / 2), entity.entity.coordinates[1] + (bbox.height / 2)];
  }

  if (portRefs && portRefs[entity.entity.id]) {
    const nextX = canvas.x + pan.x;
    const nextY = canvas.y + pan.y;
    const nextCanvas = [nextX, nextY];
    const portEl = portRefs[entity.entity.id];
    const bbox = portEl.getBoundingClientRect();

    return getRelativePoint([bbox.x + (bbox.width / 2), bbox.y + (bbox.height / 2)], [nextCanvas[0], nextCanvas[1]]);
  }

  return undefined;
};

export default getEntityCoordinates;
