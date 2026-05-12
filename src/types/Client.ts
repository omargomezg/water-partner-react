import { ClientType } from "./ClientType";
import {WaterMeter} from "./WaterMeter";

export interface Client {
    typeOfDni: string;
    rut: string;
    fullName: string;    
    businessActivity: string;
    birthDate: string;
    profession: string;
    dateOfAdmission: string;
    sector: number;
    clientNumber: number;
    clientType: ClientType;
    email: string;
    phone: string;
    isActive: boolean;
    waterMeters: WaterMeter[];
}