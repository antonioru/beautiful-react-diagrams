// useDrag now transforms the passed mouse/touch event and converts it to an Object => {x: , y: }
const getRelativePoint = (point, relative) => [point.x - relative.x, point.y - relative.y];

export default getRelativePoint;
