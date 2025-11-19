import {Tariff, Tariffs} from "../types";
import apiClient from "../services/apiClient";
import {ImmerStateCreator} from "./appStore";

interface TariffState {
    tariffs: Tariff[];
}

interface TariffActions {
    fetchTariff: () => Promise<void>;
    create: (tariff: Tariff) => void;
}

export type TariffSlice = TariffState & TariffActions;

export const createTariffSlice: ImmerStateCreator<TariffSlice> = (set) => ({
    tariffs: [],
    fetchTariff: async () => {
        const res = await apiClient.get<Tariffs>('/tariff');
        const {status, data} = res;
        if (status === 200) {
            set({tariffs: data.tariffs});
        }
    },
    create: async (tariff) => {
        await apiClient.post('/tariff', tariff);
        // Aquí puedes actualizar el estado si es necesario, por ejemplo:
        // set((state) => { ... });
    }
});