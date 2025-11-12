import {Button, Card, Flex, Form, Input, Space, Spin, Typography} from "antd";
import {useState} from "react";
import usePaymentStore from "../../store/PaymentStore";

const PaymentFirstStep = ()=>{
    const {setStep} = usePaymentStore()
    const [searching, setSearching] = useState(false)
    const onFinish = (values: any) => {
        console.log(values)
        setSearching(true)
        setTimeout(() => {
            setSearching(false)
            setStep(2)
        }, 3000)
    }
    return (
        <Spin spinning={searching} tip="Loading...">
            <Flex style={{
                minHeight: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f0f2f5'
            }}>
                <Card style={{width: 500, paddingBottom: '50px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}
                      cover={
                          <img
                              src="/logoapr.jpg"
                              alt="Logo"
                              style={{
                                  width: '120px',
                                  margin: '24px auto 16px auto',
                                  display: 'block'
                              }}
                          />
                      }>
                    <Space direction="vertical" style={{width: '100%', alignItems: 'center'}}>
                        <Typography.Title style={{textAlign: 'center', width: '100%'}}>
                            Paga tus cuentas
                        </Typography.Title>
                        <Typography.Text style={{textAlign: 'center', width: '100%'}}>
                            Ingresa el rut del titular para pagar el servicio
                        </Typography.Text>
                        <Form layout="horizontal"
                              onFinish={onFinish}
                              style={{justifyContent: 'center', width: '100%'}}>
                            <Form.Item name="rut"
                                       rules={
                                           [{required: true, message: "Debes ingresar un RUT"}]
                                       }>
                                <Input size="large" placeholder="Rut del titular"/>
                            </Form.Item>
                            <Form.Item>
                                <Button style={{width: '100%'}}
                                        size={'large'}
                                        type="primary"
                                        htmlType="submit">Buscar</Button>
                            </Form.Item>
                        </Form>
                    </Space>
                </Card>
            </Flex>
        </Spin>
    )
}
export default PaymentFirstStep;
