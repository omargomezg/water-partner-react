import { Space, Table, TableProps } from "antd";
import { SiteSummary, SocialNetwork } from "./types/types";
import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import { TitleWithDescription } from "./components/TitleWithDescription";
import { RowButtons } from "./components/RowButtons";
import { SocialNetworkLink } from "./components/SocialNetwork";

const columns: TableProps<SiteSummary>["columns"] = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    render: (name, { description, url, googleTagID }) => (
      <TitleWithDescription
        description={description}
        googleTagID={googleTagID}
        name={name}
        url={url}
      />
    ),
  },
  {
    title: "Sitios relacionados",
    dataIndex: "sharedWithSites",
    key: "sharedWithSites",
    render: (sharedWithSites) => sharedWithSites?.map((s: string) => s).join(", "),
  },
  {
    title: "Redes sociales",
    dataIndex: "socialNetworks",
    key: "socialNetworks",
    render: (socialNetworks) => {
      return (
        <Space orientation="vertical" size="small">
          {
          socialNetworks?.map((a: SocialNetwork) => (
          <SocialNetworkLink url={a.url} name={a.name} />
          ))
        }
        </Space>)
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_, record: SiteSummary) => <RowButtons id={record.id} />,
  },
];

export const ListOfSitesContainer: React.FC = () => {
  const [sites, setSites] = useState<SiteSummary[]>([]);

  const fetchSites = async () => {
    const { data } = await apiClient.get<SiteSummary[]>("/api/sites");
    setSites(data);
  };

  useEffect(() => {
    fetchSites();
  }, []);
  return (
    <>
      <Table<SiteSummary>
        columns={columns}
        dataSource={sites}
        rowKey="id"
        style={{ width: "100%" }}
      />
    </>
  );
};
