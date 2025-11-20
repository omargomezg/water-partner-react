import {Button, Space, Table, TableProps} from "antd";
import {SettingOutlined} from "@ant-design/icons";
import {useEffect} from "react";
import {useAppStore} from "../../store/useAppStore";
import {Client} from "../../types/Client";

const columns: TableProps<Client>['columns'] = [
    {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <Button type="text">{text}</Button>,
    },
    {
        title: 'Medidor',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Dirección',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Diametro',
        dataIndex: 'diameter',
        key: 'diameter',
    },
    {
        title: 'Tarifa',
        key: 'tariff',
        dataIndex: 'tariff',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <RowButtons client={record}/>
        ),
    },
];

const ClientTable = () => {
    const {clients, getClients} = useAppStore(
        (state) =>({
            clients: state.clients,
            getClients: state.getClients
        })
    );
    useEffect(() => {
        getClients(0, 20);
    }, [])
    return <Table<Client> style={{width: '100%'}}
                            rowKey="dni"
                            columns={columns}
                            dataSource={clients}/>
}

const RowButtons = ({client}: any) => {
    const setProfile = useAppStore((state) => state.setProfile);
    return (
        <Space size="middle">
            <Button type="link" onClick={() => {
                setProfile(client)
            }}>Ficha</Button>
            <Button type="link">Medidores</Button>
            <Button title="Editar"><SettingOutlined/></Button>
        </Space>
    )
}

export default ClientTable
