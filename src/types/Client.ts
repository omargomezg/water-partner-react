import {WaterMeter} from "./WaterMeter";

export interface Client {
    dniType: string;
    dni: string;
    fullName: string;
    names: string;
    middleName: string;
    lastName: string;
    businessName: string;
    businessActivity: string;
    birthDate: string;
    profession: string;
    dateOfAdmission: string;
    sector: number;
    clientNumber: number;
    clientType: string;
    email: string;
    telephone: string;
    isActive: boolean;
    waterMeters: WaterMeter[];
}