import { Button, Col, Form, Input, message, Row, Select, SelectProps, Space } from 'antd';
import { Site, User } from '../../../types';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiClient from '../../../services/apiClient';

export const SystemUserFormPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [sites, setSites] = useState<SelectProps[]>();
	const options = [
		{ value: 'ADMIN', label: 'Administrador' },
		{ value: 'EDITOR', label: 'Editor' },
		{ value: 'AUTHOR', label: 'Autor' },
	];

	useEffect(() => {
		const fetch = async () => {
			const { data: sites } = await apiClient.get<Site[]>('/api/sites');
			setSites(sites?.map((site) => ({ value: site.id, label: site.name })));
			const { data } = await apiClient.get<User>(`/user/${id}`);
			form.setFieldsValue(data);
		};
		fetch();
	}, []);

	const onFinish = async (user: User) => {
		try {
			const { data } = await apiClient.put(`/user/${id}`, user);
			message.success('Usuario actualizado correctamente');
		} catch (err) {
			message.error('Error al actualizar el usuario');
		}
	};

	return (
		<>
			<Form<User> layout="vertical" form={form} onFinish={onFinish}>
				<Form.Item name="email" label="Correo electrónico">
					<Input readOnly />
				</Form.Item>
				<Form.Item name="fullName" label="Nombre">
					<Input />
				</Form.Item>
				<Form.Item name="alias" label="Seudónimo">
					<Input />
				</Form.Item>
				<Row gutter={16}>
					<Col span={12}>
						<Form.Item name={['primarySite', 'id']} label="Dominio principal">
							<Select options={sites} />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item
							label="Rol"
							name="roles"
							rules={[{ required: true, message: 'Selecciona una opción' }]}
						>
							<Select mode="multiple" options={options} placeholder="Selecciona un perfil" />
						</Form.Item>
					</Col>
				</Row>

				<Form.Item>
					<Space style={{ float: 'right' }}>
						<Button type="text" onClick={() => navigate('/configurations/accounts')}>
							Cancelar
						</Button>
						<Button type="primary" htmlType={'submit'}>
							Guardar
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</>
	);
};
