import { RouteObject } from 'react-router-dom';
import ConfigurationPage from '../pages/ConfigurationPage';

export const configurationRoutes: RouteObject[] = [
	{ path: '/configurations', children: [{ index: true, element: <ConfigurationPage /> }] },
];
