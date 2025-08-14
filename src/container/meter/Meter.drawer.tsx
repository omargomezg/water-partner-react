import {Button, Drawer, Space} from "antd";
import MeterForm from "./Meter.form";
import {useMeterStore} from "../../store/Meter.store";

const MeterDrawer = () => {
    const {openForm, setOpenForm} = useMeterStore()
    return (
        <Drawer title='Editar/Crear Medidor'
                extra={
                    <Space>
                        <Button onClick={setOpenForm}>Cancelar</Button>
                        <Button onClick={setOpenForm} type="primary">
                            Guardar
                        </Button>
                    </Space>
                }
                open={openForm} onClose={setOpenForm}>
            <MeterForm></MeterForm>
        </Drawer>)
}
export default MeterDrawer