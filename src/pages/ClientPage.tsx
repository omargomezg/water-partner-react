import { FC } from "react";
import '../App.css'
import ContentLayout from "../components/Layout/ContentLayout";
import ClientDrawerForm from "../components/Client/Client.drawerForm";
import ClientProfile from "../components/Client/Client.profile";
import CheckAuthentication from "../components/CheckAuthentication";
import { useAppStore } from "../store/useAppStore";
import ClientContainer from "../container/Client/Client.container";

const ClientPage: FC = () => {
	const client = useAppStore((state) => state.client);
	return (
		<CheckAuthentication>
			<ContentLayout>
				{!client && (<ClientList></ClientList>)}
				{client &&
					<ClientProfile></ClientProfile>}
				<ClientDrawerForm></ClientDrawerForm>
			</ContentLayout>
		</CheckAuthentication>
	)
}

export default ClientPage

const ClientList = () => {
	return <ClientContainer></ClientContainer>
}