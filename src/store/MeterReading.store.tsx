import {create} from "zustand/react";

interface MeterReadingState {
    openForm: boolean;
    setOpenForm: () => void;
}

export const useMeterReadingStore = create<MeterReadingState>((set) => ({
    openForm: false,
    setOpenForm: () => set((state) => ({openForm: !state.openForm})),
}))