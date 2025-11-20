import {Button, Col, Divider, Drawer, Form, Input, Row, Select, Space, Typography} from "antd";
import {useAppStore} from "../../store/useAppStore";

const ClientSubsidyForm = () => {
    const {openSubsidyForm, meterForSubsidy, setOpenSubsidyForm} = useAppStore((state) => ({
        openSubsidyForm: state.openSubsidyForm,
        meterForSubsidy: state.meterForSubsidy,
        setOpenSubsidyForm: state.setOpenSubsidyForm
    }));
    return (<Drawer title={'Subsidio servicio ' + meterForSubsidy?.code}
                    width={600}
                    extra={
                        <Space>
                            <Button onClick={setOpenSubsidyForm}>Cancelar</Button>
                            <Button onClick={setOpenSubsidyForm} type="primary">
                                Guardar
                            </Button>
                        </Space>
                    }
                    open={openSubsidyForm} onClose={setOpenSubsidyForm}>
            <Form layout={'vertical'}>
                <Typography.Title level={5}>
                    Datos del decreto
                </Typography.Title>
                <Row gutter={16}>
                    <Col span={10}>
                        <Form.Item name="identificacion"
                                   label="Número"
                                   rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={14}>
                        <Form.Item name="rut" label="Fecha" rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Typography.Title level={5}>
                    Datos del subsidio
                </Typography.Title>
                <Divider/>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item name="nombre" label="Inicio" rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="fullName" label="Fin" rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item name="correo" label="Porcentaje" rules={[{required: true}]}>
                    <Select options={[
                        {value: 'jack', label: 'Cobertura del 50%'},
                        {value: 'lucy', label: 'Cobertura del 100%'},
                    ]}/>
                </Form.Item>
                <Form.Item name="telefono" label="Comentarios" rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
            </Form>
        </Drawer>
    )
}

export default ClientSubsidyForm
