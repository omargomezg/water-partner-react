import {create} from "zustand/react";

type Store = {
    collapsed: boolean
}

type Actions = {
    edit: () => void
}

const useContentStore = create<Store & Actions>()(
    (set) => ({
        collapsed: false,
        edit: () => set((state) => ({collapsed: !state.collapsed}))
    })
)

export default useContentStore
