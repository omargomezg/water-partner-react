import { createBrowserRouter } from "react-router-dom";
import ContentLayout from "../components/Layout/ContentLayout";
import { articleRoutes } from "./ArticleRoutes";
import LoginContainer from "../features/auth/Login.container";
import { configurationRoutes } from "./ConfigurationRoutes";
import { reportRoutes } from "./ReportRoutes";
import { clientRoutes } from "./ClientRoutes";
import { meterReadingRoutes } from "./MeterReadingRoutes";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ContentLayout />,
        children: [
            ...articleRoutes,
            ...configurationRoutes,
            ...reportRoutes,
            ...clientRoutes,
            ...meterReadingRoutes,
        ]
    },
        {path: "/login", element: <LoginContainer />}
]);