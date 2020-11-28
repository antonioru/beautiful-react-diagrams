/**
 * compose functions from left to right
 */
const pipe = (...fns) => (x) => fns.reduce((y, f) => f(y), x);

export default pipe;
