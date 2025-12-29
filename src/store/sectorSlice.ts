import apiClient from "../services/apiClient";
import { GenericResponse, Sector } from "../types";
import { ImmerStateCreator } from "./useAppStore";

interface SectorState {
    openSectorDrawerForm: boolean;
    sectors: Sector[]
}

interface SectorActions {
    fetchSectors: () => Promise<GenericResponse<Sector[]>>;
    createSector: (sector: Sector) => Promise<GenericResponse<Sector>>;
    setOpenSectorDrawerForm: () => void;
}

export type SectorSlice = SectorState & SectorActions;

export const createSectorSliceL: ImmerStateCreator<SectorSlice> = (set, get) => ({
    openSectorDrawerForm: false,
    sectors: [],
    setOpenSectorDrawerForm: () => set((state) => {
        state.openSectorDrawerForm = !state.openSectorDrawerForm;
    }),
    createSector: async (sector: Sector) => {
        const response: GenericResponse<Sector> = new GenericResponse<Sector>();
        try {            
            const res = await apiClient.post<Sector>('/sector', sector);
            const { status, data } = res;
            response.success = status === 201
            response.content = data
            get().fetchSectors();
            set((state) => { state.openSectorDrawerForm = false });
            return response;
        } catch (err) {
            response.message = (err as Error).message;
            return response;
        }
    },
    fetchSectors: async () => {
        const response: GenericResponse<Sector[]> = new GenericResponse<Sector[]>();
        try {
            const res = await apiClient.get<Sector[]>('/sector');
            const { data, status } = res;
            if (status === 200) {
                set((state) => { state.sectors = data });
                response.success = true;
                response.content = data;
                return response;
            } else {
                response.message = 'Failed to fetch sectors';
                return response;
            }
        } catch (error) {
            response.message = (error as Error).message;
            return response;
        }
    },
});
