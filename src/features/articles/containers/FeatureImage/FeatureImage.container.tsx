import { Button, Col, Flex, Form, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { FileUpload } from "./components/FileUpload";
import apiClient from "../../../../services/apiClient";
import { useNavigate, useParams } from "react-router-dom";

export const FeatureImageContainer: React.FC = () => {
  const { id: articleId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const BASE_URL = process.env.API_URL || "http://localhost:8080";
  const [imageId, setImageId] = useState<string | null>(null);
  const [file, setFile] = useState({
    img: "",
    alt: "",
    title: "",
  });

  const onChange = (img: string) => {
    setFile((prev) => ({ ...prev, img }));
  };

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    const response = await apiClient
      .get(`/api/feature-image/${articleId}`)
      .catch(() => null);
    if (!response?.data) return;
    const { data } = response;
    setFile({
      img: `${BASE_URL}/file/image/${data.id}`,
      alt: data.alt,
      title: data.title,
    });
    setImageId(data.id);
  };

  const handleSave = async () => {
    if (file.img) {
      await apiClient.post(`/api/feature-image/${articleId}`, {
        dataURI: file.img,
        alternativeText: form.getFieldValue("alt"),
        description: form.getFieldValue("title"),
      });
      navigate(`/articles/${articleId}/edit`);
    }
  };

  return (
    <>
      <Flex
        justify="end"
        gap="middle"
        style={{ paddingBottom: "10px", borderBottom: "2px solid #bdc6cc" }}
      >
        <Button
          type="link"
          onClick={() => navigate(`/articles/${articleId}/edit`)}
        >
          Cancelar
        </Button>
        {!imageId ? (
          <Button type={file.img ? "primary" : "default"} onClick={handleSave}>
            Guardar
          </Button>
        ) : (
          <Button type={file.img ? "primary" : "default"} onClick={handleSave}>
            Actualizar
          </Button>
        )}
      </Flex>
      <Row gutter={16}>
        <Col span={12}>
          {file.img && (
            <img src={file.img} alt={file.alt} style={{ width: "100%" }} />
          )}
          <FileUpload value={file.img} onChange={onChange} />
        </Col>
        <Col span={12}>
          <Form layout="vertical" form={form}>
            <Form.Item label="Texto alternativo" name="alt">
              <Input value={file.title} />
            </Form.Item>
            <Form.Item label="Texto descriptivo" name="title">
              <Input value={file.alt} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
