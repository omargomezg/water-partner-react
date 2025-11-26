import {Button, Col, Divider, Form, Input, Radio, Row, Select, Space} from "antd";
import {useAppStore} from "../store/useAppStore";

const ClientForm = () => {
    const createClient = useAppStore((state) => state.createClient);
    const clientTypes = useAppStore((state) => state.clientTypes);

    const onCancel = () => {}

    return (
        <Form layout={'vertical'} onFinish={createClient}>
            <Row gutter={16}>
                <Col span={10}>
                    <Form.Item name="dniType"
                               label="Tipo de identificación"
                               initialValue="rut"
                               rules={[{required: true}]}>
                        <Radio.Group>
                            <Radio value='CHILEAN'>RUT</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Col>
                <Col span={14}>
                    <Form.Item name="dni" label="Rut" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>
            <Divider />
            <Form.Item name="clientType"
                       label="Tipo de cliente"
                       rules={[{required: true}]}>
                <Select options={clientTypes.map(x => ({label: x.description, value: x.id}))} />
            </Form.Item>
            <Divider />
            <Form.Item name="nombre" label="Nombre" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name="fullName" label="Nombre" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="correo" label="Correo" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="telefono" label="Teléfono" rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                </Col>
            </Row>
            <Space style={{float: 'right'}}>
                <Button type="default" onClick={onCancel}>Cancelar</Button>
                <Button type="primary" htmlType="submit">
                    Guardar
                </Button>
            </Space>
        </Form>
    )
}

export default ClientForm
