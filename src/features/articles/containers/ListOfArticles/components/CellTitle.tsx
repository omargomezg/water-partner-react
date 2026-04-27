import { Col, Row, Tag } from "antd";
import { Category } from "../types/types";
import { RelatedTags } from "./RelatedTags";

export const CellTitle = (
  title: string,
  summary: string,
  imageUrl?: string | null,
  tags?: string[],
  category?: Category,
) => {
  return (
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
        <b>{title}</b>
        <p style={{ margin: 0, color: "#888" }}>{summary}</p>
        {category && <Tag>{category.name}</Tag>}
        {tags && <RelatedTags tags={tags} />}
      </Col>
    </Row>
  );
};