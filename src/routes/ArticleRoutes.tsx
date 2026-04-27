import { RouteObject } from "react-router-dom";
import ListOfArticlePage from "../pages/ListOfArticlesPage";

export const articleRoutes: RouteObject[] = [
  {
    path: "/articles",
    children: [
      { index: true, element: <ListOfArticlePage /> },
      { path: "new", element: <ListOfArticlePage /> },
      { path: ":permalink/edit", element: <ListOfArticlePage /> },
    ],
  },
];
