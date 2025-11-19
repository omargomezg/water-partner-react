import {StateCreator} from 'zustand';

export type AuthState = {
    email: string | undefined;
    fullName: string | undefined;
    token: string | undefined;
}

export interface AuthActions {
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export type AuthSlice = AuthState & AuthActions;

export const createAuthSlice: StateCreator<
    AuthSlice,
    [],
    []
> = (set, get, api) => ({
    token: undefined,
    email: undefined,
    fullName: undefined,
    login: async (email: string, password: string) => {
        console.log(' asasa' );
        const response = await fetch('http://localhost:8080/api/v1/public/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        if (!response.ok) {
            console.error('Login failed');
            return false;
        }
        const data = await response.json();
        set({
            token: data.token,
            email: data.email,
            fullName: data.fullName
        });
        return true;
    },
    logout: () => {
        set({token: undefined, email: undefined, fullName: undefined});
    }
});