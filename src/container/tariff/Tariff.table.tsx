import {Button, Space, Table, TableProps} from "antd";
import dayjs from "dayjs";
import {EditOutlined} from "@ant-design/icons";
import {Tariff} from "../../types";
import {useAppStore} from "../../store/useAppStore";
import {useEffect} from "react";

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
    const {tariffs, fetchTariff} = useAppStore(
        (state) => ({
            tariffs: state.tariffs,
            fetchTariff: state.fetchTariff
        })
    );
    useEffect(() => {
        fetchTariff();
    }, []);
    return (
        <Table<Tariff> style={{width: '100%'}}
                       rowKey="id"
                       loading={false}
                       columns={columns}
                       dataSource={tariffs}/>
    )
}

const RowButtons = ({tariff}: any) => {
    const setOpenForm = useAppStore((state) => state.setOpenForm);
    return <Space>
        <Button type="link" onClick={setOpenForm}>
            <EditOutlined/>
        </Button>
    </Space>
}

export default TariffTable;