import getDiagramZoomButtonsPosition from '../dist/Diagram/DiagramZoomButtons/getDiagramZoomButtonsPosition';

describe('getDiagramZoomButtonsPosition function', () => {
  it('should be a function', () => {
    expect(getDiagramZoomButtonsPosition).to.be.a('function');
  });

  it('should returns a transform object', () => {
    const transformObj = getDiagramZoomButtonsPosition([36, 108], [640, 320], 'top-right');

    expect(transformObj).to.be.an('object');
    expect(transformObj.transform).to.be.equal('translate(604px,0px)');
  });
});
