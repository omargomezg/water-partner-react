import { ImmerStateCreator } from "./useAppStore";
import apiClient from "../services/apiClient";
import { MetersAvailable } from "../types/MetersAvailable";
import { PageResponse, WaterMeter, WaterMeterFilter } from "../types";
import { cleanFilter, constants } from "../utils/Utils";

type WaterMeterState = {
    openFormWaterMeter: boolean,
    waterMeter: WaterMeter | null,
    waterMeters: PageResponse<WaterMeter> | null,
    availableMeters: MetersAvailable | null,
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
    getAvailableWaterMeters: (page?: number, size?: number) => Promise<boolean>;
    associateWaterMeterToClient: (dni: string, waterMeterId: number) => Promise<boolean>;
    createWaterMeter: (waterMeter: WaterMeter) => Promise<WaterMeter | null>;
    deleteAssociatedWaterMeter: (id: string) => Promise<boolean>;
}

export type WaterMeterSlice = WaterMeterState & WaterMeterActions

export const createWaterMeterSlice: ImmerStateCreator<WaterMeterSlice> = (set, get) => ({
    openFormWaterMeter: false,
    waterMeter: null,
    waterMeters: null,
    availableMeters: null,
    loadingWaterMeters: false,
    waterMeterClientAssociatedFilter: { page: 0, size: constants.PAGE_SIZE },
    waterMeterConfigurationFilter: { page: 0, size: constants.PAGE_SIZE },
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
            set((state) => {
                state.loadingWaterMeters = false
            });
        }
    },
    getAvailableWaterMeters: async (page = 0, size = 10) => {
        set((state) => { state.loadingWaterMeters = true });
        try {
            const response = await apiClient.get<MetersAvailable>(`/water-meter/not-related?pageIndex=${page}&pageSize=${size}`);
            if (response.status === 200) {
                set((state) => { state.availableMeters = response.data });
                return true;
            }
            return false;
        } catch (err) {
            return false;
        } finally {
            set((state) => { state.loadingWaterMeters = false });
        }
    },
    associateWaterMeterToClient: async (dni: string, waterMeterId: number) => {
        try {
            const response = await apiClient.post(`/client/${dni}/water-meter`, { id: waterMeterId });
            return response.status === 201;
        } catch (err) {
            return false;
        }
    },
    createWaterMeter: async (waterMeter: WaterMeter) => {
        try {
            const response = await apiClient.post<WaterMeter>(`/water-meter`, waterMeter);
            const { status, data } = response;
            if (status !== 201) {
                return null;
            }
            // Refresh available meters if needed or just return success
            return data;
        } catch (err) {
            return null;
        }
    },
    deleteAssociatedWaterMeter: async (id: string) => {
        try {
            const response = await apiClient.delete<void>(`/water-meter/${id}`);
            const { status } = response;
            if (status !== 204) {
                return false;
            }
            get().setWaterMeterFilterForClientAssociated({ page: 0, size: constants.PAGE_SIZE });
            await get().getWaterMetersForClientAssociated();
            return true;
        } catch (err) {
            return false;
        }
    }
})
