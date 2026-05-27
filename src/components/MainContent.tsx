import { FC, useState } from "react";
import { Button, Col, Flex, Form, Input, Row, Space } from "antd";
import DashboardStats from "./Dashboard/DashboardStats";
import ConsumptionChart from "./Dashboard/ConsumptionChart";
import LatestReadings from "./Dashboard/LatestReadings";
import { CreateService } from "../container/CreateService";
import { TableSubscriptions } from "./TableSubscriptions";

const MainContent: FC = () => {
    const [openCreateService, setOpenCreateService] = useState(false);
    return <>
        <div style={{ flex: 1 }}>
            <Row gutter={16} style={{ marginBottom: "20px" }}>
                <Col span={12}>
                    <Form layout="inline">
                        <Form.Item>
                            <Input placeholder="Nº servicio..." />
                        </Form.Item>
                        <Button>Buscar</Button>
                    </Form>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                    <Button type="primary" onClick={() => setOpenCreateService(true)}>
                        Nuevo servicio
                    </Button>
                </Col>
            </Row>
            <TableSubscriptions />
            <Flex vertical gap="2.3rem">                
                <DashboardStats />
                <Row>
                    <Col span={12}>
                        <ConsumptionChart />
                    </Col>
                    <Col span={12}>
                        <LatestReadings />
                    </Col>
                </Row>
            </Flex>
        </div>
        {openCreateService &&
        <CreateService onClose={() => setOpenCreateService(false)}/>}
    </>    
}

export default MainContent;