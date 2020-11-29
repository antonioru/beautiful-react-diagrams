import React from 'react';
import { PortShape } from '../../shared/Types';
import { stubTrue } from '../../shared/Utils';

/**
 * Port component
 * @returns {*}
 * @constructor
 */
const Port = (props) => {
  return <p>Port</p>;
};

Port.propTypes = PortShape;
Port.defaultProps = {
  canLink: stubTrue,
  alignment: 'right',
};

export default React.memo(Port);
