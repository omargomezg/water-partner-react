import {Button, Table, TableProps} from "antd";
import dayjs from "dayjs";
import {useAppStore} from "../../store/useAppStore";

interface DataType {
    code: number;
    millimeter: string;
    createdAt: string;
    sector: string;
    fixedTariff: number;
    amountPerM3: number;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Código',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: 'Milímetros',
        dataIndex: 'millimeter',
        key: 'millimeter',
    },
    {
        title: 'Alta',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (dateString) => {
            return dayjs(dateString).format('MMMM DD, YYYY');
        }
    },
    {
        title: 'Sector',
        dataIndex: 'sector',
        key: 'sector',
    },
    {
        title: 'Cargo fijo',
        key: 'fixedTariff',
        dataIndex: 'fixedTariff',
    },
    {
        title: '$ m3',
        key: 'amountPerM3',
        dataIndex: 'amountPerM3',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <ActionButtons meter={record}/>
        ),
    },
];

const data: DataType[] = [
    {
        code: 23423423,
        millimeter: '1/2"',
        createdAt: '2025-07-28T10:00:00Z',
        sector: 'Mirador poniente',
        fixedTariff: 1500,
        amountPerM3: 10
    },
];

const Medidores = () => {
    return <Table<DataType> style={{width: '100%'}}
                            columns={columns}
                            rowKey="code"
                            dataSource={data}/>
}

export default Medidores

const ActionButtons = ({meter}: any) => {
    const setOpenSubsidyForm = useAppStore((state) => state.setOpenSubsidyForm);
    return (
        <Button title="Agregar subsidio" onClick={() => setOpenSubsidyForm(meter)}>+ Subsidio</Button>
    )
}