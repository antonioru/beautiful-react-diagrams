import findInvolvedEntity from '../dist/Diagram/LinksCanvas/findInvolvedEntity';

describe('findInvolvedEntity utility function', () => {
  it('should be a function', () => {
    expect(findInvolvedEntity).to.be.a('function');
  });

  it('should return the involved nodes', () => {
    const nodes = [{ id: 'node-1' }, { id: 'node-2' }];
    const result = findInvolvedEntity(nodes, 'node-2');

    expect(result).to.be.an('object');
    expect(result).to.deep.equal({ type: 'node', entity: { id: 'node-2' } });
  });

  it('should return the involved ports', () => {
    const nodes = [{ id: 'node-1' }, { id: 'node-2', inputs: [{ id: 'port-1' }], outputs: [{ id: 'port-2' }] }];
    const result = findInvolvedEntity(nodes, 'port-2');

    expect(result).to.be.an('object');
    expect(result).to.deep.equal({ type: 'port', entity: { id: 'port-2' } });
  });
});
