import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Segment from '../dist/Diagram/Segment/Segment';

describe('Segment component', () => {
  afterEach(cleanup);

  it('should render without explode', () => {
    const { container } = render(<Segment from={[10, 10]} to={[20, 20]} />);

    should.exist(container);
    expect(container.querySelector('g')).to.exist;
  });

  it('should have default classes', () => {
    const { container } = render(<Segment from={[10, 10]} to={[20, 20]} />);
    const wrapper = container.querySelector('g');

    expect(wrapper.getAttribute('class').split(' ')).to.include.members(['bi-diagram-segment']);
  });

  it('should possibly have an alignment', () => {
    const { container } = render(<Segment from={[10, 10]} to={[20, 20]} alignment="right" />);
    const path = container.querySelector('g path').getAttribute('d');

    expect(path.includes('C')).to.be.true;
  });
});
