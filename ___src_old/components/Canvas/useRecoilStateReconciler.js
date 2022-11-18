import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { panState, scaleState, minScaleState, maxScaleState, canvasCallbacks, canvasElement } from '../../states/canvas';

/**
 * This hook takes the component's most relevant props and set them as a global state (using Recoil)
 * so that they can be available to the child components.
 */
const useRecoilStateReconciler = (scale, [x, y], minScale, maxScale, onScaleChange, onPanChange, elRef) => {
  const [currentPan, setInternalPan] = useRecoilState(panState);
  const [currentZoom, setInternalZoom] = useRecoilState(scaleState);
  const [currentMinZoom, setInternalMinZoom] = useRecoilState(minScaleState);
  const [currentMaxZoom, setInternalMaxZoom] = useRecoilState(maxScaleState);
  const [currentEl, setCanvasElement] = useRecoilState(canvasElement);
  const setCanvasCbs = useSetRecoilState(canvasCallbacks);

  useEffect(() => {
    if (currentPan[0] !== x || currentPan[1] !== y) {
      setInternalPan([x, y]);
    }
  }, [x, y, currentPan, setInternalPan]);

  useEffect(() => {
    if (currentZoom !== scale) {
      setInternalZoom(scale);
    }
  }, [scale, currentZoom, setInternalZoom]);

  useEffect(() => {
    if (currentMinZoom !== minScale) {
      setInternalMinZoom(minScale);
    }
  }, [minScale, currentMinZoom, setInternalMinZoom]);

  useEffect(() => {
    if (currentMaxZoom !== maxScale) {
      setInternalMaxZoom(maxScale);
    }
  }, [maxScale, currentMaxZoom, setInternalMaxZoom]);

  useEffect(() => {
    setCanvasCbs({ onScaleChange, onPanChange });
  }, [onScaleChange, setCanvasCbs, onPanChange]);

  useEffect(() => {
    if (elRef.current && currentEl !== elRef.current) {
      setCanvasElement(elRef.current);
    }
  }, [elRef, currentEl, setCanvasElement]);
};

export default useRecoilStateReconciler;
