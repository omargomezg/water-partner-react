import { EditOutlined } from "@ant-design/icons";
import {Button, Space, Table, TableProps, Typography} from "antd";
import dayjs from "dayjs";
import {useClientStore} from "../../store/Client.store";

interface DataType {
    createdAt: string;
    currentReading: number,
    previousReading: number;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Fecha',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (dateString) => {
            // Use dayjs to parse and format the date
            return dayjs(dateString).format('MMMM DD, YYYY');
        },
    },
    {
        title: 'Lectura',
        key: 'currentReading',
        render: (_, r) => (<Typography.Text type="secondary">{r.previousReading} - {r.currentReading}</Typography.Text>)
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <RowButtons lectura={record}/>
        ),
    },
];

const data: DataType[] = [
    {
        createdAt: '2025-05-28T10:00:00Z',
        previousReading: 12,
        currentReading: 28
    },
    {
        createdAt: '2025-06-28T10:00:00Z',
        previousReading: 28,
        currentReading: 34
    },
    {
        createdAt: '2025-07-28T10:00:00Z',
        previousReading: 34,
        currentReading: 45
    },
];
const ClientReadingRecords = () => {
    return <Table<DataType> style={{width: '100%'}}
                            size="small"
                            scroll={{ y: 25 * 5 }}
                            rowKey="createdAt"
                            columns={columns}
                            dataSource={data}/>
}
export default ClientReadingRecords

const RowButtons = ({lectura}: any) => {
    const {setOpenReadingRecordForm} = useClientStore();
    return <Space>
        <Button type="link" onClick={setOpenReadingRecordForm}><EditOutlined /></Button>
    </Space>
}
