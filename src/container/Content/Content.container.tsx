import ContentForm from "./Content.form";
import {useState} from "react";
import ContentShowData from "./Content.ShowData";

const ContentContainer = () => {

    const [openForm, setOpenForm] = useState(false);

    const onClickCreateOrEdit = () => {
    }

    return (
        <>
            {openForm && <ContentShowData onSelect={onClickCreateOrEdit}/>}

            <ContentForm open={openForm}
                         initialValues={null}
                         onClose={() => setOpenForm(false)}
                         onSubmit={() => setOpenForm(false)}/>)
        </>
    );
}

export default ContentContainer;
