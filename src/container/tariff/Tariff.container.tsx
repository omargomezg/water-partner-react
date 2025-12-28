import TariffTable from "./Tariff.table";
import TariffFilter from "./Tariff.filter";
import {Button, Card, Flex} from "antd";
import TariffDrawer from "./Tariff.drawer";
import { useAppStore } from "../../store/useAppStore";

const TariffContainer = () => {
    const setOpenFormTariff = useAppStore((state) => state.setOpenFormTariff);
    return (<>

            <Card style={{marginBottom: '10px'}}>
                <Flex justify="space-between">
                    <TariffFilter></TariffFilter>
                </Flex>
            </Card>
        <Card title="Listado de tarifas" extra={<Button type={'text'} onClick={() => setOpenFormTariff(null)}>+</Button>}>
                <TariffTable></TariffTable>
            </Card>
            <TariffDrawer></TariffDrawer>
        </>
    )
}
export default TariffContainer