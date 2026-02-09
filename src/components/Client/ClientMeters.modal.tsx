import { FC, useEffect, useState } from 'react';
import { Modal, Button, Table, Space, Tabs, Select, Form, Input, message, Popconfirm, Card, Tooltip } from 'antd';
import { useAppStore } from '../../store/useAppStore';
import { WaterMeter } from '../../types';
import { DeleteOutlined, PlusOutlined, FileProtectOutlined } from '@ant-design/icons';
import SubsidyModal from './Subsidy.modal';

const ClientMetersModal: FC = () => {
    const openClientMetersModal = useAppStore((state) => state.openClientMetersModal);
    const setOpenClientMetersModal = useAppStore((state) => state.setOpenClientMetersModal);
    const clientForMeters = useAppStore((state) => state.clientForMeters);
    const removeClientWaterMeter = useAppStore((state) => state.removeClientWaterMeter);
    const getClients = useAppStore((state) => state.getClients);

    const [isAssociating, setIsAssociating] = useState(false);
    const [subsidyModalOpen, setSubsidyModalOpen] = useState(false);
    const [selectedMeterId, setSelectedMeterId] = useState<number | null>(null);
    const [selectedMeterSerial, setSelectedMeterSerial] = useState<string>("");

    const closeModal = () => {
        setOpenClientMetersModal(false);
        setIsAssociating(false);
    };

    const handleRemoveMeter = async (meterId: number) => {
        if (clientForMeters) {
            const response = await removeClientWaterMeter(clientForMeters.dni, meterId.toString());
            if (response.success) {
                message.success('Medidor desasociado correctamente');
                getClients();
            } else {
                message.error('Error al desasociar medidor: ' + response.message);
            }
        }
    };

    const openSubsidyModal = (meter: WaterMeter) => {
        setSelectedMeterId(meter.id);
        setSelectedMeterSerial(meter.serial);
        setSubsidyModalOpen(true);
    };

    const columns = [
        { title: 'Serie', dataIndex: 'serial', key: 'serial' },
        { title: 'Marca', dataIndex: 'trademark', key: 'trademark' },
        { title: 'Diámetro', dataIndex: 'diameter', key: 'diameter' },
        { title: 'Sector', dataIndex: 'sector', key: 'sector' },
        {
            title: 'Acciones',
            key: 'actions',
            render: (_: any, record: WaterMeter) => (
                <Space>
                    <Tooltip title="Administrar Subsidio">
                        <Button type="default" icon={<FileProtectOutlined />} onClick={() => openSubsidyModal(record)} />
                    </Tooltip>
                    <Popconfirm title="¿Estás seguro de desasociar este medidor?" onConfirm={() => handleRemoveMeter(record.id)}>
                        <Button type="link" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <>
            <Modal
                title={`Medidores de ${clientForMeters?.fullName || ''}`}
                open={openClientMetersModal}
                onCancel={closeModal}
                footer={[
                    <Button key="close" onClick={closeModal}>Cerrar</Button>
                ]}
                width={800}
            >
                <Table
                    dataSource={clientForMeters?.waterMeters || []}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                    locale={{ emptyText: 'No hay medidores asociados' }}
                />

                <div style={{ marginTop: 16 }}>
                    {!isAssociating ? (
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAssociating(true)}>
                            Asociar Medidor
                        </Button>
                    ) : (
                        <AssociateMeterSection onCancel={() => setIsAssociating(false)} onSuccess={() => {
                            setIsAssociating(false);
                            getClients();
                            closeModal();
                        }} />
                    )}
                </div>
            </Modal>

            <SubsidyModal
                meterId={selectedMeterId}
                meterSerial={selectedMeterSerial}
                open={subsidyModalOpen}
                onClose={() => setSubsidyModalOpen(false)}
            />
        </>
    );
};

// Sub-component for Association Logic
const AssociateMeterSection: FC<{ onCancel: () => void, onSuccess: () => void }> = ({ onCancel, onSuccess }) => {
    const availableMeters = useAppStore((state) => state.availableMeters);
    const getAvailableMeters = useAppStore((state) => state.getAvailableWaterMeters);
    const associateWaterMeterToClient = useAppStore((state) => state.associateWaterMeterToClient);
    const createWaterMeter = useAppStore((state) => state.createWaterMeter);
    const clientForMeters = useAppStore((state) => state.clientForMeters);
    const fetchSectors = useAppStore((state) => state.fetchSectors);
    const sectors = useAppStore((state) => state.sectors);

    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        getAvailableMeters(0, 50); // Fetch first 50 available meters
        fetchSectors();
    }, [getAvailableMeters, fetchSectors]);

    const onFinishLink = async (values: any) => {
        if (!clientForMeters) return;
        setLoading(true);
        const success = await associateWaterMeterToClient(clientForMeters.dni, values.meterId);
        setLoading(false);
        if (success) {
            message.success('Medidor asociado correctamente');
            onSuccess();
        } else {
            message.error('Error al asociar medidor');
        }
    };

    const onFinishCreate = async (values: any) => {
        if (!clientForMeters) return;
        setLoading(true);
        // Create Meter
        // Map sector string to object if backend needs it?
        // Based on analysis, WaterMeterDTO expects SectorDTO.
        // Assuming values.sector is the ID from Select.
        const meterToCreate = {
            ...values,
            sector: { id: values.sector } // Send object with ID
        };

        // Wait, WaterMeter type in frontend says sector is string.
        // We cast to any to bypass TS check for now if needed, but createWaterMeter expects WaterMeter
        // Update: createWaterMeter in slice expects WaterMeter but calls post.
        // If we send object, axios serializes it.
        // Let's coerce it.

        const createdMeter = await createWaterMeter(meterToCreate as any);

        if (createdMeter) {
            // Associate
            const success = await associateWaterMeterToClient(clientForMeters.dni, createdMeter.id);
            if (success) {
                message.success('Medidor creado y asociado correctamente');
                onSuccess();
            } else {
                message.error('Medidor creado pero falló la asociación');
                setLoading(false);
            }
        } else {
            message.error('Error al crear medidor');
            setLoading(false);
        }
    };

    const items = [
        {
            key: 'existing',
            label: 'Existente',
            children: (
                <Form layout="vertical" onFinish={onFinishLink}>
                    <Form.Item name="meterId" label="Seleccione Medidor" rules={[{ required: true }]}>
                        <Select
                            placeholder="Buscar medidor por serie..."
                            showSearch
                            optionFilterProp="children"
                            loading={!availableMeters}
                        >
                            {availableMeters?.meters.map(meter => (
                                <Select.Option key={meter.id} value={meter.id}>
                                    {meter.serial} - {meter.trademark} ({meter.diameter})
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Space>
                        <Button onClick={onCancel}>Cancelar</Button>
                        <Button type="primary" htmlType="submit" loading={loading}>Asociar</Button>
                    </Space>
                </Form>
            )
        },
        {
            key: 'new',
            label: 'Nuevo',
            children: (
                <Form layout="vertical" onFinish={onFinishCreate} form={form}>
                    <Form.Item name="serial" label="Número de Serie" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="trademark" label="Marca" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="diameter" label="Diámetro" rules={[{ required: true }]}>
                        <Select options={[
                            { value: "THIRTEEN", label: "13 mm" },
                            { value: "NINETEEN", label: "19 mm" },
                            { value: "TWENTY_FIVE", label: "25 mm" },
                            { value: "THIRTY_EIGHT", label: "38 mm" }
                        ]} />
                    </Form.Item>
                    <Form.Item name="sector" label="Sector" rules={[{ required: true }]}>
                        <Select loading={!sectors || sectors.length === 0}>
                            {sectors?.map((sector: any) => (
                                <Select.Option key={sector.id} value={sector.id}>
                                    {sector.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="comment" label="Observaciones">
                        <Input.TextArea />
                    </Form.Item>
                    <Space>
                        <Button onClick={onCancel}>Cancelar</Button>
                        <Button type="primary" htmlType="submit" loading={loading}>Crear y Asociar</Button>
                    </Space>
                </Form>
            )
        }
    ];

    return (
        <Card size="small" title="Asociar Medidor">
            <Tabs defaultActiveKey="existing" items={items} />
        </Card>
    );
};

export default ClientMetersModal;
