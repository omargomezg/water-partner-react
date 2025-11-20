import {Button} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useAppStore} from "../../store/useAppStore";

const TariffFilter = () => {
    const setOpenForm = useAppStore((state) => state.setOpenForm);
    return (
         <Button type="default" onClick={setOpenForm}><PlusOutlined />Crear</Button>

    )
 }
 export default TariffFilter