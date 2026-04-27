import { createBrowserRouter } from "react-router-dom";
import ContentLayout from "../components/Layout/ContentLayout";
import { articleRoutes } from "./ArticleRoutes";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ContentLayout />,
        children: [
            ...articleRoutes,
        ]
    }
]);