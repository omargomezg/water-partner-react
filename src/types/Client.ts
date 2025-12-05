import { ClientType } from "./ClientType";
import {WaterMeter} from "./WaterMeter";

export interface Client {
    typeOfDni: string;
    dni: string;
    fullName: string;    
    businessActivity: string;
    birthDate: string;
    profession: string;
    dateOfAdmission: string;
    sector: number;
    clientNumber: number;
    clientType: ClientType;
    email: string;
    telephone: string;
    isActive: boolean;
    waterMeters: WaterMeter[];
}