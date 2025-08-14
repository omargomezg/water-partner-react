import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useTariffStore} from "../../store/Tariff.store";

const TariffFilter = () => {
    const {setOpenForm} = useTariffStore();
    return (
         <Button type="default" onClick={setOpenForm}><PlusOutlined />Crear</Button>

    )
 }
 export default TariffFilter