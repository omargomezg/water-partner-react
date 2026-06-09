import { RouteObject } from 'react-router-dom';
import MeterReadingPage from '../pages/MeterReading';

export const meterReadingRoutes: RouteObject[] = [
	{
		path: '/meter-readings',
		children: [{ index: true, element: <MeterReadingPage /> }],
	},
];
