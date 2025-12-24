import {Button, Divider, Drawer, Input, Table, TableProps} from "antd";
import {useAppStore} from "../../store/useAppStore";
import {PlusSquareOutlined} from "@ant-design/icons";
import {useEffect} from "react";
import {WaterMeter} from "../../types";

const ClientMetersDrawer = () => {

    const setClientMeterDrawerOpen = useAppStore((state) => state.setClientMeterDrawerOpen);
    const openClientMeterDrawer = useAppStore((state) => state.openClientMeterDrawer);
    const setFilter = useAppStore((state) => state.setWaterMeterFilterForClientAssociated);
    const getWaterMeters = useAppStore((state) => state.getWaterMetersForClientAssociated);
    const onChangeAttribute = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length > 3 || value.length === 0) {
            setFilter({text: value, isAssigned: false, page: 0, size: 10});
            await getWaterMeters();
        }
    }
    return (<Drawer open={openClientMeterDrawer} title="Asigar medidor"
                    onClose={setClientMeterDrawerOpen}>
        <p>Aquí veras los medidores sin asignar. También puedes aplicar un filtro.</p>
        <Input placeholder="Buscar por número de serie" onChange={onChangeAttribute}
               style={{marginBottom: 16, width: '100%'}}/>
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
    }, {
        title: 'Acciones',
        key: 'actions',
        render: (_, record) => <ActionButtons meter={record}/>
    }
];

const ActionButtons = ({meter}: { meter: WaterMeter }) => {
    const addWaterMeterToClient = useAppStore((state) => state.addWaterMeterToClient);
    const client = useAppStore((state) => state.client);
    const setClientMeterDrawerOpen = useAppStore((state) => state.setClientMeterDrawerOpen);

    const onAddMeter = async () => {
        if (client) {
            const res = await addWaterMeterToClient(client.dni, meter);
            if (res.success) {
                setClientMeterDrawerOpen();
            }
        }
    }

    return (
        <Button type="text" onClick={onAddMeter}>
            <PlusSquareOutlined/>
        </Button>
    )
};

const ResultTable = () => {
    const getWaterMeters = useAppStore((state) => state.getWaterMetersForClientAssociated);
    const meters = useAppStore((state) => state.waterMeters);
    useEffect(() => {
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
