import { RouteObject } from "react-router-dom";
import ClientPage from "../pages/ClientPage";

export const clientRoutes: RouteObject[] = [
  {
    path: "/clients",
    children: [
      { index: true, element: <ClientPage /> }
    ],
  },
];
