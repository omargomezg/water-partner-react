import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const HomeAccountPage = lazy(() =>
	import('../features/users/pages/HomeAccountPage').then((module) => ({
		default: module.HomeAccountPage,
	})),
);

const SystemUserFormPage = lazy(() =>
	import('../features/users/pages/SystemUserFormPage').then((module) => ({
		default: module.SystemUserFormPage,
	})),
);

export const accountRoutes: RouteObject[] = [
	{
		path: '/configurations/accounts',
		children: [
			{ index: true, element: <HomeAccountPage /> },
			{ path: ':id/edit', element: <SystemUserFormPage /> },
		],
	},
];
