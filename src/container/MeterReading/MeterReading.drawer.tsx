import { Button, Drawer, Space, Form, InputNumber, Typography, message, List } from "antd";
import { useAppStore } from "../../store/useAppStore";
import { useEffect } from "react";
import dayjs from "dayjs";

const MeterReadingDrawer = () => {
    const openForm = useAppStore(state => state.openFormConsumption);
    const setOpenForm = useAppStore(state => state.setOpenFormConsumption);
    const currentRecord = useAppStore(state => state.currentRecord);
    const createReading = useAppStore(state => state.createReading);
    const history = useAppStore(state => state.history);
    const fetchHistory = useAppStore(state => state.fetchHistory);
    const [form] = Form.useForm();

    useEffect(() => {
        if (openForm && currentRecord) {
            form.setFieldsValue({ reading: currentRecord.reading });
            fetchHistory(currentRecord.id);
        } else {
            form.resetFields();
        }
    }, [openForm, currentRecord, form, fetchHistory]);

    const onFinish = async (values: any) => {
        if (!currentRecord) return;
        const response = await createReading(currentRecord.id, values.reading);
        if (response.success) {
            message.success("Lectura guardada correctamente");
            setOpenForm(false);
            form.resetFields();
        } else {
            message.error("Error al guardar lectura: " + response.message);
        }
    }

    // Determine previous reading for reference.
    // logic: find most recent reading > 0.
    // If currentRecord has a reading > 0, it might be the top one in history.
    // We want the "previous" one relative to the one we are entering.
    // If we are entering a new one (current is null/0), then top of history (if >0) is previous.
    // If we are editing (current > 0), then top of history is current. Next is previous.

    let previousReading = null;
    // Filter history for readings > 0
    const validHistory = history.filter(h => h.reading > 0);

    if (validHistory.length > 0) {
        // If we are editing (currentRecord has a reading) AND the latest history likely matches it (same value),
        // we assume the latest history IS the current reading we are editing.
        // So we show the NEXT one as "Previous".
        // Note: This is heuristic. If the previous reading happens to have the EXACT SAME value, this might skip it.
        // But for water meters, readings usually increase.
        if (currentRecord?.reading && currentRecord.reading > 0 && validHistory[0].reading === currentRecord.reading) {
            previousReading = validHistory[1] || null;
        } else {
            previousReading = validHistory[0];
        }
    }

    return (
        <Drawer
            title="Ingreso de lectura"
            width={500}
            onClose={() => setOpenForm(false)}
            open={openForm}
            extra={
                <Space>
                    <Button onClick={() => setOpenForm(false)}>Cancelar</Button>
                    <Button onClick={form.submit} type="primary">
                        Guardar
                    </Button>
                </Space>
            }
        >
            <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item label="Cliente" style={{ marginBottom: 8 }}>
                    <Typography.Text strong>{currentRecord?.client}</Typography.Text>
                </Form.Item>
                <Form.Item label="Medidor" style={{ marginBottom: 24 }}>
                    <Typography.Text>{currentRecord?.serial}</Typography.Text>
                </Form.Item>

                <div style={{ background: '#f5f5f5', padding: 12, borderRadius: 8, marginBottom: 24 }}>
                    <Typography.Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>Última lectura registrada:</Typography.Text>
                    {previousReading ? (
                        <Space>
                            <Typography.Title level={4} style={{ margin: 0 }}>{previousReading.reading} m³</Typography.Title>
                            <Typography.Text type="secondary">({dayjs(previousReading.readingDate).format('DD/MM/YYYY')})</Typography.Text>
                        </Space>
                    ) : (
                        <Typography.Text italic>No hay registros anteriores</Typography.Text>
                    )}
                </div>

                <Form.Item
                    name="reading"
                    label="Nueva Lectura"
                    rules={[{ required: true, message: 'Ingrese la lectura' }]}
                >
                    <InputNumber style={{ width: '100%' }} min={0} placeholder="Ingrese valor en m3" size="large" />
                </Form.Item>
            </Form>
        </Drawer>
    );
};

export default MeterReadingDrawer;