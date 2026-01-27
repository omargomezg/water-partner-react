import { ImmerStateCreator } from "./useAppStore";
import apiClient from "../services/apiClient";

type AuthState = {
    email: string | undefined;
    fullName: string | undefined;
    token: string | undefined;
    openModalSessionExpired: boolean;
}

interface AuthActions {
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export type AuthSlice = AuthState & AuthActions;

export const createAuthSlice: ImmerStateCreator<AuthSlice> = (set) => ({
    token: undefined,
    email: undefined,
    fullName: undefined,
    openModalSessionExpired: false,
    login: async (email: string, password: string) => {
        const response = await apiClient.post('/public/auth/signup', { email, password });
        const { status, data } = response;
        if (status !== 200) {
            console.error('Login failed');
            return false;
        }
        set((state) => {
            state.token = data.token;
            state.email = data.email;
            state.fullName = data.fullName;
        });
        return true;
    },
    logout: () => {
        set((state) => {
            state.token = undefined;
            state.email = undefined;
            state.fullName = undefined;
            state.openModalSessionExpired = false;
        });
        // Save current path before logout
        localStorage.setItem('redirectAfterLogin', window.location.pathname);
        window.location.href = '/login'
    }
});