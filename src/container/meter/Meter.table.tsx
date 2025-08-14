import {Button, Space, Table, TableProps} from "antd";
import dayjs from "dayjs";
import {EditOutlined} from "@ant-design/icons";
import {useMeterStore} from "../../store/Meter.store";

interface DataType {
    id: string,
    serialNumber: string,
    brand: string,
    size: number,
    updatedAt: string
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Serie',
        dataIndex: 'serialNumber',
        key: 'serialNumber',
    },
    {
        title: 'Marca',
        dataIndex: 'brand',
        key: 'brand',
    },
    {
        title: 'Tamaño',
        dataIndex: 'size',
        key: 'size',
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
        "id": "1",
        "serialNumber": "SN-A1B2C3D4E5",
        "brand": "Samsung",
        "size": 55,
        "updatedAt": "2025-08-11T09:30:00Z"
    },
    {
        "id": "2",
        "serialNumber": "SN-F6G7H8I9J0",
        "brand": "LG",
        "size": 65,
        "updatedAt": "2025-08-10T14:15:00Z"
    },
    {
        "id": "3",
        "serialNumber": "SN-K1L2M3N4O5",
        "brand": "Sony",
        "size": 43,
        "updatedAt": "2025-08-11T11:00:00Z"
    },
    {
        "id": "4",
        "serialNumber": "SN-P6Q7R8S9T0",
        "brand": "Philips",
        "size": 50,
        "updatedAt": "2025-08-09T18:45:00Z"
    },
    {
        "id": "5",
        "serialNumber": "SN-U1V2W3X4Y5",
        "brand": "Panasonic",
        "size": 32,
        "updatedAt": "2025-08-08T07:20:00Z"
    },
    {
        "id": "6",
        "serialNumber": "SN-Z6A7B8C9D0",
        "brand": "Samsung",
        "size": 75,
        "updatedAt": "2025-08-07T16:55:00Z"
    },
    {
        "id": "7",
        "serialNumber": "SN-E1F2G3H4I5",
        "brand": "LG",
        "size": 55,
        "updatedAt": "2025-08-06T10:10:00Z"
    },
    {
        "id": "8",
        "serialNumber": "SN-J6K7L8M9N0",
        "brand": "Sony",
        "size": 65,
        "updatedAt": "2025-08-05T20:30:00Z"
    },
    {
        "id": "9",
        "serialNumber": "SN-O1P2Q3R4S5",
        "brand": "Philips",
        "size": 43,
        "updatedAt": "2025-08-04T08:40:00Z"
    },
    {
        "id": "10",
        "serialNumber": "SN-T6U7V8W9X0",
        "brand": "Panasonic",
        "size": 50,
        "updatedAt": "2025-08-03T12:05:00Z"
    },
    {
        "id": "11",
        "serialNumber": "SN-Y1Z2A3B4C5",
        "brand": "Samsung",
        "size": 50,
        "updatedAt": "2025-08-02T15:25:00Z"
    },
    {
        "id": "12",
        "serialNumber": "SN-D6E7F8G9H0",
        "brand": "LG",
        "size": 43,
        "updatedAt": "2025-08-01T17:00:00Z"
    },
    {
        "id": "13",
        "serialNumber": "SN-I1J2K3L4M5",
        "brand": "Sony",
        "size": 75,
        "updatedAt": "2025-07-31T22:10:00Z"
    },
    {
        "id": "14",
        "serialNumber": "SN-N6O7P8Q9R0",
        "brand": "Philips",
        "size": 32,
        "updatedAt": "2025-07-30T11:45:00Z"
    },
    {
        "id": "15",
        "serialNumber": "SN-S1T2U3V4W5",
        "brand": "Panasonic",
        "size": 65,
        "updatedAt": "2025-07-29T14:35:00Z"
    },
    {
        "id": "16",
        "serialNumber": "SN-X6Y7Z8A9B0",
        "brand": "Samsung",
        "size": 55,
        "updatedAt": "2025-07-28T16:20:00Z"
    },
    {
        "id": "17",
        "serialNumber": "SN-C1D2E3F4G5",
        "brand": "LG",
        "size": 50,
        "updatedAt": "2025-07-27T09:00:00Z"
    },
    {
        "id": "18",
        "serialNumber": "SN-H6I7J8K9L0",
        "brand": "Sony",
        "size": 43,
        "updatedAt": "2025-07-26T18:50:00Z"
    },
    {
        "id": "19",
        "serialNumber": "SN-M1N2O3P4Q5",
        "brand": "Philips",
        "size": 65,
        "updatedAt": "2025-07-25T11:15:00Z"
    },
    {
        "id": "20",
        "serialNumber": "SN-R6S7T8U9V0",
        "brand": "Panasonic",
        "size": 55,
        "updatedAt": "2025-07-24T13:30:00Z"
    }
];

const MeterTable = () => {
    return (
        <Table<DataType> style={{width: '100%'}}
                         rowKey="id"
                         columns={columns}
                         dataSource={data}/>
    )
}

const RowButtons = ({tariff}: any) => {
    const {setOpenForm} = useMeterStore()
    return <Space>
        <Button type="link" onClick={setOpenForm}>
            <EditOutlined/>
        </Button>
    </Space>
}

export default MeterTable;