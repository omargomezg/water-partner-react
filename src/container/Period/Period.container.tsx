import {Button, Card} from "antd";
import PeriodTable from "./Period.table";
import {PlusOutlined} from "@ant-design/icons";
import { useAppStore } from "../../store/useAppStore";
import PeriodDrawer from "./Period.Drawer";

const PeriodContainer = () => {
    const setOpenFormPeriod = useAppStore((state) => state.setOpenFormPeriod);
    return <Card title="Periodos de lectura" extra={
        <Button type={'primary'} onClick={() => setOpenFormPeriod(null)}><PlusOutlined/>Crear</Button>
    }>
        <PeriodTable/>
        <PeriodDrawer />
    </Card>
}
export default PeriodContainer
