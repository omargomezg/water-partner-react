
export interface Subsidy {
    id: number;
    waterMeter?: {
        id: number;
        serial: string;
    };
    startDate: string; // Date
    endingDate: string; // Date
    percentage: number;
    observation: string;
    numberOfDecree?: string;
    approvedDateOfDecree?: string; // Date
}

export interface SubsidyRequest {
    waterMeter: {
        id: number;
    };
    decree: {
        number: string;
        publication: string; // Date
    };
    subsidy: {
        id?: number;
        start: string; // Date
        end: string; // Date
        percentage: number;
    };
    observation: string;
}
