import {Drawer} from "antd";
import TariffForm from "../../components/TariffForm";
import {useAppStore} from "../../store/useAppStore";

const TariffDrawer = () => {
    const setOpenFormTariff = useAppStore((state) => state.setOpenFormTariff);
    const openFormTariff = useAppStore((state) => state.openFormTariff);
    return (<Drawer title='Editar/Crear tarifa'
                    width={350}
                    open={openFormTariff} onClose={setOpenFormTariff}>
        <TariffForm onCancel={setOpenFormTariff}></TariffForm>
    </Drawer>)
}
export default TariffDrawer