export interface Account {
    dni: string;
    roles: Array<string>;
    fullName: string;
    email: string;
    lastLogin: Date;
    enabled: boolean;
}
