import {Button, Space, Table, TableProps, Pagination} from "antd";
import dayjs from "dayjs";
import {useEffect} from "react";
import {EditOutlined} from "@ant-design/icons";
import {useAppStore} from "../../store/useAppStore";
import {constants} from "../../utils/Utils";
import {WaterMeter} from "../../types";

const columns: TableProps<WaterMeter>['columns'] = [
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
        render: (_, record: WaterMeter) => (
            <RowButtons tariff={record}/>
        ),
    },
];

const MeterTable = () => {
    const meters = useAppStore((state) => state.waterMeters);
    const getWaterMeters = useAppStore((state) => state.getWaterMeters);
    const loadingMeters = useAppStore((state) => state.loadingWaterMeters);
    const filter = useAppStore((state) => state.waterMeterFilter);
    const setFilter = useAppStore((state) => state.setWaterMeterFilter);
    useEffect(() => {
        getWaterMeters();
    }, [getWaterMeters]);
    const onPageChange = (pageNumber: number) => {
        const page = pageNumber - 1;
        setFilter({ page, size: constants.PAGE_SIZE });
        getWaterMeters();
    }

    return (<>
        <Table<WaterMeter> style={{width: '100%'}}
                         rowKey="id"
                           loading={loadingMeters}
                         columns={columns}
                         dataSource={meters?.content}/>

    <Pagination defaultCurrent={filter.page + 1}
                pageSize={filter.size}
                showTotal={(total) => `Hay ${total} medidores`}
                total={meters?.totalElements} onChange={onPageChange} />
        </>
    )
}

const RowButtons = ({tariff}: any) => {
    const openForm = useAppStore((state) => state.setOpenFormWaterMeter);
    return <Space>
        <Button type="link" onClick={openForm}>
            <EditOutlined/>
        </Button>
    </Space>
}

export default MeterTable;
