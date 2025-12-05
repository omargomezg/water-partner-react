import { ImmerStateCreator} from "./useAppStore";

type UserState = {}
interface UserActions {}
export type UserSlice = UserState & UserActions
export const createUserSlice: ImmerStateCreator<UserSlice> = (set, get) => ({
})
