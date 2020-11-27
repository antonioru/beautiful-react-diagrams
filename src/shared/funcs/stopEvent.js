const stopEvent = (event) => {
  event.preventDefault();
  event.stopPropagation();
};

export default stopEvent;
