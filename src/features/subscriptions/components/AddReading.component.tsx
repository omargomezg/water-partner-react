import { Button, Flex, Form, Input, InputNumber, Modal } from "antd";
import { FC, useState } from "react";

type AddReadingComponentProps = {
  subscriptionId: string;
};

export const AddReadingComponent: FC<AddReadingComponentProps> = ({
  subscriptionId,
}) => {
    const [form ] = Form.useForm();
  const [openForm, setOpenForm] = useState<boolean>(false);
  const handleSave = async () => {};

  return (
    <>
      <Button type="dashed" onClick={() => setOpenForm(true)}>
        + Lectura
      </Button>
      <Modal
        open={openForm}
        onOk={handleSave}
        onCancel={() => setOpenForm(false)}
      >
        <p style={{ paddingBottom: "10px" }}>
          Por favor, digite los números actuales que muestra el medidor.
          Recuerde que el valor actual debe ser igual o superior a la última
          lectura registrada para calcular correctamente el consumo del mes.
        </p>
        <Form layout="vertical" form={form}>
          <Flex gap="middle" style={{ width: "100%" }}>
            <Form.Item label="Lectura anterior" style={{ flex: 1 }}>
              <InputNumber
                style={{ width: "100%" }}
                styles={{ input: { textAlign: "right", paddingRight: "15px" } }}
              />
            </Form.Item>
            <Form.Item
              label="Lectura actual"
              style={{ flex: 1 }}
              rules={[{ required: true }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                styles={{ input: { textAlign: "right", paddingRight: "15px" } }}
              />
            </Form.Item>
          </Flex>
        </Form>
      </Modal>
    </>
  );
};
