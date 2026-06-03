import { Table } from "antd";
import { User } from "../../../types/User";
import { UserButtonCreateComponent } from "../components/UserButtonCreate.component";
import { useHomeAccountPage } from "./useHomeAccountPage";

export const HomeAccountPage: React.FC = () => {
  const { columns, users } = useHomeAccountPage();

  return (
    <>
      <div style={{ marginBottom: "16px", textAlign: "right" }}>
        <UserButtonCreateComponent />
      </div>
      <Table<User>
        style={{ width: "100%" }}
        rowKey="id"
        columns={columns}
        dataSource={users}
      />
    </>
  );
};
