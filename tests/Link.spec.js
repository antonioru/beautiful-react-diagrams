import React from 'react';
import { render, cleanup } from '@testing-library/react';
import DiagramContext from '../dist/Context/DiagramContext';
import DiagramLink from '../dist/Diagram/Link/Link';

describe('Link component', () => {
  afterEach(cleanup);

  const contextMock = {
    canvas: {},
    ports: { 'port-foo': document.createElement('div') },
    nodes: { 'node-foo': document.createElement('div') },
  };
  const linkMock = { input: 'foo', output: 'bar', label: 'Foo', readonly: false };
  const inputMock = { type: 'port', entity: { id: 'port-foo', alignment: 'right', canLink: () => true } };
  const outputMock = { type: 'node', entity: { id: 'node-foo', content: 'Foo', coordinates: [10, 20] } };

  it('should render without explode', () => {
    const { container } = render(
      <DiagramContext.Provider value={contextMock}>
        <DiagramLink link={linkMock} input={inputMock} output={outputMock} />
      </DiagramContext.Provider>,
    );

    should.exist(container);
    expect(container.querySelector('g')).to.exist;
  });

  it('should have default classes', () => {
    const { container } = render(
      <DiagramContext.Provider value={contextMock}>
        <DiagramLink link={linkMock} input={inputMock} output={outputMock} />
      </DiagramContext.Provider>,
    );
    const wrapper = container.querySelector('g');

    expect(wrapper.getAttribute('class').split(' ')).to.include.members(['bi-diagram-link']);
  });
});
