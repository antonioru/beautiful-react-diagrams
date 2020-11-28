import { Children } from 'react';
import CanvasControls from '../CanvasControls';

const isControls = (Component) => (Component.type === CanvasControls ? Component : null);
const isNotControls = (Component) => (Component.type !== CanvasControls ? Component : null);

/**
 * Filter out components that are not of type CanvasControls
 * @param children
 * @returns {Array<Exclude<unknown, boolean | null | undefined>>}
 */
export const filterControlsOut = (children) => Children.map(children, isNotControls);

/**
 * Filter everything out but CanvasControls
 * @param children
 * @returns {Array<Exclude<unknown, boolean | null | undefined>>}
 */
export const controlsOnly = (children) => Children.map(children, isControls);
