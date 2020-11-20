import getCanvasDragLimits from '../dist/Diagram/DiagramCanvas/utils/getCanvasDragLimits';

describe('getCanvasDragLimits function', () => {
  it('should be a function', () => {
    expect(getCanvasDragLimits).to.be.a('function');
  });

  it('should return an array of four limits', () => {
    const array = getCanvasDragLimits([2000, 2000], [640, 360]);

    expect(array.length).to.equal(4);
  });
});
