import { Button, Flex, Space, Table, TableProps } from 'antd';
import { SiteSummary, SocialNetwork } from '../types/types';
import { useEffect, useState } from 'react';
import apiClient from '../../../services/apiClient';
import { TitleWithDescriptionComponent } from '../components/TitleWithDescription.component';
import { RowButtonsComponent } from '../components/RowButtons.component';
import { SocialNetworkLinkComponent } from '../components/SocialNetwork.component';
import { CreateSiteComponent } from '../components/CreateSite.component';

const columns: TableProps<SiteSummary>['columns'] = [
	{
		title: 'Nombre',
		dataIndex: 'name',
		key: 'name',
		render: (name, { description, url, googleTagID }) => (
			<TitleWithDescriptionComponent
				description={description}
				googleTagID={googleTagID}
				name={name}
				url={url}
			/>
		),
	},
	{
		title: 'Sitios relacionados',
		dataIndex: 'sharedWithSites',
		key: 'sharedWithSites',
		render: (sharedWithSites) => sharedWithSites?.map((s: string) => s).join(', '),
	},
	{
		title: 'Redes sociales',
		dataIndex: 'socialNetworks',
		key: 'socialNetworks',
		render: (socialNetworks) => {
			return (
				<Space orientation="vertical" size="small">
					{socialNetworks?.map((a: SocialNetwork) => (
						<SocialNetworkLinkComponent url={a.url} name={a.name} />
					))}
				</Space>
			);
		},
	},
	{
		title: 'Action',
		key: 'action',
		render: (_, record: SiteSummary) => <RowButtonsComponent id={record.id} />,
	},
];

export const ListOfSitesPage: React.FC = () => {
	const [sites, setSites] = useState<SiteSummary[]>([]);

	const fetchSites = async () => {
		const { data } = await apiClient.get<SiteSummary[]>('/api/sites');
		setSites(data);
	};

	useEffect(() => {
		fetchSites();
	}, []);
	return (
		<>
			<Flex gap="medium" justify="flex-end" style={{ marginBottom: '10px' }}>
				<CreateSiteComponent />
			</Flex>
			<Table<SiteSummary>
				columns={columns}
				dataSource={sites}
				rowKey="id"
				style={{ width: '100%' }}
			/>
		</>
	);
};
