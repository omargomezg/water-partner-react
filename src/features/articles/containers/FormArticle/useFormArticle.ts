import { useNavigate, useParams } from "react-router-dom";
import { Category, Content, ListOfTags } from "./type/type";
import { useState, useEffect } from "react";
import { Form, FormInstance, Grid, SelectProps } from "antd";
import apiClient from "../../../../services/apiClient";
const { useBreakpoint } = Grid;

type Props = {
  form: FormInstance<Content>;
};

export const useFormArticle = ({ form }: Props) => {
  const { permalink } = useParams<{ permalink: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<Content>({} as Content);
  const [categories, setCategories] = useState([] as SelectProps[]);
  const [loading, setLoading] = useState(false);
  const values = Form.useWatch([], form);
  const screens = useBreakpoint();

  useEffect(() => {
    if (permalink) {
      setLoading(true);
      const fetchContent = async () => {
        const { data } = await apiClient.get<Content>(
          `/article/${permalink}`,
        );
        setContent(data);
        form.setFieldsValue(data);
        setLoading(false);
      };
      fetchContent();
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await apiClient.get<Category[]>(
        `/category`,
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

  const handleSubmit = async () => {
    try {
      await form.validateFields({ validateOnly: true });
      const tContent = {...content};
      tContent.category = values.category;
      tContent.title = values.title;
      tContent.summary = values.summary;
      tContent.content = values.content;
      tContent.referringSite = values.referringSite;
      setContent(tContent);
      if (content.id) {
        await apiClient.put<Content>(`/article/${content.id}`, content);
      } else {
        await apiClient.post<Content>(`/article`,)
      }
navigate(`/articles`)
    } catch (err) {
      console.log(err);
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
    categories,
    loading,
    screens,

    handleSubmit,
    handleChangeTags,
  };
};
