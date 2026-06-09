import { Button, Form, Input, Modal } from "antd";
import { FC, useState } from "react";
import { Client } from "../../../types";
import RutInput from "../../../components/RutInput";
import apiClient from "../../../services/apiClient";

type AddUserComponentProps = {
  subscriptionId: string;
  refresh: (users: Client[]) => void;
};

export const AddUserComponent: FC<AddUserComponentProps> = ({
  subscriptionId,
  refresh,
}) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false);
  const handleSave = async (values: Client) => {
    values.alias = values.email;
    const { data } = await apiClient.post<Client[]>(
      `/api/subscriptions/${subscriptionId}/users`,
      values,
    );
    refresh(data);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setOpen(false);
    form.resetFields();
  };
  return (
    <>
      <Button type="dashed" onClick={() => setOpen(true)}>
        Añadir usuario
      </Button>
      <Modal
        title="Agregar usuario"
        open={open}
        onCancel={handleCloseModal}
        onOk={form.submit}
      >
        <p>
          Solo necesitamos estos datos, eventualmente el usuario podría agregar
          otros.
        </p>
        <Form<Client> layout="vertical" form={form} onFinish={handleSave}>
          <Form.Item label="Rut" name="rut" rules={[{ required: true }]}>
            <RutInput />
          </Form.Item>
          <Form.Item
            label="Nombre"
            name="fullName"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Correo electrónico"
            name="email"
            rules={[
              { required: true },
              {
                type: "email",
                message: "Introduce una dirección de correo electrónico válida",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
