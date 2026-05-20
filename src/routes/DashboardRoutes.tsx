import { RouteObject } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";

export const dashboardRoutes: RouteObject[] = [
    {
        path: "/dashboard",
        children: [
            {index: true, element: <DashboardPage />}
        ]
    }
];