import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useAppStore} from "../../store/useAppStore";

const TariffFilter = () => {
    const setOpenFormTariff = useAppStore((state) => state.setOpenFormTariff);
    return (
         <Button type="default" onClick={() => setOpenFormTariff(null)}><PlusOutlined />Crear</Button>

    )
 }
 export default TariffFilter