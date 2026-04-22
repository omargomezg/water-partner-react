import { create } from "zustand/react"
import { Content } from "../types/types"

type Store = {
    content: Content | null
    open: boolean
}

type Actions = {
    setContent: (content: Content | null, open: boolean) => void
}

const useContentFormStore = create<Store & Actions>()(
    (set) => ({
        open: false,
        content: null,
        setContent: (content: Content | null, open: boolean) => {
            open ? set({ content, open }) : set({ content: null, open });
        }
    })
)

export default useContentFormStore