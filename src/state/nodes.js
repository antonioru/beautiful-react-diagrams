import { atom, selectorFamily } from 'recoil';

export const entitiesStore = atom({
  key: 'brdEntities',
  default: {},
});

export const entityById = selectorFamily({
  key: 'brdEntityById',
  get: (id) => ({ get }) => get(entitiesStore)[id],
  set: (id) => ({ set, get }, coordinates) => {
    const store = get(entitiesStore);

    set(entitiesStore, { ...store, [id]: coordinates });
  },
});
