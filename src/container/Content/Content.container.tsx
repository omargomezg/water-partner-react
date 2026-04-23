import ContentForm from "./views/form/Content.form";
import ContentShowData from "./Content.ShowData";
import { Content } from "./types/types";
import useContentFormStore from "./store/useContentFormStore";

const ContentContainer = () => {
  const openForm = useContentFormStore((state) => state.open);
  const setOpenForm = useContentFormStore((state) => state.setContent);
  const content = useContentFormStore((state) => state.content);

    const openForm = useContentFormStore(state => state.open);
    const setOpenForm = useContentFormStore(state => state.setContent);


    return (
        <>
            {!openForm && <ContentShowData onSelect={onClickCreateOrEdit} />}
            {openForm && (
                <ContentForm open={openForm}
                    initialValues={null}
                    onClose={() => setOpenForm(null, false)}
                    onSubmit={() => setOpenForm(null, false)} />
            )}
        </>
    );
}

export default ContentContainer;
