import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useContentFormStore from "../../store/useContentFormStore";
import { FormInstance } from "antd";
import { Content } from "../../types/types";

type Props = {
    form: FormInstance<Content>;
}

const useContentFormManager = ({form}: Props) => {
  const { permalink } = useParams<{ permalink: string }>();
  const fetchContent = useContentFormStore((state) => state.fetchContent);
  const content = useContentFormStore((state) => state.content);
  const loading = useContentFormStore((state) => state.loading);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (permalink) {
      fetchContent(permalink);
    }
  }, [permalink, fetchContent]);

  useEffect(() => {
    if (form) {
      form.validateFields({ validateOnly: true }).then(() => setIsValid(true)).catch(() => setIsValid(false));
    }
  }, [form]);

  const handleSubmit = () => {
    // Implementation for handling form submission
  };

  return { content, loading, handleSubmit, isValid};
};

export default useContentFormManager;
