import { WaterMeter } from "./WaterMeter";

export interface MetersAvailable {
    meters: WaterMeter[];
    totalHits: number;
}
