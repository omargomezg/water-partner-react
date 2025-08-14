import {create} from "zustand/react";

interface TariffState {
    openForm: boolean,
    setOpenForm: ()=> void
}

export const useTariffStore = create<TariffState>((set)=>({
    openForm: false,
    setOpenForm: ()=> set((state) => ({openForm: !state.openForm}))
}))