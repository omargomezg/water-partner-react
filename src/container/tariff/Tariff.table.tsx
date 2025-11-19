import {Button, Space, Table, TableProps} from "antd";
import dayjs from "dayjs";
import {EditOutlined} from "@ant-design/icons";
import {useTariffStore} from "../../store/Tariff.store";
import { Tariff } from "../../types";

const columns: TableProps<Tariff>['columns'] = [
    {
        title: 'Diametro',
        dataIndex: 'diameter',
        key: 'diameter',
    },
    {
        title: 'Cargo fijo',
        dataIndex: 'flatFee',
        key: 'flatFee',
    },
    {
        title: '$ m3',
        dataIndex: 'cubicMeter',
        key: 'cubicMeter',
    },
    {
        title: 'Tipo de cliente',
        dataIndex: 'clientType',
        key: 'clientType',
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
        render: (_, record: Tariff) => (
            <RowButtons tariff={record}/>
        ),
    },
];

const TariffTable = () => {
    return (
        <Table<Tariff> style={{width: '100%'}}
                         rowKey="id"
                         loading={false}
                         columns={columns}
                         dataSource={[]}/>
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