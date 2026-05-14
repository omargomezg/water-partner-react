import { RouteObject } from "react-router-dom";
import { ListOfSitesContainer } from "../container/Site/List.container";
import { FormSiteContainer } from "../container/Site/FormSite.container";

export const siteRoutes: RouteObject[] = [
    {
        path: "/configurations/sites",
        children: [
            { index: true, element: <ListOfSitesContainer /> },
            { path: ":id", element: <FormSiteContainer /> },
            { path: ":id/edit", element: <FormSiteContainer /> }
        ],
    
    }
]