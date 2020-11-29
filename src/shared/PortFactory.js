import React from 'react';
import Port from '../components/Port';

export const createPort = (type = 'input') => (port) => (<Port {...port} type={type} />);
export const createPorts = (type = 'input') => (ports) => ports.map(createPort(type));

export const createInputs = createPorts('input');
export const createOutputs = createPorts('outputs');
