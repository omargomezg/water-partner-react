import { Row, Col, Space, Button, Divider } from "antd";
import CardContent from "../../components/CardContent";
import ClientTable from "../../components/Client/Client.table";
import ClientTableFilter from "../../components/Client/Client.tableFilter";
import { useAppStore } from "../../store/useAppStore";

export const ClientContainer = () => {
    const setClientOpenForm = useAppStore((state) => state.setClientOpenForm);
    return <>
        <Row>
            <Col span={24}>
                <CardContent title="Clientes">
                    <Space>
                        <Button type="primary">Carga masiva <small>(archivo csv)</small></Button>
                        <Button type="primary" onClick={setClientOpenForm}>Crear cliente</Button>
                    </Space>
                </CardContent>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <CardContent>
                    <ClientTableFilter></ClientTableFilter>
                    <Divider />
                    <ClientTable></ClientTable>
                </CardContent>
            </Col>
        </Row>
    </>
};

export default ClientContainer;
