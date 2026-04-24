import { Button, Card, Space } from "antd";
import ContentFilter from "./Content.filter";
import ContentTable from "./Table/Content.table";
import MeterDrawer from "../meter/Meter.drawer";
import { PlusOutlined } from "@ant-design/icons";
import { Content } from "./types/types";

type Props = {
  onSelect: (content: Content) => void;
};

const ContentShowData = ({ onSelect }: Props) => {
  const setOpenForm = () => {
    onSelect({} as Content);
  };

  return (
    <>
      <Card style={{ marginBottom: "10px" }}>
        <Space align="end" size="large">
          <ContentFilter />
        </Space>
      </Card>
      <Card
        title="Contenidos"
        extra={
          <Button type={"primary"} onClick={setOpenForm}>
            <PlusOutlined />
            Crear
          </Button>
        }
      >
        <ContentTable onSelect={onSelect} />
      </Card>
      <MeterDrawer></MeterDrawer>
    </>
  );
};

export default ContentShowData;
