import { Button, Form, Input, message, Select, Space } from "antd";
import { GenericResponse, Tariff } from "../types";
import { useAppStore } from "../store/useAppStore";
import SelectClientsType from "./SelectClientsType";
import { useEffect } from "react";

interface TariffFormProps {
    onCancel: () => void;
}

const TariffForm: React.FC<TariffFormProps> = ({ onCancel }) => {
    const [form] = Form.useForm();
    const create = useAppStore((state) => state.createTariff);
    const update = useAppStore((state) => state.updateTariff);
    const fetchTariff = useAppStore((state) => state.fetchTariff);
    const tariff = useAppStore((state) => state.tariff);
    const onFinish = async (values: Tariff) => {
        let result: GenericResponse<Tariff>;
        if (tariff) {
            values.id = tariff.id;
            result = await update(values);
            onResult(result, "actualizada");
        } else {
            result = await create(values);
            onResult(result, "creada");
        }
    }

    const onResult = async (result: GenericResponse<Tariff>, action: string) => {
        console.log(result);
        if (result.success) {
            message.success(`Tarifa ${action}`);
            fetchTariff();
            onCancel();
        } else {
            message.error(result.message);
        }
    };

    useEffect(() => {
        if (tariff) {
            form.setFieldsValue(tariff);
        } else {
            form.resetFields();
        }
    }, [form, tariff]);

    return (
        <Form layout={'vertical'} form={form} onFinish={onFinish}>
            <Form.Item name="diameter" label="Diámetro del medidor" rules={[{ required: true }]}>
                <Select options={[
                    { value: "THIRTEEN", label: "13 mm" },
                    { value: "NINETEEN", label: "19 mm" },
                    { value: "TWENTY_FIVE", label: "25 mm" },
                    { value: "THIRTY_EIGHT", label: "38 mm" }
                ]} />
            </Form.Item>
            <Form.Item name={["clientType", "id"]} label="Tipo de cliente" rules={[{ required: true }]}>
                <SelectClientsType />
            </Form.Item>
            <Form.Item name="flatFee" label="Carjo fijo" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="cubicMeter" label="Valor del m3" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Space style={{ float: 'right' }}>
                <Button type="default" onClick={onCancel}>Cancelar</Button>
                <Button type="primary" htmlType="submit">
                    Guardar
                </Button>
            </Space>
        </Form>
    )
}

export default TariffForm