import { PageFilter } from "./PageFilter";

export interface WaterMeterFilter extends PageFilter {
    serial?: number;
    trademark?: string;
    diameter?: string;
    sector?: string;

}
