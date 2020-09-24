import getEntityCoordinates from '../dist/Diagram/Link/getEntityCoordinates';

describe('getEntityCoordinates function', () => {
  const portRefs = { 'port-foo': document.createElement('div') };
  const nodeRefs = { 'node-foo': document.createElement('div') };
  const portEntity = { type: 'port', entity: { id: 'port-foo', alignment: 'right', canLink: () => true } };
  const nodeEntity = { type: 'node', entity: { id: 'node-foo', content: 'Foo', coordinates: [10, 20] } };
  const canvas = { x: 10, y: 10 };

  it('should be a function', () => {
    expect(getEntityCoordinates).to.be.a('function');
  });

  it('should return undefined if nothing is provided', () => {
    expect(getEntityCoordinates()).to.be.undefined;
  });

  it('should return the coordinates of a node', () => {
    const result = getEntityCoordinates(nodeEntity, portRefs, nodeRefs, canvas);

    expect(result).to.be.an('array');
    expect(result.length).to.equal(2);
    expect(result[0]).to.equal(nodeEntity.entity.coordinates[0]);
    expect(result[1]).to.equal(nodeEntity.entity.coordinates[1]);
  });

  it('should return the coordinates of a port', () => {
    const result = getEntityCoordinates(portEntity, portRefs, nodeRefs, canvas);

    expect(result).to.be.an('array');
    expect(result.length).to.equal(2);
  });
});
