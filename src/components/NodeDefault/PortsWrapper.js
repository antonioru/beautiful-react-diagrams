import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PortAlignment } from '../../shared/Types';

const PortsWrapper = ({ alignment, portAlignments, Elements }) => {
  const classList = useMemo(() => classNames('brd-ports-wrapper', `brd-ports-${alignment}`), [alignment]);
  const { Inputs, Outputs } = Elements;
  const { inputsAlignment, outputsAlignment } = portAlignments;

  return (
    <>
      {[inputsAlignment, outputsAlignment].includes(alignment) && (
        <div className={classList}>
          {inputsAlignment === alignment && <>{Inputs}</>}
          {outputsAlignment === alignment && <>{Outputs}</>}
        </div>
      )}
    </>
  );
};

PortsWrapper.propTypes = {
  alignment: PortAlignment.isRequired,
  portAlignments: PropTypes.exact({
    inputsAlignment: PortAlignment,
    outputsAlignment: PortAlignment,
  }).isRequired,
  Elements: PropTypes.exact({
    Inputs: PropTypes.element,
    Outputs: PropTypes.element,
  }).isRequired,
};

export default React.memo(PortsWrapper);
