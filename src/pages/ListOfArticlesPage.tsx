import { Card, Typography } from "antd";
import { FC } from "react";
import "../App.css";
import { ListOfArticlesContainer } from "../features/articles/components/ListOfArticles/ListOfArticles.container";

const { Title } = Typography;

const ListOfArticlePage: FC = () => {
  return (
    <Card>
      <Title level={2}>Artículos</Title>
      <ListOfArticlesContainer />
    </Card>
  );
};

export default ListOfArticlePage;
