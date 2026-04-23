import { create } from "zustand/react"
import { Content } from "../types/types"

type Store = {
    content: Content
    open: boolean
}

type Actions = {
    setContent: (content: Content, open: boolean) => void
}

const useContentFormStore = create<Store & Actions>()(
    (set) => ({
        open: false,
        content: {} as Content,
        setContent: (content: Content, open: boolean) => {
            open ? set({ content, open }) : set({ content: {} as Content, open });
        }
    })
)

export default useContentFormStore