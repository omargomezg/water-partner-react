import {Table, TableProps, Pagination} from "antd";
import dayjs from "dayjs";
import { useAppStore } from "../../store/useAppStore";
import { Period } from "../../types";


const columns: TableProps<Period>['columns'] = [
    {
        title: 'Descripción',
        dataIndex: 'name',
        key: 'name',
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
    }
]

dayjs.locale('es');

const PeriodTable = () => {   
    const fetchPeriods = useAppStore((state) => state.fetchPeriods);
    const periods = useAppStore((state) => state.periods);
    const filter = useAppStore((state) => state.periodFilter);
    fetchPeriods();
    const onPageChange = (pageNumber: number) => {
        const page = pageNumber - 1;
        fetchPeriods();
    }
    return <>
    <Table<Period> style={{width: '100%'}}
                            rowKey="id"
                            columns={columns}
                            dataSource={periods?.content}/>
            <Pagination defaultCurrent={filter.page + 1}
            pageSize={filter.size}
			showTotal={(total) => total > 10 ? `${total} periodos` : ''}
			total={periods?.totalElements} onChange={onPageChange} />
    </>
}
export default PeriodTable
