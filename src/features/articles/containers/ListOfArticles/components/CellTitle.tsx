import { Col, Row, Tag, Typography } from "antd";
import React from "react";
import { Category } from "../types/types";
import { RelatedTags } from "./RelatedTags";

const { Title, Paragraph } = Typography;

interface CellTitleProps {
  title: string;
  summary: string;
  imageUrl?: string | null;
  tags?: string[];
  category?: Category;
}

export const CellTitle: React.FC<CellTitleProps> = ({
  title,
  summary,
  imageUrl,
  tags,
  category,
}) => {
  return (
    <>
      <Row gutter={[16, 0]} align="middle">
        {imageUrl && (
          <Col xs={0} md={4}>
            {imageUrl && (
              <img
                src={`http://localhost:8080/file/image/${imageUrl}?width=200`}
                alt={title}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "140px",
                  objectFit: "cover",
                }}
              />
            )}
          </Col>
        )}
        <Col xs={24} md={imageUrl ? 20 : 24}>
          <Title level={5}>
            {title}
          </Title>
          <Paragraph
            ellipsis={{ rows: 3, expandable: true, symbol: "Ver más" }}
            style={{ margin: 0, color: "secondary" }}
          >
            {summary}
          </Paragraph>
          {category && <Tag>{category.name}</Tag>}
          {tags && <RelatedTags tags={tags} />}
        </Col>
      </Row>
    </>
  );
};
