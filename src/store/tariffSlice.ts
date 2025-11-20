import {Tariff, Tariffs} from "../types";
import apiClient from "../services/apiClient";
import {ImmerStateCreator} from "./useAppStore";

interface TariffState {
    tariffs: Tariff[];
    openFormTariff: boolean
}

interface TariffActions {
    setOpenFormTariff: ()=> void
    fetchTariff: () => Promise<void>;
    create: (tariff: Tariff) => void;
}

export type TariffSlice = TariffState & TariffActions;

export const createTariffSlice: ImmerStateCreator<TariffSlice> = (set) => ({
    tariffs: [],
    openFormTariff: false,
    setOpenFormTariff: () => {
        set((state) => ({
            openFormTariff: !state.openFormTariff
        }))
    },
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