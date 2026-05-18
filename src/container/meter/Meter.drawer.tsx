import {Drawer} from "antd";
import MeterForm from "./Meter.form";
import {useAppStore} from "../../store/useAppStore";
import { FC } from "react";
import { WaterMeter } from "../../types";

type Props = {
    meter: WaterMeter
}

const MeterDrawer: FC<Props> = ({meter}) => {
    const setOpenForm = useAppStore((state) => state.setOpenFormWaterMeter);
    const openForm = useAppStore((state) => state.openFormWaterMeter);

    return (
        <Drawer title='Editar/Crear Medidor'
                open={openForm} onClose={setOpenForm}>
            <MeterForm></MeterForm>
        </Drawer>)
}
export default MeterDrawer
