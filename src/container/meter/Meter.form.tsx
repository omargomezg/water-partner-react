import {Form, Input, Select} from "antd";

const MeterForm = () => {
    return (
        <Form layout={'vertical'}>
            <Form.Item name="nombre" label="Numero" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name="telefono" label="Medida del medidor" rules={[{required: true}]}>
                <Select options={[
                    {value: "13", label: "13 mm"},
                    {value: "19", label: "19 mm"},
                    {value: "25", label: "25 mm"},
                    {value: "38", label: "38 mm"}
                ]}/>
            </Form.Item>
            <Form.Item name="nombre" label="Marca" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name="nombre" label="Sector" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item label={'Observaciones'}>
                <Input.TextArea/>
            </Form.Item>
        </Form>
    )
}
export default MeterForm