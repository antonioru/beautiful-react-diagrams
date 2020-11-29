export const stopPropagation = (e) => e.stopPropagation();
export const preventDefault = (e) => e.preventDefault();
/**
 * Takes an event, prevent its default actions and stops its propagation.
 * @param event
 */
const stopEvent = (event) => {
  stopPropagation(event);
  preventDefault(event);
};

export default stopEvent;
