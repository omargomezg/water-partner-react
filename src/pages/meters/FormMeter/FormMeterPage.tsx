import { Button, Form, Input, message, Space, Typography } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../../../services/apiClient';
import { WaterMeter } from '../../../types';
import axios from 'axios';
import { SelectDiameter } from '../../../components/SelectDiameter';

const { Title } = Typography;

export const FormMeterPage = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const [form] = Form.useForm();
	const onFinish = (values: any) => {
		if (id) {
			update(values);
		} else {
			create(values);
		}
	};

	useEffect(() => {
		if (id) {
			const fetchMeter = async () => {
				const { data } = await apiClient.get(`/api/meters/${id}`);
				form.setFieldsValue(data);
			};
			fetchMeter();
		}
	}, [id]);

	const create = async (meter: WaterMeter) => {
		try {
			await apiClient.post('/api/meters', meter);
			navigate('/configurations/meters');
		} catch (err) {
			handleError(err);
		}
	};

	const update = async (meter: WaterMeter) => {
		try {
			await apiClient.put(`/api/meters/${id}`, meter);
			navigate('/configurations/meters');
		} catch (err) {
			handleError(err);
		}
	};

	const handleError = (err: any) => {
		if (axios.isAxiosError(err)) {
			message.error(err.response?.data.message);
		} else {
			console.log(err);
		}
	};

	return (
		<>
			<Title level={5}>{id ? 'Editar Medidor' : 'Formulario de Medidor'}</Title>
			<Form layout={'vertical'} onFinish={onFinish} form={form}>
				<Form.Item name="serialNumber" label="Numero" rules={[{ required: true }]}>
					<Input style={{ width: '200px' }} autoComplete="off" />
				</Form.Item>
				<Form.Item name="diameter" label="Medida del medidor" rules={[{ required: true }]}>
					<SelectDiameter />
				</Form.Item>
				<Form.Item name="trademark" label="Marca" rules={[{ required: true }]}>
					<Input style={{ width: '250px' }} autoComplete="off" />
				</Form.Item>
				<Form.Item name="comment" label={'Observaciones'} style={{ width: '400px' }}>
					<Input.TextArea rows={4} />
				</Form.Item>
				<Space style={{ float: 'right' }}>
					<Button type="default" onClick={() => navigate('/configurations/meters')}>
						Cancelar
					</Button>
					<Button type="primary" htmlType="submit">
						Guardar
					</Button>
				</Space>
			</Form>
		</>
	);
};
