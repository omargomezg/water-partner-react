import {Button, Space, Table, TableProps} from "antd";
import dayjs from "dayjs";
import {EditOutlined} from "@ant-design/icons";
import {useTariffStore} from "../../store/Tariff.store";

interface DataType {
    id: string,
    diameter: string,
    fixedCharge: number,
    valuePerm3: number,
    typeOfClient: string,
    updatedAt: string
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Diametro',
        dataIndex: 'diameter',
        key: 'diameter',
    },
    {
        title: 'Cargo fijo',
        dataIndex: 'fixedCharge',
        key: 'fixedCharge',
    },
    {
        title: '$ m3',
        dataIndex: 'valuePerm3',
        key: 'valuePerm3',
    },
    {
        title: 'Tipo de cliente',
        dataIndex: 'typeOfClient',
        key: 'typeOfClient',
    },
    {
        title: 'Última actualización',
        key: 'updatedAt',
        dataIndex: 'updatedAt',
        render: (dateString) => {
            return dayjs(dateString).format('MMMM DD, YYYY');
        },
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record: DataType) => (
            <RowButtons tariff={record}/>
        ),
    },
];

const data: DataType[] = [
    {
        id: '1',
        diameter: 'Juan Pérez',
        fixedCharge: 1500,
        valuePerm3: 165,
        typeOfClient: 'Socio',
        updatedAt: '2025-08-01T10:30:00Z'
    },
    {
        id: '2',
        diameter: 'Ana Gómez',
        fixedCharge: 1350,
        valuePerm3: 140,
        typeOfClient: 'Particular',
        updatedAt: '2025-08-02T11:00:00Z'
    },
    {
        id: '3',
        diameter: 'Carlos Ruiz',
        fixedCharge: 1800,
        valuePerm3: 200,
        typeOfClient: 'Empresa',
        updatedAt: '2025-08-03T12:15:00Z'
    },
    {
        id: '4',
        diameter: 'María Fernández',
        fixedCharge: 1300,
        valuePerm3: 150,
        typeOfClient: 'Socio',
        updatedAt: '2025-08-04T13:45:00Z'
    },
    {
        id: '5',
        diameter: 'Pedro Sánchez',
        fixedCharge: 1450,
        valuePerm3: 175,
        typeOfClient: 'Particular',
        updatedAt: '2025-08-05T14:20:00Z'
    },
    {
        id: '6',
        diameter: 'Laura Torres',
        fixedCharge: 1600,
        valuePerm3: 180,
        typeOfClient: 'Empresa',
        updatedAt: '2025-08-06T15:50:00Z'
    },
    {
        id: '7',
        diameter: 'Fernando Herrera',
        fixedCharge: 1300,
        valuePerm3: 150,
        typeOfClient: 'Socio',
        updatedAt: '2025-08-07T16:30:00Z'
    },
    {
        id: '8',
        diameter: 'Silvia López',
        fixedCharge: 1400,
        valuePerm3: 160,
        typeOfClient: 'Particular',
        updatedAt: '2025-08-08T17:10:00Z'
    },
    {
        id: '9',
        diameter: 'Ricardo Castro',
        fixedCharge: 1900,
        valuePerm3: 210,
        typeOfClient: 'Empresa',
        updatedAt: '2025-08-09T18:00:00Z'
    },
    {
        id: '10',
        diameter: 'Natalia Ramos',
        fixedCharge: 1300,
        valuePerm3: 150,
        typeOfClient: 'Particular',
        updatedAt: '2025-08-10T19:25:00Z'
    },
];

const TariffTable = () => {
    return (
        <Table<DataType> style={{width: '100%'}}
                         rowKey="id"
                         columns={columns}
                         dataSource={data}/>
    )
}

const RowButtons = ({tariff}: any) => {
    const {setOpenForm} = useTariffStore()
    return <Space>
        <Button type="link" onClick={setOpenForm}>
            <EditOutlined/>
        </Button>
    </Space>
}

export default TariffTable;