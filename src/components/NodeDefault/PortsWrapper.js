import React, { useMemo } from 'react';
import classList from 'classnames';
import { createInputs, createOutputs } from '../../shared/PortFactory';
import { PortAlignment, PortList } from '../../shared/Types';

/**
 * // TODO: document this
 */
const PortsWrapper = ({ inputs, outputs, inputAlignment, outputAlignment, }) => {
  const Inputs = useMemo(() => createInputs(inputs), [inputs]);
  const Outputs = useMemo(() => createOutputs(outputs), [outputs]);
  const inputsClassList = useMemo(() => classList('brd-inputs', `brd-inputs-${inputAlignment}`), [inputAlignment]);
  const outputClassList = useMemo(() => classList('brd-outputs', `brd-outputs-${outputAlignment}`), [outputAlignment]);

  return (
    <>
      {(Inputs.length > 0 || Outputs.length > 0) && (
        <div className="brd-node-ports">
          {Inputs.length > 0 && <div className={inputsClassList}>{Inputs}</div>}
          {Outputs.length > 0 && <div className={outputClassList}>{Outputs}</div>}
        </div>
      )}
    </>
  );
};

PortsWrapper.propTypes = {
  inputAlignment: PortAlignment,
  outputAlignment: PortAlignment,
  inputs: PortList,
  outputs: PortList,
};

PortsWrapper.defaultProps = {
  inputAlignment: 'left',
  outputAlignment: 'right',
  inputs: [],
  outputs: [],
};

export default React.memo(PortsWrapper);
