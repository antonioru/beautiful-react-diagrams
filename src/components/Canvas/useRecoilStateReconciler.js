import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { panState, zoomState, minZoomState, maxZoomState, canvasCallbacks } from '../../state/canvas';

/**
 * // TODO: document this thing
 */
const useRecoilStateReconciler = (zoom, [x, y], minZoom, maxZoom, onZoomChange, onPanChange) => {
  const [currentPan, setInternalPan] = useRecoilState(panState);
  const [currentZoom, setInternalZoom] = useRecoilState(zoomState);
  const [currentMinZoom, setInternalMinZoom] = useRecoilState(minZoomState);
  const [currentMaxZoom, setInternalMaxZoom] = useRecoilState(maxZoomState);
  const setCanvasCbs = useSetRecoilState(canvasCallbacks);

  useEffect(() => {
    if (currentPan[0] !== x || currentPan[1] !== y) {
      setInternalPan([x, y]);
    }
  }, [x, y, currentPan, setInternalPan]);

  useEffect(() => {
    if (currentZoom !== zoom) {
      setInternalZoom(zoom);
    }
  }, [zoom, currentZoom, setInternalZoom]);

  useEffect(() => {
    if (currentMinZoom !== minZoom) {
      setInternalMinZoom(minZoom);
    }
  }, [minZoom, currentMinZoom, setInternalMinZoom]);

  useEffect(() => {
    if (currentMaxZoom !== maxZoom) {
      setInternalMaxZoom(maxZoom);
    }
  }, [maxZoom, currentMaxZoom, setInternalMaxZoom]);

  useEffect(() => {
    setCanvasCbs({ onZoomChange, onPanChange });
  }, [onZoomChange, setCanvasCbs, onPanChange]);
};

export default useRecoilStateReconciler;
