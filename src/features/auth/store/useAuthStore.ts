import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {AuthResponse} from "./types/type";

type State = {
	token: string;
	email: string;
	roles: string[];
};

type Actions = {
	setValues: (auth: AuthResponse) => void;
	logout: () => void;
};

type AuthStore = State & Actions;

export const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			token: '',
			email: '',
			roles: [],
			setValues: (auth: AuthResponse) => {
				set({
					token: auth.token,
					email: auth.email,
					roles: auth.roles
				});
			},
			logout: () => {
				set({
					token: '',
					email: '',
					roles: []
				});
			},
		}),
		{
			name: 'auth',
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
