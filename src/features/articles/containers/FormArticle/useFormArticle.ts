import { useNavigate, useParams } from "react-router-dom";
import { Category, Content, Tags } from "./type/type";
import { useState, useEffect } from "react";
import { Form, FormInstance, Grid, SelectProps } from "antd";
import apiClient from "../../../../services/apiClient";
import axios from "axios";
const { useBreakpoint } = Grid;

interface FormArticleOptions {
  onSuccess?: (message: string) => void;
  onError: (message: string) => void;
}

export const useFormArticle = (
  form: FormInstance<Content>,
  { onSuccess, onError }: FormArticleOptions,
) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<Content>({} as Content);
  const [categories, setCategories] = useState([] as SelectProps[]);
  const [loading, setLoading] = useState(false);
  const values = Form.useWatch([], form);
  const screens = useBreakpoint();

  useEffect(() => {
    if (id) {
      setLoading(true);
      const fetchContent = async () => {
        const { data } = await apiClient.get<Content>(
          `/api/auth/articles/${id}`,
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
      const { data } = await apiClient.get<Category[]>(`/category`);
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
      const tContent = { ...content };
      tContent.category = values.category;
      tContent.title = values.title;
      tContent.summary = values.summary;
      tContent.content = values.content;
      tContent.referringSite = values.referringSite;
      setContent(tContent);
      if (content.id) {
        await apiClient.put<Content>(
          `/api/auth/articles/${content.id}`,
          tContent,
        );
      } else {
        await apiClient.post<Content>(`/api/auth/articles`, tContent);
      }
      navigate(`/articles`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        onError(err.response?.data.message);
      }
    }
  };

  const handleChangeTags = (tags: Tags[]) => {
    const tempContent = { ...content };
    tempContent.tags = tags;
    setContent(tempContent);
    form.setFieldsValue(tempContent);
  };

  const setTitle = (title: string) => {
    if (!content?.id) {
      const permalink = title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-")
        .trim();
      form.setFieldsValue({ permalink: permalink });
    }
  };

  const handleSaveDraft = async () => {
    const draft = {
      contentId: content.id,
      permalink: content.permalink,
      title: content.title,
      summary: content.summary,
      content: content.content,
      referringSite: content.referringSite,
      categoryId: content.category,

    }
    console.log("Draft > ",draft);
    await apiClient.post<Content>(
          `/api/auth/articles/${content.id}/draft`,
          draft,
        );
  }

  return {
    content,
    categories,
    loading,
    screens,

    handleSubmit,
    handleChangeTags,
    handleSaveDraft,
    setTitle,
  };
};
