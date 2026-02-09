import { FC, useEffect, useState } from 'react';
import { Modal, Form, Input, InputNumber, DatePicker, Button, message, Spin } from 'antd';
import dayjs from 'dayjs';
import apiClient from '../../services/apiClient';
import { Subsidy, SubsidyRequest } from '../../types';

interface SubsidyModalProps {
    meterId: number | null;
    meterSerial?: string;
    onClose: () => void;
    open: boolean;
}

const SubsidyModal: FC<SubsidyModalProps> = ({ meterId, meterSerial, onClose, open }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [currentSubsidy, setCurrentSubsidy] = useState<Subsidy | null>(null);

    useEffect(() => {
        if (open && meterId) {
            fetchSubsidy(meterId);
        } else {
            form.resetFields();
            setCurrentSubsidy(null);
        }
    }, [open, meterId]);

    const fetchSubsidy = async (id: number) => {
        setFetching(true);
        try {
            const response = await apiClient.get<Subsidy>(`/subsidy?id=${id}`);
            if (response.status === 200 && response.data.id) {
                const data = response.data;
                setCurrentSubsidy(data);
                // Populate form
                form.setFieldsValue({
                    decreeNumber: data.numberOfDecree,
                    decreeDate: data.approvedDateOfDecree ? dayjs(data.approvedDateOfDecree) : null,
                    dates: [data.startDate ? dayjs(data.startDate) : null, data.endingDate ? dayjs(data.endingDate) : null],
                    percentage: data.percentage,
                    observation: data.observation
                });
            } else {
                // No active subsidy or empty response
                form.resetFields();
                setCurrentSubsidy(null);
            }
        } catch (error) {
            console.error(error);
            // Ignore 404/empty if purely not found? 
            // API returns empty Subsidy entity logic in service: .orElse(new SubsidyEntity())
            // So status is 200, but fields are null.
            form.resetFields();
            setCurrentSubsidy(null);
        } finally {
            setFetching(false);
        }
    };

    const onFinish = async (values: any) => {
        if (!meterId) return;
        setLoading(true);
        // Construct request
        const request: SubsidyRequest = {
            waterMeter: { id: meterId },
            decree: {
                number: values.decreeNumber,
                publication: values.decreeDate.format('YYYY-MM-DD')
            },
            subsidy: {
                id: currentSubsidy?.id || undefined,
                start: values.dates[0].format('YYYY-MM-DD'),
                end: values.dates[1].format('YYYY-MM-DD'),
                percentage: values.percentage
            },
            observation: values.observation || ""
        };

        try {
            await apiClient.put('/subsidy/water-meter', request);
            message.success('Subsidio guardado correctamente');
            onClose();
        } catch (error) {
            message.error('Error al guardar subsidio');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title={`Administrar Subsidio - Medidor ${meterSerial || ''}`}
            open={open}
            onCancel={onClose}
            footer={null}
        >
            <Spin spinning={fetching}>
                <Form layout="vertical" form={form} onFinish={onFinish}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <Form.Item name="decreeNumber" label="Nro. Decreto" rules={[{ required: true, message: 'Requerido' }]}>
                            <Input placeholder="Ej: 1234" />
                        </Form.Item>
                        <Form.Item name="decreeDate" label="Fecha Decreto" rules={[{ required: true, message: 'Requerido' }]}>
                            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                        </Form.Item>
                    </div>

                    <Form.Item name="dates" label="Vigencia (Inicio - Fin)" rules={[{ required: true, message: 'Requerido' }]}>
                        <DatePicker.RangePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
                    </Form.Item>

                    <Form.Item name="percentage" label="Porcentaje Subsidio (%)" rules={[{ required: true, message: 'Requerido' }]}>
                        <InputNumber min={0} max={100} style={{ width: '100%' }} addonAfter="%" />
                    </Form.Item>

                    <Form.Item name="observation" label="Observación">
                        <Input.TextArea rows={3} />
                    </Form.Item>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                        <Button onClick={onClose}>Cancelar</Button>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Guardar
                        </Button>
                    </div>
                </Form>
            </Spin>
        </Modal>
    );
};

export default SubsidyModal;
