import { Tariff } from "./Tariff";

export interface Tariffs {
    allRatesAreConfigured: boolean;
    tariffs: Tariff[];
}