import {ImmerStateCreator} from "./useAppStore";
import apiClient from "../services/apiClient";
import {Client} from "../types/Client";
import {Clients} from "../types/Clients";

type ClientState = {
    openForm: boolean;
    openSubsidyForm: boolean;
    openReadingRecordForm: boolean;
    openModalPdf: boolean;
    meterForSubsidy: any,
    profile: {} | null,
    clients: Client[]
}

interface ClientActions {
    setOpenSubsidyForm: (meter: any) => void;
    /**
     * Cambia el estado de openForm para abrir la edicion de clientes
     */
    setOpenForm: () => void;
    setProfile: (client: any) => void;
    setOpenModalPdf: ()=> void;
    setOpenReadingRecordForm: ()=> void;
    getClients: (page: number, size: number) => Promise<boolean>;
    createClient: (client: Client) => Promise<boolean>;
}

export type ClientSlice = ClientState & ClientActions;

export const createClientSlice: ImmerStateCreator<ClientSlice> =(set)=>({
    openForm: false,
    openSubsidyForm: false,
    openReadingRecordForm: false,
    openModalPdf: false,
    meterForSubsidy: null,
    profile: null,
    clients: [],
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
    getClients: async (page: number, size: number) => {
        try {
            const response = await apiClient.get<Clients>(`/client?pageIndex=${page}&pageSize=${size}`);
            const {status, data} = response;
            if (status === 200) {
                set((state) => {
                    state.clients = data.items
                });
                return true;
            }
            return false;
        } catch (err) {
            return false;
        }
    },
    createClient: async (client: Client) => {
        try {
            const response = await apiClient.post<Client>(`/client`, client);
            const {status, data} = response;
            return status === 201;
        } catch (err) {
            return false;
        }
    },
})