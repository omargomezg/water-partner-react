import { Button, Col, DatePicker, Form, Input, Row, Typography, message } from "antd";
import { FC, useEffect, useState } from "react";
import { Period } from "../../../types";
import { useParams, useNavigate } from "react-router-dom"; // Añadido useNavigate por si quieres redirigir
import apiClient from "../../../services/apiClient";
import dayjs from "dayjs";

const { Title } = Typography;
const { RangePicker } = DatePicker;

export const PeriodPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [saving, setSaving] = useState<boolean>(false);
  const [periodName, setPeriodName] = useState<string>("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await apiClient.get<Period>(`/api/periods/${id}`);
        setPeriodName(data.name);
        
        form.setFieldsValue({
          name: data.name,
          description: data.description,
          period: data.startDate && data.endDate 
            ? [dayjs(data.startDate), dayjs(data.endDate)] 
            : null
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

  // 🚀 Función para guardar los cambios
  const handleSave = async (values: any) => {
    try {
      setSaving(true);

      // Desestructuramos el array de fechas 'period'
      const [startDayjs, endDayjs] = values.period || [null, null];

      // Construimos el payload convirtiendo dayjs a timestamps numéricos (.valueOf())
      const payload: Partial<Period> = {
        name: values.name,
        description: values.description,
        startDate: startDayjs ? startDayjs.valueOf() : null,
        endDate: endDayjs ? endDayjs.valueOf() : null,
      };

      // Enviamos la actualización vía PUT a la API
      await apiClient.put(`/api/periods/${id}`, payload);
      
      message.success("Periodo actualizado con éxito");
      setPeriodName(values.name); // Actualiza el título de la página de inmediato
      
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
          {/* Asignamos la función handleSave al onFinish del Form */}
          <Form 
            layout="vertical" 
            form={form} 
            onFinish={handleSave}
          >
            <Form.Item 
              label="Nombre" 
              name="name" 
              rules={[{ required: true, message: "El nombre es obligatorio" }]}
            >
              <Input placeholder="Ej: 01 Enero 2026" />
            </Form.Item>

            <Form.Item label="Descripción" name="description">
              <Input.TextArea rows={3} placeholder="Descripción opcional del periodo" />
            </Form.Item>
            
            <Form.Item 
              name="period" 
              label="Rango de fechas"
              rules={[{ required: true, message: "El rango de fechas es obligatorio" }]}
            >
              <RangePicker 
                style={{ width: '100%' }}
                placeholder={['Inicio', 'Fin']}
                format="DD/MM/YYYY"
              />
            </Form.Item>

            <Form.Item style={{ marginTop: '24px' }}>
              <Row justify="end" gutter={8}>
                <Col>
                  <Button onClick={() => navigate(-1)}>
                    Cancelar
                  </Button>
                </Col>
                <Col>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={saving}
                  >
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