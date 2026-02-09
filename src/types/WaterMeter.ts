export interface WaterMeter {
    id: number;
    serial: string;
    trademark: string;
    diameter: string;
    comment: string;
    sector: string;
    createdAt: string;
    updatedAt: string;
    cubicMeter?: number;
    flatFee?: number;
    subsidy?: {
        id: number;
        startDate: string;
        endingDate: string;
        percentage: number;
        observation: string;
    };
}
