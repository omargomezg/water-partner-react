import { create } from "zustand/react"
import { Category } from "../types/types"

type Store = {
    category: Category[]
}

type Actions = {
    setCategory: (category: Category[]) => void
}

const useCategoryStore = create<Store & Actions>()(
    (set) => ({
        category: [] as Category[],
        setCategory: (category: Category[]) => set({ category })
    })
)

export default useCategoryStore