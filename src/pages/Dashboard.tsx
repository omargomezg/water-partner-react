import React, { FC } from "react";
import MainContent from "../components/MainContent";
import ContentLayout from "../components/Layout/ContentLayout";
import CheckAuthentication from "../components/CheckAuthentication";

const DashboardPage: FC = () => {
    return (
        <CheckAuthentication>
            <ContentLayout>
                <MainContent />
            </ContentLayout>
        </CheckAuthentication>

    )
}

export default DashboardPage