import React from 'react';
import { render, cleanup } from '@testing-library/react';
import NodesCanvas from '../dist/Diagram/NodesCanvas/NodesCanvas';

describe('NodesCanvas component', () => {
  afterEach(cleanup);

  const nodes = [
    { id: 'node-1', content: 'Foo', coordinates: [10, 20] },
    { id: 'node-2', content: 'Bar', coordinates: [30, 40] },
  ];

  it('should render without explode', () => {
    const { container } = render(<NodesCanvas nodes={nodes} />);

    should.exist(container);
    expect(container.querySelector('div')).to.exist;
  });

  it('should render the given nodes', () => {
    const { container } = render(<NodesCanvas nodes={nodes} />);
    const wrapper = container.querySelectorAll('.bi.bi-diagram-node');

    expect(wrapper.length).to.equal(2);
  });
});
