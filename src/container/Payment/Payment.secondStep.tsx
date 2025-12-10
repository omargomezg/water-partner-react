import {Card, Radio, Typography, Space, Row, Col, Button} from "antd";
import { CaretDownOutlined } from '@ant-design/icons';
import {useState} from "react";

const { Title, Text } = Typography;

const PaymentSecondStep = () => {
    const [paymentOption, setPaymentOption] = useState('total');
    const handlePaymentChange = (e: any) => {
        setPaymentOption(e.target.value);
    };

    const handlePayClick = () => {
        // Lógica para procesar el pago
        console.log(`Pagar con la opción seleccionada: ${paymentOption}`);
    };
    return (
        <div style={{
            backgroundColor: '#F5F5F5',
            minHeight: '100vh',
            padding: '40px',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}>
            {/* Main section: Balance and Payment */}
            <Card
                bordered={false}
                bodyStyle={{ padding: 0 }}
                style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    borderRadius: '20px',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.08)'
                }}
            >
                {/* Main Header */}
                <div style={{
                    backgroundColor: '#007BFF',
                    color: 'white',
                    padding: '24px',
                    borderTopLeftRadius: '20px',
                    borderTopRightRadius: '20px'
                }}>
                    <Title level={3} style={{ color: 'white', margin: 0 }}>Saldo y Pago</Title>
                </div>

                {/* Customer information section */}
                <div style={{ padding: '24px' }}>
                    <div style={{
                        backgroundColor: '#fff',
                        padding: '24px',
                        borderRadius: '16px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
                    }}>
                        <Title level={5} style={{ margin: 0, color: '#333' }}>Cliente seleccionado</Title>
                        <div style={{ marginTop: '24px' }}>
                            <Row gutter={[24, 24]}>
                                <Col span={12}>
                                    <Text type="secondary" style={{ fontSize: '14px', color: '#888' }}>N° Cuenta</Text>
                                    <br />
                                    <Text strong style={{ fontSize: '18px', color: '#333' }}>2018496-5</Text>
                                </Col>
                                <Col span={12}>
                                    <Text type="secondary" style={{ fontSize: '14px', color: '#888' }}>Nombre Titular</Text>
                                    <br />
                                    <Text strong style={{ fontSize: '18px', color: '#333' }}>BLANCA PINOT JARA</Text>
                                </Col>
                                <Col span={24}>
                                    <Text type="secondary" style={{ fontSize: '14px', color: '#888' }}>Dirección</Text>
                                    <br />
                                    <Text strong style={{ fontSize: '18px', color: '#333' }}>VOLCAN NEVADO 12 MZ-18</Text>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>

                {/* Balances and payment options section */}
                <div style={{ padding: '0 24px 24px' }}>
                    <Card
                        bordered={false}
                        bodyStyle={{ padding: 0 }}
                        style={{ borderRadius: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}
                    >
                        {/* Payment section header */}
                        <div style={{
                            backgroundColor: '#007BFF',
                            color: 'white',
                            padding: '16px',
                            borderTopLeftRadius: '16px',
                            borderTopRightRadius: '16px'
                        }}>
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Saldo (Pagar con WebPay)</Text>
                        </div>

                        <div style={{ padding: '24px' }}>
                            <Text style={{ color: '#007BFF', fontWeight: 'bold' }}>Para pagar seleccione una de las siguientes opciones.</Text>

                            <Radio.Group
                                onChange={handlePaymentChange}
                                value={paymentOption}
                                style={{ width: '100%', marginTop: '24px' }}
                            >
                                <Space direction="vertical" style={{ width: '100%' }}>
                                    <Radio value="anterior" style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginLeft: '12px' }}>
                                            <Text style={{ color: '#555' }}>Saldo anterior (Deuda vencida)</Text>
                                            <Text style={{ fontWeight: 'bold', color: '#333' }}>$ 0</Text>
                                        </div>
                                    </Radio>
                                    <Radio value="total" style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginLeft: '12px' }}>
                                            <Text style={{ color: '#555' }}>Total a pagar</Text>
                                            <Text style={{ fontWeight: 'bold', color: '#333' }}>$ 42.160</Text>
                                        </div>
                                    </Radio>
                                </Space>
                            </Radio.Group>
                        </div>
                    </Card>
                </div>

                {/* Button and link section */}
                <div style={{ padding: '0 24px 24px', textAlign: 'center' }}>
                    <Button
                        type="primary"
                        size="large"
                        style={{width: '120px'}}
                        onClick={handlePayClick}
                    >
                        Pagar
                    </Button>
                    <div style={{ marginTop: '32px' }}>
                        <button style={{ background: 'none', border: 'none', color: '#007BFF', cursor: 'pointer', padding: 0 }}>
                            <Space>
                                <CaretDownOutlined />
                                <Text style={{ color: '#007BFF', fontWeight: 'bold' }}>Ver últimos pagos</Text>
                            </Space>
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    )
}
export default PaymentSecondStep
