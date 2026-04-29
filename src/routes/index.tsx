import { createBrowserRouter } from "react-router-dom";
import ContentLayout from "../components/Layout/ContentLayout";
import { articleRoutes } from "./ArticleRoutes";
import { authRoutes } from "./AuthRoutes";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ContentLayout />,
        children: [
            ...articleRoutes,
            ...authRoutes,
        ]
    }
]);