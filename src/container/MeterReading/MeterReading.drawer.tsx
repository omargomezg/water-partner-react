import {Button, Drawer, Space} from "antd";
import {useMeterReadingStore} from "../../store/MeterReading.store";

export const MeterReadingDrawer = () => {
    const {openForm, setOpenForm} = useMeterReadingStore()

    return <Drawer title='Registro'
                   extra={
                       <Space>
                           <Button onClick={setOpenForm}>Cancelar</Button>
                           <Button onClick={setOpenForm} type="primary">
                               Guardar
                           </Button>
                       </Space>
                   }
                   open={openForm} onClose={setOpenForm}>
    </Drawer>

}

export default MeterReadingDrawer