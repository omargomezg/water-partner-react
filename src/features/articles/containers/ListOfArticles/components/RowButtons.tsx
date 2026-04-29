import { useNavigate } from "react-router-dom";
import { Content } from "../types/types";
import { EditOutlined } from "@ant-design/icons";
import { Space, Button } from "antd";

  type Props = {
    content: Content;
  };

  export const RowButtons: React.FC<Props> = ({ content }) => {
    const navigate = useNavigate();
    const handleChange = async () => {
      navigate(`/articles/${content.id}/edit`);
    };
    return (
      <Space>
        <Button type="link" onClick={handleChange}>
          <EditOutlined />
        </Button>
      </Space>
    );
  };