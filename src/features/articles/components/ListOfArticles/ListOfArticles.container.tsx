import { EditOutlined } from "@ant-design/icons";
import {
    Card,
    Col,
    Row,
    Space,
    Table,
    TablePaginationConfig,
    TableProps,
    Tag,
} from "antd";
import { Button } from "antd/es/radio";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Category, Content } from "../../../../container/Content/types/types";
import { ApiResponse } from "./types/types";

const columns: TableProps<Content>["columns"] = [
  {
    title: "Titulo",
    dataIndex: "title",
    key: "title",
    render: (_: any, { title, summary, featureImage, tags, category }) =>
      TitleContent(title, summary, featureImage.id, tags, category),
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

const TitleContent = (
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
        {tags && <ContentTags tags={tags} />}
      </Col>
    </Row>
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

export const ListOfArticlesContainer = () => {
  const { handleTableChange, content, pagination } = useListOfArticles();

  return (
    <Card>
      <Table<Content>
        columns={columns}
        dataSource={content?.content}
        style={{ width: "100%" }}
        rowKey="id"
        pagination={pagination}
        onChange={handleTableChange}
      />
    </Card>
  );
};

const useListOfArticles = () => {
  const [content, setContent] = useState<ApiResponse<Content>>();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
  }, []);

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

  type RowButtonsProps = {
    content: Content;
  };

  const RowButtons = ({ content }: RowButtonsProps) => {
    const navigate = useNavigate();
    const handleChange = async () => {
      navigate(`/content/${content.permalink}/edit`);
    };
    return (
      <Space>
        <Button type="link" onClick={handleChange}>
          <EditOutlined />
        </Button>
      </Space>
    );
  };

  const handleTableChange = (newPagination: TablePaginationConfig) => {
    if (pagination.pageSize !== newPagination.pageSize) {
      fetchData(Number(1), Number(newPagination.pageSize));
    } else {
      fetchData(Number(newPagination.current), Number(newPagination.pageSize));
    }
  };
  return { handleTableChange, content, pagination };
};
