import { ImmerStateCreator} from "./useAppStore";
import apiClient from "../services/apiClient";
import { WaterMeter, WaterMeterFilter, PageResponse } from "../types";
import { cleanFilter, constants } from "../utils/Utils";

type WaterMeterState = {
    openFormWaterMeter: boolean,
    waterMeter: WaterMeter | null,
    waterMeters: PageResponse<WaterMeter> | null,
    loadingWaterMeters: boolean,
    waterMeterFilter: WaterMeterFilter
}

interface WaterMeterActions {
    setOpenFormWaterMeter: () => void;
    setWaterMeterFilter: (filter: WaterMeterFilter) => void;
    getWaterMeters: () => Promise<boolean>;
    createWaterMeter: (waterMeter: WaterMeter) => Promise<boolean>;
    deleteWaterMeter: (id: string) => Promise<boolean>;
}

export type WaterMeterSlice = WaterMeterState & WaterMeterActions

export const createWaterMeterSlice: ImmerStateCreator<WaterMeterSlice> = (set, get) => ({
    waterMeter: null,
    waterMeters: null,
    loadingWaterMeters: false,
    openFormWaterMeter: false,
    waterMeterFilter: { page: 0, size: constants.PAGE_SIZE },
    setOpenFormWaterMeter: () => {
        if (get().openFormWaterMeter === true) {
            set((state) => {
                state.openFormWaterMeter = !state.openFormWaterMeter
                state.waterMeter = null
            });
        } else {
            set((state) => ({openFormWaterMeter: true}))
        }
    },
    setWaterMeterFilter: (filter: WaterMeterFilter) => {
        set((state) => {
            state.waterMeterFilter = filter;
        });
        get().getWaterMeters();
    },
    getWaterMeters: async () => {
        set((state) => { state.loadingWaterMeters = true });
        try {
            const filter = get().waterMeterFilter;
            const params = new URLSearchParams(cleanFilter(filter)).toString();
            const response = await apiClient.get<PageResponse<WaterMeter>>(`/water-meter?${params}`);
            const { status, data } = response;
            if (status !== 200) {
                return false;
            }
            set((state) => {
                state.waterMeters = data;
            });
            return true;
        } catch (err) {
            return false;
        } finally {
            set((state) => { state.loadingWaterMeters = false });
        }
    },
    createWaterMeter: async (waterMeter: WaterMeter) => {
        try {
            const response = await apiClient.post<WaterMeter>(`/water-meter`, waterMeter);
            const { status } = response;
            if (status !== 201) {
                return false;
            }
            await get().getWaterMeters();
            return true;
        } catch (err) {
            return false;
        }
    },
    deleteWaterMeter: async (id: string) => {
        try {
            const response = await apiClient.delete<void>(`/water-meter/${id}`);
            const { status } = response;
            if (status !== 204) {
                return false;
            }
            get().getWaterMeters();
            return true;
        } catch (err) {
            return false;
        }
    }
})
