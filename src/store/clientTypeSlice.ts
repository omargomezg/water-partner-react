import {ImmerStateCreator} from "./useAppStore";
import apiClient from "../services/apiClient";
import {ClientType} from "../types";

type ClientTypeState = {
    clientTypes: ClientType[];
    clientType: ClientType | null;
}

interface ClientTypeActions {
    getClientTypes: () => Promise<ClientType[]>;
    clearFormClientType: () => void;
    saveClientType: (clientType: ClientType) => Promise<boolean>;
}

export type ClientTypeSlice = ClientTypeState & ClientTypeActions;
export const createClientTypeSlice: ImmerStateCreator<ClientTypeSlice> = (set, get) => ({
    clientTypes: [],
    clientType: null,
    clearFormClientType: () => set((state) => {
        state.clientType = null;
    }),
    getClientTypes: async () => {
        const clientTypes = get().clientTypes;
        if (clientTypes.length > 0) {
            return clientTypes;
        }
        try {
            const response = await apiClient<ClientType[]>('/client-type');
            const {status, data} = response;
            if (status !== 200) {
                return [];
            }
            set((state) => {
                state.clientTypes = data;
            });
            return data;
        } catch (err) {
            console.error("Error fetching client types:", err);
            return [];
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