import updateNodeCoordinates from '../dist/Diagram/NodesCanvas/updateNodeCoordinates';

describe('updateNodeCoordinates utility function', () => {
  it('should be a function', () => {
    expect(updateNodeCoordinates).to.be.a('function');
  });

  it('should update the coordinates of the given link', () => {
    const coords = [1, 1];
    const nodes = [{ id: 'port-1', coordinates: [10, 20] }, { id: 'port-2', coordinates: [30, 50] }];
    const result = updateNodeCoordinates('port-1', coords, nodes);

    expect(result).to.be.an('array');
    expect(result[0]).to.be.an('object');
    expect(result[0].id).to.be.equal(nodes[0].id);
    expect(result[0].coordinates).to.be.equal(coords);
  });
});
