import { FC } from "react";
import { useAppStore } from "../../store/useAppStore";
import { Drawer } from "antd";
import PeriodForm from "./Period.Form";

const PeriodDrawer: FC = () => {
    const openFormPeriod = useAppStore((state) => state.openFormPeriod);
    const setOpenFormPeriod = useAppStore((state) => state.setOpenFormPeriod);
    return <Drawer open={openFormPeriod} onClose={() => setOpenFormPeriod(null)}>
        <PeriodForm />
    </Drawer>
}

export default PeriodDrawer;