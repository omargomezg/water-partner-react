import { FC } from "react";
import { Flex } from "antd";
import DashboardStats from "./Dashboard/DashboardStats";
import ConsumptionChart from "./Dashboard/ConsumptionChart";
import LatestReadings from "./Dashboard/LatestReadings";

const MainContent: FC = () => {
    return <>
        <div style={{ flex: 1 }}>
            <Flex vertical gap="2.3rem">
                <DashboardStats />
                <ConsumptionChart />
                <LatestReadings />
            </Flex>
        </div>
    </>
}

export default MainContent;