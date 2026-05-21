import { FC } from "react";
import { Col, Flex, Row } from "antd";
import DashboardStats from "./Dashboard/DashboardStats";
import ConsumptionChart from "./Dashboard/ConsumptionChart";
import LatestReadings from "./Dashboard/LatestReadings";

const MainContent: FC = () => {
    return <>
        <div style={{ flex: 1 }}>
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
    </>
}

export default MainContent;