import {create, StateCreator} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {AuthSlice, createAuthSlice} from "./authSlice";
import {immer} from "zustand/middleware/immer";
import {createTariffSlice, TariffSlice} from "./tariffSlice";

type RootState = AuthSlice & TariffSlice;

export type ImmerStateCreator<T> = StateCreator<RootState, [["zustand/immer", never], never], [], T>;

export const appStore = create<RootState>()(
    immer(
        persist(
            devtools((...args) => ({
                ...createAuthSlice(...args),
                ...createTariffSlice(...args)
            })), {
                name: "app-store"
            }
        )
    )
);