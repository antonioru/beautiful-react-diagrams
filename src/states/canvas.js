import { atom } from 'recoil';

export const panState = atom({
  key: 'brdCanvas',
  default: [0, 0],
});

export const zoomState = atom({
  key: 'brdZoom',
  default: 1,
});

export const minZoomState = atom({
  key: 'brdMinZoom',
  default: 0.5,
});

export const maxZoomState = atom({
  key: 'brdMaxZoom',
  default: 2,
});

export const canvasCallbacks = atom({
  key: 'brdCanvasCallbacks',
  default: {},
});
