import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

type Store = {
    token: string,
    fullName: string
}

type Actions = {
    setToken: (token: string, fullName: string) => void
}

export const useAuthStore = create<Store & Actions>()(
    persist(
        (set) => ({
            token: "",
            fullName: "",
            setToken: (token: string, fullName: string) => set(() => ({token: token, fullName: fullName}))
        }),
        {
            name: 'global',
            storage: createJSONStorage(() => localStorage)
        }
    ))
