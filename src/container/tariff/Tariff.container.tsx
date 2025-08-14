import TariffTable from "./Tariff.table";
import TariffFilter from "./Tariff.filter";
import {Card, Flex} from "antd";
import TariffDrawer from "./Tariff.drawer";

const TariffContainer = () => {
    return (<>

            <Card style={{marginBottom: '10px'}}>
                <Flex justify="space-between">
                    <TariffFilter></TariffFilter>
                </Flex>
            </Card>
            <Card title="Listado de tarifas">
                <TariffTable></TariffTable>
            </Card>
            <TariffDrawer></TariffDrawer>
        </>
    )
}
export default TariffContainer