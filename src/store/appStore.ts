import {create} from "zustand";
import {devtools, persist, subscribeWithSelector} from "zustand/middleware";
import {AuthSlice, createAuthSlice} from "./authSlice";
import {immer} from "zustand/middleware/immer";

type Store = AuthSlice;

export const appStore = create<Store>()(
    devtools(
        persist(
            subscribeWithSelector(
                immer((...args) => ({
                        ...createAuthSlice(...args),
                    })
                )
            ), {
                name: 'app-storage',
                partialize: (state) => state
            }
        ),
        { name: "AppStoreDevTools"}
    )
);