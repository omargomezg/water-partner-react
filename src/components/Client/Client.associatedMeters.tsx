import { Button, Table, TableProps, message, Popconfirm } from "antd";
import dayjs from "dayjs";
import { useAppStore } from "../../store/useAppStore";
import { WaterMeter } from "../../types";
import DiameterText from "../DiameterText";
import NumericText from "../NumericText";
import { DeleteOutlined } from "@ant-design/icons";
import type { PopconfirmProps } from 'antd';

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
		rowKey="id"
		rowClassName="x-small-row-font"
		dataSource={client?.waterMeters} />
}

export default ClientAssociatedMeters;

const ActionButtons = ({ meter }: any) => {
	const [messageApi, holder] = message.useMessage();
	const setOpenSubsidyForm = useAppStore((state) => state.setOpenSubsidyForm);
	const removeClientWaterMeter = useAppStore((state) => state.removeClientWaterMeter);
	const dni = useAppStore((state) => state.client?.dni);
	const handleClickDelete = async () => {
		await removeClientWaterMeter(dni as string, meter.id);
	 }
	return (<>
		{holder}
		<Popconfirm
			title="Mensaje de confirmación"
			description="Vas a remover el medidor asociado al cliente. ¿Estás seguro?"
			onConfirm={handleClickDelete}
		>
			<Button type="text" title="Remover medidor"><DeleteOutlined /></Button>
		</Popconfirm>
		<Button title="Agregar subsidio" onClick={() => setOpenSubsidyForm(meter)}>+ Subsidio</Button>
	</>);
}