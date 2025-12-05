import { Button, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { useAppStore } from "../../store/useAppStore";
import { useState, useEffect } from "react";
import { WaterMeter } from "../../types";

const columns: TableProps<WaterMeter>['columns'] = [
	{
		title: 'Código',
		dataIndex: 'serial',
		key: 'serial',
	},
	{
		title: 'Milímetros',
		dataIndex: 'diameter',
		key: 'diameter',
	},
	{
		title: 'Alta',
		dataIndex: 'createdAt',
		key: 'createdAt',
		render: (dateString) => {
			return dayjs(dateString).format('MMMM DD, YYYY');
		}
	},
	{
		title: 'Sector',
		dataIndex: 'sector',
		key: 'sector',
	},
	{
		title: 'Cargo fijo',
		key: 'fixedTariff',
		dataIndex: 'fixedTariff',
	},
	{
		title: '$ m3',
		key: 'amountPerM3',
		dataIndex: 'amountPerM3',
	},
	{
		title: 'Action',
		key: 'action',
		render: (_, record) => (
			<ActionButtons meter={record} />
		),
	},
];

const Medidores = () => {
	const client = useAppStore((state) => state.client);
	const [meters, setMeters] = useState<WaterMeter[]>([]);
	useEffect(() => {
		if (client?.waterMeters) {
			setMeters(client.waterMeters);
		}
	}, [client]);
	
	return <Table<WaterMeter> style={{ width: '100%' }}
		columns={columns}
		rowKey="code"
		dataSource={meters} />
}

export default Medidores

const ActionButtons = ({ meter }: any) => {
	const setOpenSubsidyForm = useAppStore((state) => state.setOpenSubsidyForm);
	return (
		<Button title="Agregar subsidio" onClick={() => setOpenSubsidyForm(meter)}>+ Subsidio</Button>
	)
}