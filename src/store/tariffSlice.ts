import {Tariff} from "../types";
import apiClient from "../services/apiClient";
import {ImmerStateCreator} from "./appStore";

interface TariffState {
}

interface TariffActions {
    fetchTariff: () => Promise<void>;
    create: (tariff: Tariff) => void;
}

export type TariffSlice = TariffState & TariffActions;

export const createTariffSlice: ImmerStateCreator<TariffSlice> = (set) => ({
    fetchTariff: async () => {
        const res = await apiClient.get('/tariff');
        if (res.status === 200) {
            // Aquí puedes actualizar el estado si es necesario, por ejemplo:
            // set((state) => { ... });
        }
    },
    create: async (tariff) => {
        await apiClient.post('/tariff', tariff);
        // Aquí puedes actualizar el estado si es necesario, por ejemplo:
        // set((state) => { ... });
    }
});