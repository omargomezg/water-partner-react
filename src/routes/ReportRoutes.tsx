import { RouteObject } from "react-router-dom";
import ReportPage from "../pages/Report";

export const reportRoutes: RouteObject[] = [
  {
    path: "/reports",
    children: [
      { index: true, element: <ReportPage /> },
    ],
  },
];
