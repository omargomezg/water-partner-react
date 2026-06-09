import { RouteObject } from 'react-router-dom';
import ReportPage from '../pages/Report';
import { DebtorsReportPage } from '../pages/DebtorsReportPage';

export const reportRoutes: RouteObject[] = [
	{
		path: '/reports',
		children: [
			{ index: true, element: <ReportPage /> },
			{ path: 'debtors', element: <DebtorsReportPage /> },
		],
	},
];
