import { EditOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useNavigate } from "react-router";

type Props = {
    id?: string;
}
export const RowButtons: React.FC<Props> = ({id}) => {
    const navigate = useNavigate();
    const handleChange = async () => {
      navigate(`/configurations/sites/${id}/edit`);
    };
    return (
        <Space orientation="vertical">
            <Button type="link" onClick={handleChange}>
          <EditOutlined />
        </Button>
        </Space>
    );
}