import { create } from "zustand";
import { ApiResponse, Content } from "../types/types";

type State = {
  articles: ApiResponse<Content>;
};

type Actions = {
  setArticles: (articles: ApiResponse<Content>) => void;
};

type ListOfArticlesStore = State & Actions;

export const useListOfArticlesStore = create<ListOfArticlesStore>()(
  (set) => ({
    articles: {} as ApiResponse<Content>,
    setArticles: (articles: ApiResponse<Content>) => set({ articles }),
  }),
);
