import {Button, Card} from "antd";
import PeriodTable from "./Period.table";
import {PlusOutlined} from "@ant-design/icons";

const PeriodContainer = () => {
    return <Card title="Listado de tarifas" extra={
        <Button type={'primary'}><PlusOutlined/>Crear</Button>
    }>
        <PeriodTable/>
    </Card>
}
export default PeriodContainer
