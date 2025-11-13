export interface Tariff {
    id: number;
    diameter: number;
    flatFee: number;
    cubicMeter: number;
    clientType: string;
    lastUpdate: Date;
    status: string;
}

export type CreateTariffPaylod = Omit<Tariff, 'id'>;

export type UpdateTariffPayload = Partial<Tariff> & { id: number };