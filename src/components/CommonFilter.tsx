import { Form, Flex, Button, Drawer, Input, Badge } from 'antd';
import { FC, useState } from 'react';
import { SelectDiameter } from './SelectDiameter';
import { Filter } from '../types/Filter';

export enum FilterTypes {
	Meter,
	Client,
	Debts,
}

type FiltersProps = {
	type: FilterTypes;
	onClose: (filters: Filter) => void;
};

export const CommonFilter: FC<FiltersProps> = ({ onClose, type }) => {
	const [openOpen, setOpen] = useState(false);
	const [totalFilters, setTotalFilters] = useState(0);

	const handleClose = (filters: Filter, total: number) => {
		onClose(filters);
		setTotalFilters(total);
		setOpen(false);
	};

	return (
		<>
			<Badge count={totalFilters} showZero>
				<Button onClick={() => setOpen(true)}>Opciones o filtros</Button>
				<FilterModal open={openOpen} onClose={handleClose} type={type} />
			</Badge>
		</>
	);
};

type FilterModalProps = {
	open: boolean;
	onClose: (filters: Filter, total: number) => void;
	type: FilterTypes;
};

const FilterModal: FC<FilterModalProps> = ({ open, onClose, type }) => {
	const [form] = Form.useForm<Filter>();
	const onFinish = () => {
		const values = form.getFieldsValue();

		const cleanedEntries = Object.entries(values).filter(([_, value]) => {
			return value !== undefined && value !== null && String(value).trim() !== '';
		});

		const total = cleanedEntries.length;

		const mappedFilter: Partial<Filter> = {};

		cleanedEntries.forEach(([key, value]) => {
			const filterKey = key as keyof Filter;

			if (value && typeof value === 'object' && 'value' in value) {
				mappedFilter[filterKey] = (value as any).value;
			} else {
				mappedFilter[filterKey] = value as any;
			}
		});
		onClose(mappedFilter as Filter, total);
	};
	const footer: React.ReactNode = (
		<Flex gap="medium" justify="flex-end">
			<Button
				onClick={() => onClose({} as Filter, 0)}
				styles={{
					root: {
						borderColor: '#ccc',
						color: '#171717',
						backgroundColor: '#fff',
					},
				}}
			>
				Cancel
			</Button>
			<Button type="primary" onClick={onFinish} styles={{ root: { backgroundColor: '#171717' } }}>
				Submit
			</Button>
		</Flex>
	);

	return (
		<>
			<Drawer
				title="Filtros"
				placement="right"
				footer={footer}
				onClose={() => onClose({} as Filter, 0)}
				open={open}
			>
				<Form layout={'vertical'} onFinish={onFinish} form={form}>
					{type === FilterTypes.Meter && (
						<>
							<Form.Item label="Número de serie" name="serialNumber">
								<Input placeholder="Número de serie" />
							</Form.Item>
							<Form.Item label="Diametro" name="diameter">
								<SelectDiameter />
							</Form.Item>
							<Form.Item label="Marca" name="trademark">
								<Input placeholder="Marca" />
							</Form.Item>
						</>
					)}
				</Form>
			</Drawer>
		</>
	);
};
