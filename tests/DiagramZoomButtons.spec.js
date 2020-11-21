import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DiagramZoomButtons from '../dist/Diagram/DiagramZoomButtons/DiagramZoomButtons';
import noop from './utils/noop';

describe('DiagramZoomButtons component', () => {
  it('should render without explode', () => {
    const { container } = render(
      <DiagramZoomButtons onZoomIn={noop} onResetZoom={noop} onZoomOut={noop} buttonsPosition="top-left" />,
    );

    should.exist(container);
    expect(container.querySelector('div')).to.exist;
  });

  it('should render zoom buttons', () => {
    const { container } = render(
      <DiagramZoomButtons onZoomIn={noop} onResetZoom={noop} onZoomOut={noop} buttonsPosition="top-left" />,
    );
    const zoomInBtn = container.querySelector('.zoom-in-btn');
    const zoomResetBtn = container.querySelector('.zoom-reset-btn');
    const zoomOutBtn = container.querySelector('.zoom-out-btn');

    expect(zoomInBtn).to.exist;
    expect(zoomOutBtn).to.exist;
    expect(zoomResetBtn).to.exist;
  });

  it('should perform provided zoom functions on buttons click', () => {
    const onZoomIn = sinon.spy();
    const onZoomOut = sinon.spy();
    const onZoomReset = sinon.spy();
    const { container } = render(
      <DiagramZoomButtons onZoomIn={onZoomIn} onResetZoom={onZoomReset} onZoomOut={onZoomOut} scale={3} />,
    );
    const zoomInBtn = container.querySelector('.zoom-in-btn');
    const zoomResetBtn = container.querySelector('.zoom-reset-btn');
    const zoomOutBtn = container.querySelector('.zoom-out-btn');

    fireEvent.click(zoomInBtn);

    expect(onZoomIn.calledOnce).to.be.true;
    fireEvent.click(zoomOutBtn);

    expect(onZoomOut.calledOnce).to.be.true;

    fireEvent.click(zoomResetBtn);

    expect(onZoomReset.calledOnce).to.be.true;
  });
});
