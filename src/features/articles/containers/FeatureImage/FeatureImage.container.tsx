import { Button, Col, Flex, Form, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { FileUpload } from "./components/FileUpload";
import apiClient from "../../../../services/apiClient";
import { useParams } from "react-router-dom";

export const FeatureImageContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [file, setFile] = useState({
    img: "",
    alt: "",
    title: "",
  });

  const onChange = (img: string) => {
    setFile({ ...file, img });
  };

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    try{
    const image = await apiClient.get(`/api/auth/articles/${id}/feature-image`);
    setFile({...file, img: image.data.file});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Flex
        justify="end"
        gap="middle"
        style={{ paddingBottom: "10px", borderBottom: "2px solid #bdc6cc" }}
      >
        <FileUpload value={file.img} onChange={onChange} />
        <Button type={file.img ? "primary" : "default"}>Guardar</Button>
      </Flex>
      <Row gutter={16}>
        <Col span={12}>
          {file.img && (
            <img src={file.img} alt={file.alt} style={{ width: "100%" }} />
          )}
        </Col>
        <Col span={12}>
          <Form layout="vertical">
            <Form.Item label="Título" name="title">
              <Input value={file.title} />
            </Form.Item>
            <Form.Item label="Descripción" name="alt">
              <Input value={file.alt} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
