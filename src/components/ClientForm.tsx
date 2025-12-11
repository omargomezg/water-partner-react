import { Button, Col, Divider, Form, Input, message, Radio, Row, Select, Space } from "antd";
import { useAppStore } from "../store/useAppStore";
import React, { useEffect, useState } from "react";
import { Client } from "../types/Client";
import { ClientType } from "../types";
import FormInputRut from "./FormInputRut";

interface ClientFormProps {
	client?: Client;
}

const ClientForm: React.FC<ClientFormProps>= ({client}) => {
	const [form] = Form.useForm();
	const [clientTypes, setClientTypes] = useState<ClientType[]>([]);
	const createClient = useAppStore((state) => state.createClient);
	const getClientTypes = useAppStore((state) => state.getClientTypes);
	const setClientOpenForm = useAppStore((state) => state.setClientOpenForm);

useEffect(() => {
	getClientTypes().then(setClientTypes);
}, [getClientTypes]);


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
				<Select options={clientTypes.map(x => ({ label: x.description, value: x.id }))} />
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
