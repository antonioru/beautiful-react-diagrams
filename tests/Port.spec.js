import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Port from '../dist/Diagram/Port/Port';

describe('Port component', () => {
  afterEach(cleanup);

  it('should render without explode', () => {
    const { container } = render(<Port id="foo" />);

    should.exist(container);
    expect(container.querySelector('div')).to.exist;
  });

  it('should have default classes', () => {
    const { container } = render(<Port id="foo" />);
    const wrapper = container.querySelector('div');

    expect(wrapper.getAttribute('class').split(' ')).to.include.members(['bi', 'bi-diagram-port']);
  });
});
