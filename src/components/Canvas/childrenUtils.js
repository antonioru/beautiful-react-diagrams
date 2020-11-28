import { Children } from 'react';
import CanvasControls from '../CanvasControls';

const isControls = (Component) => (Component.type === CanvasControls ? Component : null);
const isNotControls = (Component) => (Component.type !== CanvasControls ? Component : null);

// todo: document this method
export const filterControlsOut = (children) => Children.map(children, isNotControls);

// todo: document this method
export const controlsOnly = (children) => Children.map(children, isControls);
