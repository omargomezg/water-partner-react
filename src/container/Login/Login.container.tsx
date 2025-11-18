import {useNavigate} from "react-router-dom";
import {useAuthStore} from "../../store/AuthStore";
import {Button, Card, Checkbox, Flex, Form, Input, Typography} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useLoginMutation} from "../../services/authApi";
import {useState} from "react";
import {Auth} from "../../types";

const LoginContainer = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState<Auth | undefined>(undefined);
    const [login, {isLoading, isSuccess, data, error}] = useLoginMutation();
    const {setToken} = useAuthStore()
    const onFinish = async (values: any) => {
        try {
            const res: Auth = await login(values).unwrap();

            setToken(res.token as string, res.fullName as string)
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
        }
    };
    return (<Flex
        justify="center"
        align="center"
        style={{minHeight: '100vh', backgroundColor: '#f0f2f5'}}>
        <Card style={{width: 400, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}
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
              }
        >
            <Typography.Title level={4} style={{textAlign: 'center', marginBottom: '24px'}}>
                Iniciar Sesión
            </Typography.Title>
            <Form name="normal_login"
                  initialValues={{remember: true}}
                  onFinish={onFinish}>
                <Form.Item name="email"
                           rules={[{required: true, message: '¡Por favor, ingresa tu usuario!'}]}>
                    <Input prefix={<UserOutlined/>} placeholder="Usuario"/>
                </Form.Item>
                <Form.Item name="password"
                           rules={[{required: true, message: '¡Por favor, ingresa tu contraseña!'}]}>
                    <Input.Password
                        prefix={<LockOutlined/>}
                        placeholder="Contraseña"
                    />
                </Form.Item>
                <Form.Item>
                    <Flex justify="space-between" align="center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Recordarme</Checkbox>
                        </Form.Item>
                        <Button type="link" onClick={() => navigate('/reset-password')}>
                            ¿Olvidaste la contraseña?
                        </Button>
                    </Flex>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Ingresar
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    </Flex>)
}
export default LoginContainer
