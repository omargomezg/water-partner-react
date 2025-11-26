import {ImmerStateCreator} from "./useAppStore";
import apiClient from "../services/apiClient";
import {ClientType} from "../types";

type ClientTypeState = {
    clientTypes: ClientType[];
    clientType: ClientType | null;
}

interface ClientTypeActions {
    getClientTypes: () => Promise<boolean>;
    setClientType: (clientType: ClientType) => void;
    clearFormClientType: () => void;
    saveClientType: (clientType: ClientType) => Promise<boolean>;
}

export type ClientTypeSlice = ClientTypeState & ClientTypeActions;
export const createClientTypeSlice: ImmerStateCreator<ClientTypeSlice> = (set, get) => ({
    clientTypes: [],
    clientType: null,
    setClientType: (type: ClientType) => set((state) => {
        state.clientType = type;

    }),
    clearFormClientType: () => set((state) => {
        state.clientType = null;
    }),
    getClientTypes: async () => {
        try {
            const response = await apiClient<ClientType[]>('/client-type');
            const {status, data} = response;
            if (status !== 200) {
                return false;
            }
            set((state) => {
                state.clientTypes = data;
            });
            return true;
        } catch (err) {
            console.error("Error fetching client types:", err);
            return false;
        }
    },
    saveClientType: async (clientType: ClientType) => {
        try {
            const id = get().clientType?.id;
            if (id) {
                clientType.id = id;
                await apiClient.put(`/client-type/${id}`, clientType);
            } else {
                await apiClient.post('/client-type', clientType);
            }
            return true;
        } catch (err) {
            console.error("Error fetching client types:", err);
            return false;
        }
    },
});