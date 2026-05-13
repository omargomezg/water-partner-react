import { createBrowserRouter } from "react-router-dom";
import ContentLayout from "../components/Layout/ContentLayout";
import { articleRoutes } from "./ArticleRoutes";
import LoginContainer from "../features/auth/Login.container";
import { configurationRoutes } from "./ConfigurationRoutes";
import { reportRoutes } from "./ReportRoutes";
import { clientRoutes } from "./ClientRoutes";
import { meterReadingRoutes } from "./MeterReadingRoutes";
import { siteRoutes } from "./SiteRoutes";

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
            ...siteRoutes,
        ]
    },
        {path: "/login", element: <LoginContainer />}
]);