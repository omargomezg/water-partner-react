import {GenericResponse, Tariff, Tariffs} from "../types";
import apiClient from "../services/apiClient";
import {ImmerStateCreator} from "./useAppStore";
import { get } from "http";

interface TariffState {
    tariff: Tariff | null;
    tariffs: Tariff[];
    openFormTariff: boolean;
}

interface TariffActions {
  setOpenFormTariff: (tariff: Tariff | null) => void;
  fetchTariff: () => Promise<boolean>;
  createTariff: (tariff: Tariff) => Promise<GenericResponse<Tariff>>;
  updateTariff: (tariff: Tariff) => Promise<GenericResponse<Tariff>>;
  getTariffById: (id: number) => Promise<GenericResponse<Tariff>>;
  deleteTariff: (id: number) => Promise<GenericResponse<void>>;
}

export type TariffSlice = TariffState & TariffActions;

export const createTariffSlice: ImmerStateCreator<TariffSlice> = (set, get) => ({
    tariff: null,
    tariffs: [],
    openFormTariff: false,
    setOpenFormTariff: (tariff: Tariff | null) => {
        set((state) => ({
            openFormTariff: !state.openFormTariff, tariff: tariff
        }));
    },
    fetchTariff: async () => {
        try {
            const res = await apiClient.get<Tariffs>('/tariff');
            const {status, data} = res;
            if (status === 200) {
                set({tariffs: data.tariffs});
                return true;
            }
            if (status === 409) {
                return false;
            }
            return true
        } catch (err) {
            return false;
        }
    },
    createTariff: async (tariff) => {
        const response: GenericResponse<Tariff> = new GenericResponse<Tariff>();
        try {
            const res = await apiClient.post<Tariff>('/tariff', tariff);
            const {status} = res;
            response.success = status === 201;
        } catch (err: any) {
            response.success = false;
            response.message = err?.response?.data?.message;
        }
        return response;
    },
    updateTariff: async (tariff: Tariff) => {
        console.log("Actualizando tarifa", tariff);
        const response: GenericResponse<Tariff> = new GenericResponse<Tariff>();
        try {
            const res = await apiClient.put<Tariff>(`/tariff/${tariff.id}`, tariff);
            const {status} = res;
            response.success = status === 200;
        } catch (err: any) {
            response.success = false;
            response.message = err?.response?.data?.message;
        }
        return response;
    },
    getTariffById: async (id: number) => {
        const response: GenericResponse<Tariff> = new GenericResponse<Tariff>();
        try {
            const res = await apiClient.get<Tariff>(`/tariff/${id}`);
            const {status} = res;
            response.success = status === 200;
        } catch (err: any) {
            response.success = false;
            response.message = err?.response?.data?.message;
        }
        return response;
    },
    deleteTariff: async (id: number) => {
        const response: GenericResponse<void> = new GenericResponse<void>();
        try {
            const res = await apiClient.delete<void>(`/tariff/${id}`);
            const {status} = res;
            response.success = status === 200;
            get().fetchTariff();
        } catch (err: any) {
            response.success = false;
            response.message = err?.response?.data?.message;
        }
        return response;
    }
});