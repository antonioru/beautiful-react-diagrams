import createSchema from '../dist/shared/functions/createSchema';

describe('createSchema', () => {
  it('should create a valid schema from a draft', () => {
    const schema = createSchema({ nodes: [{ coordinates: [0, 0] }] });

    expect(schema).to.be.an('object');
    expect(schema).to.have.property('nodes');
    expect(schema).to.have.property('links');
    expect(schema.nodes).to.be.an('array');
    expect(schema.links).to.be.an('array');

    expect(schema.nodes[0]).to.be.an('object').that.has.property('id');
  });
});
