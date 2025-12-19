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
    setOpenFormPeriod: () => void;
    fetchPeriods: () => Promise<GenericResponse<Period[]>>;
    createPeriod: (period: Period) => Promise<GenericResponse<Period>>;

}

export type PeriodSlice = PeriodState & PeriodActions;

export const createPeriodSlice: ImmerStateCreator<PeriodSlice> = (set, get) => ({
    openFormPeriod: false,
    periodFilter: { page: 0, size: 10 },
    period: null,
    periods: null,
    setOpenFormPeriod: () => {
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
            const res = await apiClient.get<PageResponse<Period>>('/api/period');
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
            const res = await apiClient.post<Period>('/api/period', period);
            const { status, data } = res;
            response.success = status === 201
            response.content = data
            return response;
        } catch (err) {
            response.message = (err as Error).message;
            return response;
        }
    }
});