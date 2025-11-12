import {Button, Col, Flex, Form, Input, Layout, Row, Space, Typography} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {useNavigate} from "react-router-dom";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    return (
        <Flex gap="middle" wrap>
            <Layout>
                <Header>Header</Header>
                <Content>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Typography.Title>
                                Restablecer tu contraseña
                            </Typography.Title>
                            <Typography.Text>
                                ¿Tienes problemas para iniciar sesión? ¡No te preocupes! INgresa el correo con el que te
                                registraste y te enviaremos un link para poder validar tu identidad.
                            </Typography.Text>
                        </Col>
                        <Col span={12}>
                            <Form layout={"vertical"}>
                                <Form.Item name="email"
                                           label="Correo electrónico"
                                           rules={[
                                               {required: true},
                                               {
                                                   type: "email",
                                                   message: "Introduce una dirección de correo electrónico válida"
                                               }
                                           ]}>
                                    <Input/>
                                </Form.Item>
                                <Space align="end">
                                    <Button htmlType="submit"
                                            type="primary">Restablecer contraseña</Button>
                                    <Button type="default"
                                            onClick={() => navigate("/login")}>Volver al inicio de sesión</Button>
                                </Space>
                            </Form>
                        </Col>
                    </Row>
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </Flex>
    )
}
export default ResetPasswordPage