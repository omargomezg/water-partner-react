import { Button, Drawer, Flex, Form, Input, message } from "antd";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../services/apiClient";

export const CreateSiteComponent: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState<boolean>(false);

  const handleClose = () => {
    setOpenForm(false);
  };

  const onFinish = async (values: any) => {
    try {
      const { data } = await apiClient.post("/api/sites", values);

      navigate(`/configurations/sites/${data.id}/edit`);
    } catch (error) {
      const tError = (error as Error).message;
      message.error(tError);
    }
    handleClose();
  };

  return (
    <>
      <Button type="dashed" onClick={() => setOpenForm(true)}>
        + Nuevo
      </Button>
      <Drawer
        open={openForm}
        onClose={handleClose}
        title="Vamos a crear un sitio!"
        footer={
          <Flex gap="medium" justify="flex-end">
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={form.submit} type="primary">
              Guardar
            </Button>
          </Flex>
        }
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item label="Nombre" name="name" rules={[{ required: true }]}>
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Descripción"
            name="description"
            rules={[{ required: true }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="URL"
            name="url"
            rules={[
              {
                required: true,
              },
              {
                type: "url",
                warningOnly: true,
              },
              {
                type: "string",
                min: 6,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Url del Favicon"
            name="favicon"
            rules={[{ required: true }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Url del Logo"
            name="logo"
            rules={[{ required: true }]}
          >
            <Input></Input>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
