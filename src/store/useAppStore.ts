import {create, StateCreator} from "zustand";
import {devtools, persist} from "zustand/middleware";
import {AuthSlice, createAuthSlice} from "./authSlice";
import {immer} from "zustand/middleware/immer";
import {createTariffSlice, TariffSlice} from "./tariffSlice";
import {ClientSlice, createClientSlice} from "./clientSlice";
import {ClientTypeSlice, createClientTypeSlice} from "./clientTypeSlice";
import {WaterMeterSlice, createWaterMeterSlice} from "./waterMeterSlice";
import {AccountSlice, createAccountSlice} from "./accountSlice";
import {PeriodSlice, createPeriodSlice} from "./periodSlice";
import { createSectorSliceL, SectorSlice } from "./sectorSlice";
export type RootState = AuthSlice & TariffSlice & ClientSlice & ClientTypeSlice & WaterMeterSlice & AccountSlice & PeriodSlice & SectorSlice;

export type ImmerStateCreator<T> = StateCreator<RootState, [["zustand/immer", never], never], [], T>;

export const useAppStore = create<RootState>()(
    immer(
        persist(
            devtools((...args) => ({
                ...createAuthSlice(...args),
                ...createTariffSlice(...args),
                ...createClientSlice(...args),
                ...createClientTypeSlice(...args),
                ...createWaterMeterSlice(...args),
                ...createAccountSlice(...args),
                ...createPeriodSlice(...args),
                ...createSectorSliceL(...args),
            })), {
                name: "app-store"
            }
        )
    )
);
