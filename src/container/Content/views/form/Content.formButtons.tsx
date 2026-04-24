import { CloudUploadOutlined, CloseOutlined, EyeOutlined, SaveOutlined, UserOutlined } from "@ant-design/icons";
import { Space, Dropdown, Button, Grid } from "antd";
import useContentFormStore from "../../store/useContentFormStore";
import { Content } from "../../types/types";
import { useNavigate } from "react-router";
const { useBreakpoint } = Grid;

type ContentFormButtonsProps = {
  onClickSaveDraft?: () => void;
  onClickRemoveDraft?: () => void;
  onClickPublish?: () => void;
  onClickPreview?: () => void;
  isValid: boolean;
};


export const ContentFormButtons = ({
  onClickSaveDraft,
  onClickRemoveDraft,
  onClickPublish,
  onClickPreview,
  isValid
}: ContentFormButtonsProps) => {
    const navigate = useNavigate();
  const screens = useBreakpoint();
  const setContent = useContentFormStore((state) => state.setContent);
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

  const onClickClose = () => {
    navigate(`/content`);
    setContent({} as Content, false);
  }

  return (
    <Space
      style={{
        width: "100%",
        justifyContent: screens.xs ? "stretch" : "end",
        marginBottom: "16px",
      }}
      direction={screens.xs ? "vertical" : "horizontal"}
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
        onClick={onClickClose}
        htmlType={"button"}
      >
        <CloseOutlined />
      </Button>
    </Space>
  );
};
