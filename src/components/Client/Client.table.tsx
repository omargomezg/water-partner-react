import {Button, Space, Table, TableProps} from "antd";
import {SettingOutlined} from "@ant-design/icons";
import {useClientStore} from "../../store/Client.store";
import {useEffect, useState} from "react";
import axiosInstance from "../../utils/axios";
import {AxiosResponse} from "axios";

interface Response {
    items: DataType[];
    totalHits: number
}

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
            <RowButtons client={record}/>
        ),
    },
];


const ClientTable = () => {
    const [clients, setClients] = useState<DataType[]>([])
    useEffect(() => {
        axiosInstance.get(`/v1/client?pageIndex=0&pageSize=10`)
            .then((result: AxiosResponse<Response>) => {
                const mappedData: DataType[] = result.data.items.map((d: any) => (
                    {
                        key: d.dni,
                        name: d.fullName,
                        address: d.sector ?? 'Sin dirección',
                        age: 0,
                        diameter: '',
                        tariff: ''
                    }
                ))
                setClients(mappedData)
            })
            .catch()

    }, [])
    return <Table<DataType> style={{width: '100%'}}
                            rowKey="key"
                            columns={columns}
                            dataSource={clients}/>
}

const RowButtons = ({client}: any) => {
    const {setProfile} = useClientStore();
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
