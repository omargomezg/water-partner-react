import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const PeriodPage = lazy(() =>
	import('../features/periods/pages/Period.page').then((module) => ({
		default: module.PeriodPage,
	})),
);

const ListOfPeriodsPage = lazy(() =>
	import('../features/periods/pages/ListOfPeriods.page').then((module) => ({
		default: module.ListOfPeriodsPage,
	})),
);

export const periodRoutes: RouteObject[] = [
	{
		path: '/configurations/periods',
		children: [
			{ index: true, element: <ListOfPeriodsPage /> },
			{ path: ':id/edit', element: <PeriodPage /> },
		],
	},
];
