import { PlaySquareOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { TableProps, Space, Button, Pagination, Table } from "antd";
import dayjs from "dayjs";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BadgePeriodStatus from "../../../components/BadgePeriodStatus";
import { useAppStore } from "../../../store/useAppStore";
import { Period, PeriodFilter } from "../../../types";
import { constants } from "../../../utils/Utils";

const columns: TableProps<Period>['columns'] = [
    {
        title: 'Identificador',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: "Estado",
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
            return <BadgePeriodStatus status={status} />
        }
    },{
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

export const ListOfPeriodsPage = () => {
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
        <div style={{ marginBottom: '16px', textAlign: 'right' }}>
            <Space>
            <BadgePeriodStatus status="ACTIVE" />
                <BadgePeriodStatus status="CLOSED" />
                <BadgePeriodStatus status="PREPARED" />
            </Space>
        </div>
        <Table<Period> style={{ width: '100%' }}
            rowKey="id"
            columns={columns}
            dataSource={periods?.content} />
        <Pagination defaultCurrent={filter.page + 1}
            pageSize={filter.size}
            showTotal={(total) => total > 10 ? `${total} periodos` : ''}
            total={periods?.totalElements} onChange={onPageChange} />
    </>
};

interface RowButtonsProps {
    period: Period;
}
 
const RowButtons: FC<RowButtonsProps> = ({ period }) => {
    const navigate = useNavigate();
    const deletePeriod = useAppStore((state) => state.deletePeriod);
    const initPeriod = useAppStore((state) => state.initPeriod);
    return <Space>
        <Button type="link" onClick={() => initPeriod(period.id)}>
            <PlaySquareOutlined /></Button>
        <Button type="link" onClick={() => deletePeriod(period.id)}>
            <DeleteOutlined />
        </Button>
        <Button type="link" onClick={() => navigate(`/periods/${period.id}/edit`)}>
            <EditOutlined />
        </Button>
    </Space>
}