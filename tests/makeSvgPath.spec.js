import makeSvgPath from '../dist/shared/functions/makeSvgPath';

describe('makeSvgPath utility', () => {
  it('should be a function', () => {
    expect(makeSvgPath).to.be.a('function');
  });

  it('should return an empty string if nothing is provided', () => {
    expect(makeSvgPath()).to.be.empty;
  });

  it('should return a path', () => {
    const start = [1, 0];
    const end = [10, 32];

    expect(makeSvgPath(start, end)).to.be.a('string');
    expect(makeSvgPath(start, end).includes('Q')).to.be.true;
  });

  it('should return a bezier path if defined, allowing horizontal alignment', () => {
    const start = [1, 0];
    const end = [10, 32];
    const options = { type: 'bezier', inputAlignment: 'right', outputAlignment: 'left' };

    expect(makeSvgPath(start, end, options).includes('C')).to.be.true;
  });

  it('should return a bezier path if defined, allowing vertical alignment', () => {
    const start = [40, 0];
    const end = [40, 120];
    const options = { type: 'bezier', inputAlignment: 'top', outputAlignment: 'bottom' };

    expect(makeSvgPath(start, end, options).includes('C')).to.be.true;
  });
});
