import {Form, Input, Select, Space, Button} from "antd";
import {useAppStore} from "../../store/useAppStore";
import {WaterMeter} from "../../types";

const MeterForm = () => {
    const setOpenForm = useAppStore((state) => state.setOpenFormWaterMeter);
    const create = useAppStore((state) => state.createWaterMeter);
    const onFinish = async (values: WaterMeter) => {
        await create(values);
        setOpenForm()
    }
    return (
        <Form layout={'vertical'} onFinish={onFinish}>
            <Form.Item name="serial" label="Numero" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name="diameter" label="Medida del medidor" rules={[{required: true}]}>
                <Select options={[
                    {value: "THIRTEEN", label: "13 mm"},
                    {value: "NINETEEN", label: "19 mm"},
                    {value: "TWENTY_FIVE", label: "25 mm"},
                    {value: "THIRTY_EIGHT", label: "38 mm"}
                ]}/>
            </Form.Item>
            <Form.Item name="trademark" label="Marca" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name="sector" label="Sector" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name="comment" label={'Observaciones'}>
                <Input.TextArea/>
            </Form.Item>
            <Space style={{float: 'right'}}>
                <Button type="default" onClick={setOpenForm}>Cancelar</Button>
                <Button type="primary" htmlType="submit">
                    Guardar
                </Button>
            </Space>
        </Form>
    )
}
export default MeterForm;
