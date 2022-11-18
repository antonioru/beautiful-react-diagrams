import getNodePortsId from '../dist/shared/functions/getNodePortsId';

describe('getNodePortsId function', () => {
  it('should be a function', () => {
    expect(getNodePortsId).to.be.a('function');
  });

  it('should returns an array of id of a given ports type', () => {
    const randomId = Math.random();
    const node = { inputs: [{ id: randomId }] };
    const portsArray = getNodePortsId(node, 'inputs');

    expect(portsArray).to.be.an('array');
    expect(portsArray[0]).to.equal(randomId);
  });
});
