import ensureNodeId from '../dist/shared/functions/ensureNodeId';

describe('ensureNodeId', () => {
  it('makes sure the returned node has a valid id', () => {
    const node = ensureNodeId({
      coordinates: [1, 2],
      content: 'Foo',
    });

    expect(ensureNodeId(node)).to.have.property('id');
    expect(ensureNodeId(node).id).to.be.a('string');
  });

  it('should not override existing ids', () => {
    const id = 'foo';
    const node = ensureNodeId({
      id,
      coordinates: [1, 2],
      content: 'Foo',
    });

    expect(ensureNodeId(node)).to.have.property('id');
    expect(ensureNodeId(node).id).to.equal(id);
  });
});
