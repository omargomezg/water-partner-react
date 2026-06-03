import { Site } from "./Site";

export interface User {
  id: string;
  email: string;
  alias: string;
  fullName: string;
  active: boolean;
  roles: string[];
  primarySite: Site;
}
