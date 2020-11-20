import getDiagramCanvasCoords from '../dist/Diagram/DiagramCanvas/utils/getDiagramCanvasCoords';

describe('getDiagramCanvasCoords', () => {
  it('should be a function', () => {
    expect(getDiagramCanvasCoords).to.be.a('function');
  });

  it('should returns a transform object', () => {
    const transformObj = getDiagramCanvasCoords(100, 100, 2);

    expect(transformObj).to.be.an('object');
    expect(transformObj.transform).to.be.equal('translate(100px, 100px) scale(2)');
  });
});
