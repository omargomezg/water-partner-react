import { Button, Col, Flex, Form, Input, Row, Space } from "antd";
import { useState } from "react";
import { FileUpload } from "./components/FileUpload";

export const FeatureImageContainer: React.FC = () => {
  const [file, setFile] = useState({
    img: "",
    alt: "",
    title: "",
  });

  const onChange = (img: string) => {
    setFile({ ...file, img });
  };

  return (
    <>
      <Flex justify="end" gap="middle">
        <FileUpload value={file.img} onChange={onChange} />
        <Button>Guardar</Button>
      </Flex>
      <Row gutter={16}>
        <Col span={12}>
          {file.img && (
            <img src={file.img} alt={file.alt} style={{ width: "100%" }} />
          )}
        </Col>
        <Col span={12}>
          <Form layout="vertical">
            <Form.Item label="Título">
              <Input />
            </Form.Item>
            <Form.Item label="Descripción">
              <Input />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
