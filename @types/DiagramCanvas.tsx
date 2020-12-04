import { memo } from 'react';

export type DiagramCanvasProps = {
  draggable?: boolean;
  delta?: number;
  showZoomButtons?: boolean;
  zoomButtonsPosition?:
    | 'top-left'
    | 'top-right'
    | 'top-center'
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-left';
  zoomOnWheel?: boolean;
  minZoom?: number;
  maxZoom?: number;
};

declare const DiagramCanvas: (props: DiagramCanvasProps) => JSX.Element;

export default memo(DiagramCanvas);
