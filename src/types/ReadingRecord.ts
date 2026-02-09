import { Sector } from "./Sector";

export interface ReadingRecord {
    id: number;
    serial: string;
    client: string;
    clientNumber: number;
    diameter: string;
    sector: Sector;
    reading: number;
}

export interface ReadingRecords {
    records: ReadingRecord[];
    totalHits: number;
}
