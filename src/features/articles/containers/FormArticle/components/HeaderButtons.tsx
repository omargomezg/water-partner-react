import {
  CloseOutlined,
  CloudUploadOutlined,
  EyeOutlined,
  SaveOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Grid, Space } from "antd";
import { useNavigate } from "react-router-dom";
const { useBreakpoint } = Grid;

type Props = {
  onClickSaveDraft?: () => void;
  onClickRemoveDraft?: () => void;
  onClickPublish?: () => void;
  onClickPreview?: () => void;
  isValid: boolean;
};

export const HeaderButtons = ({
  onClickSaveDraft,
  onClickRemoveDraft,
  onClickPublish,
  onClickPreview,
  isValid,
}: Props) => {
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const items = [
    {
      label: "Guardar",
      key: "1",
      icon: <SaveOutlined />,
      onClick: onClickSaveDraft,
    },
    {
      label: "Eliminar cambios no publicados",
      key: "2",
      icon: <UserOutlined />,
      onClick: onClickRemoveDraft,
    },
    {
      label: "Vista previa",
      key: "3",
      icon: <EyeOutlined />,
      onClick: onClickPreview,
      //disabled: article?.status == STATES.PUBLISHED,
    },
  ];

  return (
    <Space
      style={{
        width: "100%",
        justifyContent: screens.xs ? "stretch" : "end",
        marginBottom: "16px",
      }}
      orientation={ screens.xs ? "vertical" : "horizontal"}
      wrap
    >
      <Dropdown.Button
        menu={{ items }}
        onClick={onClickPublish}
        type="primary"
        disabled={!isValid}
        htmlType={"button"}
      >
        <CloudUploadOutlined /> Publicar
      </Dropdown.Button>
      <Button
        block={screens.xs}
        type="default"
        onClick={() => navigate(`/articles`)}
        htmlType={"button"}
      >
        <CloseOutlined />
      </Button>
    </Space>
  );
};
