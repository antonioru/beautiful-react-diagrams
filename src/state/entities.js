import { atom, selectorFamily } from 'recoil';

export const entitiesStore = atom({
  key: 'brdEntities',
  default: Object.create(null),
});

export const entityCoordinatesById = selectorFamily({
  key: 'brdCoordinatesEntityById',
  get: (id) => ({ get }) => {
    const entity = get(entitiesStore)[id];

    return entity || null;
  },
  set: (id) => ({ set, get }, entityCoordinates) => {
    const store = get(entitiesStore);

    set(entitiesStore, { ...store, [id]: entityCoordinates });
  },
});
