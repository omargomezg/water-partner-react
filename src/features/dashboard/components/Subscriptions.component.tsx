import { FileTextOutlined } from '@ant-design/icons';
import { Button, message, Table, TablePaginationConfig, TableProps } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../services/apiClient';
import { PageResponse, Period } from '../../../types';
import { Filter } from '../../../types/Filter';
import { AddReadingComponent } from '../../../components/AddReading.component';

interface Subscriptions {
	id: string;
}

type TableSubscriptionsProps = {
	lastUpdate?: Date;
};

export const SubscriptionsComponent: FC<TableSubscriptionsProps> = ({ lastUpdate }) => {
	const navigate = useNavigate();
	const [datasource, setDatasource] = useState<PageResponse<Subscriptions>>();
	const [currentPeriod, setCurrentPeriod] = useState<Period>();
	const [loading, setLoading] = useState(false);
	const [filter, setFilter] = useState<Filter>({
		sort: 'createdAt,desc',
		page: 0,
		size: 5,
	});

	const columns: TableProps<Subscriptions>['columns'] = [
		{
			title: 'N. Servicio',
			dataIndex: 'serviceNumber',
			key: 'serviceNumber',
		},
		{
			title: 'Sector',
			dataIndex: ['sector', 'name'],
			key: 'sectorName',
		},
		{
			title: 'Dirección',
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: 'Titular',
			dataIndex: ['owner', 'fullName'],
			key: 'ownerName',
		},
		{
			title: 'Lecura',
			dataIndex: ['owner', 'fullName'],
			key: 'ownerName',
			render: (_, { id }) =>
				currentPeriod && <AddReadingComponent subscriptionId={id} periodId={currentPeriod.id} />,
		},
		{
			title: '',
			key: 'actions',
			render: (_, record) => (
				<Button
					onClick={() => navigate(`/subscriptions/${record?.id}`)}
					type="dashed"
					shape="circle"
					title="Ver detalles"
					icon={<FileTextOutlined />}
				></Button>
			),
		},
	];

	useEffect(() => {
		setFilter({
			sort: 'createdAt,desc',
			page: 0,
			size: 5,
		});
	}, [lastUpdate]);

	useEffect(() => {
		fetch(filter);
	}, [filter]);

	const fetch = async (currentFilter: Filter): Promise<void> => {
		currentFilter.lectures = true;
		setLoading(true);
		try {
			const { data } = await apiClient.get<PageResponse<Subscriptions>>('/api/subscriptions', {
				params: currentFilter,
			});
			setDatasource(data);
		} catch (error) {
			const amessage = (error as Error).message;
			message.error(amessage);
		} finally {
			fetchCurrentPeriod();
			setLoading(false);
		}
	};

	const fetchCurrentPeriod = async () => {
		try {
			const { data } = await apiClient.get<Period>('/api/periods/current');
			setCurrentPeriod(data);
		} catch (error) {
			const amessage = (error as Error).message;
			message.error(amessage);
		} finally {
		}
	};

	const antPaginationConfig: TablePaginationConfig = {
		current: filter.page + 1,
		pageSize: filter.size,
		total: datasource?.totalElements || 0,
		showSizeChanger: true,
		pageSizeOptions: ['5', '10', '20', '50'],
		showTotal: (total) => (total > 5 ? `Hay ${total} Servicios` : ''),
	};

	const handleTableChange = (paginationConfig: TablePaginationConfig) => {
		const p = paginationConfig.current ? paginationConfig.current - 1 : 0;
		const s = paginationConfig.pageSize || 5;

		setFilter((prev) => ({
			...prev,
			page: p,
			size: s,
		}));
	};

	return (
		<Table<Subscriptions>
			columns={columns}
			rowKey="serviceNumber"
			dataSource={datasource?.content}
			pagination={antPaginationConfig}
			onChange={handleTableChange}
			loading={loading}
		/>
	);
};
