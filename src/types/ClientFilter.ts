import { PageFilter } from './PageFilter';

export interface ClientFilter extends PageFilter {
    name?: string;
    dni?: string;
}
