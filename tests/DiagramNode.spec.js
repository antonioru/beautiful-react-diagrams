import React from 'react';
import { render, cleanup } from '@testing-library/react';
import DiagramContext from '../dist/Context/DiagramContext';
import DiagramNode from '../dist/Diagram/DiagramNode/DiagramNode';

describe('DiagramNode component', () => {
  afterEach(cleanup);

  const contextMock = {
    canvas: {},
    ports: { 'port-foo': document.createElement('div') },
    nodes: { 'node-foo': document.createElement('div') },
  };

  it('should render without explode', () => {
    const { container } = render(
      <DiagramContext.Provider value={contextMock}>
        <DiagramNode id="port-foo" content="Foo" coordinates={[10, 10]} />
      </DiagramContext.Provider>,
    );

    should.exist(container);
    expect(container.querySelector('div')).to.exist;
  });

  it('should have default classes', () => {
    const { container } = render(
      <DiagramContext.Provider value={contextMock}>
        <DiagramNode id="port-foo" content="Foo" coordinates={[10, 10]} />
      </DiagramContext.Provider>,
    );
    const wrapper = container.querySelector('div');

    expect(wrapper.getAttribute('class').split(' ')).to.include.members(['bi', 'bi-diagram-node']);
  });
});
