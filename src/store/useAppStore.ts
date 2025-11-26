import {create, StateCreator} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {AuthSlice, createAuthSlice} from "./authSlice";
import {immer} from "zustand/middleware/immer";
import {createTariffSlice, TariffSlice} from "./tariffSlice";
import {ClientSlice, createClientSlice} from "./clientSlice";
import {ClientTypeSlice, createClientTypeSlice} from "./clientTypeSlice";

export type RootState = AuthSlice & TariffSlice & ClientSlice & ClientTypeSlice;

export type ImmerStateCreator<T> = StateCreator<RootState, [["zustand/immer", never], never], [], T>;

export const useAppStore = create<RootState>()(
    immer(
        persist(
            devtools((...args) => ({
                ...createAuthSlice(...args),
                ...createTariffSlice(...args),
                ...createClientSlice(...args),
                ...createClientTypeSlice(...args)
            })), {
                name: "app-store"
            }
        )
    )
);