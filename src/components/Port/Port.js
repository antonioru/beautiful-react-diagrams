import React, { useMemo } from 'react';
import classNames from 'classnames';
import { PortShape } from '../../shared/Types';
import { stubTrue } from '../../shared/Utils';

import './port.scss';

/**
 * Port component
 * @returns {*}
 * @constructor
 */
const Port = ({ id, label, className }) => {
  const classList = useMemo(() => classNames('brd-port', className), [className]);

  return (
    <div className={classList}>
      {label && <div className="brd-port-label">{label}</div>}
      <div className="brd-port-handler" data-brd-id={id} data-brd-type="port" />
    </div>
  );
};

Port.propTypes = PortShape;
Port.defaultProps = {
  canLink: stubTrue,
};

export default React.memo(Port);
