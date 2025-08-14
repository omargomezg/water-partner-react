import {Button, Drawer, Space} from "antd";
import {useTariffStore} from "../../store/Tariff.store";
import TariffForm from "../../components/TariffForm";

const TariffDrawer = () => {
    const {openForm, setOpenForm} = useTariffStore()
    return (
    <Drawer title='Editar/Crear tarifa'
            width={350}
            extra={
                <Space>
                    <Button onClick={setOpenForm}>Cancelar</Button>
                    <Button onClick={setOpenForm} type="primary">
                        Guardar
                    </Button>
                </Space>
            }
            open={openForm} onClose={setOpenForm}>
        <TariffForm></TariffForm>
    </Drawer>)
}
export default TariffDrawer