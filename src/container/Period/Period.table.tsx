import { Table, TableProps, Pagination, Button, Space } from "antd";
import dayjs from "dayjs";
import { useAppStore } from "../../store/useAppStore";
import { Period, PeriodFilter } from "../../types";
import { FC, useEffect } from "react";
import { DeleteOutlined, EditOutlined, PlaySquareOutlined } from "@ant-design/icons";
import { constants } from "../../utils/Utils";


const columns: TableProps<Period>['columns'] = [
    {
        title: 'Identificador',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: 'Inicio',
        dataIndex: 'startDate',
        key: 'startDate',
        render: (dateString) => {
            return dayjs(dateString).format('DD [de] MMMM, YYYY');
        }
    }, {
        title: 'Fin',
        dataIndex: 'endDate',
        key: 'endDate',
        render: (dateString) => {
            return dayjs(dateString).format('DD [de] MMMM, YYYY');
        }
    }, {
        title: 'Tipo de cliente',
        dataIndex: 'clientType',
        key: 'clientType',
    }, {
        title: 'Action',
        key: 'action',
        render: (_, record: Period) => (
            <RowButtons period={record} />
        ),
    },
]

dayjs.locale('es');

const PeriodTable = () => {
    const fetchPeriods = useAppStore((state) => state.fetchPeriods);
    const periods = useAppStore((state) => state.periods);
    const filter = useAppStore((state) => state.periodFilter);
    const setPeriodFilter = useAppStore((state) => state.setPeriodFilter);
    useEffect(() => {
        fetchPeriods();
    }, [fetchPeriods]);
    const onPageChange = (pageNumber: number) => {
        const page = pageNumber - 1;
        setPeriodFilter({ page, size: constants.PAGE_SIZE } as PeriodFilter);
        fetchPeriods();
    }
    return <>
        <Table<Period> style={{ width: '100%' }}
            rowKey="id"
            columns={columns}
            dataSource={periods?.content} />
        <Pagination defaultCurrent={filter.page + 1}
            pageSize={filter.size}
            showTotal={(total) => total > 10 ? `${total} periodos` : ''}
            total={periods?.totalElements} onChange={onPageChange} />
    </>
}

interface RowButtonsProps {
    period: Period;
}


const RowButtons: FC<RowButtonsProps> = ({ period }) => {
    const setOpenFormPeriod = useAppStore((state) => state.setOpenFormPeriod);
    const deletePeriod = useAppStore((state) => state.deletePeriod);
    const initPeriod = useAppStore((state) => state.initPeriod);
    const handleClick = () => {
        setOpenFormPeriod(period);
    }
    return <Space>
        <Button type="link" onClick={() => initPeriod(period.id)}>
            <PlaySquareOutlined /></Button>
        <Button type="link" onClick={() => deletePeriod(period.id)}>
            <DeleteOutlined />
        </Button>
        <Button type="link" onClick={handleClick}>
            <EditOutlined />
        </Button>
    </Space>
}

export default PeriodTable
