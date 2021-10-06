import { PanState } from './Canvas';


export type CanvasMethods = {
  onPanChange: (panState: PanState) => unknown,
  onZoomChange: (zoom: number) => unknown,
}

export type CanvasStates = {
  pan: PanState,
  zoom: number,
}

declare const useCanvasState: (initialStates?: CanvasStates) => [CanvasStates, CanvasMethods];

export default useCanvasState;
