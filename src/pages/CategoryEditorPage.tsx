import { Button, Col, Form, Input, Row, Select, Space, Spin, message } from 'antd';
import { FC, useEffect, useState } from 'react';
import { TagManager } from '../components/TagManager';
import apiClient from '../services/apiClient';
import { useNavigate, useParams } from 'react-router-dom';

export const CategoryEditorPage: FC = () => {
	const { id } = useParams<{ id: string }>();
	const [form] = Form.useForm();
	const [category, setCategory] = useState<any>(null);
	const [categories, setCategories] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (id) {
			const fetch = async () => {
				try {
					setLoading(true);
					const { data } = await apiClient.get(`/category/${id}`);
					setCategories(data.optionCategories);
					const { optionCategories, ...category } = data;
					setCategory(category);
					form.setFieldsValue(category);
				} catch (err) {
					message.error('Error al cargar la categoría');
				} finally {
					setLoading(false);
				}
			};
			fetch();
		}
	}, [id, form]);

	const onFinish = async (values: any) => {
		try {
			setLoading(true);
			if (!id) {
				await apiClient.post('/category', values);
				message.success('Categoría creada con éxito');
			} else {
				await apiClient.put(`/category/${id}`, values);
				message.success('Categoría actualizada con éxito');
			}
			navigate('/configurations/category/list');
		} catch (err) {
			message.error('Error al guardar los cambios');
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Spin spinning={loading}>
				<Form layout="vertical" form={form} initialValues={category} onFinish={onFinish}>
					<Form.Item
						label="Nombre"
						name="name"
						rules={[
							{
								required: true,
								message: 'Nombre es requerido',
							},
						]}
					>
						<Input maxLength={100} />
					</Form.Item>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								label="Slug"
								name="slug"
								rules={[
									{
										required: true,
										message: 'Este campo es requerido',
									},
								]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								label="Categoría superior"
								extra="Las categorías, a diferencia de las etiquetas, pueden tener jerarquías. Puedes tener la categoría «Jazz» y,
            por debajo, las categorías «Bebop» y «Big Band». Es opcional."
								name="parent"
							>
								<Select options={categories} allowClear={true}></Select>
							</Form.Item>
						</Col>
					</Row>
					<Form.Item label="Palabras claves" name="keywords">
						<TagManager />
					</Form.Item>
					<Form.Item>
						<Space style={{ float: 'right' }}>
							<Button type="text" onClick={() => navigate('/configurations/category/list')}>
								Cancelar
							</Button>
							<Button type="primary" htmlType={'submit'}>
								Guardar
							</Button>
						</Space>
					</Form.Item>
				</Form>
			</Spin>
		</>
	);
};
