import { create } from "zustand/react"
import { Category } from "../types/types"
import { SelectProps } from "antd"
import axios from "axios"

type Store = {
    categories: Category[],
    categoryForSelect: SelectProps[]
}

type Actions = {
    setCategories: (category: Category[]) => void
    fetchCategories: () => void
}

const useCategoryStore = create<Store & Actions>()(
    (set) => ({
        categories: [] as Category[],
        categoryForSelect: [] as SelectProps[],
        setCategories: (categories: Category[]) => set({ categories, categoryForSelect: categories.map((category) => ({ label: category.name, value: category.id })) }),
        fetchCategories: async () => {
            const { data } = await axios.get<Category[]>(
        `http://localhost:8080/category`,
      );
      set({
         categories: data });
        }
    })
)

export default useCategoryStore