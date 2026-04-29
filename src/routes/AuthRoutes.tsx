import { RouteObject } from "react-router-dom";
import { AuthPage } from "../pages/AuthPage";

export const authRoutes: RouteObject[] = [{
    path: "/login",
    children: [{ index: true, element: <AuthPage /> }]
}];
