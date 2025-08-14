import {FC} from "react";
import '../App.css'
import ContentLayout from "../components/Layout/ContentLayout";
import CardContent from "../components/CardContent";
import ClientTable from "../components/Client/Client.table";
import {Button, Col, Divider, Row, Space} from "antd";
import ClientTableFilter from "../components/Client/Client.tableFilter";
import ClientDrawerForm from "../components/Client/Client.drawerForm";
import {useClientStore} from "../store/Client.store";
import ClientProfile from "../components/Client/Client.profile";

const ClientPage: FC = () => {
    const {profile} = useClientStore();
    return (
        <ContentLayout>
            {!profile && (<ClientList></ClientList>)}
            {profile &&
                <ClientProfile></ClientProfile>}
            <ClientDrawerForm></ClientDrawerForm>
        </ContentLayout>
    )
}

export default ClientPage

const ClientList = () => {
    const {setOpenForm} = useClientStore();
    return (
        <>
            <Row>
                <Col span={24}>
                    <CardContent title="Clientes">
                        <Space>
                            <Button type="primary">Carga masiva <small>(archivo csv)</small></Button>
                            <Button type="primary" onClick={setOpenForm}>Crear cliente</Button>
                        </Space>
                    </CardContent>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <CardContent>
                        <ClientTableFilter></ClientTableFilter>
                        <Divider/>
                        <ClientTable></ClientTable>
                    </CardContent>
                </Col>
            </Row>
        </>
    )
}