import { memo, ReactElement } from 'react';

export type PanState = { x: number, y: number };

export type CanvasProps = {
  /**
   * Since Canvas is a controlled component, the 'pan' prop defines the canvas panning
   */
  pan?: PanState,
  /**
   * Since Canvas is a controlled component, the 'onPanChange' prop is the change handler of the 'pan' prop
   */
  onPanChange?: (panState: PanState) => unknown,
  /**
   * Since Canvas is a controlled component, the 'zoom' prop defines its zoom level, aka: how much the canvas is scaling
   */
  zoom?: number,
  /**
   * Since Canvas is a controlled component, the 'onZoomChange' prop is the change handler of the 'zoom' prop
   */
  onZoomChange?: (zoom: number) => unknown,
  /**
   * Allow to zoom in/out on mouse wheel
   */
  zoomOnWheel?: boolean,
  /**
   * The maximum allowed zoom
   */
  maxZoom?: number,
  /**
   * The minimum allowed zoom
   */
  minZoom?: number,
  /**
   * Defines whether the zoom should be reset on double click
   */
  zoomResetOnDblClick?: boolean,
  /**
   * Defines whether the canvas should apply inertia when the drag is over
   */
  inertia?: boolean,
  /**
   * Displays debug info
   */
  debug?: boolean,
  GridRenderer?: ReactElement,
  ElementRenderer?: ReactElement,
}


declare const Canvas: (props: CanvasProps) => JSX.Element;

export default memo(Canvas);
