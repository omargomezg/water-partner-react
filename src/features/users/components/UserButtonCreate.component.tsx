import { Button, Drawer, Form, Input, Select, SelectProps, Space } from 'antd';
import { useEffect, useState } from 'react';
import { User, Site } from '../../../types';
import apiClient from '../../../services/apiClient';
import { useNavigate } from 'react-router-dom';

export const UserButtonCreateComponent: React.FC = () => {
	const [open, setOpen] = useState<boolean>(false);
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
			const { data } = await apiClient.get<Site[]>('/api/sites');
			setSites(data?.map((site) => ({ value: site.id, label: site.name })));
		};
		fetch();
	}, []);

	const onFinish = async (user: User) => {
		try {
			const { data } = await apiClient.post('/user', user);
			setOpen(false);
			navigate(`/configurations/accounts/${data.id}/edit`);
		} catch (error) {
			const amessage = (error as Error).message;
			console.error(amessage);
		}
	};

	const handleClose = () => {
		form.resetFields();
	};

	return (
		<>
			<Button type="dashed" onClick={() => setOpen(true)}>
				+ Usuario
			</Button>
			<Drawer open={open} onClose={handleClose}>
				<Form<User> layout="vertical" onFinish={onFinish}>
					<Form.Item
						label="Correo electrónico"
						name="email"
						rules={[
							{
								required: true,
								type: 'email',
								message: 'Por favor ingrese su correo electrónico',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Nombre"
						name="fullName"
						rules={[{ required: true, message: 'Por favor ingrese su nombre' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name="password"
						label="Contraseña"
						rules={[
							{
								required: true,
								message: 'Ingresa la contraseña',
							},
						]}
						hasFeedback
					>
						<Input.Password autoComplete="new-password" />
					</Form.Item>

					<Form.Item
						name="confirm"
						label="Confirma la contraseña"
						dependencies={['password']}
						hasFeedback
						rules={[
							{
								required: true,
								message: 'Por favor confirma tu contraseña!',
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve();
									}
									return Promise.reject(new Error('La contraseña no coincide'));
								},
							}),
						]}
					>
						<Input.Password autoComplete="new-password" />
					</Form.Item>
					<Form.Item
						label="Seudónimo"
						name="alias"
						rules={[{ required: true, message: 'Por favor ingrese un seudónimo' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Rol"
						name="roles"
						rules={[{ required: true, message: 'Selecciona una opción' }]}
					>
						<Select mode="multiple" options={options} placeholder="Selecciona un perfil" />
					</Form.Item>
					<Form.Item
						label="Dominio principal"
						name={['primarySite', 'id']}
						rules={[{ required: true, message: 'Por favor seleccione un dominio' }]}
					>
						<Select options={sites} />
					</Form.Item>
					<Space style={{ float: 'right' }}>
						<Button type="default" onClick={() => setOpen(false)}>
							Cancelar
						</Button>
						<Button type="primary" htmlType="submit">
							Guardar
						</Button>
					</Space>
				</Form>
			</Drawer>
		</>
	);
};
