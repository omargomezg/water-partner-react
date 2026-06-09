import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const ListOfMetersPage = lazy(() =>
	import('../pages/meters/ListOfMeters/ListOfMetersPage').then((module) => ({
		default: module.ListOfMetersPage,
	})),
);
const FormMeterPage = lazy(() =>
	import('../pages/meters/FormMeter/FormMeterPage').then((module) => ({
		default: module.FormMeterPage,
	})),
);

export const meterRoutes: RouteObject[] = [
	{
		path: '/configurations/meters',
		children: [
			{ index: true, element: <ListOfMetersPage /> },
			{ path: 'new', element: <FormMeterPage /> },
			{ path: ':id/edit', element: <FormMeterPage /> },
		],
	},
];
