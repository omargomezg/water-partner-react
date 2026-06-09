import { Button, Col, Divider, Form, Input, message, Radio, Row, Select, Space } from 'antd';
import { useAppStore } from '../store/useAppStore';
import { FC } from 'react';
import { Client } from '../types/Client';
import FormInputRut from './FormInputRut';
import SelectClientsType from './SelectClientsType';
import apiClient from '../services/apiClient';
import axios from 'axios';
import { constants } from '../utils/Utils';

interface ClientFormProps {
	client?: Client;
}

const ClientForm: FC<ClientFormProps> = ({ client }) => {
	const [form] = Form.useForm();
	const setClientOpenForm = useAppStore((state) => state.setClientOpenForm);
	const setClientFilter = useAppStore((state) => state.setClientFilter);
	const getClients = useAppStore((state) => state.getClients);

	const onCancel = () => {
		form.resetFields();
		setClientOpenForm();
	};

	const onFinish = async (values: Client) => {
		try {
			const response = await apiClient.post<Client>(`/api/clients`, values);
			const { status } = response;
			if (status === 201) {
				setClientFilter({ page: 0, size: constants.PAGE_SIZE });
				getClients();
				setClientOpenForm();
				message.success('Cliente creado correctamente');
			}
		} catch (err) {
			if (axios.isAxiosError(err)) {
				message.error(err.response?.data.message);
			}
		}
	};

	return (
		<Form layout={'vertical'} form={form} initialValues={client} onFinish={onFinish}>
			<Row gutter={16}>
				<Col span={10}>
					<Form.Item
						name="typeOfDni"
						label="Tipo de identificación"
						initialValue="CHILEAN"
						rules={[{ required: true }]}
					>
						<Radio.Group>
							<Radio value="CHILEAN">RUT</Radio>
						</Radio.Group>
					</Form.Item>
				</Col>
				<Col span={14}>
					<FormInputRut name="rut" label="Identificador RUT" />
				</Col>
			</Row>
			<Divider />
			<Form.Item name="clientType" label="Tipo de cliente" rules={[{ required: true }]}>
				{/* <SelectClientsType /> */}
				<Select>
					<option value="SOCIO">Socio</option>
					<option value="EMPRESA">Empresa</option>
					<option value="PARTICULAR">Particular</option>
				</Select>
			</Form.Item>
			<Divider />
			<Form.Item name="fullName" label="Nombre" rules={[{ required: true }]}>
				<Input />
			</Form.Item>
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item name="email" label="Correo" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item name="phone" label="Teléfono" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
				</Col>
			</Row>
			<Space style={{ float: 'right' }}>
				<Button type="default" onClick={onCancel}>
					Cancelar
				</Button>
				<Button type="primary" htmlType="submit">
					Guardar
				</Button>
			</Space>
		</Form>
	);
};

export default ClientForm;
