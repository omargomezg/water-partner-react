import {Button, Card, Col, Form, Input, message, Row, Space} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useAppStore} from "../../store/useAppStore";
import {ClientTypeTable} from "./ClientType.table";
import {useEffect} from "react";

const ClientTypeContainer = () => {
    const [form] = Form.useForm();
    const getClientTypes = useAppStore((state) => state.getClientTypes);
    const clientType = useAppStore((state) => state.clientType);
    const clearFormClientType = useAppStore((state) => state.clearFormClientType);
    const saveClientType = useAppStore((state) => state.saveClientType);
    useEffect(() => {
        getClientTypes();
    }, [getClientTypes]);

    useEffect(() => {
        if (clientType) {
            form.setFieldsValue({
                description: clientType.description,
            });
        }
    }, [clientType, form]);

    const onFinish = async (values: any) => {
        const status = await saveClientType(values);
        if (status) {
            form.resetFields();
            clearFormClientType();
            message.success('Tipo de cliente guardado exitosamente');
            getClientTypes();
        } else {
            message.error('Error al guardar el tipo de cliente');
        }
    }
    const onCancel = () => {
        form.resetFields();
        clearFormClientType();
    }
    return <Card title="Listado de tarifas" extra={
        <Button type={'primary'}><PlusOutlined/></Button>
    }>
        <Row gutter={[16, 16]} style={{width: '100%'}}>
            <Col span={18}>
                <ClientTypeTable/>
            </Col>
            <Col span={6} style={{borderLeft: '1px solid #f0f0f0', paddingLeft: '16px'}}>
                <Form form={form} onFinish={onFinish}>
                    <Form.Item label="Nombre" name="description"
                               rules={[{required: true, message: 'Por favor ingrese el nombre'}]}>
                        <Input type="text"/>
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type="default" onClick={onCancel}>Cancelar</Button>
                            <Button type="primary" htmlType="submit">Guardar</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    </Card>
}
export default ClientTypeContainer
