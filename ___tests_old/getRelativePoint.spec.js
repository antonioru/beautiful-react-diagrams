import getRelativePoint from '../dist/shared/functions/getRelativePoint';

describe('getRelativePoint utility function', () => {
  it('should be a function', () => {
    expect(getRelativePoint).to.be.a('function');
  });

  it('should calculate a point coordinates relatively to another', () => {
    expect(getRelativePoint([10, 10], [20, 20])).to.deep.equal([-10, -10]);
  });
});
