import {ImmerStateCreator} from "./useAppStore";
import apiClient from "../services/apiClient";
import {PageResponse, WaterMeter, WaterMeterFilter} from "../types";
import {cleanFilter, constants} from "../utils/Utils";

type WaterMeterState = {
    openFormWaterMeter: boolean,
    waterMeter: WaterMeter | null,
    waterMeters: PageResponse<WaterMeter> | null,
    loadingWaterMeters: boolean,
    waterMeterClientAssociatedFilter: WaterMeterFilter;
    waterMeterConfigurationFilter: WaterMeterFilter;
}

interface WaterMeterActions {
    setOpenFormWaterMeter: () => void;
    setWaterMeterFilterForClientAssociated: (filter: WaterMeterFilter) => void;
    setWaterMeterConfigurationFilter: (filter: WaterMeterFilter) => void;
    getWaterMetersForConfiguration: () => Promise<boolean>;
    getWaterMetersForClientAssociated: () => Promise<boolean>;
    createWaterMeter: (waterMeter: WaterMeter) => Promise<boolean>;
    deleteAssociatedWaterMeter: (id: string) => Promise<boolean>;
}

export type WaterMeterSlice = WaterMeterState & WaterMeterActions

export const createWaterMeterSlice: ImmerStateCreator<WaterMeterSlice> = (set, get) => ({
    openFormWaterMeter: false,
    waterMeter: null,
    waterMeters: null,
    loadingWaterMeters: false,
    waterMeterClientAssociatedFilter: {page: 0, size: constants.PAGE_SIZE},
    waterMeterConfigurationFilter: {page: 0, size: constants.PAGE_SIZE},
    setOpenFormWaterMeter: () => {
        if (get().openFormWaterMeter === true) {
            set((state) => {
                state.openFormWaterMeter = !state.openFormWaterMeter
                state.waterMeter = null
            });
        } else {
            set((state) => {
                state.openFormWaterMeter = true
            })
        }
    },
    setWaterMeterConfigurationFilter: (filter: WaterMeterFilter) => {
        set((state) => {
            state.waterMeterConfigurationFilter = filter;
        });
        get().getWaterMetersForConfiguration();
    },
    setWaterMeterFilterForClientAssociated: (filter: WaterMeterFilter) => {
        set((state) => {
            state.waterMeterClientAssociatedFilter = filter;
        });
        get().getWaterMetersForConfiguration();
    },
    getWaterMetersForConfiguration: async () => {
        set((state) => {
            state.loadingWaterMeters = true
        });
        try {
            const filter = get().waterMeterConfigurationFilter;
            const params = new URLSearchParams(cleanFilter(filter)).toString();
            const response = await apiClient.get<PageResponse<WaterMeter>>(`/water-meter?${params}`);
            const {status, data} = response;
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
            set((state) => {
                state.loadingWaterMeters = false
            });
        }
    },
    getWaterMetersForClientAssociated: async () => {
        set((state) => {
            state.loadingWaterMeters = true
        });
        try {
            const filter = get().waterMeterClientAssociatedFilter;
            const params = new URLSearchParams(cleanFilter(filter)).toString();
            const response = await apiClient.get<PageResponse<WaterMeter>>(`/water-meter?${params}`);
            const {status, data} = response;
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
            set((state) => {
                state.loadingWaterMeters = false
            });
        }
    },
    createWaterMeter: async (waterMeter: WaterMeter) => {
        try {
            const response = await apiClient.post<WaterMeter>(`/water-meter`, waterMeter);
            const {status} = response;
            if (status !== 201) {
                return false;
            }
            await get().getWaterMetersForConfiguration();
            return true;
        } catch (err) {
            return false;
        }
    },
    deleteAssociatedWaterMeter: async (id: string) => {
        try {
            const response = await apiClient.delete<void>(`/water-meter/${id}`);
            const {status} = response;
            if (status !== 204) {
                return false;
            }
            get().setWaterMeterFilterForClientAssociated({page: 0, size: constants.PAGE_SIZE});
            await get().getWaterMetersForClientAssociated();
            return true;
        } catch (err) {
            return false;
        }
    }
})
