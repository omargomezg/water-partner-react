import { create } from "zustand/react"
import { Category } from "../types/types"
import { SelectProps } from "antd"

type Store = {
    categories: Category[],
    categoryForSelect: SelectProps[]
}

type Actions = {
    setCategories: (category: Category[]) => void
}

const useCategoryStore = create<Store & Actions>()(
    (set) => ({
        categories: [] as Category[],
        categoryForSelect: [] as SelectProps[],
        setCategories: (categories: Category[]) => set({ categories, categoryForSelect: categories.map((category) => ({ label: category.name, value: category.id })) })
    })
)

export default useCategoryStore