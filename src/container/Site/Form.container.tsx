import { Select, Spin, Typography } from "antd";
import form from "antd/es/form";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Content } from "../../features/articles/containers/ListOfArticles/types/types";
import apiClient from "../../services/apiClient";

const { Title, Paragraph } = Typography;

export const FormSiteContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [site, setSite] = useState<any>();

  useEffect(() => {
    if (id) {
      fetchContent();
    }
  }, [id]);

  const fetchContent = async () => {
    setLoading(true);
    const { data } = await apiClient.get(`/api/sites/${id}`);
    console.log("Ël Data es ? ", data);
    setSite(data);
    //form.setFieldsValue(data);
    setLoading(false);
  };

  const onChageUrl = async (value: string) => {
    alert(value);
  };

  return (
    <Spin spinning={loading}>
      <Title>{site?.name}</Title>
      <Paragraph
        editable={{
          tooltip: "Editar url",
          onChange: onChageUrl,
          triggerType: ["icon", "text"],
        }}
      >
        {site?.url}
      </Paragraph>
      Plantilla del sitio público{" "}
      <Select style={{minWidth: "170px"}} value={site?.homeTemplate}
        options={[
          { value: "index", label: "Estandar" },
          { value: "index-classic", label: "Personalizado" },
        ]}
      ></Select>
    </Spin>
  );
};
