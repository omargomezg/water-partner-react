import {create} from "zustand/react";

interface MeterState {
    openForm: boolean,
    setOpenForm: ()=> void
}

export const useMeterStore = create<MeterState>((set)=>({
    openForm: false,
    setOpenForm: ()=> set((state) => ({openForm: !state.openForm}))
}))