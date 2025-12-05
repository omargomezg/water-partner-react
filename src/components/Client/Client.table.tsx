import { Button, Space, Table, Pagination, TableProps } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useAppStore } from "../../store/useAppStore";
import { Client, ClientFilter } from "../../types";
import {constants } from '../../utils/Utils';

const columns: TableProps<Client>['columns'] = [
	{
		title: 'RUT',
		dataIndex: 'dni',
		key: 'dni',
	},
	{
		title: 'Nombre',
		dataIndex: 'fullName',
		key: 'fullName',
	},
	{
		title: 'Teléfono',
		dataIndex: 'telephone',
		key: 'telephone',
		render: (text) => <a href={`tel:${text}`}>{text}</a>
	},
	{
		title: 'Correo',
		dataIndex: 'email',
		key: 'email',
		render: (text) => <a href={`mailto:${text}`}>{text}</a>
	},
	{
		title: 'Acciones',
		key: 'action',
		render: (_, record) => (
			<RowButtons client={record} />
		),
	},
];

const ClientTable = () => {
	const clients = useAppStore((state) => state.clients);
	const getClients = useAppStore((state) => state.getClients);
	const loadingClients = useAppStore((state) => state.loadingClients);
	const setClientFilter = useAppStore((state) => state.setClientFilter);
	const clientFilter = useAppStore((state) => state.clientFilter);

	useEffect(() => {
		getClients();
	}, [getClients]);

	const onPageChange = (pageNumber: number) => {
		const page = pageNumber - 1;
		setClientFilter({ page, size: constants.PAGE_SIZE } as ClientFilter);
	}

	return (<>
		<Table<Client> style={{ width: '100%' }}
			rowKey="dni"
			loading={loadingClients}
			columns={columns}
			dataSource={clients?.content} />
		<Pagination defaultCurrent={clientFilter.page + 1}
			pageSize={clientFilter.size}
			showTotal={(total) => `Hay ${total} clientes`}
			total={clients?.totalElements} onChange={onPageChange} />
	</>)

}

const RowButtons = ({ client }: any) => {
	const setProfile = useAppStore((state) => state.setProfile);
	const deleteClient = useAppStore((state) => state.deleteClient);
	return (
		<Space size="middle">
			<Button type="link" onClick={() => {
				setProfile(client)
			}}>Ficha</Button>
			<Button type="link">Medidores</Button>
			<Button type="link" onClick={() => deleteClient(client.dni)}>Eliminar</Button>
			<Button title="Editar"><SettingOutlined /></Button>
		</Space>
	)
}

export default ClientTable
