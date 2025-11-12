import {Button, Card} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import SectorTable from "./Sector.table";

const SectorContainer = () => {
    return <>
        <Card title="Listado de sectores" extra={
            <Button type={'primary'}><PlusOutlined/>Crear</Button>
        }>
            <SectorTable/>
        </Card>
    </>
}
export default SectorContainer
