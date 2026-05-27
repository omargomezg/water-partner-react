import { FC, useState } from "react";
import { Button, Col, Flex, Form, Input, Row } from "antd";
import DashboardStats from "./Dashboard/DashboardStats";
import ConsumptionChart from "./Dashboard/ConsumptionChart";
import LatestReadings from "./Dashboard/LatestReadings";
import { CreateService } from "../container/CreateService";
import { TableSubscriptions } from "./TableSubscriptions";
import { CardStyle } from "./CardStyle";

const MainContent: FC = () => {
  const [form] = Form.useForm();
  const [openCreateService, setOpenCreateService] = useState(false);
  const [refreshTable, setRefreshTable] = useState<Date>(new Date());

  const handleOnClose = (refresh: boolean): void => {
    setOpenCreateService(false);
    console.log(refresh);
    if (refresh) {
      setRefreshTable(new Date());
    }
  };

  const handleClickSearch = () => {
    setRefreshTable(new Date());
  };

  return (
    <>
      <div style={{ flex: 1 }}>
        <CardStyle>
          <Row gutter={16} style={{ marginBottom: "20px" }}>
            <Col span={12}>
              <Form layout="inline" form={form}>
                <Form.Item>
                  <Input placeholder="Nº servicio..." />
                </Form.Item>
                <Button onClick={handleClickSearch}>Buscar</Button>
              </Form>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Button type="primary" onClick={() => setOpenCreateService(true)}>
                Nuevo servicio
              </Button>
            </Col>
          </Row>
          <TableSubscriptions lastUpdate={refreshTable} />
        </CardStyle>
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
      {openCreateService && <CreateService onClose={handleOnClose} />}
    </>
  );
};

export default MainContent;
