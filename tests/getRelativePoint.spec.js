import getRelativePoint from '../dist/shared/functions/getRelativePoint';

describe('getRelativePoint utility function', () => {
  it('should be a function', () => {
    expect(getRelativePoint).to.be.a('function');
  });

  it('should calculate a point coordinates relatively to another', () => {
    expect(getRelativePoint({ x: 10, y: 10 }, { x: 20, y: 20 })).to.deep.equal([-10, -10]);
  });
});
