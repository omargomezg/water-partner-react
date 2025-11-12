import {Button, Card, Space} from "antd";
import ContentFilter from "./Content.filter";
import ContentTable from "./Content.table";
import MeterDrawer from "../meter/Meter.drawer";
import {PlusOutlined} from "@ant-design/icons";

type Props = {
    onSelect: (id: string) => void;
}

const ContentShowData = ({onSelect}: Props) => {
    const setOpenForm = () => {
        onSelect('null')
    };

    return <>
        <Card style={{marginBottom: '10px'}}>
            <Space>
                <ContentFilter/>
            </Space>
        </Card>
        <Card title="Contenidos " extra={
            <Button type={'primary'} onClick={setOpenForm}><PlusOutlined/>Crear</Button>
        }>
            <ContentTable/>
        </Card>
        <MeterDrawer></MeterDrawer>
    </>
}

export default ContentShowData;
