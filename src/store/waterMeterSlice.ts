import { ImmerStateCreator} from "./useAppStore";
import apiClient from "../services/apiClient";
import { WaterMeter, WaterMeterFilter, PageResponse } from "../types";
import { cleanFilter, constants } from "../utils/Utils";

type WaterMeterState = {
    openFormWaterMeter: boolean,
    waterMeters: PageResponse<WaterMeter> | null,
    loadingWaterMeters: boolean,
    waterMeterFilter: WaterMeterFilter
}

interface WaterMeterActions {
    setOpenFormWaterMeter: () => void;
    setWaterMeterFilter: (filter: WaterMeterFilter) => void;
    getWaterMeters: () => Promise<boolean>;
}

export type WaterMeterSlice = WaterMeterState & WaterMeterActions

export const createWaterMeterSlice: ImmerStateCreator<WaterMeterSlice> = (set, get) => ({
    waterMeters: null,
    loadingWaterMeters: false,
    openFormWaterMeter: false,
    waterMeterFilter: { page: 0, size: constants.PAGE_SIZE },
    setOpenFormWaterMeter: () => set((state) => ({ openFormWaterMeter: !state.openFormWaterMeter })),
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
    }
})
