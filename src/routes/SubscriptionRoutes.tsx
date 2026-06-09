import { RouteObject } from 'react-router-dom';
import { SubscriptionDetailPage } from '../features/subscriptions/pages/SubscriptionDetailPage';

export const subscriptionRoutes: RouteObject[] = [
	{
		path: '/subscriptions',
		children: [{ path: ':id', element: <SubscriptionDetailPage /> }],
	},
];
