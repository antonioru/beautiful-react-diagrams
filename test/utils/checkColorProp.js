import React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';

const defaultOptions = {
  colorProp: 'color',
  defaultColor: 'default',
  defaultColorClass: 'default',
  checkColor: 'primary',
  checkColorClass: 'primary',
};

/* eslint-disable no-unused-expressions */
const checkColorProp = (Component, defaultProps = {}, options = defaultOptions, elementQuery = null) => {
  const opts = { ...defaultOptions, ...options };
  const query = elementQuery || '* > *';

  it('should allow to change color', () => {
    const props = {
      ...defaultProps,
      [opts.colorProp]: opts.defaultColor,
    };

    const { container, rerender } = render(<Component {...props} />);

    const nodeEl = container.querySelector(query);

    expect(nodeEl.classList.contains(opts.defaultColorClass)).to.be.true;

    const nextProps = { [opts.colorProp]: opts.checkColor };
    rerender(<Component {...nextProps} />);

    expect(nodeEl.classList.contains(opts.checkColorClass)).to.be.true;
    expect(nodeEl.classList.contains(opts.defaultColorClass)).to.be.false;
  });
};
/* eslint-enable no-unused-expressions */

export default checkColorProp;
