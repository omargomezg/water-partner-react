import { RouteObject } from 'react-router-dom';
import { ListOfCategoriesPage } from '../pages/ListOfCategoriesPage';
import { CategoryEditorPage } from '../pages/CategoryEditorPage';

export const categoryRoutes: RouteObject[] = [
	{
		path: '/configurations/category',
		children: [
			{ index: true, element: <ListOfCategoriesPage /> },
			{ path: 'list', element: <ListOfCategoriesPage /> },
			{ path: 'new', element: <CategoryEditorPage /> },
			{ path: ':id/edit', element: <CategoryEditorPage /> },
		],
	},
];
