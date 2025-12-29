import {Button, Card} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import SectorTable from "./Sector.table";
import SectorDrawerForm from "./Sector.DrawerForm";
import { useAppStore } from "../../store/useAppStore";

const SectorContainer = () => {
    const setOpenSectorDrawerForm = useAppStore((state) => state.setOpenSectorDrawerForm);
    return <>
        <Card title="Listado de sectores" extra={
            <Button type={'primary'} onClick={setOpenSectorDrawerForm}><PlusOutlined/>Crear</Button>
        }>
            <SectorTable/>
            <SectorDrawerForm/>
        </Card>
    </>
}
export default SectorContainer
