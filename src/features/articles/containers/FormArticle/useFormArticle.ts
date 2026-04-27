import { useParams } from "react-router-dom";
import { Category, Content } from "./type/type";
import axios from "axios";
import { useState, useEffect } from "react";
import { FormInstance, SelectProps } from "antd";

type Props = {
  form: FormInstance<Content>;
};

export const useFormArticle = ({ form }: Props) => {
  const { permalink } = useParams<{ permalink: string }>();
  const [content, setContent] = useState<Content>({} as Content);
  const [isValid, setIsValid] = useState(false);
  const [categories, setCategories] = useState([] as SelectProps[]);

  useEffect(() => {
    if (permalink) {
      const fetchContent = async () => {
        const { data } = await axios.get<Content>(
          `http://localhost:8080/article/${permalink}`,
        );
        setContent(data);
      };
      fetchContent();
    }
  }, [permalink]);

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
    // Implementation for handling form submission
  };

  return { content, handleSubmit, isValid, categories };
};
