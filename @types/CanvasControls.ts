import { memo, ElementType } from 'react';
import { PanState } from './Canvas';


export type CanvasControlsProps = {
  placement?: 'top-left' | 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center' | 'bottom-left' | 'left' | 'right',
  alignment?: 'vertical' | 'horizontal',
  onPanChange?: (panState: PanState) => unknown,
  onZoomChange?: (zoom: PanState) => unknown,
  ButtonRender?: ElementType,
  ZoomInBtnRender?: ElementType,
  CenterBtnRender?: ElementType,
  ZoomOutBtnRender?: ElementType,
  ElementRender?: ElementType,
}


declare const CanvasControls: (props: CanvasControlsProps) => JSX.Element;

export default memo(CanvasControls);
