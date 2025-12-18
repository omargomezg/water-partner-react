import {Button, Space, Table, TableProps, Typography} from "antd";
import dayjs from "dayjs";
import {EditOutlined} from "@ant-design/icons";
import {ClientType, Tariff} from "../../types";
import {useAppStore} from "../../store/useAppStore";
import {useEffect} from "react";
import DiameterText from "../../components/DiameterText";

const columns: TableProps<Tariff>['columns'] = [
    {
        title: 'Diametro',
        dataIndex: 'diameter',
        key: 'diameter',
        render: (diameter: string) => <DiameterText diameter={diameter}/>,
    },
    {
        title: 'Cargo fijo',
        dataIndex: 'flatFee',
        key: 'flatFee',
        render: (value: number) => <Typography.Text>{value.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</Typography.Text>
    },
    {
        title: '$ m3',
        dataIndex: 'cubicMeter',
        key: 'cubicMeter',
        render: (value: number) => <Typography.Text>{value.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</Typography.Text>
    },
    {
        title: 'Tipo de cliente',
        dataIndex: 'clientType',
        key: 'clientType',
        render: (clientType: ClientType) => <Typography.Text>{clientType.description}</Typography.Text>
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
    const tariffs = useAppStore((state) => state.tariffs);
    const fetchTariff = useAppStore((state) => state.fetchTariff);
    useEffect(() => {
        fetchTariff();
    }, [fetchTariff]);
    return (
        <Table<Tariff> style={{width: '100%'}}
                       rowKey="id"
                       loading={false}
                       columns={columns}
                       dataSource={tariffs}/>
    )
}

const RowButtons = ({tariff}: any) => {
    const setOpenFormTariff = useAppStore((state) => state.setOpenFormTariff);
    const handleClick = () => {
        setOpenFormTariff(tariff);
    }
    return <Space>
        <Button type="link" onClick={handleClick}>
            <EditOutlined/>
        </Button>
    </Space>
}

export default TariffTable;
