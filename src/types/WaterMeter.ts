export interface WaterMeter {
    id: number;
    serial: number;
    trademark: string;
    diameter: string;
    comment: string;
    sector: string;
    createdAt: string;
    updatedAt: string;
    cubicMeter?: number;
    flatFee?: number;
}