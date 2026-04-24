import ContentForm from "./Form/Content.form";
import ContentShowData from "./Content.ShowData";
import { Content } from "./types/types";
import useContentFormStore from "./store/ContentFormStore";
import { useContentManager } from "./Content.hook";

const ContentContainer = () => {
  const openForm = useContentFormStore((state) => state.open);
  const setOpenForm = useContentFormStore((state) => state.setContent);
  const content = useContentFormStore((state) => state.content);
  const {} = useContentManager();

  const onClickCreateOrEdit = async (content: Content) => {
        const response = await fetch(
          `http://localhost:8080/article/${content.permalink}`,
        );
        const data: Content = await response.json();
        setOpenForm(data, true);
                    
     
  };


  return (
    <>
      {!openForm && <ContentShowData onSelect={onClickCreateOrEdit} />}
      {openForm && (
        <ContentForm
          open={openForm}
          initialValues={content}
          onClose={() => setOpenForm({} as Content, false)}
          onSubmit={() => setOpenForm({} as Content, false)}
        />
      )}
    </>
  );
};

export default ContentContainer;
