import {create} from "zustand/react";

interface ClientState {
    openForm: boolean;
    openSubsidyForm: boolean;
    openReadingRecordForm: boolean;
    openModalPdf: boolean;
    meterForSubsidy: any,
    profile: {} | null,
    setOpenSubsidyForm: (meter: any) => void;
    /**
     * Cambia el estado de openForm para abrir la edicion de clientes
     */
    setOpenForm: () => void;
    setProfile: (client: any) => void;
    setOpenModalPdf: ()=> void;
    setOpenReadingRecordForm: ()=> void;
}

export const useClientStore = create<ClientState>((set)=>({
    openForm: false,
    openSubsidyForm: false,
    openReadingRecordForm: false,
    openModalPdf: false,
    meterForSubsidy: null,
    profile: null,
    setOpenSubsidyForm: (meter: any) => {
        set((state) => ({
            openSubsidyForm: !state.openSubsidyForm,
            meterForSubsidy: meter
        }))
    },
    setOpenForm: () => set((state) =>({openForm: !state.openForm})),
    setProfile: (client) => set((state) => ({profile: client})),
    setOpenModalPdf: () => set((state) => ({openModalPdf: !state.openModalPdf})),
    setOpenReadingRecordForm: () => set((state) => ({openReadingRecordForm: !state.openReadingRecordForm})),
}))