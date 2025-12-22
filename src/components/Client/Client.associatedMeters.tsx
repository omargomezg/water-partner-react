import { Button, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { useAppStore } from "../../store/useAppStore";
import { WaterMeter } from "../../types";
import DiameterText from "../DiameterText";
import NumericText from "../NumericText";

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
		render: (diameter) => <DiameterText diameter={diameter} />
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
		key: 'flatFee',
		dataIndex: 'flatFee',
		render: (flatFee) => <NumericText value={flatFee} />
	},
	{
		title: '$ m3',
		key: 'cubicMeter',
		dataIndex: 'cubicMeter',
		render: (cubicMeter) => <NumericText value={cubicMeter} />
	},
	{
		title: '',
		key: 'action',
		render: (_, record) => (
			<ActionButtons meter={record} />
		),
	},
];

const ClientAssociatedMeters = () => {
	const client = useAppStore((state) => state.client);
	
	return <Table<WaterMeter> style={{ width: '100%' }}
		columns={columns}
		rowKey="code"
		rowClassName="x-small-row-font"
		dataSource={client?.waterMeters} />
}

export default ClientAssociatedMeters;

const ActionButtons = ({ meter }: any) => {
	const setOpenSubsidyForm = useAppStore((state) => state.setOpenSubsidyForm);
	return (
		<Button title="Agregar subsidio" onClick={() => setOpenSubsidyForm(meter)}>+ Subsidio</Button>
	)
}