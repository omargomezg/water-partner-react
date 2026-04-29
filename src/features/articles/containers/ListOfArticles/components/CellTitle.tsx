import { Col, Row, Tag, Typography } from "antd";
import React from "react";
import { RelatedTags } from "./RelatedTags";

const { Title, Paragraph } = Typography;

interface CellTitleProps {
  title: string;
  summary: string;
  imageId?: string | null;
  tags?: string[];
  category?: string;
}

export const CellTitle: React.FC<CellTitleProps> = ({
  title,
  summary,
  imageId,
  tags,
  category,
}) => {
  return (
    <>
      <Row gutter={[16, 0]} align="middle">
        {imageId && (
          <Col xs={0} md={4}>
            {imageId && (
              <img
                src={`http://localhost:8080/file/image/${imageId}?width=200`}
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
        <Col xs={24} md={imageId ? 20 : 24}>
          <Title level={5}>
            {title}
          </Title>
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
