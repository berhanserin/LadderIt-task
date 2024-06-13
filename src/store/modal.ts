import { create } from 'zustand';

interface BottomState {
  open: boolean;
  type: number;
  brandId: number;
  setOpen: ({
    open,
    type,
    brandId,
  }: {
    open: boolean;
    type: number;
    brandId?: number;
  }) => void;
  closeBottom: () => void;
}

export const useBottomState = create<
  BottomState,
  [['zustand/persist', BottomState]]
>((set, get) => ({
  open: false,
  type: 0,
  brandId: 0,
  setOpen({ open, type, brandId = 0 }) {
    set({ open, type, brandId });
  },
  closeBottom() {
    set({ open: false, type: 0, brandId: 0 });
  },
}));
