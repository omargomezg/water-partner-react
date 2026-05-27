import {Table, TableProps} from "antd";
import {FC, useEffect, useState} from "react";
import {CardStyle} from "./CardStyle";
import {PageResponse} from "../types";
import apiClient from "../services/apiClient";

interface Subscriptions {
}

const columns: TableProps<Subscriptions>["columns"] = [
    {
        title: "N. Servicio",
        dataIndex: "serviceNumber",
        key: "serviceNumber",
    }, {
        title: "Sector",
        dataIndex: ["sector", "name"],
        key: "sectorName",
    },
    {
        title: "Dirección",
        dataIndex: "address",
        key: "address",
    },
    {
        title: "Titular",
        dataIndex: ["owner", "fullName"],
        key: "ownerName",
    },
];

export const TableSubscriptions: FC = () => {
    const [datasource, setDatasource] = useState<PageResponse<Subscriptions>>();

    useEffect(() => {
        const fetch = async () => {
            const {data} = await apiClient.get<PageResponse<Subscriptions>>("/api/subscriptions");
            setDatasource(data);
        };
        fetch();
    }, []);
    return (
        <CardStyle>
            <Table<Subscriptions>
                columns={columns}
                rowKey="serviceNumber"
                dataSource={datasource?.content}
            />
        </CardStyle>
    );
};
