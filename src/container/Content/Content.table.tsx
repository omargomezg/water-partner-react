import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Row,
  Space,
  Table,
  TablePaginationConfig,
  TableProps,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import useContentFormStore from "./store/ContentFormStore";
import { ApiResponse, Category, Content } from "./types/types";

const columns: TableProps<Content>["columns"] = [
  {
    title: "Titulo",
    dataIndex: "title",
    key: "title",
    render: (_: any, { title, summary, featureImage, tags, category }) =>
    { 
      const imageUrl = featureImage ? featureImage.id : null;  
      return TitleContent(title, summary, imageUrl, tags, category);
    }
  },
  {
    title: "Última actualización",
    key: "updatedAt",
    dataIndex: "updatedAt",
    render: (dateString) => {
      return dayjs(dateString).format("MMMM DD, YYYY");
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_, record: Content) => <RowButtons content={record} />,
  },
];

type ContentTableProps = {
  onSelect: (content: Content) => void;
};

const ContentTable = ({ onSelect }: ContentTableProps) => {
  const [content, setContent] = useState<ApiResponse<Content>>();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchData = async (page: number = 0, pageSize: number = 10) => {
    try {
      const response = await fetch(
        `http://localhost:8080/article?page=${page - 1}&size=${pageSize}`,
      );
      const data: ApiResponse<Content> = await response.json();
      setContent(data);
      setPagination({
        ...pagination,
        current: page,
        pageSize: pageSize,
        total: data.totalElements,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
  }, []);

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    if (pagination.pageSize !== newPagination.pageSize) {
      fetchData(Number(1), Number(newPagination.pageSize));
    } else {
      fetchData(Number(newPagination.current), Number(newPagination.pageSize));
    }
  };

  return (
    <>
      <Table<Content>
        columns={columns}
        dataSource={content?.content}
        style={{ width: "100%" }}
        rowKey="id"
        pagination={pagination}
        onChange={handleTableChange}
      />
    </>
  );
};

type RowButtonsProps = {
  content: Content;
};

const RowButtons = ({ content }: RowButtonsProps) => {
  const setContent = useContentFormStore((state) => state.setContent);
  return (
    <Space>
      <Button type="link" onClick={() => setContent(content, true)}>
        <EditOutlined />
      </Button>
    </Space>
  );
};

const ContentTags = ({ tags }: { tags: string[] }) => {
  return (
    <>
      {tags.map((tag) => (
        <span
          key={tag}
          style={{
            backgroundColor: "#e0e0e0",
            borderRadius: "4px",
            padding: "2px 6px",
            marginRight: "4px",
            fontSize: "10px",
            display: "inline-block",
          }}
        >
          {tag}
        </span>
      ))}
    </>
  );
};

const TitleContent = (
  title: string,
  summary: string,
  imageUrl?: string | null,
  tags?: string[],
  category?: Category
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
        {category && (
          <span
            style={{
              backgroundColor: "#d0e0ff",
              borderRadius: "4px",
              padding: "2px 6px",
              marginRight: "4px",
              fontSize: "10px",
              display: "inline-block",
            }}
          >
            {category.name}
          </span>
        )}
        {tags && <ContentTags tags={tags} />}
      </Col>
    </Row>
  );
};

export default ContentTable;
