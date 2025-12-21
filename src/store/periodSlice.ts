import apiClient from "../services/apiClient";
import { GenericResponse, PageResponse, Period, PeriodFilter } from "../types";
import { ImmerStateCreator } from "./useAppStore";

interface PeriodState {
    openFormPeriod: boolean;
    periodFilter: PeriodFilter;
    period: Period | null;
    periods: PageResponse<Period> | null;
}

interface PeriodActions {
    setPeriodFilter: (filter: PeriodFilter) => void;
    setOpenFormPeriod: (period: Period | null) => void;
    fetchPeriods: () => Promise<GenericResponse<Period[]>>;
    createPeriod: (period: Period) => Promise<GenericResponse<Period>>;
    deletePeriod: (id: number) => Promise<GenericResponse<void>>;
}

export type PeriodSlice = PeriodState & PeriodActions;

export const createPeriodSlice: ImmerStateCreator<PeriodSlice> = (set, get) => ({
    openFormPeriod: false,
    periodFilter: { page: 0, size: 10 },
    period: null,
    periods: null,
    setPeriodFilter: (filter: PeriodFilter) => {
        set((state) => { state.periodFilter = filter });
    },
    setOpenFormPeriod: (period: Period | null) => {
        const openFormPeriod = get().openFormPeriod;
        if (openFormPeriod === true) {
            set((state) => {
                state.openFormPeriod = !openFormPeriod
                state.period = null
            });
        } else {
            set((state) => {state.openFormPeriod = true})
        }
    },
    fetchPeriods: async () => {
        const response: GenericResponse<Period[]> = new GenericResponse<Period[]>();
        try {
            const res = await apiClient.get<PageResponse<Period>>('/period');
            const { data} = res;
                set((state) => { state.periods = data });
                response.success = true;
                response.content = data.content;
                return response;
        } catch (error) {
            response.message = (error as Error).message;
            return response;
        }
    },
    createPeriod: async (period: Period) => {
        const response: GenericResponse<Period> = new GenericResponse<Period>();
        try {
            const res = await apiClient.post<Period>('/period', period);
            const { status, data } = res;
            response.success = status === 201
            response.content = data
            get().fetchPeriods();
            return response;
        } catch (err) {
            response.message = (err as Error).message;
            return response;
        }
    },
    deletePeriod: async (id: number) => {
        const response: GenericResponse<void> = new GenericResponse<void>();
        try {
            const res = await apiClient.delete<void>(`/period/${id}`);
            const {status} = res;
            response.success = status === 200;
            get().fetchPeriods();
            return response;
        } catch (err) {
            response.message = (err as Error).message;
            return response;
        }
    }
});