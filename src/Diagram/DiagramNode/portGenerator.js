import React, { useMemo } from 'react';
import Port from '../Port/Port';

const portGenerator = (registerPort, onDragNewSegment, onSegmentFail, onSegmentConnect) => useMemo(() => (port) => (
  <Port
    {...port}
    onMount={registerPort}
    onDragNewSegment={onDragNewSegment}
    onSegmentFail={onSegmentFail}
    onSegmentConnect={onSegmentConnect}
    key={port.id}
  />
), [registerPort, onDragNewSegment, onSegmentConnect, onSegmentConnect]);

export default portGenerator;
