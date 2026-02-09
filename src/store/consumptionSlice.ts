import { ImmerStateCreator } from "./useAppStore";
import apiClient from "../services/apiClient";
import { GenericResponse, Reading, ReadingRecord, ReadingRecords } from "../types";

export interface ConsumptionSlice {
    openFormConsumption: boolean;
    readingRecords: ReadingRecords | null;
    currentRecord: ReadingRecord | null;
    loadingConsumption: boolean;
    history: Reading[];
    setOpenFormConsumption: (open: boolean, record?: ReadingRecord) => void;
    fetchReadingRecords: (status?: string, page?: number, size?: number) => Promise<void>;
    fetchHistory: (id: number) => Promise<void>;
    createReading: (id: number, reading: number) => Promise<GenericResponse<void>>;
}

export const createConsumptionSlice: ImmerStateCreator<ConsumptionSlice> = (set, get) => ({
    openFormConsumption: false,
    readingRecords: null,
    currentRecord: null,
    loadingConsumption: false,
    history: [],
    setOpenFormConsumption: (open, record) => {
        set((state) => {
            state.openFormConsumption = open;
            state.history = []; // Clear history
            if (open && record) {
                state.currentRecord = record;
            } else if (!open) {
                state.currentRecord = null;
            }
        });
    },
    fetchReadingRecords: async (status = "pending", page = 0, size = 10) => {
        // status: 'all', 'pending', 'no-pending'
        set((state) => { state.loadingConsumption = true });
        try {
            const response = await apiClient.get<ReadingRecords>(`/consumption/related-water-meters?status=${status}&pageIndex=${page}&pageSize=${size}`);
            if (response.status === 200) {
                set((state) => { state.readingRecords = response.data });
            }
        } catch (error) {
            console.error(error);
        } finally {
            set((state) => { state.loadingConsumption = false });
        }
    },
    fetchHistory: async (id: number) => {
        try {
            const response = await apiClient.get<Reading[]>(`/consumption/${id}`);
            if (response.status === 200) {
                // Sort desc by date
                const history = response.data.sort((a, b) => new Date(b.readingDate).getTime() - new Date(a.readingDate).getTime());
                set((state) => {
                    state.history = history;
                });
            }
        } catch (error) {
            console.error("Error fetching history", error);
            set((state) => { state.history = [] });
        }
    },
    createReading: async (id: number, reading: number) => {
        const response: GenericResponse<void> = new GenericResponse<void>();
        try {
            const res = await apiClient.post<string>(`/consumption/${id}?consumption=${reading}`);
            response.success = res.status === 201 || res.status === 200;
            if (response.success) {
                get().fetchReadingRecords();
            }
            return response;
        } catch (error) {
            response.message = (error as Error).message;
            return response;
        }
    }
});
