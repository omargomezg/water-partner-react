import { Breadcrumb } from "antd";
import CheckAuthentication from "../components/CheckAuthentication";
import ContentLayout from "../components/Layout/ContentLayout";
import ContentContainer from "../container/Content/Content.container";

const items = [
    {
        title: 'Home',
    },
    {
        title: 'Content',
    }
];

const ContentPage = () => {
    return (
        <CheckAuthentication>
            <ContentLayout>
                <Breadcrumb style={{ margin: '1px 0' }} items={items}></Breadcrumb>
                <ContentContainer />
            </ContentLayout>
        </CheckAuthentication>
    );
}
export default ContentPage;
