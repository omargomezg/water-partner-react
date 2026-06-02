import { Button, Flex, Form, InputNumber, Modal } from "antd";
import { FC, useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { Lecture } from "../types/Lectures";
import { PageResponse } from "../types";

type AddReadingComponentProps = {
  subscriptionId: string;
  periodId?: number;
};

/**
 * Componente que permite agregar una lectura de agua a un servicio de APR.
 * * @param props - Propiedades del componente basadas en {@link AddReadingComponentProps}
 * @returns Componente con botón y modal para registrar lecturas
 */
export const AddReadingComponent: FC<AddReadingComponentProps> = ({
  subscriptionId,
  periodId,
}) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false);

  const onFinish = async () => {
    try {
      const currentValue = form.getFieldValue("currentValue");
      const response = await apiClient.post(`/api/subscriptions/${subscriptionId}/lectures`, {
        value: currentValue,
        period: {
          id: periodId
        }
      });
    } catch (error) {
      const amessage = (error as Error).message;
      console.error(amessage);
    }
  };

  const handleOpen = async () => {
    try {
      const { data } = await apiClient.get<PageResponse<Lecture>>(
        `/api/subscriptions/${subscriptionId}/lectures`,
      );
      console.log(data);
      form.setFieldValue(
        "previousValue",
        data.content.length > 0 ? data.content[0].value : 0,
      );
      setOpen(true);
    } catch (error) {
      const amessage = (error as Error).message;
      console.error(amessage);
    }
  };

  return (
    <>
      <Button type="dashed" onClick={handleOpen}>
        + Lectura
      </Button>
      <Modal
        open={open}
        okText="Registrar"
        cancelText="Cancelar"
        onOk={() => form.submit()}
        onCancel={() => setOpen(false)}
      >
        <p style={{ paddingBottom: "10px" }}>
          Por favor, digite los números actuales que muestra el medidor.
          Recuerde que el valor actual debe ser igual o superior a la última
          lectura registrada para calcular correctamente el consumo del mes.
        </p>
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Flex gap="middle" style={{ width: "100%" }}>
            <Form.Item
              label="Lectura anterior"
              name="previousValue"
              style={{ flex: 1 }}
            >
              <InputNumber
                readOnly
                style={{ width: "100%" }}
                styles={{ input: { textAlign: "right", paddingRight: "15px" } }}
              />
            </Form.Item>
            <Form.Item
              label="Lectura actual"
              name="currentValue"
              style={{ flex: 1 }}
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const previousValue = getFieldValue("previousValue") || 0;

                    if (value === undefined || value === null || value === "") {
                      return Promise.resolve();
                    }
                    if (value >= previousValue) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        `La lectura actual debe ser mayor o igual a la anterior (${previousValue})`,
                      ),
                    );
                  },
                }),
              ]}
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
