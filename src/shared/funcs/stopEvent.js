/**
 * Takes an event, prevent its default actions and stops its propagation.
 * @param event
 */
const stopEvent = (event) => {
  event.preventDefault();
  event.stopPropagation();
};

export default stopEvent;
