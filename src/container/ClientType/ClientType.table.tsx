import { useAppStore } from "../../store/useAppStore";
import { Button, Space, Table, TableProps } from "antd";
import { ClientType } from "../../types";
import { EditOutlined } from "@ant-design/icons";

const columns: TableProps<ClientType>['columns'] = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: 'Descripción',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record: ClientType) => (
            <RowButtons type={record} />
        ),
    },
]

export const ClientTypeTable = () => {
    const clientTypes = useAppStore((state) => state.clientTypes);
    return <Table<ClientType> style={{ width: '100%' }}
        rowKey="id"
        columns={columns}
        dataSource={clientTypes} />
}

type RowButtonsProps = {
    type: ClientType
}

const RowButtons = ({ type }: RowButtonsProps) => {
    const setClientType = () => { };
    return <Space>
        <Button type="link" onClick={setClientType}>
            <EditOutlined />
        </Button>
    </Space>
}