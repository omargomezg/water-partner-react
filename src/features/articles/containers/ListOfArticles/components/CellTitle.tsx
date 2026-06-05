import { Col, Row, Tag, Typography } from "antd";
import React from "react";
import { RelatedTags } from "./RelatedTags";

const { Title, Paragraph } = Typography;

interface CellTitleProps {
  title: string;
  summary: string;
  image?: string;
  tags?: string[];
  category?: string;
}

export const CellTitle: React.FC<CellTitleProps> = ({
  title,
  summary,
  image,
  tags,
  category,
}) => {
  const imageUrl = image  ?  `${process.env.REACT_APP_API_URL}/file/image/${image}?width=200` :
     `${process.env.REACT_APP_API_URL}/img/Image-not-found.png`;
  return (
    <>
      <Row gutter={[16, 0]} align="middle">
        <Col xs={0} md={4}>
          <img
            src={imageUrl}
            alt={title}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "140px",
              objectFit: "cover",
            }}
          />
        </Col>
        <Col xs={24} md={20}>
          <Title level={5}>{title}</Title>
          <Paragraph
            ellipsis={{ rows: 3, expandable: true, symbol: "Ver más" }}
            style={{ margin: 0, color: "secondary" }}
          >
            {summary}
          </Paragraph>
          {category && <Tag>{category}</Tag>}
          {tags && <RelatedTags tags={tags} />}
        </Col>
      </Row>
    </>
  );
};
