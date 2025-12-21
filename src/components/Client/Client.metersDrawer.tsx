import {Button, Divider, Drawer, Input, Table, TableProps} from "antd";
import {useAppStore} from "../../store/useAppStore";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { WaterMeter } from "../../types";

const ClientMetersDrawer = () => {

    const setClientMeterDrawerOpen = useAppStore((state) => state.setClientMeterDrawerOpen);
    const openClientMeterDrawer = useAppStore((state) => state.openClientMeterDrawer);
    const onChangeAttribute = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length > 3 || value.length === 0) {
            useAppStore.getState().setWaterMeterFilter({ text: value, isAssigned: false, page: 0, size: 10 });
            useAppStore.getState().getWaterMeters();
        }
    }
    return (<Drawer open={openClientMeterDrawer} title="Asigar medidor"
                    onClose={setClientMeterDrawerOpen}>
        <p>Aquí veras los medidores sin asignar. También puedes aplicar un filtro.</p>
        <Input placeholder="Buscar por número de serie" onChange={onChangeAttribute} style={{marginBottom: 16, width: '100%'}}/>
        <Divider/>
        <ResultTable/>
    </Drawer>);
};

const columns: TableProps<WaterMeter>['columns'] = [
    {
        title: 'Serie',
        dataIndex: 'serial',
        key: 'serial',
    }, {
        title: 'Marca',
        dataIndex: 'trademark',
        key: 'trademark'
    },{
        title: 'Acciones',
        key: 'actions',
        render: () => <Button type="text"><PlusSquareOutlined /></Button>
    }
];

const ResultTable = () => {
    const getWaterMeters = useAppStore((state) => state.getWaterMeters);
    const meters = useAppStore((state) => state.waterMeters);
    const setWaterMeterFilter = useAppStore((state) => state.setWaterMeterFilter);
    useEffect(() => { 
        setWaterMeterFilter({ isAssigned: false, page: 0, size: 10 });
        getWaterMeters();
    }, [getWaterMeters]);
    return (
        <Table<WaterMeter> style={{width: '100%'}}
                      rowKey="id"
                      loading={false}
                      columns={columns}
                      dataSource={meters?.content}/>
    )
}

export default ClientMetersDrawer;
