import apiClient from '../services/apiClient';
import { ImmerStateCreator } from './useAppStore';

export interface DashboardData {
	totalClients: number;
	toSuspend: number;
	pendingReadings: number;
	lastReadings: Reading[];
	consumptions: Consumption[];
}

export interface Reading {
	readingDate: Date;
	client: string;
	readingValue: number;
	status: 'pending' | 'completed';
}

interface Consumption {
	month: string;
	value: number;
}

interface DashboardState {
	dashboardData: DashboardData | null;
	isLoadingDashboard: boolean;
	dashboardError: string | null;
}

interface DashboardActions {
	fetchDashboardData: () => Promise<void>;
}

export type DashboardSlice = DashboardState & DashboardActions;

export const createDashboardSlice: ImmerStateCreator<DashboardSlice> = (set) => ({
	dashboardData: null,
	isLoadingDashboard: false,
	dashboardError: null,

	fetchDashboardData: async () => {
		set((state) => {
			state.isLoadingDashboard = true;
			state.dashboardError = null;
		});
		try {
			const response = await apiClient.get<DashboardData>('/api/dashboard');
			set((state) => {
				state.dashboardData = response.data;
				state.isLoadingDashboard = false;
			});
		} catch (error) {
			set((state) => {
				state.dashboardError =
					error instanceof Error ? error.message : 'Error al cargar datos del dashboard';
				state.isLoadingDashboard = false;
			});
		}
	},
});
