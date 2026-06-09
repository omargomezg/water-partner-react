import { Row, Col, Form, Select, Input, Space, Button, SelectProps } from 'antd';
import { Filter } from '../types/types';

type Props = {
	categories: SelectProps[];
	onChange: (filter: Filter) => void;
};

export const Filters: React.FC<Props> = ({ categories, onChange }) => {
	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		const { category, texto, order, status } = values;
		const params: Filter = { sort: 'createdAt,desc' };
		if (category) {
			params.category = category;
		}
		if (texto) {
			params.text = texto;
		}
		if (status !== 'ALL') {
			params.status = status;
		}
		params.sort = `${order.split(':')[0]},${order.split(':')[1]}`;
		onChange(params);
	};

	const onReset = () => {
		form.setFieldsValue({ order: 'updatedAt:DESC', status: 'ALL' });
		onChange({ sort: 'createdAt,DESC' });
	};

	return (
		<Row justify="end" style={{ marginBottom: 20 }}>
			<Col>
				<Form
					name="form_article_filter"
					initialValues={{ order: 'updatedAt:DESC', status: 'ALL' }}
					form={form}
					onReset={onReset}
					onFinish={onFinish}
					layout={'inline'}
				>
					<Form.Item name="category" label="Categoría">
						<Select
							options={categories}
							style={{ minWidth: 200 }}
							placeholder="Todas las categorías"
							allowClear={true}
						></Select>
					</Form.Item>
					{false && (
						<Form.Item name="texto" label="Texto a buscar">
							<Input placeholder="Ingresa un texto" style={{ width: 200 }} />
						</Form.Item>
					)}
					<Form.Item name="status" label="Estado">
						<Select
							style={{ minWidth: 200 }}
							options={[
								{ value: 'ALL', label: 'Todos' },
								{ value: 'PUBLISHED', label: 'Publicado' },
								{ value: 'DRAFT', label: 'Borrador' },
							]}
						/>
					</Form.Item>
					<Form.Item name="order" label="Ordenar por">
						<Select
							style={{ minWidth: 200 }}
							options={[
								{ value: 'createdAt:DESC', label: 'Recientes' },
								{ value: 'createdAt:ASC', label: 'Mas antiguos' },
								{ value: 'updatedAt:DESC', label: 'Actualizado recientemente' },
							]}
						/>
					</Form.Item>
					<Form.Item>
						<Space>
							<Button type="default" htmlType="reset">
								Limpiar
							</Button>
							<Button type="primary" htmlType="submit">
								Aplicar Filtros
							</Button>
						</Space>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	);
};
