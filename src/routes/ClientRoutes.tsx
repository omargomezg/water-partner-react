import { RouteObject } from "react-router-dom";
import { lazy } from "react";

const ClientPage = lazy(() =>
  import("../pages/ClientPage").then((module) => ({
    default: module.ClientPage,
  })),
);

const OwnerFormPage = lazy(() =>
  import("../features/users/pages/OwnerFormPage").then((module) => ({
    default: module.OwnerFormPage,
  })),
);

const ResidentFormPage = lazy(() =>
  import("../features/users/pages/ResidentFormPage").then((module) => ({
    default: module.ResidentFormPage,
  })),
);

export const clientRoutes: RouteObject[] = [
  {
    path: "/clients",
    children: [
      { index: true, element: <ClientPage /> },
      { path: ":id/edit/owner", element: <OwnerFormPage /> },
      { path: ":id/edit/resident", element: <ResidentFormPage /> },
    ],
  },
];
