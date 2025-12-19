import { Form, Input, DatePicker, Space, Button } from "antd";
import { FC } from "react";
import { useAppStore } from "../../store/useAppStore";

const { RangePicker  } = DatePicker;

const PeriodForm: FC = () => {

    const setOpenFormPeriod = useAppStore((state) => state.setOpenFormPeriod);
    const onFinish = (values: any) => {
        const [start, end] = values.period;
        console.log(start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD"));
    }
    return <>
        <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name="name" label="Descripción">
                <Input />
            </Form.Item>
            <Form.Item name="period" label="Rango de fechas">
                <RangePicker placeholder={['Inicio', 'Fin']}
                format="DD/MM/YYYY"
                />
            </Form.Item>
            <Space style={{ float: 'right' }}>
                <Button type="default" onClick={setOpenFormPeriod}>Cancelar</Button>
                <Button type="primary" htmlType="submit">
                    Guardar
                </Button>
            </Space>
        </Form>
        </>
}
export default PeriodForm;