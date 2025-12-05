import { Button, Form, Input } from "antd";
import { useAppStore } from "../../store/useAppStore";

const ClientTableFilter = () => {
    const setClientFilter = useAppStore((state) => state.setClientFilter);
    const getClients = useAppStore((state) => state.getClients);
    const onFinish = (values: any) => {
        setClientFilter({
            name: values.name === undefined ? null : values.name,
            dni: values.dni === undefined ? null : values.dni,
            page: 0,
            size: 2
        });
        getClients();
    };

    return (
        <Form style={{ paddingBottom: '5px' }} name="userForm" layout="inline" onFinish={onFinish}>
            <Form.Item label="Nombre" name={"name"}>
                <Input />
            </Form.Item>
            <Form.Item label="RUT" name={"dni"}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Filtrar
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ClientTableFilter
