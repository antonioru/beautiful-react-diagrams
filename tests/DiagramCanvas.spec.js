import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
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

  it('should enlarge the diagram canvas when it is draggable', () => {
    const { container } = render(<DiagramCanvas isDraggable />);
    const wrapper = container.querySelector('.bi.bi-diagram .bi-diagram-canvas');

    expect(wrapper.getAttribute('class').split(' '))
      .to.include.members(['bi', 'bi-diagram-canvas', 'enlarge-diagram-canvas']);
  });

  it('should be zoomable', () => {
    const { container } = render(<DiagramCanvas showZoomButtons />);
    const zoomButtons = container.querySelector('.diagram-zoom-buttons');
    const zoomInBtn = zoomButtons.querySelector('.zoom-in-btn');
    const zoomResetBtn = zoomButtons.querySelector('.zoom-reset-btn');
    const zoomOutBtn = zoomButtons.querySelector('.zoom-out-btn');

    expect(zoomButtons).to.exist;
    expect(zoomInBtn).to.exist;
    expect(zoomOutBtn).to.exist;
    expect(zoomResetBtn).to.exist;
  });

  it('should change the css scale value when clicking on zoom buttons', () => {
    const { container } = render(<DiagramCanvas showZoomButtons />);
    const zoomButtons = container.querySelector('.diagram-zoom-buttons');
    const wrapper = container.querySelector('.bi.bi-diagram-canvas');
    const zoomInBtn = zoomButtons.querySelector('.zoom-in-btn');
    const zoomResetBtn = zoomButtons.querySelector('.zoom-reset-btn');
    const zoomOutBtn = zoomButtons.querySelector('.zoom-out-btn');

    expect(wrapper.style.transform).to.be.equal('translate(0px, 0px) scale(1)');

    fireEvent.click(zoomInBtn);

    expect(wrapper.style.transform).to.be.equal('translate(0px, 0px) scale(1.1)');
    fireEvent.click(zoomInBtn);

    expect(wrapper.style.transform).to.be.equal('translate(0px, 0px) scale(1.2000000000000002)');

    fireEvent.click(zoomOutBtn);

    expect(wrapper.style.transform).to.be.equal('translate(0px, 0px) scale(1.1)');

    fireEvent.click(zoomResetBtn);

    expect(wrapper.style.transform).to.be.equal('translate(0px, 0px) scale(1)');
  });
});
