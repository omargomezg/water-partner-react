import { FC } from "react";
import { CardStyle } from "../../../components/CardStyle";
import { Button, Card, Col, Flex, Row, Typography } from "antd";
import { LastUtilityBills } from "../components/LastUtilityBills.component";
import { AddReadingComponent } from "../components/AddReading.component";
import { useParams } from "react-router-dom";

const { Title } = Typography;

export const SubscriptionDetailPage: FC = () => {
  const { id: subscriptionId } = useParams<{ id: string }>();
  return (
    <>
      <Flex justify="end" gap="middle" style={{ marginBottom: "10px" }}>
        <Button type="link">Atrás</Button>
        <AddReadingComponent subscriptionId={subscriptionId as string}  />
      </Flex>
      <Flex gap="middle" style={{ width: "100%" }}>
        <CardStyle
          title="Propietario o Titular"
          style={{ flex: 2, height: "100%" }}
        >
          <Row gutter={16}>
            <Col md={8}>
              <ParagraphWithTitle title="Nombre" text="Juan ap" />
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
        <CardStyle title="Usuarios" style={{ flex: 1, height: "100%" }}>
          <Card style={{ marginBottom: "10px" }}>
            <p>Juan Perez</p>
            <p>jperez@das.copm</p>
          </Card>
          <Card>
            <p>Juan Perez</p>
            <p>jperez@das.copm</p>
          </Card>
        </CardStyle>
      </Flex>
      <Row gutter={16}>
        <Col span={8}>
          <CardStyle title="Últimas lecturas">
            <LastUtilityBills />
          </CardStyle>
        </Col>
        <Col span={8}>
          <CardStyle title="Medidor">
            <ParagraphWithTitle title="Número" text="66435876345" />
            <Title level={5}>Incidencias</Title>
            <p>Sin información</p>
          </CardStyle>
        </Col>
        <Col span={8}>
          <CardStyle title="Últimas Boletas"></CardStyle>
        </Col>
      </Row>
    </>
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
