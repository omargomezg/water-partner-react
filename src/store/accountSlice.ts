import apiClient from "../services/apiClient";
import { PageResponse, Account } from "../types";
import { ImmerStateCreator } from "./useAppStore";

type AccountState = {
  openAccountForm: boolean;
  accounts: PageResponse<Account> | null;
  account: Account | null;
  loadingAccounts: boolean;
};
interface AccountActions {
  setOpenAccountForm: () => void;
  getAccounts: () => Promise<boolean>;
  createAccount: (account: Account) => Promise<boolean>;
  deleteAccount: (id: string) => Promise<boolean>;
}
export type AccountSlice = AccountState & AccountActions;
export const createAccountSlice: ImmerStateCreator<AccountSlice> = (
  set,
  get
) => ({
  accounts: null,
  account: null,
  loadingAccounts: false,
  openAccountForm: false,
  setOpenAccountForm: () => {
    if (get().openAccountForm === true)
      set((state) => ({ openAccountForm: !state.openAccountForm }));
    else
      set((state) => ({
        openAccountForm: !state.openAccountForm,
        account: null,
      }));
  },
  getAccounts: async () => {
    set((state) => {
      state.loadingAccounts = true;
    });
    try {
      const response = await apiClient.get<PageResponse<Account>>(`/user`);
      const { status, data } = response;
      if (status !== 200) {
        return false;
      }

      set((state) => {
        state.accounts = data;
        state.loadingAccounts = false;
      });
      return true;
    } catch (err) {
      set((state) => {
        state.loadingAccounts = false;
      });
      return false;
    }
  },
  createAccount: async (account: Account) => {
    try {
      const response = await apiClient.post<Account>(`/user`, account);
      const { status } = response;
      console.log("el status es:", status);
      if (status !== 201) {
        return false;
      }
      await get().getAccounts();
      return true;
    } catch (err) {
        console.log("Hubo error");
      return false;
    }
  },
  deleteAccount: async (id: string) => {    
    try {
      const response = await apiClient.post<Account>(`/user/${id}`);
      const { status } = response;
      if (status !== 200) {
        return false;
      }
      await get().getAccounts();
      return true;
    } catch (err) {
      return false;
    }
  }
});
