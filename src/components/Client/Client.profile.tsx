import {Button, Card, Col, Divider, Flex, Row, Space, Typography} from "antd";
import './Client.module.css';
import Medidores from "./Client.medidores";
import ClientReadingRecords from "./Client.readingRecords";
import ClientBoletas from "./Client.boletas";
import ClientSubsidyForm from "./Client.subsidyForm";
import ClientModalPdf from "./Client.modalPdf";
import ClientReadingRecordForm from "./Client.readingRecordForm";
import {useAppStore} from "../../store/useAppStore";

const ClientProfile = () => {
    const client = useAppStore((state) => state.client);
    const setProfile = useAppStore((state) => state.setProfile);
	//TODO Editar para abrir el formulario de edicion de usuario y no el de cliente
    const setClientOpenForm = useAppStore((state) => state.setClientOpenForm);
    // if (!client) return (<>No cliente para editar</>);


    return (<>
            <Card style={{marginBottom: '10px'}}>
                <Space>
                    <Button type="dashed" onClick={() => setProfile(null)}>Cerrar</Button>
                    <Button type="primary">Editar</Button>
                    <Button type="primary">Medidor</Button>
                </Space>
            </Card>
            <Row gutter={16}>
                <Col span={6}>
                    <Card>
                        <Typography.Title level={4}>
                            Antecedentes
                        </Typography.Title>
                        <Divider/>
                        <dl>
                            <dt>Rut</dt>
                            <dd>{client?.dni}</dd>
                            <dt>Nombre</dt>
                            <dd>{client?.fullName}</dd>
                            <dt>Teléfono</dt>
                            <dd><a href={`tel:${client?.telephone}`}>{client?.telephone}</a></dd>
                            <dt>Correo electrónico</dt>
                            <dd>{client?.email}</dd>
                        </dl>
                        <Divider/>
                        <Flex justify="end">
                            <Button type="default" onClick={setClientOpenForm}>Editar antecedentes</Button>
                        </Flex>
                    </Card>
                </Col>
                <Col span={18}>
                    <Card style={{marginBottom: '10px'}}>
                        <Typography.Title level={4}>
                            Medidores
                        </Typography.Title>
                        <Medidores></Medidores>
                    </Card>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card>
                                <Typography.Title level={4}>
                                    Últimas 12 boletas
                                </Typography.Title>
                                <ClientBoletas></ClientBoletas>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card>
                                <Typography.Title level={4}>
                                    Últimas lecturas
                                </Typography.Title>
                                <ClientReadingRecords></ClientReadingRecords>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <ClientSubsidyForm></ClientSubsidyForm>
            <ClientModalPdf></ClientModalPdf>
            <ClientReadingRecordForm></ClientReadingRecordForm>
        </>
    )
}

export default ClientProfile