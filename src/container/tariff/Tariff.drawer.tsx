import {Drawer} from "antd";
import TariffForm from "../../components/TariffForm";
import {useAppStore} from "../../store/useAppStore";

const TariffDrawer = () => {
    const setOpenForm = useAppStore((state) => state.setOpenForm);
    const openForm = useAppStore((state) => state.openForm);
    return (<Drawer title='Editar/Crear tarifa'
                    width={350}
                    open={openForm} onClose={setOpenForm}>
        <TariffForm onCancel={setOpenForm}></TariffForm>
    </Drawer>)
}
export default TariffDrawer