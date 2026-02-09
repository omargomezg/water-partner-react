import ContentLayout from "../components/Layout/ContentLayout";
import { Button, Card, Form, Input, Select, Space, Table, TableProps, Typography, Popconfirm, message } from "antd";
import { FileExcelOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useAppStore } from "../store/useAppStore";
import MeterReadingDrawer from "../container/MeterReading/MeterReading.drawer";
import CheckAuthentication from "../components/CheckAuthentication";
import DiameterText from "../components/DiameterText";
import { useEffect } from "react";
import { ReadingRecord } from "../types/ReadingRecord";

const MeterReadingPage = () => {
    const fetchPeriods = useAppStore((state) => state.fetchPeriods);
    const periods = useAppStore((state) => state.periods);
    const closePeriod = useAppStore((state) => state.closePeriod);

    // Consumption Store
    const fetchReadingRecords = useAppStore((state) => state.fetchReadingRecords);
    const readingRecords = useAppStore((state) => state.readingRecords);
    const loadingConsumption = useAppStore((state) => state.loadingConsumption);
    const setOpenFormConsumption = useAppStore((state) => state.setOpenFormConsumption);

    // Filters
    const [form] = Form.useForm();

    useEffect(() => {
        fetchPeriods();
        fetchReadingRecords(); // Default fetch (status=2/Pending maybe? no, fetchReadingRecords defaults to status=2)
    }, [fetchPeriods, fetchReadingRecords]);

    const activePeriod = periods?.content.find(p => p.status === 'ACTIVE');

    const handleClosePeriod = async () => {
        if (activePeriod) {
            const response = await closePeriod(activePeriod);
            if (response.success) {
                message.success("Periodo cerrado correctamente");
            } else {
                message.error("Error al cerrar periodo: " + response.message);
            }
        }
    }

    const onFilter = (values: any) => {
        // Implement filtering logic passing values to fetchReadingRecords
        // We need to map form values to backend params
        // backend params: waterMeterNumber, dni, sector, status, pageIndex, pageSize
        const filters = {
            waterMeterNumber: values.medidor,
            dni: values.rut,
            sector: values.sector,
            status: values.status,
            // period is not used in backend filter?
        };
        fetchReadingRecords(values.status, 0, 100); // simplify for now
    }

    const columns: TableProps<ReadingRecord>['columns'] = [
        {
            title: 'Medidor',
            dataIndex: 'serial',
            key: 'serial'
        },
        {
            title: 'Cliente',
            dataIndex: 'client',
            key: 'client',
        },
        {
            title: 'Diametro',
            dataIndex: 'diameter',
            key: 'diameter',
            render: (diameter: string) => <DiameterText diameter={diameter} />,
        },
        {
            title: 'Sector',
            dataIndex: ['sector', 'name'],
            key: 'sector',
        },
        {
            title: 'Lectura',
            key: 'reading',
            dataIndex: 'reading',
            align: 'center',
            render: (value, record) => <ReadingBox record={record} />
        }
    ];

    return (
        <CheckAuthentication>
            <ContentLayout>
                <Card
                    style={{ marginBottom: '20px' }}
                    styles={{ body: { padding: '24px' } }}
                >
                    <Typography.Title level={5} style={{ marginBottom: '20px', color: '#4f6f52' }}>
                        <FilterOutlined /> Filtros de Búsqueda
                    </Typography.Title>
                    <Form layout="vertical" form={form} onFinish={onFilter}>
                        <Space direction="vertical" size="large" style={{ width: '100%' }}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                gap: '16px'
                            }}>
                                <Form.Item
                                    name="medidor"
                                    label={<span style={{ fontWeight: 500 }}>Medidor</span>}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input placeholder="Número del medidor" allowClear />
                                </Form.Item>
                                <Form.Item
                                    name="rut"
                                    label={<span style={{ fontWeight: 500 }}>Rut</span>}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input placeholder="Ingrese RUT" allowClear />
                                </Form.Item>
                                <Form.Item
                                    name="status"
                                    label={<span style={{ fontWeight: 500 }}>Estado</span>}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Select
                                        defaultValue="pending"
                                        options={[
                                            { value: "all", label: "Todos" },
                                            { value: "pending", label: "Pendiente" },
                                            { value: "no-pending", label: "Lectura ingresada" }
                                        ]}
                                    />
                                </Form.Item>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                                <Button onClick={() => { form.resetFields(); fetchReadingRecords(); }}>
                                    Limpiar
                                </Button>
                                <Button type="primary" htmlType="submit" icon={<FilterOutlined />}>
                                    Aplicar Filtros
                                </Button>
                            </div>
                        </Space>
                    </Form>
                </Card>
                <Card title="Listado de lecturas"
                    extra={
                        <Space>
                            {activePeriod && (
                                <Popconfirm
                                    title="¿Cerrar periodo actual?"
                                    description={`Se cerrará el periodo ${activePeriod.name}`}
                                    onConfirm={handleClosePeriod}
                                    okText="Si"
                                    cancelText="No"
                                >
                                    <Button type="primary" danger>Cerrar Periodo</Button>
                                </Popconfirm>
                            )}
                            <Button type="default"><FileExcelOutlined />Exportar</Button>
                        </Space>
                    }>
                    <Table<ReadingRecord>
                        style={{ width: '100%' }}
                        rowKey="id"
                        size="small"
                        columns={columns}
                        dataSource={readingRecords?.records || []}
                        loading={loadingConsumption}
                        pagination={{
                            total: readingRecords?.totalHits,
                            pageSize: 10, // Assuming 10
                            onChange: (page) => fetchReadingRecords(form.getFieldValue('status'), page - 1, 10)
                        }}
                    />
                </Card>
                <MeterReadingDrawer />
            </ContentLayout>
        </CheckAuthentication>
    )
}

const ReadingBox = ({ record }: { record: ReadingRecord }) => {
    const setOpenFormConsumption = useAppStore((state) => state.setOpenFormConsumption);

    if (record.reading !== null && record.reading !== undefined) {
        return (
            <Space direction="vertical" size={0}>
                <Typography.Text type="secondary">
                    {record.reading} m³
                </Typography.Text>
                <Button type="link" size="small" onClick={() => setOpenFormConsumption(true, record)}>
                    Editar
                </Button>
            </Space>
        )
    }
    return <Button onClick={() => setOpenFormConsumption(true, record)} block type="default" size="small"><PlusOutlined /> Agregar</Button>
}

export default MeterReadingPage;