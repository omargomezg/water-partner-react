import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  SelectProps,
  Typography,
  message,
} from "antd";
import { FC, useEffect, useState } from "react";
import { Period, Site } from "../../../types";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../../services/apiClient";
import dayjs from "dayjs";

const { Title } = Typography;
const { RangePicker } = DatePicker;

export const PeriodPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [sites, setSites] = useState<SelectProps[]>();
  const [saving, setSaving] = useState<boolean>(false);
  const [periodName, setPeriodName] = useState<string>("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data: sitesData } = await apiClient.get<Site[]>("/api/sites");
        setSites(
          sitesData?.map((site) => ({ value: site.id, label: site.name })),
        );
        const { data } = await apiClient.get<Period>(`/api/periods/${id}`);
        setPeriodName(data.name);

        form.setFieldsValue({
          name: data.name,
          description: data.description,
          period:
            data.startDate && data.endDate
              ? [dayjs(data.startDate), dayjs(data.endDate)]
              : null,
          site: data.site
        });
      } catch (error) {
        console.error("Error al cargar el periodo:", error);
        message.error("No se pudo cargar la información del periodo");
      }
    };

    if (id) {
      fetch();
    }
  }, [id, form]);

  const handleSave = async (values: any) => {
    try {
      setSaving(true);

      const [startDayjs, endDayjs] = values.period || [null, null];

      const payload: Partial<Period> = {
        name: values.name,
        description: values.description,
        startDate: startDayjs ? startDayjs.valueOf() : null,
        endDate: endDayjs ? endDayjs.valueOf() : null,
        site: values.site,
      };

      await apiClient.put(`/api/periods/${id}`, payload);

      message.success("Periodo actualizado con éxito");
      navigate("/configurations/periods");
    } catch (error) {
      console.error("Error al guardar el periodo:", error);
      message.error("Error al intentar guardar los cambios");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Title level={2}>Periodo: {periodName || "Cargando..."}</Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={18} md={12}>
          <Form<Period> layout="vertical" form={form} onFinish={handleSave}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Nombre"
                  name="name"
                  rules={[
                    { required: true, message: "El nombre es obligatorio" },
                  ]}
                >
                  <Input placeholder="Ej: 01 Enero 2026" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Dominio principal"
                  name={["site", "id"]}
                  rules={[
                    {
                      required: true,
                      message: "Por favor seleccione un dominio",
                    },
                  ]}
                >
                  <Select options={sites} />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Descripción" name="description">
              <Input.TextArea
                rows={3}
                placeholder="Descripción opcional del periodo"
              />
            </Form.Item>

            <Form.Item
              name="period"
              label="Rango de fechas"
              rules={[
                {
                  required: true,
                  message: "El rango de fechas es obligatorio",
                },
              ]}
            >
              <RangePicker
                style={{ width: "100%" }}
                placeholder={["Inicio", "Fin"]}
                format="DD/MM/YYYY"
              />
            </Form.Item>

            <Form.Item style={{ marginTop: "24px" }}>
              <Row justify="end" gutter={8}>
                <Col>
                  <Button onClick={() => navigate(-1)}>Cancelar</Button>
                </Col>
                <Col>
                  <Button type="primary" htmlType="submit" loading={saving}>
                    Guardar Cambios
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
