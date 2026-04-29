import {
  Table,
  TableProps,
  Breakpoint
} from "antd";
import dayjs from "dayjs";
import { CellTitle } from "./components/CellTitle";
import { RowButtons } from "./components/RowButtons";
import { useListOfArticles } from "./useListOfArticles";
import { Content } from "./types/types";

const columns: TableProps<Content>["columns"] = [
  {
    title: "Titulo",
    dataIndex: "title",
    key: "title",
    render: (_: any, { title, summary, imageId, tags, category }) =>
      <CellTitle 
        title={title} 
        summary={summary} 
        imageId={imageId} 
        tags={tags} 
        category={category} 
      />,
  },
  {
    title: "Última actualización",
    key: "updatedAt",
    dataIndex: "updatedAt",
    responsive: ["md"] as Breakpoint[],
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

export const ListOfArticlesContainer = () => {
  const { handleTableChange, content, pagination, loading } = useListOfArticles();

  return (
      <Table<Content>
        columns={columns}
        dataSource={content?.content}
        style={{ width: "100%" }}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />
  );
};
