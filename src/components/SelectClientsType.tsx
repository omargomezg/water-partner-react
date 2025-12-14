import { FC, useEffect, useState } from "react";
import { useAppStore } from "../store/useAppStore";
import { ClientType } from "../types";
import { Select } from "antd";

const SelectClientsType: FC = ({...props}) => {
    const [clientTypes, setClientTypes] = useState<ClientType[]>([]);
    const getClientTypes = useAppStore((state) => state.getClientTypes);
    useEffect(() => {
        getClientTypes().then(setClientTypes);
    }, [getClientTypes]);

    return <Select {...props} options={clientTypes.map(x => ({ label: x.description, value: x.id }))} />

}

export default SelectClientsType;