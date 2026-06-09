import { FilterOutlined } from '@ant-design/icons';
import { Badge, Button, Drawer, Form, Input } from 'antd';
import { FC, useState } from 'react';

interface IFilter {
	name?: string;
}

interface Props {
	onChange: (filter: IFilter) => void;
}

export const Filter: FC<Props> = ({ onChange }) => {
	const [form] = Form.useForm();
	const [show, setShow] = useState<boolean>(false);
	const [total, setTotal] = useState<number>(0);

	const onFinish = (values: IFilter) => {
		setTotal(Object.keys(values).length);
		onChange(values);
		setShow(false);
	};

	const onReset = () => {
		setShow(false);
		setTotal(0);
		onChange({});
	};

	return (
		<>
			<Badge count={total}>
				<Button onClick={() => setShow(!show)}>
					<FilterOutlined />
				</Button>
			</Badge>
			<Drawer
				title="Filtros"
				closable={{ 'aria-label': 'Close Button' }}
				onClose={() => setShow(false)}
				open={show}
			>
				<Form layout="vertical" form={form} onReset={onReset} onFinish={onFinish}>
					<Form.Item label="Nombre" name="name">
						<Input maxLength={80} autoComplete="off" />
					</Form.Item>
					<Form.Item>
						<Button htmlType="reset" type="text">
							Limpiar
						</Button>
						<Button htmlType="submit" type="primary">
							Buscar
						</Button>
					</Form.Item>
				</Form>
			</Drawer>
		</>
	);
};
