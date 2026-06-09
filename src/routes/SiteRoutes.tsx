import { RouteObject } from 'react-router-dom';
import { ListOfSitesPage } from '../features/sites/pages/ListOfSitesPage';
import { FormSitePage } from '../features/sites/pages/FormSitePage';

export const siteRoutes: RouteObject[] = [
	{
		path: '/configurations/sites',
		children: [
			{ index: true, element: <ListOfSitesPage /> },
			{ path: ':id', element: <FormSitePage /> },
			{ path: ':id/edit', element: <FormSitePage /> },
		],
	},
];
