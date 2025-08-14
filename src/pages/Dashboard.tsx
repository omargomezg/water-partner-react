import React, {FC} from "react";
import MainContent from "../components/MainContent";
import SideContent from "../components/SideContent";
import ContentLayout from "../components/Layout/ContentLayout";

const DashboardPage: FC = () => {
    return (
        <ContentLayout>
            <MainContent/>
            <SideContent/>
        </ContentLayout>

    )
}

export default DashboardPage