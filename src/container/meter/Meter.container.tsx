import MeterTable from "./Meter.table";
import {Button, Card, Space} from "antd";
import MeterDrawer from "./Meter.drawer";
import {PlusOutlined} from "@ant-design/icons";
import {useAppStore} from "../../store/useAppStore";

export const MeterContainer = () => {
    const setOpenForm = useAppStore((state) => state.setOpenFormWaterMeter);
    return (
        <>
            <Card style={{marginBottom: '10px'}}>
                <Space>
                    <Button>Opciones o filtros</Button>
                </Space>
            </Card>
            <Card title="Listado de medidores" extra={
                <Button type={'primary'} onClick={setOpenForm}><PlusOutlined/>Crear</Button>}>
                <MeterTable></MeterTable>
            </Card>
            <MeterDrawer></MeterDrawer>
        </>
    )
}
