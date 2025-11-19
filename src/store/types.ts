import {AuthSlice} from "./authSlice";

interface AuthState {
    email: string | undefined;
    fullName: string | undefined;
    token: string | undefined;
}

interface AuthActions {
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export type Store = AuthSlice