import getPathMidpoint from '../dist/shared/functions/getPathMidpoint';

describe('getPathMidpoint function utility', () => {
  it('should be a function', () => {
    expect(getPathMidpoint).to.be.a('function');
  });

  it('should return an 0,0 point if the provided element is not an SVG Path', () => {
    expect(getPathMidpoint(document.createElement('div'))).to.deep.equal([0, 0]);
  });

  it('should return the path midpoint', () => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M 120,120 10,10');

    const result = getPathMidpoint(path);

    expect(result).to.be.an('array');
  });
});
