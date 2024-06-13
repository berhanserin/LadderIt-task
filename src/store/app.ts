import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { persist, StateStorage } from 'zustand/middleware';

type AppPersistStore = {
  brandName: string;
  setBrand: (brand: string) => void;
};

export const appPersistStorage = new MMKV({ id: 'ladded' });

const zustandMMKVStorage: StateStorage = {
  setItem: (name, value) => {
    return appPersistStorage.set(name, value);
  },
  getItem: name => {
    const value = appPersistStorage.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    return appPersistStorage.delete(name);
  },
};

export const useAppState = create<
  AppPersistStore,
  [['zustand/persist', AppPersistStore]]
>(
  persist(
    (set, get) => ({
      brandName: '',
      setBrand: brand => set({ brandName: brand }),
    }),
    {
      name: 'ladded',
      getStorage: () => zustandMMKVStorage,
      serialize: state => JSON.stringify(state),
      deserialize: state => JSON.parse(state),
    }
  )
);
