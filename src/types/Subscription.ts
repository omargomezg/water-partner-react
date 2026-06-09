import { User } from './User';

export interface Subscription {
	id: string;
	serviceNumber: string;
	address: string;
	users: User[];
	updatedAt: Date;
	createdAt: Date;
	owner: User;
}
