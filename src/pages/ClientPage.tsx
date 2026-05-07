import { FC } from "react";
import "../App.css";
import ClientDrawerForm from "../components/Client/Client.drawerForm";
import ClientProfile from "../components/Client/Client.profile";
import ClientMetersModal from "../components/Client/ClientMeters.modal";
import ClientContainer from "../container/Client/Client.container";
import { useAppStore } from "../store/useAppStore";

const ClientPage: FC = () => {
  const client = useAppStore((state) => state.client);
  return (
    <>
      {!client && <ClientList></ClientList>}
      {client && <ClientProfile></ClientProfile>}
      <ClientDrawerForm></ClientDrawerForm>
      <ClientMetersModal />
    </>
  );
};

export default ClientPage;

const ClientList = () => {
  return <ClientContainer></ClientContainer>;
};
