import { Button, Flex, Form, InputNumber, Modal } from "antd";
import { FC, useEffect, useState } from "react";

type AddReadingComponentProps = {
  subscriptionId: string;
};

/**
 * Componente que permite agregar una lectura de agua a un servicio de APR.
 * * @param props - Propiedades del componente basadas en {@link AddReadingComponentProps}
 * @returns Componente con botón y modal para registrar lecturas
 */
export const AddReadingComponent: FC<AddReadingComponentProps> = ({
  subscriptionId,
}) => {
    const [form ] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    
  }, [subscriptionId]);

  const handleSave = async () => {};

  return (
    <>
      <Button type="dashed" onClick={() => setOpen(true)}>
        + Lectura
      </Button>
      <Modal
        open={open}
        onOk={handleSave}
        onCancel={() => setOpen(false)}
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
