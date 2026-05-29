import { FC, useEffect, useState } from "react";
import { CardStyle } from "../../../components/CardStyle";
import { Button, Card, Col, Flex, Grid, Row, Spin, Typography } from "antd";
import { LastUtilityBills } from "../components/LastUtilityBills.component";
import { AddReadingComponent } from "../components/AddReading.component";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../../services/apiClient";
import { Subscription } from "../../../types";
import { AddUserComponent } from "../components/AddUser.component";

const { Title } = Typography;
const { useBreakpoint } = Grid;

export const SubscriptionDetailPage: FC = () => {
  const { id: subscriptionId } = useParams<{ id: string }>();
  const [subscription, setSubscription] = useState<Subscription>(
    {} as Subscription,
  );
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  useEffect(() => {
    if (subscriptionId) {
      const fetch = async () => {
        const { data } = await apiClient<Subscription>(
          `/api/subscriptions/${subscriptionId}`,
        );
        setSubscription(data);
      };
      fetch();
    }
  }, [subscriptionId]);

  return (
    <Spin spinning={!subscription}>
      <Flex justify="end" gap="middle" style={{ marginBottom: "10px" }}>
        <Button type="link" onClick={() => navigate("/dashboard")}>
          Atrás
        </Button>
        <AddReadingComponent subscriptionId={subscription.id} />
      </Flex>
      <Flex gap="middle" style={{ width: "100%" }} vertical={isMobile}>
        <CardStyle
          title="Propietario o Titular"
          style={{ flex: 2, height: "100%" }}
        >
          <Row gutter={16}>
            <Col md={8}>
              <ParagraphWithTitle
                title="Nombre"
                text={subscription?.owner?.name}
              />
            </Col>
            <Col md={8}>
              <ParagraphWithTitle
                title="Correo electrónico"
                text="jianasd@sds.com"
              />
            </Col>
            <Col md={8}>
              <ParagraphWithTitle title="Teléfono" text="+56966455734" />
            </Col>
          </Row>
        </CardStyle>
        <CardStyle
          title="Usuarios"
          extra={<AddUserComponent subscriptionId={subscription.id} />}
          style={{ flex: 1, height: "100%" }}
        >
          {subscription.users &&
            subscription.users.map((user) => (
              <Card style={{ marginBottom: "10px" }} key={user.email}>
                <p>{user.name}</p>
                <p>{user.email}</p>
              </Card>
            ))}
        </CardStyle>
      </Flex>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <CardStyle title="Últimas boletas">
            <LastUtilityBills />
          </CardStyle>
        </Col>
        <Col xs={24} md={8}>
          <CardStyle title="Medidor">
            <ParagraphWithTitle title="Número" text="66435876345" />
            <Title level={5}>Incidencias</Title>
            <p>Sin información</p>
          </CardStyle>
        </Col>
        <Col xs={24} md={8}>
          <CardStyle title="Hoja de vida"></CardStyle>
        </Col>
      </Row>
    </Spin>
  );
};

type ParagraphWithTitleProps = {
  title?: string;
  text?: string;
};

const ParagraphWithTitle: FC<ParagraphWithTitleProps> = ({ title, text }) => {
  return (
    <p>
      <span style={{ fontWeight: "bold", color: "#413f3f", width: "180px" }}>
        {title}:{" "}
      </span>
      {text}
    </p>
  );
};
