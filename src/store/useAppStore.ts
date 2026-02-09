import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { AuthSlice, createAuthSlice } from "./authSlice";
import { immer } from "zustand/middleware/immer";
import { createTariffSlice, TariffSlice } from "./tariffSlice";
import { ClientSlice, createClientSlice } from "./clientSlice";
import { ClientTypeSlice, createClientTypeSlice } from "./clientTypeSlice";
import { WaterMeterSlice, createWaterMeterSlice } from "./waterMeterSlice";
import { AccountSlice, createAccountSlice } from "./accountSlice";
import { PeriodSlice, createPeriodSlice } from "./periodSlice";
import { createSectorSliceL, SectorSlice } from "./sectorSlice";
import { createDashboardSlice, DashboardSlice } from "./dashboardSlice";
import { ConsumptionSlice, createConsumptionSlice } from "./consumptionSlice";
export type AppStore = AuthSlice & ClientTypeSlice & ClientSlice & AccountSlice & PeriodSlice & TariffSlice & WaterMeterSlice & SectorSlice & DashboardSlice & ConsumptionSlice;

export type ImmerStateCreator<T> = StateCreator<AppStore, [["zustand/immer", never], never], [], T>;

export const useAppStore = create<AppStore>()(
    devtools(
        persist(
            immer((...a) => ({
                ...createAuthSlice(...a),
                ...createClientTypeSlice(...a),
                ...createClientSlice(...a),
                ...createAccountSlice(...a),
                ...createPeriodSlice(...a),
                ...createTariffSlice(...a),
                ...createWaterMeterSlice(...a),
                ...createSectorSliceL(...a),
                ...createDashboardSlice(...a),
                ...createConsumptionSlice(...a)
            })),
            {
                name: "app-store",
                partialize: (state) => ({ token: state.token }),
            }
        )
    )
);
