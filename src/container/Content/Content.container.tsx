import ContentForm from "./Content.form";
import ContentShowData from "./Content.ShowData";
import { Content } from "./types/types";
import useContentFormStore from "./store/ContentFormStore";

const ContentContainer = () => {

    //const [openForm, setOpenForm] = useState(false);
    const openForm = useContentFormStore(state => state.open);
    const setOpenForm = useContentFormStore(state => state.setContent);

    const onClickCreateOrEdit = (content: Content) => {
        setOpenForm({} as Content, true);
    }

    return (
        <>
            {!openForm && <ContentShowData onSelect={onClickCreateOrEdit} />}

            <ContentForm open={openForm}
                initialValues={null}
                onClose={() => setOpenForm(null, false)}
                onSubmit={() => setOpenForm(null, false)} />
        </>
    );
}

export default ContentContainer;
