import React from 'react';
import { render, cleanup } from '@testing-library/react';
import DiagramCanvas from '../dist/Diagram/DiagramCanvas/DiagramCanvas';

describe('DiagramCanvas component', () => {
  afterEach(cleanup);

  it('should render without explode', () => {
    const { container } = render(<DiagramCanvas />);

    should.exist(container);
    expect(container.querySelector('div')).to.exist;
  });

  it('should have default classes', () => {
    const { container } = render(<DiagramCanvas />);
    const wrapper = container.querySelector('div');

    expect(wrapper.getAttribute('class').split(' ')).to.include.members(['bi', 'bi-diagram']);
  });
});
