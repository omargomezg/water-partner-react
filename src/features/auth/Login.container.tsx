import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Flex, Form, Input, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import { AuthResponse } from './store/types/type';
import { useAuthStore } from './store/useAuthStore';

const LoginContainer = () => {
	const navigate = useNavigate();
	const setValues = useAuthStore((state) => state.setValues);

	const onFinish = async (values: any) => {
		try {
			const { data } = await apiClient.post<AuthResponse>(`/api/auth/login`, values);
			if (data) {
				setValues(data);
				navigate('/articles');
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Flex
			justify="center"
			align="center"
			style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}
		>
			<Card
				style={{ width: 400, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
				cover={
					<img
						src="/logoapr.jpg"
						alt="Logo"
						style={{
							width: '120px',
							margin: '24px auto 16px auto',
							display: 'block',
						}}
					/>
				}
			>
				<Typography.Title level={4} style={{ textAlign: 'center', marginBottom: '24px' }}>
					Iniciar Sesión
				</Typography.Title>
				<Form name="normal_login" initialValues={{ remember: true }} onFinish={onFinish}>
					<Form.Item
						name="username"
						rules={[{ required: true, message: '¡Por favor, ingresa tu usuario!' }]}
					>
						<Input prefix={<UserOutlined />} placeholder="Usuario" />
					</Form.Item>
					<Form.Item
						name="password"
						rules={[{ required: true, message: '¡Por favor, ingresa tu contraseña!' }]}
					>
						<Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
					</Form.Item>
					<Form.Item>
						<Flex justify="space-between" align="center">
							<Form.Item name="remember" valuePropName="checked" noStyle>
								<Checkbox>Recordarme</Checkbox>
							</Form.Item>
							<Button type="link" onClick={() => navigate('/reset-password')}>
								¿Olvidaste la contraseña?
							</Button>
						</Flex>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" block>
							Ingresar
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</Flex>
	);
};
export default LoginContainer;
