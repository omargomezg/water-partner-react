import { Button, Form, Input, message, Modal } from "antd";
import { FC, useState } from "react";
import apiClient from "../../../../../services/apiClient";
import { DoubleRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Content } from "../type/type";
import { Permalink } from "./Permalink";
import axios from "axios";

export const AddArticleComponent: FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [isDraft, setIsDraft] = useState(true);

  const watchedTitle = Form.useWatch("title", form);
  const watchedPermalink = Form.useWatch("permalink", form);

  const handleChangeTitle = (title: string) => {
    const permalink = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .trim();

    form.setFieldValue("permalink", permalink);
  };

  const onFinish = async (values: Content) => {
    const payload = {
      ...values,
      status: isDraft ? "DRAFT" : "PUBLISHED",
    };

    try {
      const { data } = await apiClient.post<Content>(
        "/api/auth/articles",
        payload,
      );
      navigate(`/articles/${data.id}/edit`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        message.error(err.response?.data.message);
      }
    } finally {
      form.resetFields();
    }
  };

  return (
    <>
      <Button type="dashed" onClick={() => setOpen(true)}>
        Nuevo borrador
      </Button>

      <Modal
        open={open}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
        title="Crear nuevo contenido"
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="cancel" type="link" onClick={() => setOpen(false)}>
            Cancelar
          </Button>,
          <Button
            key="draft"
            type="primary"
            onClick={() => {
              setIsDraft(true);
              form.submit();
            }}
          >
            Continuar
            <DoubleRightOutlined />
          </Button>,
        ]}
      >
        <Form<Content>
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ marginTop: "20px" }}
        >
          <Form.Item
            name="title"
            label="Título"
            rules={[{ required: true, message: "Por favor ingresa un título" }]}
            extra={
              <Permalink permalink={watchedPermalink} title={watchedTitle} />
            }
          >
            <Input
              onChange={(e) => handleChangeTitle(e.target.value)}
              placeholder="Ej. Próximo evento en la zona..."
            />
          </Form.Item>
          <Form.Item name="permalink" hidden>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
