import {Form, Input, Select} from "antd";

const TariffForm = () => {
    return (
            <Form layout={'vertical'}>
                <Form.Item name="telefono" label="Medida del medidor" rules={[{required: true}]}>
                    <Select options={[
                        {value: "13", label: "13 mm"},
                        {value: "19", label: "19 mm"},
                        {value: "25", label: "25 mm"},
                        {value: "38", label: "38 mm"}
                    ]} />
                </Form.Item>
                <Form.Item name="telefono" label="Tipo de cliente" rules={[{required: true}]}>
                    <Select options={[
                        {value: "13", label: "Publico"},
                        {value: "19", label: "Socio"},
                        {value: "25", label: "Privado"}
                    ]} />
                </Form.Item>
                <Form.Item name="telefono" label="Carjo fijo" rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="telefono" label="Valor del m3" rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
            </Form>
    )
}

export default TariffForm