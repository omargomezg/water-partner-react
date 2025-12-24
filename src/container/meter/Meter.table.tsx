import {Button, Pagination, Space, Table, TableProps} from "antd";
import dayjs from "dayjs";
import {useEffect} from "react";
import {EditOutlined} from "@ant-design/icons";
import {useAppStore} from "../../store/useAppStore";
import {constants} from "../../utils/Utils";
import {WaterMeter} from "../../types";
import DiameterText from "../../components/DiameterText";

const columns: TableProps<WaterMeter>['columns'] = [
    {
        title: 'Serie',
        dataIndex: 'serial',
        key: 'serial',
    },
    {
        title: 'Marca',
        dataIndex: 'trademark',
        key: 'trademark',
    },
    {
        title: 'Tamaño',
        dataIndex: 'diameter',
        key: 'diameter',
        render: (diameter: string) => <DiameterText diameter={diameter} />,
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
        title: 'Acciones',
        key: 'action',
        render: (_, record: WaterMeter) => (
            <RowButtons tariff={record}/>
        ),
    },
];

/**
 *Tabla que muestra todos los medidores en el sistema.
 *
 * @constructor
 */
const MeterTable = () => {
    const meters = useAppStore((state) => state.waterMeters);
    const getWaterMeters = useAppStore((state) => state.getWaterMetersForConfiguration);
    const filter = useAppStore((state) => state.waterMeterConfigurationFilter);
    const setFilter = useAppStore((state) => state.setWaterMeterConfigurationFilter);
    const loadingMeters = useAppStore((state) => state.loadingWaterMeters);

    useEffect(() => {
        getWaterMeters();
    }, [getWaterMeters]);
    const onPageChange = (pageNumber: number) => {
        const page = pageNumber - 1;
        setFilter({...filter, page});
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
                        showTotal={(total) => total > constants.PAGE_SIZE ? `Hay ${total} medidores` : ''}

                        total={meters?.totalElements} onChange={onPageChange}/>
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
