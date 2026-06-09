import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type State = {
	token: string;
};

type Actions = {
	setToken: (token: string) => void;
	logout: () => void;
};

type AuthStore = State & Actions;

export const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			token: '',
			setToken: (token: string) => set({ token }),
			logout: () => {
				set({ token: '' });
			},
		}),
		{
			name: 'auth',
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
