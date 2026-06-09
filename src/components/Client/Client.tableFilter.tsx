import { Button, Form, Input, Space } from 'antd';
import { useAppStore } from '../../store/useAppStore';
import FormInputRut from '../FormInputRut';

const ClientTableFilter = () => {
	const setClientFilter = useAppStore((state) => state.setClientFilter);
	const getClients = useAppStore((state) => state.getClients);
	const onFinish = (values: any) => {
		setClientFilter({
			name: values.name === undefined ? null : values.name,
			rut: values.rut === undefined ? null : values.rut,
			page: 0,
			size: 2,
		});
		getClients();
	};

	return (
		<Form name="userForm" layout="inline" onFinish={onFinish}>
			<Form.Item label="Nombre" name={'name'}>
				<Input />
			</Form.Item>
			<FormInputRut name={'rut'} />
			<Space style={{ marginTop: 4 }}>
				<Button type="primary" htmlType="submit">
					Filtrar
				</Button>
			</Space>
		</Form>
	);
};

export default ClientTableFilter;
