import useCanvas from '../dist/shared/internal_hooks/useCanvas';

// TODO: test this hook
describe('useCanvasState hook', () => {
  it('should be a function', () => {
    expect(useCanvas).to.be.a('function');
  });
});
