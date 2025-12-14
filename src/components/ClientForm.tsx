import { Button, Col, Divider, Form, Input, message, Radio, Row, Space } from "antd";
import { useAppStore } from "../store/useAppStore";
import { FC } from "react";
import { Client } from "../types/Client";
import FormInputRut from "./FormInputRut";
import SelectClientsType from "./SelectClientsType";

interface ClientFormProps {
	client?: Client;
}

const ClientForm: FC<ClientFormProps> = ({ client }) => {
	const [form] = Form.useForm();
	const createClient = useAppStore((state) => state.createClient);
	const setClientOpenForm = useAppStore((state) => state.setClientOpenForm);

	const onCancel = () => {
		form.resetFields();
		setClientOpenForm();
	}

	const onFinish = async (values: Client) => {
		const status = await createClient(values);
		if (status) {
			message.success("Cliente creado");
			setClientOpenForm();
		} else {
			message.error("Emm..");
		}
	}

	return (
		<Form layout={'vertical'} form={form} initialValues={client} onFinish={onFinish}>
			<Row gutter={16}>
				<Col span={10}>
					<Form.Item name="typeOfDni"
						label="Tipo de identificación"
						initialValue="CHILEAN"
						rules={[{ required: true }]}>
						<Radio.Group>
							<Radio value='CHILEAN'>RUT</Radio>
						</Radio.Group>
					</Form.Item>
				</Col>
				<Col span={14}>
					<FormInputRut name="dni" label="Identificador RUT" />
				</Col>
			</Row>
			<Divider />
			<Form.Item name={["clientType", "id"]}
				label="Tipo de cliente"
				rules={[{ required: true }]}>
				<SelectClientsType />
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
					<Form.Item name="telephone" label="Teléfono" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
				</Col>
			</Row>
			<Space style={{ float: 'right' }}>
				<Button type="default" onClick={onCancel}>Cancelar</Button>
				<Button type="primary" htmlType="submit">
					Guardar
				</Button>
			</Space>
		</Form >
	)
}

export default ClientForm
