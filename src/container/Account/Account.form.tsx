import { Button, Form, Input, message, Space, Select } from "antd"
import { useAppStore } from "../../store/useAppStore";
import { Account } from "../../types";
import { FC } from "react";
import { formatRut, validateRut } from "../../utils/Utils";

const AccountForm: FC = () => {
    const [form] = Form.useForm();
    const setOpenAccountForm = useAppStore((state) => state.setOpenAccountForm);
    const createAccount = useAppStore((state) => state.createAccount);
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: Account) => {
        const status = await createAccount(values);
        status === true ? setOpenAccountForm() : messageApi.warning("Error al crear cuenta", 10);
    }
    return <>
        {contextHolder}
        <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="RUT" name="dni"
                rules={[
                    { required: true, message: 'Por favor ingrese RUT' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            // 1. Permite RUTs vacíos si no es requerido (Antd lo maneja arriba)
                            if (!value) {
                                return Promise.resolve();
                            }

                            // 2. Ejecuta la validación del dígito verificador
                            if (validateRut(value)) {
                                return Promise.resolve(); // Válido
                            }

                            // 3. Inválido
                            return Promise.reject(new Error('El RUT ingresado no es válido.'));
                        },
                    }),]}>
                <Input onChange={(e) => {
                    const formattedValue = formatRut(e.target.value);
                    form.setFieldsValue({
                        rut: formattedValue,
                    });
                }} />
            </Form.Item>
            <Form.Item label="Nombre completo" name="fullName" rules={[{ required: true, message: 'Por favor ingrese el nombre completo' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Correo" name="email" rules={[{ required: true, message: 'Por favor ingrese correo electrónico' }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Contraseña" name="password" rules={[{ required: true, message: 'Por favor ingrese contraseña' }]}>
                <Input type="password" />
            </Form.Item>
            <Form.Item name="role" label="Rol" rules={[{ required: true, message: 'Por favor seleccione un rol' }]}>
                <Select>
                    <Select.Option value="FINANCE">Finanzas</Select.Option>
                    <Select.Option value="RAISING">Recaudador</Select.Option>
                    <Select.Option value="BILLING">Tesorería</Select.Option>
                    <Select.Option value="ADMINISTRATOR">Administrador</Select.Option>
                    <Select.Option value="KAL_EL">Super Administrador</Select.Option>
                </Select>
            </Form.Item>
            <Space style={{ float: 'right' }}>
                <Button type="default" onClick={setOpenAccountForm}>Cancelar</Button>
                <Button type="primary" htmlType="submit">
                    Guardar
                </Button>
            </Space>
        </Form>
    </>
}

export default AccountForm