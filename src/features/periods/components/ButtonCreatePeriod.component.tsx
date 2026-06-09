import { Button, DatePicker, Drawer, Form, Input, Space } from "antd";
import { FC, useState } from "react";
import apiClient from "../../../services/apiClient";
import { Period } from "../../../types";

const { RangePicker } = DatePicker;

type ButtonCreatePeriodComponentProps = {
    onCreate?: (period: Period) => void;
}

export const ButtonCreatePeriodComponent: FC<ButtonCreatePeriodComponentProps> = ({ onCreate: onChange }) => {
  const [open, setOpen] = useState(false);
  const [dates, setDates] = useState<{ start: Date; end: Date } | null>(null);
  const onFinish = async (values: Period) => {
    //const [start, end] = values.period;
    //const startDate = start.format("YYYY-MM-DD");
    //const endDate = end.format("YYYY-MM-DD");
    values.startDate = dates?.start.toISOString() || "";
    values.endDate = dates?.end.toISOString() || "";

    try {
      const { data } = await apiClient.post("/api/periods", values);
      onChange && onChange(data);
    } finally {
      setOpen(false);
    }
  };

  const handleChangePeriod = (dates: any, dateStrings: any) => {
    // Aquí puedes manejar los cambios en el rango de fechas si es necesario
    console.log("dates:", dates);
    console.log("dateStrings:", dateStrings);
    setDates({ start: dates[0].toDate(), end: dates[1].toDate() });
  }

  return (
    <>
      <Button type="dashed" onClick={() => setOpen(true)}>
        + Period
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Form<Period> layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Descripción">
            <Input />
          </Form.Item>
          <Form.Item label="Rango de fechas">
            <RangePicker
              style={{ width: "100%" }}
              placeholder={["Inicio", "Fin"]}
              format="DD/MM/YYYY"
              onChange={handleChangePeriod}
            />
          </Form.Item>
          <Space style={{ float: "right" }}>
            <Button type="default" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="primary" htmlType="submit">
              Guardar
            </Button>
          </Space>
        </Form>
      </Drawer>
    </>
  );
};
