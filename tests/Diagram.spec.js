import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Diagram from '../dist/Diagram';

describe('Diagram component', () => {
  afterEach(cleanup);

  const schemaMock = {
    nodes: [],
    links: [],
  };

  it('should render without explode', () => {
    const { container } = render(<Diagram schema={schemaMock} />);

    should.exist(container);
    expect(container.querySelector('div')).to.exist;
  });

  it('should have default classes', () => {
    const { container } = render(<Diagram schema={schemaMock} />);
    const wrapper = container.querySelector('div');

    expect(wrapper.getAttribute('class').split(' ')).to.include.members(['bi', 'bi-diagram']);
  });

  it('should accept an "id" prop', () => {
    const { container } = render(<Diagram schema={schemaMock} id="foo" />);
    const wrapper = container.querySelector('.bi.bi-diagram');

    expect(wrapper.id).to.equal('foo');
  });

  it('should allow adding custom classes', () => {
    const { container } = render(<Diagram schema={schemaMock} className="foo" />);
    const wrapper = container.querySelector('.bi.bi-diagram');

    expect(wrapper.getAttribute('class').split(' ')).to.include.members(['foo']);
  });

  it('should allow to define custom style', () => {
    const { container } = render(<Diagram schema={schemaMock} style={{ margin: '10px' }} />);
    const wrapper = container.querySelector('.bi.bi-diagram');

    expect(wrapper.getAttribute('style')).to.equal('margin: 10px;');
  });
});
