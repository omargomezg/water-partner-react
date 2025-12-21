import { Form, Input, DatePicker, Space, Button } from "antd";
import { FC } from "react";
import { useAppStore } from "../../store/useAppStore";
import { Period } from "../../types";

const { RangePicker  } = DatePicker;

const PeriodForm: FC = () => {

    const setOpenFormPeriod = useAppStore((state) => state.setOpenFormPeriod);
    const create = useAppStore((state) => state.createPeriod);
    const onFinish = async (values: any) => {
        const [start, end] = values.period;
        const startDate = start.format("YYYY-MM-DD");
        const endDate = end.format("YYYY-MM-DD");
        const result = await create({name: values.name, startDate: startDate, endDate: endDate} as Period);
        if (result) {
            setOpenFormPeriod(null);
        }
    }
    return <>
        <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name="name" label="Descripción">
                <Input />
            </Form.Item>
            <Form.Item name="period" label="Rango de fechas">
                <RangePicker style={{ width: '100%' }}
                    placeholder={['Inicio', 'Fin']}
                format="DD/MM/YYYY"
                />
            </Form.Item>
            <Space style={{ float: 'right' }}>
                <Button type="default" onClick={() => setOpenFormPeriod(null)}>Cancelar</Button>
                <Button type="primary" htmlType="submit">
                    Guardar
                </Button>
            </Space>
        </Form>
        </>
}
export default PeriodForm;