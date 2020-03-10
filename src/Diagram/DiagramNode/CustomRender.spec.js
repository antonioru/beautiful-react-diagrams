import React from 'react';
import { render, cleanup } from '@testing-library/react';
import CustomRenderer from './CustomRender';

describe('CustomRenderer component', () => {
  afterEach(cleanup);

  const CustomNode = () => <div />;

  it('should render without explode', () => {
    const { container } = render(<CustomRenderer render={CustomNode} />);

    should.exist(container);
    expect(container.querySelector('div')).to.exist;
  });
});
