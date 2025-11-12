import {create} from "zustand/react";

type Store = {
    step: number
}

type Actions = {
    setStep: (step: number) => void
}

const usePaymentStore = create<Store & Actions>()(
    (set) => ({
        step: 1,
        setStep: (step: number) => set(() => ({step: step}))
    })
)

export default usePaymentStore
