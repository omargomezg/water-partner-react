import {Button, Form, Input, Select, Space} from "antd";
import { Tariff } from "../types";

interface TariffFormProps {
    onCancel: () => void;
}

const TariffForm: React.FC<TariffFormProps> = ({onCancel}) => {

    const onFinish = async (values: Tariff) => {

        onCancel();
    }
    return (
            <Form layout={'vertical'} onFinish={onFinish}>
                <Form.Item name="diameter" label="Medida del medidor" rules={[{required: true}]}>
                    <Select options={[
                        {value: "THIRTEEN", label: "13 mm"},
                        {value: "NINETEEN", label: "19 mm"},
                        {value: "TWENTY_FIVE", label: "25 mm"},
                        {value: "THIRTY_EIGHT", label: "38 mm"}
                    ]} />
                </Form.Item>
            <Form.Item name="clientType" label="Tipo de cliente" rules={[{required: true}]}>
                    <Select options={[
                        {value: "PUBLIC", label: "Publico"},
                        {value: "RESIDENT_PARTNER", label: "Socio"},
                        {value: "PRIVATE", label: "Privado"}
                    ]} />
                </Form.Item>
            <Form.Item name="flatFee" label="Carjo fijo" rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
            <Form.Item name="cubicMeter" label="Valor del m3" rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
                <Space style={{float: 'right'}}>
                    <Button type="default" onClick={onCancel}>Cancelar</Button>
                <Button type="primary" htmlType="submit">
                        Guardar
                    </Button>
                </Space>
            </Form>
    )
}

export default TariffForm