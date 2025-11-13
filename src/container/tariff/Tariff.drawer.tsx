import {Drawer} from "antd";
import {useTariffStore} from "../../store/Tariff.store";
import TariffForm from "../../components/TariffForm";

const TariffDrawer = () => {
    const {openForm, setOpenForm} = useTariffStore()
    return (<Drawer title='Editar/Crear tarifa'
                    width={350}
                    open={openForm} onClose={setOpenForm}>
        <TariffForm onCancel={setOpenForm}></TariffForm>
    </Drawer>)
}
export default TariffDrawer