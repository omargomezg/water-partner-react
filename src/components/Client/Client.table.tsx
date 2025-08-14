import {Button, Space, Table, TableProps} from "antd";
import { SettingOutlined} from "@ant-design/icons";
import {useClientStore} from "../../store/Client.store";

interface DataType {
    key: string;
    name: string;
    age: number;
    diameter: string;
    address: string;
    tariff: string;
}

const columns: TableProps<DataType>['columns'] = [
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
            <RowButtons client={record} />
        ),
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        diameter: '1/2"',
        address: 'New York No. 1 Lake Park',
        tariff: 'Socio'
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        diameter: '1/2"',
        address: 'London No. 1 Lake Park',
        tariff: 'Particular'
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        diameter: '1/2"',
        address: 'Sydney No. 1 Lake Park',
        tariff: 'Residencial'
    },
];

const ClientTable = () => {
    return <Table<DataType> style={{width: '100%'}}
                            rowKey="key"
                            columns={columns}
                            dataSource={data}/>
}

const RowButtons = ({client}: any) => {
    const {setProfile} = useClientStore();
    return (
        <Space size="middle">
            <Button type="link" onClick={() => {
                setProfile(client)
            }}>Editar</Button>
            <Button type="link">Medidores</Button>
            <Button type="link">Ficha</Button>
            <Button title="Editar"><SettingOutlined /></Button>
        </Space>
    )
}

export default ClientTable