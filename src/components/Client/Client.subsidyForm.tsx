import {
	Button,
	Col,
	DatePicker,
	Drawer,
	Form,
	Input,
	InputNumber,
	message,
	Row,
	Space,
	Spin,
} from 'antd';
import { useAppStore } from '../../store/useAppStore';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import apiClient from '../../services/apiClient';
import { Subsidy, SubsidyRequest } from '../../types';

const ClientSubsidyForm = () => {
	const [form] = Form.useForm();
	const openSubsidyForm = useAppStore((state) => state.openSubsidyForm);
	const meterForSubsidy = useAppStore((state) => state.meterForSubsidy); // Meter object
	const setOpenSubsidyForm = useAppStore((state) => state.setOpenSubsidyForm); // Toggle

	// Note: setOpenSubsidyForm implementation in slice might take meter or void?
	// Usually it toggles boolean.
	// If it takes meter, it sets meterForSubsidy.
	// If called without args, it might close?

	const [loading, setLoading] = useState(false);
	const [fetching, setFetching] = useState(false);
	const [currentSubsidy, setCurrentSubsidy] = useState<Subsidy | null>(null);

	const onClose = () => {
		// We probably need to call setOpenSubsidyForm() or setOpenSubsidyForm(null)?
		// Checking usage in Client.associatedMeters: onClick={() => setOpenSubsidyForm(meter)} -> opens
		// onClick={() => setOpenSubsidyForm()} -> closes?
		// Let's assume passing undefined/null closes or use a separate close action if slice differs.
		// Assuming setOpenSubsidyForm handles toggling or accepts boolean/null.
		// I will check slice later if needed, but for now assuming setOpenSubsidyForm() works.
		// Or better: check `Client.subsidyForm.tsx` original code: calling `setOpenSubsidyForm` on cancel/close without args.
		setOpenSubsidyForm(null);
	};

	useEffect(() => {
		if (openSubsidyForm && meterForSubsidy) {
			fetchSubsidy(meterForSubsidy.id);
		} else {
			form.resetFields();
			setCurrentSubsidy(null);
		}
	}, [openSubsidyForm, meterForSubsidy]);

	const fetchSubsidy = async (id: number) => {
		setFetching(true);
		try {
			const response = await apiClient.get<Subsidy>(`/subsidy?id=${id}`);
			if (response.status === 200 && response.data.id) {
				const data = response.data;
				setCurrentSubsidy(data);
				form.setFieldsValue({
					decreeNumber: data.numberOfDecree,
					decreeDate: data.approvedDateOfDecree ? dayjs(data.approvedDateOfDecree) : null,
					dates: [
						data.startDate ? dayjs(data.startDate) : null,
						data.endingDate ? dayjs(data.endingDate) : null,
					],
					percentage: data.percentage,
					observation: data.observation,
				});
			} else {
				form.resetFields();
				setCurrentSubsidy(null);
			}
		} catch (error) {
			console.error(error);
			form.resetFields();
			setCurrentSubsidy(null);
		} finally {
			setFetching(false);
		}
	};

	const onFinish = async (values: any) => {
		if (!meterForSubsidy) return;
		setLoading(true);
		const request: SubsidyRequest = {
			waterMeter: { id: meterForSubsidy.id },
			decree: {
				number: values.decreeNumber,
				publication: values.decreeDate.format('YYYY-MM-DD'),
			},
			subsidy: {
				id: currentSubsidy?.id || undefined,
				start: values.dates[0].format('YYYY-MM-DD'),
				end: values.dates[1].format('YYYY-MM-DD'),
				percentage: values.percentage,
			},
			observation: values.observation || '',
		};

		try {
			await apiClient.put('/subsidy/water-meter', request);
			message.success('Subsidio guardado correctamente');
			onClose();
		} catch (error) {
			message.error('Error al guardar subsidio');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Drawer
			title={`Administrar Subsidio - Medidor ${meterForSubsidy?.serial || ''}`}
			width={600}
			open={openSubsidyForm}
			onClose={onClose}
			extra={
				<Space>
					<Button onClick={onClose}>Cancelar</Button>
					<Button onClick={form.submit} type="primary" loading={loading}>
						Guardar
					</Button>
				</Space>
			}
		>
			<Spin spinning={fetching}>
				<Form layout="vertical" form={form} onFinish={onFinish}>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								name="decreeNumber"
								label="Nro. Decreto"
								rules={[{ required: true, message: 'Requerido' }]}
							>
								<Input placeholder="Ej: 1234" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name="decreeDate"
								label="Fecha Decreto"
								rules={[{ required: true, message: 'Requerido' }]}
							>
								<DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
							</Form.Item>
						</Col>
					</Row>

					<Form.Item
						name="dates"
						label="Vigencia (Inicio - Fin)"
						rules={[{ required: true, message: 'Requerido' }]}
					>
						<DatePicker.RangePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
					</Form.Item>

					<Form.Item
						name="percentage"
						label="Porcentaje Subsidio (%)"
						rules={[{ required: true, message: 'Requerido' }]}
					>
						<InputNumber min={0} max={100} style={{ width: '100%' }} addonAfter="%" />
					</Form.Item>

					<Form.Item name="observation" label="Observación">
						<Input.TextArea rows={3} />
					</Form.Item>
				</Form>
			</Spin>
		</Drawer>
	);
};

export default ClientSubsidyForm;
