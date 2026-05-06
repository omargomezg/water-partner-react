import {
  CloseOutlined,
  CloudUploadOutlined,
  DownOutlined,
  EyeOutlined,
  SaveOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Grid, MenuProps, Space } from "antd";
import { useNavigate } from "react-router-dom";
const { useBreakpoint } = Grid;

type Props = {
  isDraft: boolean;
  onClickSaveDraft?: () => void;
  onClickRemoveDraft?: () => void;
  onClickPublish?: () => void;
  onClickPreview?: () => void;
};

export const HeaderButtons: React.FC<Props> = ({
  isDraft,
  onClickSaveDraft,
  onClickRemoveDraft,
  onClickPublish,
  onClickPreview,
}) => {
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const items: MenuProps["items"] = [
    {
      label: "Guardar borrador",
      key: "1",
      icon: <SaveOutlined />,
      onClick: onClickSaveDraft,
    },
    {
      label: "Eliminar cambios no publicados",
      key: "2",
      icon: <UserOutlined />,
      onClick: onClickRemoveDraft,
      disabled: !isDraft,
    },
    {
      label: "Vista previa",
      key: "3",
      icon: <EyeOutlined />,
      onClick: onClickPreview,
      //disabled: article?.status == STATES.PUBLISHED,
    },
    {
      label: "Configurar",
      key: "4",
      icon: <SettingOutlined />,
    },
  ];

  return (
    <Space
      style={{
        width: "100%",
        justifyContent: screens.xs ? "stretch" : "end",
        marginBottom: "16px",
      }}
      orientation={"horizontal"}
    >
      <Space.Compact>
        <Button icon={<CloudUploadOutlined />} type="primary" onClick={onClickPublish}>Publicar</Button>
        <Dropdown menu={{ items }}>
          <Button icon={<DownOutlined />} />
        </Dropdown>
      </Space.Compact>
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
