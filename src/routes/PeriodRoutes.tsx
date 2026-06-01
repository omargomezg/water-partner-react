import { RouteObject } from "react-router-dom";
import { lazy } from "react";

const PeriodPage = lazy(() =>
  import("../features/periods/pages/Period.page").then((module) => ({
    default: module.PeriodPage,
  }))
);
export const periodRoutes: RouteObject[] = [
  {
    path: "/periods",
    children: [
      { path: ":id/edit", element: <PeriodPage /> },
    ],
  },
];
