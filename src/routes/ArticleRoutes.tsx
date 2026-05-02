import { RouteObject } from "react-router-dom";
import ListOfArticlePage from "../pages/ListOfArticlesPage";
import { FormArticleContainer } from "../features/articles/containers/FormArticle/FormArticle.container";
import FeatureImagePage from "../pages/FeatureImagePage";

export const articleRoutes: RouteObject[] = [
  {
    path: "/articles",
    children: [
      { index: true, element: <ListOfArticlePage /> },
      { path: "new", element: <FormArticleContainer /> },
      { path: ":id/edit", element: <FormArticleContainer /> },
      { path: ":id/feature-image", element: <FeatureImagePage /> },
    ],
  },
];
