import { Typography } from "antd";
import { FC } from "react";
import "../App.css";
import { ListOfArticlesContainer } from "../features/articles/containers/ListOfArticles/ListOfArticles.container";

const { Title } = Typography;

const ListOfArticlePage: FC = () => {
  return (
    <>
      <Title level={2}>Artículos</Title>
      <ListOfArticlesContainer />
    </>
  );
};

export default ListOfArticlePage;
