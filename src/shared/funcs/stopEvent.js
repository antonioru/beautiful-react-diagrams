/**
 * Takes an event, stops its propagation and prevents its default actions if preventDefault = true.
 */
const stopEvent = (event, preventDefault = true) => {
  event.stopPropagation();

  if (preventDefault) {
    event.preventDefault();
  }
};

export default stopEvent;
