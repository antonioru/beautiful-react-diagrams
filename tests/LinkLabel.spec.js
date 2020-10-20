import React from 'react';
import { render, cleanup } from '@testing-library/react';
import LinkLabel from '../dist/Diagram/Link/LinkLabel';

describe('LinkLabel component', () => {
  afterEach(cleanup);

  it('should render without explode', () => {
    const { container } = render(<LinkLabel position={[10, 10]} label="foo" />);

    should.exist(container);
    expect(container.querySelector('foreignObject')).to.exist;
  });

  it('should have default classes', () => {
    const { container } = render(<LinkLabel position={[10, 10]} label="foo" />);
    const wrapper = container.querySelector('foreignObject > div');

    expect(wrapper.getAttribute('class').split(' ')).to.include.members(['bi-diagram-link-label']);
  });

  it('should have label coordinates', () => {
    const position = [10, 10];
    const { container } = render(<LinkLabel position={position} label="foo" />);
    const wrapper = container.querySelector('foreignObject');
    const x = +wrapper.getAttribute('x');
    const y = +wrapper.getAttribute('y');

    expect(x).to.equal(position[0]);
    expect(y).to.equal(position[1]);
  });
});
