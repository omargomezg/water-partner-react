import { ClientType } from "./ClientType";
import { User } from "./User";
import { WaterMeter } from "./WaterMeter";

export interface Client extends User {
  typeOfDni: string;
  rut: string;
  businessActivity: string;
  birthDate: string;
  profession: string;
  dateOfAdmission: string;
  sector: number;
  clientNumber: number;
  clientType: ClientType;
  phone: string;
  isActive: boolean;
  waterMeters: WaterMeter[];
}
