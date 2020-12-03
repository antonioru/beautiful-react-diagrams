import { atom } from 'recoil';

export const panState = atom({
  key: 'brdCanvas',
  default: [0, 0],
});

export const scaleState = atom({
  key: 'brdZoom',
  default: 1,
});

export const minScaleState = atom({
  key: 'brdMinZoom',
  default: 0.5,
});

export const maxScaleState = atom({
  key: 'brdMaxZoom',
  default: 2,
});

export const canvasCallbacks = atom({
  key: 'brdCanvasCallbacks',
  default: {},
});

export const canvasElement = atom({
  key: 'brdCanvasElement',
  default: null,
});
