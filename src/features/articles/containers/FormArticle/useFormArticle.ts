import { useParams } from "react-router-dom";
import { Category, Content, ListOfTags } from "./type/type";
import axios from "axios";
import { useState, useEffect } from "react";
import { FormInstance, Grid, SelectProps } from "antd";
const { useBreakpoint } = Grid;

type Props = {
  form: FormInstance<Content>;
};

export const useFormArticle = ({ form }: Props) => {
  const { permalink } = useParams<{ permalink: string }>();
  const [content, setContent] = useState<Content>({} as Content);
  const [isValid, setIsValid] = useState(false);
  const [categories, setCategories] = useState([] as SelectProps[]);
  const [loading, setLoading] = useState(false);
  const screens = useBreakpoint();

  useEffect(() => {
    if (permalink) {
      setLoading(true);
      const fetchContent = async () => {
        const { data } = await axios.get<Content>(
          `http://localhost:8080/article/${permalink}`,
        );
        setContent(data);
        form.setFieldsValue(data);
        setLoading(false);
      };
      fetchContent();
    }
  }, [permalink, form]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get<Category[]>(
        `http://localhost:8080/category`,
      );
      setCategories(
        data.map((category: Category) => ({
          label: category.name,
          value: category.id,
        })),
      );
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (form) {
      form
        .validateFields({ validateOnly: true })
        .then(() => setIsValid(true))
        .catch(() => setIsValid(false));
    }
  }, [form]);

  const handleSubmit = () => {
    if (form) {
      console.log("submit");
      form.submit();
    }
  };

  const handleChangeTags = (tags: ListOfTags[]) => {
    const tempContent = { ...content };
    tempContent.listOfTags = tags;
    setContent(tempContent);
    form.setFieldsValue(tempContent);
  };


  return {
    content,
    isValid,
    categories,
    loading,
    screens,

    handleSubmit,
    handleChangeTags,
  };
};
