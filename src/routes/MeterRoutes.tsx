import { RouteObject } from "react-router-dom";
import { FormMeterPage } from "../pages/meters/FormMeter/FormMeterPage";
import { ListOfMetersContainer } from "../pages/meters/ListOfMeters/ListOfMeters.container";

export const meterRoutes: RouteObject[] = [
  {
    path: "/configurations/meters",
    children: [
      { index: true, element: <ListOfMetersContainer /> },
      { path: "new", element: <FormMeterPage /> },
      { path: ":id/edit", element: <FormMeterPage /> },
    ],
  },
];
