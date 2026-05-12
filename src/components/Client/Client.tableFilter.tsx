import { Button, Form, Input } from "antd";
import { useAppStore } from "../../store/useAppStore";
import FormInputRut from "../FormInputRut";

const ClientTableFilter = () => {
    const setClientFilter = useAppStore((state) => state.setClientFilter);
    const getClients = useAppStore((state) => state.getClients);
    const onFinish = (values: any) => {
        setClientFilter({
            name: values.name === undefined ? null : values.name,
            rut: values.rut === undefined ? null : values.rut,
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
            <FormInputRut name={"rut"} />
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Filtrar
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ClientTableFilter
