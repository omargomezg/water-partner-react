import {Tariff, Tariffs} from "../types";
import apiClient from "../services/apiClient";
import {ImmerStateCreator} from "./useAppStore";

interface TariffState {
    tariffs: Tariff[];
    openFormTariff: boolean
}

interface TariffActions {
    setOpenFormTariff: ()=> void
    fetchTariff: () => Promise<boolean>;
    createTariff: (tariff: Tariff) => Promise<boolean>;
    updateTariff: (tariff: Tariff) => Promise<boolean>;
    getTariffById: (id: number) => Promise<boolean>;
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
        try {
            const res = await apiClient.get<Tariffs>('/tariff');
            const {status, data} = res;
            if (status === 200) {
                set({tariffs: data.tariffs});
            }
            return true
        } catch (err) {
            return false;
        }
    },
    createTariff: async (tariff) => {
        try {
            const res = await apiClient.post<Tariff>('/tariff', tariff);
            const {status} = res;
            return status === 201;
        } catch (err) {
            return false;
        }
    },
    updateTariff: async (tariff: Tariff) => {
        try {
            const res = await apiClient.put<Tariff>('/tariff', tariff);
            const {status} = res;
            return status === 200;
        } catch (err) {
            return false;
        }
    },
    getTariffById: async (id: number) => {
        try {
            const res = await apiClient.get<Tariff>(`/tariff/${id}`);
            const {status} = res;
            return status === 200;
        } catch (err) {
            return false;
        }
    }
});