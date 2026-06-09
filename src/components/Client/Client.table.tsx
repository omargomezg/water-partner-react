import { Button, Space, Table, Pagination, TableProps } from "antd";
import { DashboardOutlined, DeleteOutlined, SettingOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useAppStore } from "../../store/useAppStore";
import { Client, ClientFilter } from "../../types";
import { constants } from "../../utils/Utils";

const columns: TableProps<Client>["columns"] = [
  {
    title: "RUT",
    dataIndex: "rut",
    key: "rut",
    width: 120,
    fixed: "left",
  },
  {
    title: "Nombre",
    dataIndex: "fullName",
    key: "fullName",
    width: 200,
  },
  {
    title: "Teléfono",
    dataIndex: "phone",
    key: "phone",
    width: 110,
    responsive: ["md"],
    render: (text) => <a href={`tel:${text}`}>{text}</a>,
  },
  {
    title: "Correo",
    dataIndex: "email",
    key: "email",
    width: 200,
    responsive: ["md"],
    render: (text) => <a href={`mailto:${text}`}>{text}</a>,
  },
  {
    title: "Acciones",
    key: "action",
    width: 190,
    render: (_, record) => <RowButtons client={record} />,
  },
];

const ClientTable = () => {
  const clients = useAppStore((state) => state.clients);
  const getClients = useAppStore((state) => state.getClients);
  const loadingClients = useAppStore((state) => state.loadingClients);
  const setClientFilter = useAppStore((state) => state.setClientFilter);
  const clientFilter = useAppStore((state) => state.clientFilter);

  useEffect(() => {
    getClients();
  }, [getClients]);

  const onPageChange = (pageNumber: number) => {
    const page = pageNumber - 1;
    setClientFilter({ page, size: constants.PAGE_SIZE } as ClientFilter);
  };

  return (
    <>
      <Table<Client>
        style={{ width: "100%" }}
        rowKey="dni"
        loading={loadingClients}
        columns={columns}
        scroll={{ x: 800 }}
        dataSource={clients?.content}
      />
      <Pagination
        defaultCurrent={clientFilter.page + 1}
        pageSize={clientFilter.size}
        showTotal={(total) => `Hay ${total} clientes`}
        total={clients?.totalElements}
        onChange={onPageChange}
      />
    </>
  );
};

const RowButtons = ({ client }: any) => {
  const setProfile = useAppStore((state) => state.setProfile);
  const deleteClient = useAppStore((state) => state.deleteClient);
  const setOpenClientMetersModal = useAppStore(
    (state) => state.setOpenClientMetersModal,
  );
  return (
    <Space size="middle">
      <Button
        type="link"
        onClick={() => {
          setProfile(client);
        }}
      >
        Ficha
      </Button>
      <Button
        type="dashed"
		title="Medidores"
		icon={<DashboardOutlined />}
        onClick={() => setOpenClientMetersModal(true, client)}
      />
      <Button
        type="dashed"
		title="Eliminar"
        onClick={() => deleteClient(client.id)}
        icon={<DeleteOutlined />}
      />
      <Button type="dashed" title="Editar" icon={<SettingOutlined />} />
    </Space>
  );
};

export default ClientTable;
