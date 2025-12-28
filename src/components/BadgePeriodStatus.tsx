import { Tag } from "antd";
import { FC } from "react"

type BadgePeriodStatusProps = {
    status: "CLOSED" | "ACTIVE" | "PREPARED" | string;
}

const BadgePeriodStatus: FC<BadgePeriodStatusProps> = ({status}) => {
    switch (status) {
        case "CLOSED":
            return <Tag variant="outlined" color="#404140ff">Cerrado</Tag>;
        case "ACTIVE":
            return <Tag variant="outlined" color="#23b103ff">Activo</Tag>;
        case "PREPARED":
            return <Tag variant="solid" color="#262f7cff">Preparado</Tag>;
        default:
            return <>''</>;
    }
}

export default BadgePeriodStatus;