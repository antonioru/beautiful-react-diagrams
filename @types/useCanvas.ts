import { PanState } from './Canvas';


export type CanvasMethods = {
  onPanChange: (panState: PanState) => unknown,
  onZoomChange: (zoom: number) => unknown,
}

export type CanvasStates = {
  pan: PanState,
  zoom: number,
}

declare const useCanvas: (initialStates?: CanvasStates) => [CanvasStates, CanvasMethods];

export default useCanvas;
