import CheckAuthentication from "../components/CheckAuthentication";
import ContentLayout from "../components/Layout/ContentLayout";
import ContentContainer from "../container/Content/Content.container";

const ContentPage = () => {
    return (
        <CheckAuthentication>
            <ContentLayout>
                <ContentContainer />
            </ContentLayout>
        </CheckAuthentication>
    );
}
export default ContentPage;
