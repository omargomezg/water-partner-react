import { useNavigate } from "react-router-dom";
import { Content } from "../types/types";
import { EditOutlined } from "@ant-design/icons";
import { Space, Button } from "antd";

  type RowButtonsProps = {
    content: Content;
  };

  export const RowButtons = ({ content }: RowButtonsProps) => {
    const navigate = useNavigate();
    const handleChange = async () => {
      navigate(`/articles/${content.permalink}/edit`);
    };
    return (
      <Space>
        <Button type="link" onClick={handleChange}>
          <EditOutlined />
        </Button>
      </Space>
    );
  };