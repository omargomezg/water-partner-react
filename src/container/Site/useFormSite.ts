import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../services/apiClient";
import axios from "axios";
import { Site } from "./types/types";
import { FormInstance } from "antd";

interface PropsOptions {
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export const useFormSite = (
  form: FormInstance<Site>,
  { onSuccess, onError }: PropsOptions,
) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [site, setSite] = useState<Partial<Site>>();
  const  [categories, setCategories] = useState<Site[]>();
  const  [otherSites, setOtherSites] = useState<[]>();


  useEffect(() => {
    if (id) {
      fetchContent();
    }
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const { data } = await apiClient.get(`/api/sites/${id}`);
      setCategories(data.listOfCategories);
      setOtherSites(data.listOfSites);
      const { listOfCategories, listOfSites, ...siteData } = data;
      setSite(siteData);
      form.setFieldsValue(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        onError(error.response?.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveConfiguration = () => {};
  const handleSaveIdentity = () => {};
  const handleSaveMission = () => {};

  const handleSubmit = async () => {
    try {
      await form.validateFields({ validateOnly: true });
      await apiClient.put(`/api/sites/${id}`, form.getFieldsValue());
      onSuccess("Site updated successfully");
      navigate("/configurations/sites");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        onError(error.response?.data.message);
      }
    }
  };

  const handleCancel = () => {
    navigate("/configurations/sites");
  };
  const setValue = (item: HTMLInputElement) => {
    const { value, id } = item;
    setSite((prev) => ({ ...prev, [id]: value }));
  };

  return {
    loading,
    site,
    categories,
    otherSites,

    handleSaveConfiguration,
    handleSaveIdentity,
    handleSaveMission,
    handleSubmit,
    handleCancel,
    setValue,
  };
};
