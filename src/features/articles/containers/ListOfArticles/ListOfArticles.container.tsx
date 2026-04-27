import {
  Table,
  TableProps
} from "antd";
import dayjs from "dayjs";
import { Content } from "../../../../container/Content/types/types";
import { CellTitle } from "./components/CellTitle";
import { RowButtons } from "./components/RowButtons";
import { useListOfArticles } from "./useListOfArticles";

const columns: TableProps<Content>["columns"] = [
  {
    title: "Titulo",
    dataIndex: "title",
    key: "title",
    render: (_: any, { title, summary, featureImage, tags, category }) =>
      CellTitle(title, summary, featureImage?.id, tags, category),
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

export const ListOfArticlesContainer = () => {
  const { handleTableChange, content, pagination } = useListOfArticles();

  return (
      <Table<Content>
        columns={columns}
        dataSource={content?.content}
        style={{ width: "100%" }}
        rowKey="id"
        pagination={pagination}
        onChange={handleTableChange}
      />
  );
};
