import { RouteObject } from "react-router-dom";
import ListOfArticlePage from "../pages/ListOfArticlesPage";
import { FormArticleContainer } from "../features/articles/containers/FormArticle/FormArticle.container";

export const articleRoutes: RouteObject[] = [
  {
    path: "/articles",
    children: [
      { index: true, element: <ListOfArticlePage /> },
      { path: "new", element: <FormArticleContainer /> },
      { path: ":id/edit", element: <FormArticleContainer /> },
    ],
  },
];
