import {Button, Form, Input} from "antd";

const ClientTableFilter = () => {
    return (
        <Form style={{paddingBottom: '5px'}} name="userForm" layout="inline">
            <Form.Item label="Nombre" name={"name"}>
                <Input/>
            </Form.Item>
            <Form.Item label="Rut" name={"rut"}>
                <Input/>
            </Form.Item>
            <Form.Item name>
                <Button type="primary" htmlType="submit">
                    Filtrar
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ClientTableFilter
