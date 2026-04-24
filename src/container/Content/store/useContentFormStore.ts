import { create } from "zustand/react";
import { Content } from "../types/types";
import axios, { AxiosError } from "axios";

type Store = {
  loading: boolean;
  error: string | null;
  content: Content;
  open: boolean;
};

type Actions = {
  setContent: (content: Content, open: boolean) => void;
  fetchContent: (permalink: string) => void;
  updateContent: (content: Content) => void;
  deleteContent: (id: string) => void;
  createContent: (content: Content) => void;
};

const useContentFormStore = create<Store & Actions>()((set) => ({
  open: false,
  content: {} as Content,
  loading: false,
  error: null,
  setContent: (content: Content, open: boolean) => {
    open ? set({ content, open }) : set({ content: {} as Content, open });
  },
  fetchContent: async (permalink: string) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get<Content>(
        `http://localhost:8080/article/${permalink}`,
      );
      set({ content: data });
    } catch (err) {
      const error = err as AxiosError;
      set({ error: error.message || "Error al cargar el artículo" });
    } finally {
      set({ loading: false });
    }
  },
  updateContent: async (content: Content) => {
    // Implementation for updating content
  },
  deleteContent: async (id: string) => {
    // Implementation for deleting content
  },
  createContent: async (content: Content) => {
    // Implementation for creating content
  },
}));

export default useContentFormStore;
