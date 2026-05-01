import { createBrowserRouter } from "react-router-dom";
import ContentLayout from "../components/Layout/ContentLayout";
import { articleRoutes } from "./ArticleRoutes";
import LoginContainer from "../features/auth/Login.container";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ContentLayout />,
        children: [
            ...articleRoutes,
        ]
    },
        {path: "/login", element: <LoginContainer />}
]);