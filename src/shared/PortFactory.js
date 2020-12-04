import React from 'react';
import Port from '../components/Port';

export const createPort = (type = 'input') => (port, props = {}) => (<Port {...port} {...props} type={type} key={port.id} />);
export const createPorts = (type = 'input') => (ports, props = {}) => ports.map(createPort(type, props));

export const createInputs = createPorts('input');
export const createOutputs = createPorts('outputs');
