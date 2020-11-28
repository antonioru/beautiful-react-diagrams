import { atom } from 'recoil';

export const panState = atom({
  key: 'brd-canvas',
  default: [0, 0],
});

export const zoomState = atom({
  key: 'brd-zoom',
  default: 1,
});

export const minZoomState = atom({
  key: 'brd-minZoom',
  default: 0.5,
});

export const maxZoomState = atom({
  key: 'brd-maxZoom',
  default: 2,
});

export const canvasCallbacks = atom({
  key: 'brd-canvasCallbacks',
  default: {},
});
