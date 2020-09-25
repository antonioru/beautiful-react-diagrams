import React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';

/* eslint-disable no-unused-expressions */
const performStandardTests = (Component, defaultProps = {}, elementQuery = null) => {
  const query = elementQuery || '* > *';

  it('should render without explode', () => {
    const { container } = render(<Component {...defaultProps} />);

    const elNode = container.querySelector(query);

    expect(container).to.exist;
    expect(elNode).to.exist;
  });

  it('should accept an "id" prop', () => {
    const { container } = render(<Component {...defaultProps} id="foo-id" />);

    const elNode = container.querySelector(query);

    expect(elNode.id).to.equal('foo-id');
  });

  it('should allow adding custom classes', () => {
    const { container } = render(<Component {...defaultProps} className="bar" />);

    const elNode = container.querySelector(query);

    expect(elNode.classList.contains('bar')).to.be.true;
  });

  it('should allow to define custom style', () => {
    const { container } = render(<Component {...defaultProps} style={{ margin: '30px' }} />);

    const elNode = container.querySelector(query);

    expect(elNode.getAttribute('style')).to.equal('margin: 30px;');
  });
};
/* eslint-enable no-unused-expressions */

export default performStandardTests;
