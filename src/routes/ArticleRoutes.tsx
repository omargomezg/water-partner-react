import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import FeatureImagePage from "../pages/FeatureImagePage";
import ListOfArticlePage from "../pages/ListOfArticlesPage";

const FormArticlePage = lazy(() =>
    import("../features/articles/pages/FormArticlePage").then((module) => ({
      default: module.FormArticlePage,
    })),
);

export const articleRoutes: RouteObject[] = [
  {
    path: "/articles",
    children: [
      { index: true, element: <ListOfArticlePage /> },
      { path: "new", element: <FormArticlePage /> },
      { path: ":id/edit", element: <FormArticlePage /> },
      { path: ":id/feature-image", element: <FeatureImagePage /> },
    ],
  },
];
