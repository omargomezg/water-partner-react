import { FilePdfOutlined } from '@ant-design/icons';
import { TableProps, Table, Space, Button } from 'antd';
import dayjs from 'dayjs';
import { FC } from 'react';
import { useAppStore } from '../../../store/useAppStore';

interface DataType {
	createdAt: string;
	amount: number;
}

const columns: TableProps<DataType>['columns'] = [
	{
		title: 'Emisión',
		dataIndex: 'createdAt',
		key: 'createdAt',
		render: (dateString) => {
			return dayjs(dateString).format('MMMM DD, YYYY');
		},
	},
	{
		title: 'Valor',
		dataIndex: 'amount',
		key: 'amount',
		render: (value) => `$ ${new Intl.NumberFormat('es-CL').format(value)}`,
	},
	{
		title: 'Action',
		key: 'action',
		render: (_, record) => <RowButtons boleta={record} />,
	},
];

const data: DataType[] = [
	{
		createdAt: '2025-04-28T10:00:00Z',
		amount: 234324,
	},
	{
		createdAt: '2025-05-28T10:00:00Z',
		amount: 29805,
	},
	{
		createdAt: '2025-06-28T10:00:00Z',
		amount: 45900,
	},
	{
		createdAt: '2025-07-28T10:00:00Z',
		amount: 52500,
	},
];

export const LastUtilityBills: FC = () => {
	return (
		<Table<DataType>
			style={{ width: '100%' }}
			size="small"
			scroll={{ y: 25 * 5 }}
			rowKey="createdAt"
			columns={columns}
			dataSource={data}
		/>
	);
};

const RowButtons = ({ boleta }: any) => {
	const setOpenModalPdf = useAppStore((state) => state.setOpenModalPdf);
	return (
		<Space>
			<Button type="link" onClick={setOpenModalPdf}>
				<FilePdfOutlined />
			</Button>
		</Space>
	);
};
