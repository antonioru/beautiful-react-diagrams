import removeLinkFromArray from '../dist/Diagram/LinksCanvas/removeLinkFromArray';

describe('removeLinkFromArray utility function', () => {
  it('should be a function', () => {
    expect(removeLinkFromArray).to.be.a('function');
  });

  it('should remove the given link from a link array', () => {
    const links = [{ from: 'port-1', to: 'port-2' }, { from: 'port-3', to: 'port-4' }];
    const result = removeLinkFromArray({ from: 'port-1', to: 'port-2' }, links);

    expect(result).to.be.an('array');
    expect(result).to.deep.equal([{ from: 'port-3', to: 'port-4' }]);
  });
});
