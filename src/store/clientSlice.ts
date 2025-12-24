import { ImmerStateCreator } from "./useAppStore";
import apiClient from "../services/apiClient";
import { Client, ClientFilter, GenericResponse, PageResponse, WaterMeter } from "../types";
import { cleanFilter, constants } from "../utils/Utils";

type ClientState = {
	openClientForm: boolean;
	openSubsidyForm: boolean;
	openClientMeterDrawer: boolean;
	openReadingRecordForm: boolean;
	openModalPdf: boolean;
	meterForSubsidy: any,
	clientFilter: ClientFilter,
	client: Client | null,
	clients: PageResponse<Client> | null,
	loadingClients: boolean,
}

interface ClientActions {
	setClientMeterDrawerOpen: () => void;
	setClientFilter: (filter: ClientFilter) => void;
	setOpenSubsidyForm: (meter: any) => void;
	setClientOpenForm: () => void;
	setProfile: (client: any) => void;
	setOpenModalPdf: () => void;
	setOpenReadingRecordForm: () => void;
	getClients: () => Promise<boolean>;
	createClient: (client: Client) => Promise<boolean>;
	deleteClient: (id: string) => Promise<boolean>;
	addWaterMeterToClient: (dni: string, meter: any) => Promise<GenericResponse<void>>;
	removeClientWaterMeter: (dni: string, id: string) => Promise<GenericResponse<void>>;
}

export type ClientSlice = ClientState & ClientActions;

export const createClientSlice: ImmerStateCreator<ClientSlice> = (set, get) => ({
	openClientMeterDrawer: false,
	openClientForm: false,
	openSubsidyForm: false,
	openReadingRecordForm: false,
	openModalPdf: false,
	meterForSubsidy: null,
	clientFilter: { page: 0, size: constants.PAGE_SIZE },
	client: null,
	clients: null,
	loadingClients: false,
	setClientMeterDrawerOpen: () => {
		set((state) => ({ openClientMeterDrawer: !state.openClientMeterDrawer }))
	},
	setClientFilter: (filter: ClientFilter) => {
		set((state) => {
			state.clientFilter = filter;
		});
		get().getClients();
	},
	setOpenSubsidyForm: (meter: any) => {
		set((state) => ({
			openSubsidyForm: !state.openSubsidyForm,
			meterForSubsidy: meter
		}))
	},
	setClientOpenForm: () => set((state) => ({ openClientForm: !state.openClientForm })),
	setProfile: (client) => {
		set((state) => { state.client = client })
	},
	setOpenModalPdf: () => set((state) => ({ openModalPdf: !state.openModalPdf })),
	setOpenReadingRecordForm: () => set((state) => ({ openReadingRecordForm: !state.openReadingRecordForm })),
	getClients: async () => {
		set((state) => ({ loadingClients: true }))
		try {
			const clientFilter = get().clientFilter
			const params = new URLSearchParams(cleanFilter(clientFilter)).toString();
			const response = await apiClient.get<PageResponse<Client>>(`/client?${params}`);
			const { status, data } = response;
			if (status === 200) {
				set((state) => {
					state.clients = data
				});
				return true;
			}
			return false;
		} catch (err) {
			return false;
		} finally {
			set((state) => {
				state.loadingClients = false
			});
		}
	},
	createClient: async (client: Client) => {
		try {
			const response = await apiClient.post<Client>(`/client`, client);
			const { status } = response;
			if (status === 201) {
				set((state) => {
					state.clientFilter = { page: 0, size: constants.PAGE_SIZE };
				});
				get().getClients();
				return true;
			}
			return false;
		} catch (err) {
			return false;
		}
	},
	deleteClient: async (id: string) => {
		try {
			const response = await apiClient.delete(`/client/${id}`);
			const { status } = response;
			if (status === 200) {
				get().getClients();
				return true;
			}
			return false;
		} catch (err) {
			return false;
		}
	},
	addWaterMeterToClient: async (dni: string, meter: WaterMeter) => {
		const response: GenericResponse<void> = new GenericResponse<void>();
		try {
			const res = await apiClient.post<Client>(`/client/${dni}/water-meter`, meter);
			const { status, data } = res;
			if (status === 201) {
				set({client: data});
				response.success = true;
			}
		} catch (err) {
			response.message = (err as Error).message;
		}
		return response;
	},
	removeClientWaterMeter: async (dni: string, id: string) => {
		const response: GenericResponse<void> = new GenericResponse<void>();
		try {
			const res = await apiClient.delete<Client>(`/client/${dni}/water-meter/${id}`);
			const { status, data } = res;
			if (status === 200) {
				set({client: data});
				response.success = true;
			}
		} catch (err) {
			response.message = (err as Error).message;
		}
		return response;
	}
})
